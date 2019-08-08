import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, message, Button, Menu, Dropdown, Icon, Modal } from 'antd';
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
  state = {
    customModelVisible: false,
  };

  queryArgsConfig = [
    {
      type: 'string',
      field: 'username',
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
    const { customModelVisible } = this.state;
    return (
      <BaseCurd
        namespace={Namespace}
        queryArgsConfig={this.queryArgsConfig}
        setFormItemsConfig={setFormItemsConfig}
        containerProps={{
          columns: this.columns,
        }}
        actionsConfig={{
          extraActions: [
            {
              key: 13,
              title: '外务',
              handleClick: record => message.info(`调用 ${record.name} 的外务事件`),
            },
            {
              key: 14,
              title: '兼职',
              handleClick: record => message.info(`调用 ${record.name} 的兼职事件`),
            },
            {
              key: 15,
              title: '弹出子组件',
              handleClick: () => this.setState({ customModelVisible: true }),
            },
          ],
          confirmKeys: [
            [4, record => `确定查看 ${record.name} 的详情吗？`],
            [12, () => `确定删除吗？`],
            [13, record => `确定让 ${record.name} 出外务吗？`],
            14,
          ],
        }}
        popupType="drawer"
        popupProps={{
          drawerConfig: {
            width: 560,
          },
        }}
        queryPanelProps={{
          rowCount: 4,
          maxCount: 2,
        }}
        {...this.props}
        operators={[<TableActions />]}
      >
        <CustomModal
          title="弹出子组件"
          visible={customModelVisible}
          onCancel={() => this.setState({ customModelVisible: false })}
          okButtonProps={{ style: { display: 'none' } }}
        />
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

function CustomModal(props) {
  const { __curd__, ...rest } = props;
  if (!__curd__) return null;
  return (
    <Modal {...rest}>
      <Button
        onClick={() => {
          __curd__.reSearch();
          rest.onCancel();
        }}
      >
        重新搜索
      </Button>
    </Modal>
  );
}
