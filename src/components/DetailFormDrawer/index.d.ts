import React from 'react';
import { DrawerProps } from 'antd';

export interface DetailFormDrawerProps {
  drawerConfig: DrawerProps;
  itemsConfig: any[];
  loading: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormDrawerProps, any> {}
