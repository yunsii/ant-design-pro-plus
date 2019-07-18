import React from 'react';
import { ModalProps } from 'antd/lib/modal';

export interface DetailFormModalProps {
  modalConfig: ModalProps;
  itemsConfig: any[];
  loading?: boolean;
  itemsWrapperStyle?: StyleSheet;
  itemsWrapperClassName?: string;
  children?: JSX.Element;
  cols?: number;
}

export default class DetailFormModal extends React.Component<DetailFormModalProps, any> {}
