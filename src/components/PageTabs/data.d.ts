import * as H from 'history';
import { RouteComponentProps } from 'react-router';

import { MenuTab } from '@/components/PageTabs/components/MenuTabs';

export interface UmiChildren extends JSX.Element {
  props: {
    location: H.Location;
  };
}

export interface PageTab<T> extends MenuTab {
  /** used to extends tab's properties */
  extraTabProperties: T;
}

export interface PageTabsProps extends RouteComponentProps<any> {
  proRootPath?: string;
  pageTabs?: 'route' | 'path';
  fixedPageTabs?: boolean;
  children?: UmiChildren;
  originalMenuData: MenuDataItem[];
}
