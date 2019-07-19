import * as React from 'react';
import { RowProps } from 'antd/lib/row';
import { ColProps } from 'antd/lib/col';

export declare type QueryPanelProps = {
  queryArgsConfig: any[];
  onSearch: (fieldsValue: any) => void;
  rowCount: 1 | 2 | 4 | 6 | 12 | 24;
  maxCount: number;
  rowProps: RowProps;
  colProps: ColProps;
};
interface QueryPanelState {
  expandForm: boolean;
}

declare class QueryPanel extends React.Component<QueryPanelProps, QueryPanelState> {}
export default QueryPanel;
