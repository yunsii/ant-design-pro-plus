import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import {
  addDivider,
  renderActions,
  transferBoolArrayToString,
  sortAndFilterActionsAsc,
} from './utils';

import StandardTable from '@/components/StandardTable';
import TableList from '@/components/TableList';
import QueryPanel from '@/components/QueryPanel';
import DetailFormDrawer from '@/components/DetailFormDrawer';
import DetailFormModal from '@/components/DetailFormModal';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
import renderChildren from '@/utils/childrenUtils';
// import { updateActionName, deleteActionName } from '@/contant';
import styles from '@/utils/table.less';

const CreateName = 'create';
const DetailName = 'detail';
const UpdateName = 'update';

// const CreateVisible = '100';
const DetailVisible = '010';
const UpdateVisible = '001';

async function updateFieldsValueByInterceptors(fieldsValue, interceptors, mode) {
  const { updateFieldsValue, updateFieldsValueAsync } = interceptors;
  let newFieldsValue = { ...fieldsValue };
  if (updateFieldsValueAsync) {
    newFieldsValue = await updateFieldsValueAsync(fieldsValue, mode);
  } else if (updateFieldsValue) {
    newFieldsValue = updateFieldsValue(fieldsValue, mode);
  }
  return newFieldsValue;
}

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

class Curd extends PureComponent {
  static defaultProps = {
    dataContainerType: 'table',
    renderItem: null,
    queryArgsConfig: [],
    data: {},
    detail: {},
    createButtonName: '新建',
    fetchLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    setFormItemsConfig: () => {},
    tableConfig: {},
    popupType: 'drawer',
    popupProps: {},
    queryPanelProps: {},
    dispatch: () => {},
  };

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
        detailActionTitle = '详情',
        updateActionTitle = '编辑',
        deleteActionTitle = '删除',
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
        title: detailActionTitle,
        handleClick: () => {
          if (handleDetailClick) {
            handleDetailClick(record);
            return;
          }
          if (this.doFetchDetail()) {
            dispatch({
              type: `${namespace}/detail`,
              id: record.id,
            });
          }
          this.handleVisible(DetailName, true, record);
        },
      },
      {
        key: 8,
        title: updateActionTitle,
        handleClick: () => {
          if (handleUpdateClick) {
            handleUpdateClick(record);
            return;
          }
          if (this.doFetchDetail()) {
            dispatch({
              type: `${namespace}/detail`,
              id: record.id,
            });
          }
          this.handleVisible(UpdateName, true, record);
        },
      },
      {
        key: 12,
        title: deleteActionTitle,
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
    const { afterPopupNotVisible, interceptors = {} } = this.props;
    const { handleCreateClick } = interceptors;
    if (handleCreateClick && action === CreateName) {
      this.handleCreateClick();
      return;
    }
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

  handleStandardTableChange = (pagination, filtersArg = {}, sorter = {}) => {
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

  handleCreateOk = async fieldsValue => {
    console.log('handleCreateOk', fieldsValue);
    const { namespace, dispatch, interceptors = {} } = this.props;
    const newFieldsValue = await updateFieldsValueByInterceptors(
      fieldsValue,
      interceptors,
      CreateName
    );
    if (!newFieldsValue) return;
    dispatch({
      type: `${namespace}/create`,
      payload: newFieldsValue,
      callback: response => {
        if (!response) {
          const { formValues } = this.state;
          this.handleVisible(CreateName, false);
          this.handleSearch(formValues);
        }
      },
    });
  };

  handleUpdateOk = async fieldsValue => {
    console.log('handleUpdateOk', fieldsValue);
    const {
      record: { id },
    } = this.state;
    const { namespace, dispatch, interceptors = {} } = this.props;
    const newFieldsValue = await updateFieldsValueByInterceptors(
      fieldsValue,
      interceptors,
      UpdateName
    );
    if (!newFieldsValue) return;
    dispatch({
      type: `${namespace}/update`,
      id,
      payload: newFieldsValue,
      callback: response => {
        if (!response) {
          this.handleVisible(UpdateName, false);
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
    return transferBoolArrayToString([createVisible, detailVisible, updateVisible]);
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
      this.handleVisible(DetailName, false);
      return null;
    }
    if (this.getVisibleState() === UpdateVisible) {
      return this.handleUpdateOk(fieldsValue);
    }
    return this.handleCreateOk(fieldsValue);
  };

  doFetchDetail = () => {
    return DetailName in this.props && 'detailLoading' in this.props;
  };

  setContainerModeAndRecord = () => {
    const { record } = this.state;
    if (this.getVisibleState() === DetailVisible) {
      return [DetailName, record];
    }
    if (this.getVisibleState() === UpdateVisible) {
      return [UpdateName, record];
    }
    return [CreateName, {}];
  };

  render() {
    const {
      dataContainerType,
      renderItem,
      queryArgsConfig,
      data,
      detail,
      createButtonName,
      fetchLoading,
      createLoading,
      detailLoading,
      updateLoading,
      setFormItemsConfig,
      tableConfig,
      popupType,
      popupProps,
      queryPanelProps,
      children,
    } = this.props;
    const { selectedRows } = this.state;
    const { columns, checkable } = tableConfig;
    const [mode, record] = this.setContainerModeAndRecord();
    const { drawerConfig, modalConfig, ...restPopupProps } = popupProps;
    const showDetail = [DetailName, UpdateName].includes(mode);

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
            <Button icon="plus" type="primary" onClick={() => this.handleVisible(CreateName, true)}>
              {createButtonName}
            </Button>
            {renderChildren(children, { __curd__: this.curd })}
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
              onChange={paginatioin => this.handleStandardTableChange(paginatioin)}
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
              setFormItemsConfig(this.doFetchDetail() && showDetail ? detail : record, mode, form)
            }
            mode={mode}
          />
        ) : (
          <DetailFormDrawer
            drawerConfig={mergePopupProps}
            {...restPopupProps}
            loading={createLoading || detailLoading || updateLoading}
            onOk={this.handleOk}
            setItemsConfig={form =>
              setFormItemsConfig(this.doFetchDetail() && showDetail ? detail : record, mode, form)
            }
          />
        )}
      </Card>
    );
  }
}

export default Curd;
