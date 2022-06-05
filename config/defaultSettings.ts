import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { Mode, UseSwitchTabsOptions } from 'use-switch-tabs';

export type SwitchTabsOptions = {
  mode: Mode;
  /** 固定标签页头部 */
  fixed?: boolean;
  /** 是否在顶栏显示刷新按钮 */
  reloadable?: boolean;
} & Pick<UseSwitchTabsOptions, 'persistent'>;

export type Settings = LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  switchTabs?: SwitchTabsOptions;
};

const Settings: Settings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  // layout: 'mix',
  // splitMenus: true,
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',

  switchTabs: {
    mode: Mode.Route,
    fixed: true,
    reloadable: true,
    persistent: {
      force: true,
    },
  },
};

export default Settings;
