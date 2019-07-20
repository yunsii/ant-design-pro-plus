import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import {
  addDivider,
  renderActions,
  transferBoolArrayToStringArray,
  sortAndFilterActionsAsc,
} from './utils';

import StandardTable from '@/components/StandardTable';
import TableList from '@/components/TableList';
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

class Curd extends PureComponent {
  curd;

  state = {
    createVisible: false,
    detailVisible: false,
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

  initialActions = record => {
    const {
      interceptors = {},
      tableConfig: {
        detailTitle = '详情',
        updateTitle = '编辑',
        deleteTitle = '删除',
        showActionsCount = 3,
        extraActions = [],
        hideActions = [],
      },
      dispatch,
      namespace,
    } = this.props;
    const { handleDetailClick, handleDeleteClick, handleUpdateClick } = interceptors;
    const actions = [
      {
        key: 4,
        title: detailTitle,
        handleClick: () => {
          if (this.doFetchDetail()) {
            dispatch({
              type: `${namespace}/detail`,
              id: record.id,
            });
          }
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
    const sortedActions = sortAndFilterActionsAsc(actions, hideActions);
    return [sortedActions.slice(0, showActionsCount), sortedActions.slice(showActionsCount)];
  };

  setActions = record => {
    const {
      tableConfig: { confirmKeys = [] },
    } = this.props;
    const [actions, moreActions] = this.initialActions(record);
    return renderActions(record)(actions, moreActions, confirmKeys.length ? confirmKeys : [12]);
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
        render: (value, record) => addDivider(this.setActions(record)),
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

  doFetchDetail = () => {
    return 'detail' in this.props && 'detailLoading' in this.props;
  };

  setContainerModeAndRecord = () => {
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
      dataContainerType = 'table',
      renderItem = null,
      queryArgsConfig = [],
      data = {},
      detail = {},
      createButtonName = '新建',
      fetchLoading,
      createLoading,
      detailLoading,
      updateLoading,
      setFormItemsConfig,
      tableConfig: { columns, checkable },
      popupType = 'drawer',
      popupProps = {},
      queryPanelProps = {},
    } = this.props;
    const { selectedRows } = this.state;
    const [mode, record] = this.setContainerModeAndRecord();
    const { drawerConfig, modalConfig, ...restPopupProps } = popupProps;

    const mergePopupProps = {
      ...modalConfig,
      ...drawerConfig,
      title: this.getContainerTitle(),
      visible: this.getVisibleState().includes('1'),
      onCancel: this.setVisibleToFalse,
      onClose: this.setVisibleToFalse,
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
          {dataContainerType === 'list' ? (
            <TableList
              rowKey={item => item.id}
              renderItem={renderItem}
              selectedRows={selectedRows}
              loading={fetchLoading}
              data={data}
              setActions={this.setActions}
              onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
              checkable={checkable}
            />
          ) : (
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
          )}
        </div>
        {popupType === 'modal' ? (
          <DetailFormModal
            modalConfig={{
              ...mergePopupProps,
              onOk: this.handleOk,
            }}
            {...restPopupProps}
            loading={createLoading || detailLoading || updateLoading}
            setItemsConfig={form =>
              setFormItemsConfig(
                mode === 'detail' && this.doFetchDetail() ? detail : record,
                mode,
                form
              )
            }
          />
        ) : (
          <DetailFormDrawer
            drawerConfig={mergePopupProps}
            {...restPopupProps}
            loading={createLoading || detailLoading || updateLoading}
            onOk={this.handleOk}
            setItemsConfig={form =>
              setFormItemsConfig(
                mode === 'detail' && this.doFetchDetail() ? detail : record,
                mode,
                form
              )
            }
          />
        )}
      </Card>
    );
  }
}

export default Curd;
