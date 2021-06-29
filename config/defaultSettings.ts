import { Mode, UseSwitchTabsOptions } from 'use-switch-tabs';
import { Settings as ProSettings } from '@ant-design/pro-layout';

export type RouteTabsOptions = {
  mode: Mode;
  /** 固定标签页头部 */
  fixed?: boolean;
  /** 是否在顶栏显示刷新按钮 */
  reloadable?: boolean;
} & Pick<UseSwitchTabsOptions, 'persistent'>;

export type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;

  routeTabs?: RouteTabsOptions;
};

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

  routeTabs: {
    mode: Mode.Route,
    fixed: true,
    reloadable: true,
    persistent: {
      force: true,
    },
  },
} as DefaultSettings;
