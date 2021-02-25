import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
// import themePluginConfig from './themePluginConfig';
import routes from './routes.config';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,

  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },

  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  base: '/ant-design-pro-plus/',
  publicPath: '/ant-design-pro-plus/',
  exportStatic: {},
});
