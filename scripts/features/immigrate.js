// eslint-disable-next-line import/no-extraneous-dependencies
const fse = require('fs-extra');
const path = require('path');
const union = require('lodash/union');
const { features: installFeatures, destinationRootPath } = require('./copyConfig');

const rootPath =
  __dirname
    .split(path.sep)
    .slice(0, -2)
    .join(path.sep) + path.sep;
const layoutsPath = `${rootPath}src${path.sep}layouts${path.sep}`;
const componentsPath = `${rootPath}src${path.sep}components${path.sep}`;
const utilsPath = `${rootPath}src${path.sep}utils${path.sep}`;

const featuresConfig = [
  {
    name: 'ChildrenTabs',
    path: `${componentsPath}ChildrenTabs`,
    dependencies: [`${utilsPath}decorators${path.sep}callFunctionOrNot.js`],
  },
  {
    name: 'PageTabs',
    path: `${componentsPath}PageTabs`,
    dependencies: [
      `${layoutsPath}BasicLayout.js`,
      `${componentsPath}ChildrenTabs`,
      `${componentsPath}PageHeaderWrapper`,
    ],
  },
  {
    name: 'StandardTable',
    path: `${componentsPath}StandardTable`,
  },
  {
    name: 'TableList',
    path: `${componentsPath}TableList`,
  },
  {
    name: 'DetailFormDrawer',
    path: `${componentsPath}DetailFormDrawer`,
  },
  {
    name: 'DetailFormModal',
    path: `${componentsPath}DetailFormModal`,
    dependencies: [`${utilsPath}childrenUtils.ts`],
  },
  {
    name: 'QueryPanel',
    path: `${componentsPath}QueryPanel`,
    dependencies: [
      `${utilsPath}decorators${path.sep}callFunctionOrNot.js`,
    ],
  },
  {
    name: 'BasePage/Curd',
    path: `${componentsPath}BasePage`,
    dependencies: [
      `${componentsPath}TableList`,
      `${componentsPath}QueryPanel`,
      `${componentsPath}DetailFormDrawer`,
      `${componentsPath}DetailFormModal`,
      `${utilsPath}decorators${path.sep}callFunctionOrNot.js`,
      `${utilsPath}childrenUtils.ts`,
    ],
  },
];

function needInstallFeature(featureName) {
  for (let i = 0; i < featuresConfig.length; i += 1) {
    if (featuresConfig[i].name === featureName) {
      return [true, featuresConfig[i]];
    }
  }
  return [false, null];
}

function getFeatureDependencies(featureConfig) {
  let result = [];
  if (featureConfig.path) {
    result.push(featureConfig.path);
  }
  if (featureConfig.dependencies) {
    result = [...result, ...featureConfig.dependencies];
  }
  return result;
}

function getInstallDependencies() {
  let result = [];
  installFeatures.forEach(item => {
    const [needInstall, config] = needInstallFeature(item);
    if (needInstall) {
      result = [...result, ...getFeatureDependencies(config)];
    }
  });
  return union(result);
}

function copyFiles(filePath) {
  try {
    const destinationPath = filePath.replace(
      rootPath,
      destinationRootPath.replace(/\//g, path.sep)
    );
    fse.copySync(filePath, destinationPath);
    console.log(`success! ${filePath.replace(rootPath, '')}\t==>\t${destinationPath}`);
  } catch (err) {
    console.error(`error! ${err.message}`);
  }
}

function copyDependencies(dependencies) {
  for (let i = 0; i < dependencies.length; i += 1) {
    copyFiles(dependencies[i]);
  }
}

copyDependencies(getInstallDependencies());
