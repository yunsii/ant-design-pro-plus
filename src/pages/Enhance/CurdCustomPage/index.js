import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, message, Button, Menu, Dropdown, Icon } from 'antd';
import renderCard from './CustomCard';
import BaseCurd from '@/components/BasePage/Curd';
import { Namespace } from '../models/curdPage.ts';
import setFormItemsConfig from './map';
import styles from './index.less';

@connect(({ [Namespace]: namespace, loading }) => ({
  data: namespace.data,
  detail: namespace.detail,
  fetchLoading: loading.effects[`${Namespace}/fetch`],
  detailLoading: loading.effects[`${Namespace}/detail`],
  createLoading: loading.effects[`${Namespace}/create`],
  updateLoading: loading.effects[`${Namespace}/update`],
  deleteLoading: loading.effects[`${Namespace}/delete`],
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
        containerType="list"
        renderItem={renderCard}
        namespace={Namespace}
        queryArgsConfig={this.queryArgsConfig}
        setFormItemsConfig={setFormItemsConfig}
        actionsConfig={{
          extraActions: [
            {
              key: 14,
              title: '兼职',
              handleClick: record => message.info(`调用 ${record.name} 的兼职事件`),
            },
          ],
          // checkable: false,
        }}
        popupType="drawer"
        popupProps={{
          drawerConfig: {
            width: 600,
          },
        }}
        queryPanelProps={{
          rowCount: 4,
          maxCount: 2,
        }}
        {...this.props}
        operators={[<TableActions />]}
      />
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
