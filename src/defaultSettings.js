// 标签页功能配置
const pageTabsMode = [
  'route', // 使用页面路由定义作为标签页 id ，类似 /path/:name 这样的动态路由只会打开一个标签页
  'path', // 使用页面路径作为标签页 id ，动态路由会打开不同的标签页，因此，可能需要再在 PageTabs 组件中动态设置标签页的标题
  false, // 不使用标签页功能
];

module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: true, // sticky siderbar
  menu: {
    disableLocal: false,
  },
  title: 'Ant Design Pro',
  pwa: false,
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '',

  pageTabs: pageTabsMode[0],
  proRootPath: '/',
  reloadTab: true,
};
