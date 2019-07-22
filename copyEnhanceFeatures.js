// eslint-disable-next-line import/no-extraneous-dependencies
const fse = require('fs-extra');
const flatten = require('lodash/flatten');
const union = require('lodash/union');

const destinationRootPath = 'D:/test';
const componentsPath = './src/components/';
const utilsPath = './src/utils/';
const servicesPath = './src/services/';

const features = [
  [
    './src/base-models/curd.ts',
    `${utilsPath}model.tsx`,
    `${utilsPath}decorators/callFunctionOrNot.js`,
  ],
  [`${componentsPath}ChildrenTabs`, `${utilsPath}decorators/callFunctionOrNot.js`],
  [`${componentsPath}PageTabs`, `${componentsPath}ChildrenTabs`],
  [`${componentsPath}antd-form-pro`, `${servicesPath}upload.js`],
  [`${componentsPath}DetailFormDrawer`, `${componentsPath}antd-form-pro`],
  [
    `${componentsPath}DetailFormDrawer`,
    `${componentsPath}antd-form-pro`,
    `${utilsPath}childrenUtils.ts`,
  ],
  [
    `${componentsPath}QueryPanel`,
    `${componentsPath}antd-form-pro`,
    `${utilsPath}decorators/callFunctionOrNot.js`,
  ],
  [`${componentsPath}TableList`],
  [
    `${componentsPath}BasePage`,
    `${componentsPath}TableList`,
    `${componentsPath}QueryPanel`,
    `${componentsPath}DetailFormDrawer`,
    `${componentsPath}DetailFormModal`,
    `${utilsPath}decorators/callFunctionOrNot.js`,
    `${utilsPath}childrenUtils.ts`,
    `${utilsPath}table.less`,
  ],
];

function copyFiles(path = `${componentsPath}BasePage`) {
  try {
    fse.copySync(path, path.replace('.', destinationRootPath));
    console.log(`success! ${path}\t==>\t${path.replace('.', destinationRootPath)}`);
  } catch (err) {
    console.error(`error! ${err.message}`);
  }
}

const installFeatures = union(flatten(features));
function copyFeatures() {
  for (let i = 0; i < installFeatures.length; i += 1) {
    copyFiles(installFeatures[i]);
  }
}

copyFeatures();
