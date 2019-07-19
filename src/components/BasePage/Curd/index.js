import React, { PureComponent } from 'react';
import { Card, Form, Button } from 'antd';
import {
  renderActions,
  transferBoolArrayToStringArray,
  sortAndFilterActionsAsc,
} from './utils.tsx';

import StandardTable from '@/components/StandardTable';
import QueryPanel from '@/components/QueryPanel';
import DetailFormDrawer from '@/components/DetailFormDrawer';
import DetailFormModal from '@/components/DetailFormModal';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
// import { updateActionName, deleteActionName } from '@/contant';
import styles from '@/utils/table.less';

// const CreateVisible = '100';
const DetailVisible = '010';
const UpdateVisible = '001';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@Form.create()
class Curd extends PureComponent {
  curd;

  state = {
    createVisible: false,
    updateVisible: false,
    selectedRows: [],
    formValues: {},
    record: {},
  };

  componentDidMount() {
    this.curd = this;
    const { namespace, dispatch } = this.props;
    dispatch({
      type: `${namespace}/fetch`,
    });
  }

  setActions = (value, record) => {
    const {
      interceptors = {},
      tableConfig: {
        detailTitle = '详情',
        updateTitle = '编辑',
        deleteTitle = '删除',
        showActionsCount = 3,
        confirmKeys = [],
        extraActions = [],
        hideActions = [],
      },
    } = this.props;
    const { handleDetailClick, handleDeleteClick, handleUpdateClick } = interceptors;
    const actions = [
      {
        key: 4,
        title: detailTitle,
        handleClick: () => {
          if (handleDetailClick) {
            handleDetailClick(record);
            return;
          }
          this.handleVisible('detail', true, record);
        },
      },
      {
        key: 8,
        title: updateTitle,
        handleClick: () => {
          if (handleUpdateClick) {
            handleUpdateClick(record);
            return;
          }
          this.handleVisible('update', true, record);
        },
      },
      {
        key: 12,
        title: deleteTitle,
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
    const orderedActions = sortAndFilterActionsAsc(actions, hideActions);
    return renderActions(record)(
      orderedActions,
      showActionsCount,
      confirmKeys.length ? confirmKeys : [12]
    );
  };

  handleVisible = (action, visible, record) => {
    const { afterPopupNotVisible } = this.props;
    const actionVisible = `${action}Visible`;
    this.setState({
      [actionVisible]: !!visible,
    });
    if (visible) {
      this.setState({ record: record || {} });
    } else {
      callFunctionIfFunction(afterPopupNotVisible)();
    }
  };

  setVisibleToFalse = () => {
    const { afterPopupNotVisible } = this.props;
    this.setState({
      createVisible: false,
      detailVisible: false,
      updateVisible: false,
    });
    callFunctionIfFunction(afterPopupNotVisible)();
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
          this.handleVisible('create', false);
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
          this.handleVisible('update', false);
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

  getVisibleState = () => {
    const { createVisible, detailVisible, updateVisible } = this.state;
    return transferBoolArrayToStringArray([createVisible, detailVisible, updateVisible]);
  };

  getContainerTitle = () => {
    const {
      createTitle = '新建对象',
      detailTitle = '对象详情',
      updateTitle = '编辑对象',
    } = this.props;
    if (this.getVisibleState() === DetailVisible) {
      return detailTitle;
    }
    if (this.getVisibleState() === UpdateVisible) {
      return updateTitle;
    }
    return createTitle;
  };

  handleOk = fieldsValue => {
    if (this.getVisibleState() === DetailVisible) {
      this.handleVisible('detail', false);
    }
    if (this.getVisibleState() === UpdateVisible) {
      return this.handleUpdateOk(fieldsValue);
    }
    return this.handleCreateOk(fieldsValue);
  };

  setContainerModeAndDetail = () => {
    const { record } = this.state;
    if (this.getVisibleState() === DetailVisible) {
      return ['detail', record];
    }
    if (this.getVisibleState() === UpdateVisible) {
      return ['update', record];
    }
    return ['create', {}];
  };

  renderChildren() {
    const { children } = this.props;
    return React.Children.map(children, child => {
      if (child) {
        const { type: childType } = child;
        if (childType.preventCurd || typeof childType === 'string') {
          return child;
        }
        return React.cloneElement(child, {
          __curd__: this.curd,
        });
      }
      return child;
    });
  }

  render() {
    const {
      queryArgsConfig = [],
      data = {},
      createButtonName = '新建',
      fetchLoading,
      createLoading,
      detailLoading,
      updateLoading,
      setFormItemsConfig,
      form,
      tableConfig: { columns, checkable },
      containerConfig = {},
      queryPanelProps = {},
    } = this.props;
    const { selectedRows } = this.state;
    const { type, ...restContainerConfig } = containerConfig;
    const [mode, detail] = this.setContainerModeAndDetail();

    const mergeContainerConfig = {
      type: type || 'modal',
      containerConfig: {
        ...restContainerConfig,
        title: this.getContainerTitle(),
        visible: this.getVisibleState().includes('1'),
        loading: createLoading || detailLoading || updateLoading,
        onClose: this.setVisibleToFalse,
        onOk: this.handleOk,
      },
    };

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <QueryPanel
            {...queryPanelProps}
            queryArgsConfig={queryArgsConfig}
            onSearch={this.handleSearch}
          />
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleVisible('create', true)}>
              {createButtonName}
            </Button>
            {this.renderChildren()}
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
        {mergeContainerConfig.type === 'modal' ? (
          <DetailFormModal
            modalConfig={{
              ...mergeContainerConfig.containerConfig,
              onCancel: mergeContainerConfig.containerConfig.onClose,
            }}
            itemsConfig={setFormItemsConfig(detail, mode, form)}
            cols={2}
          />
        ) : (
          <DetailFormDrawer
            drawerConfig={{
              ...mergeContainerConfig.containerConfig,
            }}
            itemsConfig={setFormItemsConfig(detail, mode, form)}
          />
        )}
      </Card>
    );
  }
}

export default Curd;
