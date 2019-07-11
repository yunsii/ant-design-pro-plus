import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';

import BaseCurd from '@/components/BasePage/Curd';
import setFormItemsConfig from './map';

@connect(({ curdPage, loading }) => ({
  data: curdPage.data,
  fetchLoading: loading.effects['curdPage/fetch'],
  createLoading: loading.effects['curdPage/create'],
  updateLoading: loading.effects['curdPage/update'],
  deleteLoading: loading.effects['curdPage/delete'],
}))
class TableList extends PureComponent {
  queryArgsConfig = [
    {
      type: 'string',
      field: 'organ_id',
      formItemProps: {
        label: '所属机构',
      },
    },
    {
      type: 'string',
      field: 'name',
      formItemProps: {
        label: '位置名称',
      },
    },
    {
      type: 'string',
      field: 'code',
      formItemProps: {
        label: '位置编码',
      },
    },
  ];

  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      render: value => <Avatar src={value} />,
    },
    {
      title: '通知',
      dataIndex: 'title',
    },
    {
      title: '时间',
      dataIndex: 'datetime',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
  ];

  render() {
    return (
      <BaseCurd
        namespace="curdPage"
        queryArgsConfig={this.queryArgsConfig}
        columns={this.columns}
        setFormItemsConfig={setFormItemsConfig}
        {...this.props}
      />
    );
  }
}

export default TableList;
