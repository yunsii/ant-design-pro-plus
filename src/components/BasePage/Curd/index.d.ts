import * as React from 'react';
import { PaginationConfig, ColumnProps } from 'antd/lib/table';
import { FormProps } from 'antd/lib/form';
import { ActionType } from './ActionType';
import { QueryPanelProps } from '@/components/QueryPanel';
import { ItemConfig } from '@/components/antd-form-pro';
import { CustomDetailFormDrawerProps } from './CustomDetailFormDrawerProps';
import { CustomDetailFormModalProps } from './CustomDetailFormModalProps';

export declare type CurdProps = {
  namespace: string;
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  dataContainerType: 'table' | 'list';
  renderItem: ({ record, actions, recordSelection, checkable }) => React.ReactNode;
  fetchLoading: boolean;
  createLoading: boolean;
  detailLoading?: boolean;
  updateLoading: boolean;
  deleteLoading?: boolean;
  dipatch: Function;
  queryArgsConfig: ItemConfig[];
  queryPanelProps: QueryPanelProps;
  createButtonName: string;
  tableConfig: {
    columns: any[];
    checkable?: boolean;
    showActionsCount?: number;
    extraActions?: ActionType[];
    confirmKeys: (number | [number, (record?: any) => string])[];
    hideActions: number[];
  };
  setFormItemsConfig: (
    detail: {},
    mode: 'create' | 'detail' | 'update',
    form: FormProps['form']
  ) => ItemConfig[];
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any) => any;
    updateFieldsValueAsync?: (fieldsValue: any) => any;
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
  children?: React.ReactChildren;
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
