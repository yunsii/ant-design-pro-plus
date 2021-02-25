import { MenuTheme } from 'antd/es/menu/MenuContext';
import { BasicLayoutProps as ProLayoutProps } from '@ant-design/pro-layout';

// 标签页功能配置
const RouteTabsMode = [
  'route', // 使用页面路由定义作为标签页 id ，类似 /path/:name 这样的动态路由只会打开一个标签页
  'args', // 使用页面路由参数作为标签页 id ，因此，可能需要再在 PageTabs 组件中动态设置标签页的标题
  false, // 不使用标签页功能
];

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme;
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: ProLayoutProps['layout'];
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;

  routeTabsMode: 'route' | 'args' | false;
  /**
   * sticky route tabs
   */
  fixedRouteTabs: boolean;
  reloadTab: boolean;
}

export default {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',

  routeTabsMode: RouteTabsMode[0],
  fixedRouteTabs: false,
  reloadTab: true,
} as DefaultSettings;
