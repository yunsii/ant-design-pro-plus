/* eslint-disable import/no-extraneous-dependencies */
import * as H from 'history';
import { MenuDataItem } from '@ant-design/pro-layout';
import { TabsProps } from 'antd/lib/tabs';

export type RouteTabsMode = 'route' | 'args';

export interface UmiChildren extends JSX.Element {
  props: {
    location: BeautifulLocation;
  };
}

export interface RouteTab {
  /** tab's title */
  tab: React.ReactNode;
  key: string;
  content: UmiChildren;
  closable?: boolean;
  /** used to extends tab's properties */
  extraTabProperties: { location: BeautifulLocation };
}

export interface RouteTabsProps
  extends UseTabsOptions,
    Omit<TabsProps, 'hideAdd' | 'activeKey' | 'onEdit' | 'onChange'> {
  fixed?: boolean;
}

export interface CustomMenuDataItem extends MenuDataItem {
  /** 配置该路由是否紧跟指定的某个路由 */
  followPath?: string;
}

export interface SetTabTitlePayload {
  path: string;
  locale: string;
  params: any;
  location: H.Location;
}

export interface UseTabsOptions {
  mode?: RouteTabsMode;
  children?: UmiChildren;
  originalMenuData: CustomMenuDataItem[];

  /**
   *
   *
   * @param path 标签页路由
   * @param locale 国际化后的标题
   * @param params 根据路由解析得到的参数
   * @param location
   */
  setTabTitle?: (payload: SetTabTitlePayload) => React.ReactNode | void;
}

export interface BeautifulLocation<Q = {}, S = H.LocationState> extends H.Location<S> {
  query: Q;
}
