import React from 'react';
import { DrawerProps } from 'antd/lib/drawer';

export interface DetailFormDrawerProps {
  drawerConfig: DrawerProps;
  onOk?: Function;
  itemsConfig: any[];
  loading?: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormDrawerProps, any> {}
