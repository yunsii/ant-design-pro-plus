import { PaginationConfig } from 'antd/lib/table';
import * as React from 'react';

export type ActionType = {
  title: string;
  handleClick: (record: any) => void;
};

export declare type CurdProps = {
  namespace: string;
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading?: boolean;
  dipatch: Function;
  queryArgsConfig: any[];
  tableConfig: {
    columns: any[];
    checkable?: boolean;
    showActionsCount?: number;
    extraActions?: ActionType[];
    confirmKeys: number[];
  };
  setFormItemsConfig: (detail: {}, mode: string) => any[];
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any) => any;
    handleDetailClick?: (record: any) => any;
    handleDeleteClick?: (record: any) => any;
  };
  afterDrawerNotVisible?: () => void;
  createTitle?: string;
  updateTitle?: string;
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
