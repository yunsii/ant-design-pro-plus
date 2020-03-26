import * as H from 'history';
import { RouteComponentProps } from 'react-router';

import { MenuTab } from '@/components/PageTabs/components/MenuTabs';

export interface UmiChildren extends JSX.Element {
  props: {
    location: BeautifulLocation;
  };
}

export interface PageTab<T> extends MenuTab {
  /** used to extends tab's properties */
  extraTabProperties: T;
}

export interface PageTabsProps extends RouteComponentProps<any> {
  location: BeautifulLocation;
  proRootPath?: string;
  pageTabs?: 'route' | 'path';
  fixedPageTabs?: boolean;
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

declare interface BeautifulLocation<Q = {}, S = H.LocationState> extends H.Location<S> {
  query: Q;
}
