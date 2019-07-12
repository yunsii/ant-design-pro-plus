import { PaginationConfig } from 'antd/lib/table';
import * as React from 'react';

export declare type CurdProps = {
  namespace: string;
  queryArgsConfig: any[];
  columns: any[];
  data: {
    list: any[];
    pagination?: PaginationConfig;
  };
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  setFormItemsConfig: (detail: {}, mode: string) => any[];
  dipatch: Function;
  interceptors?: {
    updateFieldsValue?: (fieldsValue: any) => any;
    handleDetailClick?: (record: any) => any;
    handleDeleteClick?: (record: any) => any;
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
