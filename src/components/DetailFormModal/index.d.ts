import React from 'react';
import { ModalProps } from 'antd/lib/modal';

export interface DetailFormModalProps {
  modalConfig: ModalProps;
  loading?: boolean;
  setItemsConfig: (form) => any[];
  itemsLayout?: {
    labelCol?: any;
    wrapperCol?: any;
  };
  itemsWrapperStyle?: StyleSheet;
  itemsWrapperClassName?: string;
  children?: JSX.Element;
  cols?: number;
}

export default class DetailFormModal extends React.Component<DetailFormModalProps, any> {}
