import React from 'react';
// import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table';

export interface DetailFormDrawerProps {
  // columns: any;
  // onSelectRow: (row: any) => void;
  // data: any;
  // rowKey?: string;
  // selectedRows: any[];
  // onChange?: (
  //   pagination: PaginationConfig,
  //   filters: Record<keyof any, string[]>,
  //   sorter: SorterResult<any>,
  //   extra?: TableCurrentDataSource<any>
  // ) => void;
  // loading?: boolean;
  visible: boolean;
  title: string;
  centered?: boolean;
  width?: number;
  itemsConfig: any[];
  handleOk: (fieldsValue: any) => void;
  handleVisible: () => void;
  loading: boolean;
}

export default class DetailFormDrawer extends React.Component<DetailFormDrawerProps, any> {}
