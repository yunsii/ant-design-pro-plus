import React from 'react';
import { ModalProps } from 'antd/lib/modal';

export interface DetailFormModalProps {
  drawerConfig: ModalProps;
  itemsConfig: any[];
  loading?: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormModalProps, any> {}
