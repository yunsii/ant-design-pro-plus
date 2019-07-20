import React from 'react';
import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table';

export interface TableListProps {
  actions: any;
  onSelectRow: (recordArray: any[]) => void;
  data: any;
  rowKey?: string;
  checkable?: boolean;
  selectedRows: any[];
  renderItem: ({ record, actions, recordSelection }) => React.ReactNode;
  setActions: (record) => React.ReactNode[];
  // onChange?: (
  //   pagination: PaginationConfig,
  //   filters: Record<keyof any, string[]>,
  //   sorter: SorterResult<any>,
  //   extra?: TableCurrentDataSource<any>
  // ) => void;
  loading?: boolean;
}

interface TableListState {
  selectedRowKeys: number[] | string[];
}

export default class TableList extends React.Component<TableListProps, TableListState> {}
