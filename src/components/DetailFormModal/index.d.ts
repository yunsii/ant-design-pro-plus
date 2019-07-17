import React from 'react';
import { ModalProps } from 'antd';

export interface DetailFormModalProps {
  drawerConfig: ModalProps;
  itemsConfig: any[];
  loading: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormModalProps, any> {}
