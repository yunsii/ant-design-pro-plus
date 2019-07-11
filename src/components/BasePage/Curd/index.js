import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Icon, Button, Dropdown, Menu, Divider, Popconfirm } from 'antd';

import StandardTable from '@/components/StandardTable';
import QueryPanel from '@/components/QueryPanel';
import DetailFormDrawer from '@/components/DetailFormDrawer';
// import { updateActionName, deleteActionName } from '@/contant';
import styles from '@/utils/table.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@Form.create()
class TableList extends PureComponent {
  state = {
    createVisible: false,
    updateVisible: false,
    selectedRows: [],
    formValues: {},
    record: {},
  };

  componentDidMount() {
    const { namespace, dispatch } = this.props;
    dispatch({
      type: `${namespace}/fetch`,
    });
  }

  handleCreateVisible = visible => {
    this.setState({
      createVisible: !!visible,
    });
  };

  handleUpdateVisible = (visible, record) => {
    this.setState({
      updateVisible: !!visible,
    });
    if (record) {
      this.setState({ record });
    }
  };

  // handleMoreClick = (key, record) => {
  //   switch (key) {
  //     case deleteActionName: {
  //       Modal.confirm({
  //         title: '删除广告位',
  //         content: (
  //           <p>
  //             确定删除编号为 <span style={{ color: 'red' }}>{record.code}</span> 的广告位吗？
  //           </p>
  //         ),
  //         okText: '确定',
  //         cancelText: '取消',
  //         onOk: () => this.deleteModel(record.id),
  //         maskClosable: true,
  //       });
  //       return;
  //     }
  //     default:
  //       message.error('非法操作')
  //   }
  // };

  deleteModel = id => {
    const { namespace, dispatch } = this.props;
    dispatch({
      type: `${namespace}/delete`,
      id,
      callback: response => {
        if (!response) {
          const { formValues } = this.state;
          this.handleSearch(formValues);
        }
      },
    });
  };

  // handleRoleVisible = (visible, record) => {
  //   this.setState({
  //     roleVisible: !!visible,
  //     record: record || {},
  //   });
  // };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { namespace, dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      page: pagination.current,
      limit: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: `${namespace}/fetch`,
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleMenuClick = event => {
    const { namespace, dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (event.key) {
      case 'remove':
        dispatch({
          type: `${namespace}/remove`,
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = values => {
    const { namespace, dispatch } = this.props;
    this.setState({
      formValues: values,
    });
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        ...values,
        org_ids: values.org_ids && values.org_ids.map(item => item.value),
      },
    });
  };

  handleCreateOk = fieldsValue => {
    console.log('handleCreateOk', fieldsValue);
    const { namespace, dispatch } = this.props;
    dispatch({
      type: `${namespace}/create`,
      payload: fieldsValue,
      callback: response => {
        if (!response) {
          const { formValues } = this.state;
          this.handleCreateVisible(false);
          this.handleSearch(formValues);
        }
      },
    });
  };

  handleUpdateOk = fieldsValue => {
    console.log('handleUpdateOk', fieldsValue);
    const {
      record: { id },
    } = this.state;
    const { namespace, dispatch } = this.props;
    dispatch({
      type: `${namespace}/update`,
      id,
      payload: fieldsValue,
      callback: response => {
        if (!response) {
          this.handleUpdateVisible(false);
        }
      },
    });
  };

  enHandceColumns = columns => [
    ...columns,
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {/* <a onClick={() => this.handleUpdateVisible(true, record)}>详情</a> */}
          <a
            onClick={() => {
              this.handleUpdateVisible(true, record);
            }}
          >
            详情
          </a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteModel(record.id)}>
            <a>删除</a>
          </Popconfirm>
          {/* <Dropdown
            overlay={
              <Menu onClick={({ key }) => this.handleMoreClick(key, record)}>
                <Menu.Item key={deleteActionName}>
                  <a>删除</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a>
              更多 <Icon type="down" />
            </a>
          </Dropdown> */}
        </Fragment>
      ),
    },
  ];

  render() {
    const {
      queryArgsConfig,
      columns,
      data,
      fetchLoading,
      createLoading,
      updateLoading,
      setFormItemsConfig,
    } = this.props;

    const { selectedRows, createVisible, updateVisible, record } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <QueryPanel queryArgsConfig={queryArgsConfig} onSearch={this.handleSearch} />
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleCreateVisible(true)}>
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
            rowKey={row => row.id}
            selectedRows={selectedRows}
            loading={fetchLoading}
            data={data}
            columns={this.enHandceColumns(columns)}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <DetailFormDrawer
          title="新建对象"
          visible={createVisible}
          loading={createLoading}
          handleVisible={this.handleCreateVisible}
          handleOk={this.handleCreateOk}
          itemsConfig={setFormItemsConfig()}
        />
        <DetailFormDrawer
          title="对象详情"
          visible={updateVisible}
          loading={updateLoading}
          handleVisible={this.handleUpdateVisible}
          handleOk={this.handleUpdateOk}
          itemsConfig={setFormItemsConfig(record, 'update')}
        />
      </Card>
    );
  }
}

export default TableList;
