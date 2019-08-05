import React from 'react';
import { DrawerProps } from 'antd/lib/drawer';
import { FormProps } from 'antd/lib/form';
import { ItemConfig } from 'antd-form-mate';

export interface DetailFormDrawerProps {
  drawerConfig: DrawerProps;
  onOk?: Function;
  setItemsConfig: (detail: any, mode: string, form: FormProps['form']) => ItemConfig[];
  detail?: any;
  mode?: string;
  itemsLayout?: {
    labelCol?: any;
    wrapperCol?: any;
  };
  loading?: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormDrawerProps, any> {}
