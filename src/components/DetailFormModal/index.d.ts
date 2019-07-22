import React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { FormProps } from 'antd/lib/form';
import { ItemConfig } from '@/components/antd-form-pro';

export interface DetailFormModalProps {
  modalConfig: ModalProps;
  loading?: boolean;
  setItemsConfig: (form: FormProps['form']) => ItemConfig[];
  itemsLayout?: {
    labelCol?: any;
    wrapperCol?: any;
  };
  itemsWrapperStyle?: StyleSheet;
  itemsWrapperClassName?: string;
  mode?: 'detail' | 'create' | 'update';
  children?: JSX.Element;
  cols?: number;
}

export default class DetailFormModal extends React.Component<DetailFormModalProps, any> {}
