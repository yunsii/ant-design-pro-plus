// eslint-disable-next-line import/no-extraneous-dependencies
const fse = require('fs-extra');
const union = require('lodash/union');
const { features: installFeatures, destinationRootPath } = require('./copyConfig');

const rootPath = '../../';
const componentsPath = `${rootPath}src/components/`;
const utilsPath = `${rootPath}src/utils/`;
const servicesPath = `${rootPath}src/services/`;

const featuresConfig = [
  {
    name: 'ChildrenTabs',
    path: `${componentsPath}ChildrenTabs`,
    dependencies: [`${utilsPath}decorators/callFunctionOrNot.js`],
  },
  {
    name: 'PageTabs',
    path: `${componentsPath}PageTabs`,
    dependencies: [`${componentsPath}ChildrenTabs`, `${componentsPath}PageHeaderWrapper`],
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
    name: 'antd-form-pro',
    path: `${componentsPath}TableList`,
    dependencies: [`${servicesPath}upload.js`],
  },
  {
    name: 'DetailFormDrawer',
    path: `${componentsPath}DetailFormDrawer`,
    dependencies: [`${componentsPath}antd-form-pro`],
  },
  {
    name: 'DetailFormModal',
    path: `${componentsPath}DetailFormModal`,
    dependencies: [`${componentsPath}antd-form-pro`, `${utilsPath}childrenUtils.ts`],
  },
  {
    name: 'QueryPanel',
    path: `${componentsPath}QueryPanel`,
    dependencies: [`${componentsPath}antd-form-pro`, `${utilsPath}decorators/callFunctionOrNot.js`],
  },
  {
    name: 'base-models/curd',
    path: `${rootPath}src/base-models/curd.ts`,
    dependencies: [`${utilsPath}model.tsx`, `${utilsPath}decorators/callFunctionOrNot.js`],
  },
  {
    name: 'BasePage/Curd',
    path: `${componentsPath}BasePage`,
    dependencies: [
      `${componentsPath}TableList`,
      `${componentsPath}QueryPanel`,
      `${componentsPath}DetailFormDrawer`,
      `${componentsPath}DetailFormModal`,
      `${utilsPath}decorators/callFunctionOrNot.js`,
      `${utilsPath}childrenUtils.ts`,
      `${utilsPath}table.less`,
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

function copyFiles(path) {
  try {
    fse.copySync(path, path.replace(rootPath, destinationRootPath));
    console.log(`success! ${path}\t==>\t${path.replace('.', destinationRootPath)}`);
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
