import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, message, Button, Menu, Dropdown, Icon } from 'antd';

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
    {
      type: 'string',
      field: 'habit',
      formItemProps: {
        label: '爱好',
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
        popupType="modal"
        popupProps={{
          modalConfig: {
            width: 900,
          },
          cols: 3,
        }}
        queryPanelProps={{
          rowCount: 4,
          maxCount: 2,
        }}
        {...this.props}
      >
        <TableActions />
      </BaseCurd>
    );
  }
}

export default TableList;

function TableActions(props) {
  const { __curd__ } = props;
  if (!__curd__) return null;
  const {
    state: { selectedRows },
  } = __curd__;
  const menu = (
    <Menu>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );
  return (
    selectedRows.length > 0 && (
      <span>
        <Button>批量操作</Button>
        <Dropdown overlay={menu}>
          <Button>
            更多操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </span>
    )
  );
}
