import * as React from 'react';
import { PaginationConfig, ColumnProps } from 'antd/lib/table';
import { FormProps } from 'antd/lib/form';
import { QueryPanelProps } from '@/components/QueryPanel';
import { ItemConfig } from '@/components/antd-form-pro';
import { DetailFormDrawerProps } from '@/components/DetailFormDrawer';
import { DetailFormModalProps } from '@/components/DetailFormModal';

export type ActionType = {
  key: number;
  title: string;
  handleClick: (record: any) => void;
};

export interface CustomDetailFormDrawerProps extends DetailFormDrawerProps {
  drawerConfig: {
    title?: never;
    visible?: never;
    onClose?: never;
  };
  onOk?: never;
  itemsConfig: never;
  loading?: never;
}

export interface CustomDetailFormModalProps extends DetailFormModalProps {
  modalConfig: {
    title?: never;
    visible?: never;
    onClose?: never;
    onOk?: never;
  };
  itemsConfig: never;
  loading?: never;
}

export declare type CurdProps = {
  namespace: string;
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  fetchLoading: boolean;
  createLoading: boolean;
  detailLoading?: boolean;
  updateLoading: boolean;
  deleteLoading?: boolean;
  dipatch: Function;
  queryArgsConfig: ItemConfig[];
  createButtonName: string;
  tableConfig: {
    columns: any[];
    checkable?: boolean;
    showActionsCount?: number;
    extraActions?: ActionType[];
    confirmKeys: number[];
    hideActions: number[];
  };
  setFormItemsConfig: (
    detail: {},
    mode: 'create' | 'detail' | 'update',
    form: FormProps['form']
  ) => ItemConfig[];
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any) => any;
    handleDetailClick?: (record: any) => any;
    handleUpdateClick?: (record: any) => any;
    handleDeleteClick?: (record: any) => any;
  };
  afterPopupNotVisible?: () => void;
  createTitle?: string;
  detailTitle?: string;
  updateTitle?: string;
  popupType: 'modal' | 'drawer';
  popupProps: CustomDetailFormDrawerProps | CustomDetailFormModalProps;
  queryPanelProps: QueryPanelProps;
};
interface CurdState {
  createVisible: boolean;
  updateVisible: boolean;
  selectedRows: any[];
  formValues: {};
  record: {};
}

declare class Curd extends React.Component<CurdProps, CurdState> {
  componentDidMount(): void;
  componentDidUpdate(prevProps: CurdProps): void;
  componentWillUnmount(): void;
  saveButtonRef: (node: HTMLElement | null) => void;
  fixTwoCNChar(): void;
  render(): JSX.Element;
}
export default Curd;
