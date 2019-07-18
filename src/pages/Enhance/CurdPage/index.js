import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, message } from 'antd';

import BaseCurd from '@/components/BasePage/Curd';
import setFormItemsConfig from './map';
import styles from './index.less';

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
      field: 'name',
      formItemProps: {
        label: '姓名',
      },
    },
    {
      type: 'string',
      field: 'nickname',
      formItemProps: {
        label: '昵称',
      },
    },
  ];

  columns = [
    {
      title: '公式照',
      dataIndex: 'avatar',
      render: value => (
        <div className={styles.avatarWrapper}>
          <Avatar src={value} size="large" />
        </div>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      render: (value, record) => (
        <a href={record.profile} target="_blank" rel="noreferrer noopener">
          {value}
        </a>
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
    },
    {
      title: '特长',
      dataIndex: 'speciality',
    },
    {
      title: '爱好',
      dataIndex: 'habit',
    },
  ];

  render() {
    return (
      <BaseCurd
        namespace="curdPage"
        queryArgsConfig={this.queryArgsConfig}
        setFormItemsConfig={setFormItemsConfig}
        tableConfig={{
          columns: this.columns,
          extraActions: [
            {
              key: 14,
              title: '兼职',
              handleClick: record => message.info(`调用 ${record.name} 的兼职事件`),
            },
          ],
        }}
        containerConfig={{ type: 'drawer' }}
        {...this.props}
      />
    );
  }
}

export default TableList;
