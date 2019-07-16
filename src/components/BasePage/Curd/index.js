import React, { PureComponent } from 'react';
import { Card, Form, Icon, Button, Dropdown, Menu, Divider, Popconfirm } from 'antd';
import _flatten from 'lodash/flatten';

import StandardTable from '@/components/StandardTable';
import QueryPanel from '@/components/QueryPanel';
import DetailFormDrawer from '@/components/DetailFormDrawer';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
// import { updateActionName, deleteActionName } from '@/contant';
import styles from '@/utils/table.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

function sortActionsAsc(actions) {
  return [...actions].sort((x, y) => {
    if (x.key > y.key) return 1;
    if (x.key < y.key) return -1;
    return 0;
  });
}

function addDivider(actions) {
  return _flatten(
    actions.map((item, index) => {
      if (index + 1 < actions.length) {
        return [item, <Divider type="vertical" />];
      }
      return [item];
    })
  );
}

const generateShowActions = record => (actions, confirmKeys = []) => {
  return [
    ...actions.map(item => {
      if (confirmKeys.includes(item.key)) {
        return (
          <Popconfirm title={`确定${item.title}吗？`} onConfirm={() => item.handleClick(record)}>
            <a>{item.title}</a>
          </Popconfirm>
        );
      }
      return <a onClick={() => item.handleClick(record)}>{item.title}</a>;
    }),
  ];
};

const renderActions = record => (sortedActions, showActionsCount, confirmKeys) => {
  if (sortedActions.length <= showActionsCount) {
    return addDivider(generateShowActions(record)(sortedActions, confirmKeys));
  }

  const showActions = sortedActions.slice(0, showActionsCount);
  const moreAction = sortedActions.slice(showActionsCount);
  return addDivider([
    ...generateShowActions(record)(showActions, confirmKeys),
    <Dropdown
      overlay={
        <Menu>
          {moreAction.map(item => (
            <Menu.Item key={item.title} onClick={() => item.handleClick(record)}>
              <a>{item.title}</a>
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <a>
        更多 <Icon type="down" />
      </a>
    </Dropdown>,
  ]);
};

@Form.create()
class Curd extends PureComponent {
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

  setActions = (value, record) => {
    const {
      interceptors = {},
      tableConfig: { showActionsCount = 2, confirmKeys = [], extraActions = [] },
    } = this.props;
    const { handleDetailClick, handleDeleteClick } = interceptors;
    const actions = [
      {
        key: 4,
        title: '详情',
        handleClick: () => {
          if (handleDetailClick) {
            handleDetailClick(record);
            return;
          }
          this.handleUpdateVisible(true, record);
        },
      },
      {
        key: 8,
        title: '删除',
        handleClick: () => {
          if (handleDeleteClick) {
            handleDeleteClick(record);
            return;
          }
          this.deleteModel(record.id);
        },
      },
      ...extraActions,
    ];
    const orderedActions = sortActionsAsc(actions);
    return renderActions(record)(orderedActions, showActionsCount, [8, ...confirmKeys]);
  };

  handleCreateVisible = visible => {
    const { afterDrawerNotVisible } = this.props;
    this.setState({
      createVisible: !!visible,
    });
    if (!visible) {
      callFunctionIfFunction(afterDrawerNotVisible)();
    }
  };

  handleUpdateVisible = (visible, record) => {
    const { afterDrawerNotVisible } = this.props;
    this.setState({
      updateVisible: !!visible,
    });
    if (visible) {
      this.setState({ record });
    } else {
      this.setState({ record: {} });
      callFunctionIfFunction(afterDrawerNotVisible)();
    }
  };

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
    const { namespace, dispatch, interceptors = {} } = this.props;
    const { updateFieldsValue } = interceptors;
    dispatch({
      type: `${namespace}/create`,
      payload: updateFieldsValue ? updateFieldsValue(fieldsValue) : fieldsValue,
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
    const { namespace, dispatch, interceptors = {} } = this.props;
    const { updateFieldsValue } = interceptors;
    dispatch({
      type: `${namespace}/update`,
      id,
      payload: updateFieldsValue ? updateFieldsValue(fieldsValue) : fieldsValue,
      callback: response => {
        if (!response) {
          this.handleUpdateVisible(false);
        }
      },
    });
  };

  enhanceColumns = columns => {
    if (!columns) return [];
    return [
      ...columns,
      {
        title: '操作',
        render: this.setActions,
      },
    ];
  };

  render() {
    const {
      queryArgsConfig = [],
      data = {},
      fetchLoading,
      createLoading,
      updateLoading,
      setFormItemsConfig,
      form,
      createTitle = '新建对象',
      updateTitle = '对象详情',
      tableConfig: { columns, checkable },
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
            columns={this.enhanceColumns(columns)}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
            checkable={checkable}
          />
        </div>
        <DetailFormDrawer
          title={createVisible ? createTitle : updateTitle}
          visible={createVisible || updateVisible}
          loading={createLoading || updateLoading}
          handleVisible={
            createVisible
              ? () => this.handleCreateVisible(false)
              : () => this.handleUpdateVisible(false)
          }
          handleOk={createVisible ? this.handleCreateOk : this.handleUpdateOk}
          itemsConfig={setFormItemsConfig(
            createVisible ? {} : record,
            createVisible ? 'create' : 'update',
            form
          )}
        />
      </Card>
    );
  }
}

export default Curd;
