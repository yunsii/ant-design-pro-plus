import React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { FormProps } from 'antd/lib/form';
import { ItemConfig } from 'antd-form-mate';

export interface DetailFormModalProps {
  modalConfig: ModalProps;
  loading?: boolean;
  setItemsConfig: (detail: any, mode: string, form: FormProps['form']) => ItemConfig[];
  detail?: any;
  mode?: string;
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
