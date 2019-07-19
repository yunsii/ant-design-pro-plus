import React from 'react';
import { DrawerProps } from 'antd/lib/drawer';

export interface DetailFormDrawerProps {
  drawerConfig: DrawerProps;
  onOk?: Function;
  itemsConfig: any[];
  itemsLayout?: {
    labelCol?: any;
    wrapperCol?: any;
  };
  loading?: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormDrawerProps, any> {}
