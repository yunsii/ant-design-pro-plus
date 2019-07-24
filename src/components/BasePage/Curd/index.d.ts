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
  /** popup title of create */
  createTitle?: string;
  /** popup title of detail */
  detailTitle?: string;
  /** popup title of update */
  updateTitle?: string;
  fetchLoading: boolean;
  createLoading: boolean;
  detailLoading?: boolean;
  updateLoading: boolean;
  deleteLoading?: boolean;
  createButtonName: string;
  dipatch: Function;
  popupType: 'modal' | 'drawer';
  popupProps: CustomDetailFormDrawerProps | CustomDetailFormModalProps;
  afterPopupNotVisible?: () => void;
  /** default value is 'table' */
  dataContainerType: 'table' | 'list';
  tableConfig: {
    columns: any[];
    checkable?: boolean;
    showActionsCount?: number;
    extraActions?: ActionType[];
    confirmKeys: (number | [number, (record?: any) => string])[];
    hideActions: number[];
    detailActionTitle: string;
    updateActionTitle: string;
    deleteActionTitle: string;
  };
  /** useful only if dataContainerType is 'list' */
  renderItem: ({ record, actions, recordSelection, checkable }) => React.ReactNode;
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  queryArgsConfig: ItemConfig[];
  queryPanelProps: QueryPanelProps;
  setFormItemsConfig: (
    detail: {},
    mode: 'create' | 'detail' | 'update',
    form: FormProps['form']
  ) => ItemConfig[];
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any, mode?: 'create' | 'update') => any;
    updateFieldsValueAsync?: (fieldsValue: any, mode?: 'create' | 'update') => any;
    handleCreateClick?: () => void;
    handleDetailClick?: (record: any) => void;
    handleUpdateClick?: (record: any) => void;
    handleDeleteClick?: (record: any) => void;
  };
  /** injected __curd__ instance of Curd */
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
