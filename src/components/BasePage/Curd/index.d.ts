import * as React from 'react';
import { PaginationConfig, ColumnProps, TableProps } from 'antd/lib/table';
import { FormProps } from 'antd/lib/form';
import { ListProps } from 'antd/lib/list';
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
  checkable?: boolean;
  detail?: any;
  dipatch: Function;
  queryArgsConfig: ItemConfig[];
  queryPanelProps: QueryPanelProps;
  /** default value is 'table' */
  containerType: 'table' | 'list';
  containerProps?: TableProps<any> | ListProps<any>;
  /** injected __curd__ instance of Curd */
  operators?: React.ReactNode[];
  /** useful only if containerType is 'list' */
  renderItem: ({ record, actions, recordSelection, checkable }) => React.ReactNode;
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  actionsConfig: {
    showActionsCount?: number;
    extraActions?: ActionType[];
    confirmKeys: (number | [number, (record?: any) => string])[];
    hideActions: number[];
    detailActionTitle: string;
    updateActionTitle: string;
    deleteActionTitle: string;
  };
  popupType: 'modal' | 'drawer' | null;
  popupProps: CustomDetailFormDrawerProps | CustomDetailFormModalProps;
  setFormItemsConfig: (
    detail: {},
    mode: 'create' | 'detail' | 'update',
    form: FormProps['form']
  ) => ItemConfig[];
  afterPopupNotVisible?: () => void;
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any, mode?: 'create' | 'update') => any;
    updateFieldsValueAsync?: (fieldsValue: any, mode?: 'create' | 'update') => any;
    handleCreateClick?: () => void;
    handleDetailClick?: (record: any) => void;
    handleUpdateClick?: (record: any) => void;
    handleDeleteClick?: (record: any) => void;
  };
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
