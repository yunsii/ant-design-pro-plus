/* eslint-disable import/no-extraneous-dependencies */
import * as H from 'history';
import { MenuDataItem } from '@ant-design/pro-layout';

import { PageTab, PageTabsProps } from '.';

export type RouteTabsMode = 'route' | 'args';

export interface UmiChildren extends JSX.Element {
  props: {
    location: BeautifulLocation;
  };
}

export interface RouteTab extends PageTab {
  /** used to extends tab's properties */
  extraTabProperties: { location: BeautifulLocation };
}

export interface UseTabsOptions {
  mode?: RouteTabsMode;
  children?: UmiChildren;
  originalMenuData: MenuDataItem[];

  /**
   *
   *
   * @param path 标签页路由
   * @param locale 国际化后的标题
   * @param params 根据路由解析得到的参数
   * @param location
   */
  setTabTitle?: (
    path: string,
    locale: string,
    params: any,
    location: H.Location,
  ) => React.ReactNode;
}

export interface BeautifulLocation<Q = {}, S = H.LocationState> extends H.Location<S> {
  query: Q;
}

export interface RouteTabsProps extends PageTabsProps {}