import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import { addDivider, transferBoolArrayToString } from './utils';

import StandardTable from '@/components/StandardTable';
import TableList from '@/components/TableList';
import QueryPanel from '@/components/QueryPanel';
import DetailFormDrawer from '@/components/DetailFormDrawer';
import DetailFormModal from '@/components/DetailFormModal';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
import renderChildren from '@/utils/childrenUtils';
import styles from './index.less';
import { CreateName, DetailName, UpdateName, DetailVisible, UpdateVisible } from './constant';
import { setActions } from './actions';

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
    createTitle: '新建对象',
    detailTitle: '对象详情',
    updateTitle: '编辑对象',
    fetchLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    createButtonName: '新建',
    dispatch: () => {},
    queryArgsConfig: [],
    queryPanelProps: {},
    containerType: 'table',
    containerProps: {},
    renderItem: () => {},
    data: {},
    actionsConfig: {},
    popupType: 'drawer',
    popupProps: {},
    setFormItemsConfig: () => {},
    interceptors: {},
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

  handleVisible = (action, visible, record) => {
    const { afterPopupNotVisible, interceptors } = this.props;
    const { handleCreateClick } = interceptors;
    if (handleCreateClick && action === CreateName) {
      const isBreak = handleCreateClick();
      if (isBreak) return;
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
    const { namespace, dispatch, interceptors } = this.props;
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
    const { namespace, dispatch, interceptors } = this.props;
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

  enhanceColumns = () => {
    const {
      containerProps: { columns },
    } = this.props;
    if (!columns) return [];
    return [
      ...columns,
      {
        title: '操作',
        render: (value, record) => addDivider(setActions(record, this, this.props)),
      },
    ];
  };

  getVisibleState = () => {
    const { createVisible, detailVisible, updateVisible } = this.state;
    return transferBoolArrayToString([createVisible, detailVisible, updateVisible]);
  };

  getContainerTitle = () => {
    const { createTitle, detailTitle, updateTitle } = this.props;
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

  renderQueryPanel = () => {
    const { queryArgsConfig, queryPanelProps } = this.props;

    const composeQueryPanelProps = {
      ...queryPanelProps,
      queryArgsConfig,
      onSearch: this.handleSearch,
    };
    return <QueryPanel {...composeQueryPanelProps} />;
  };

  renderOperators = () => {
    const { createButtonName, operators } = this.props;
    return (
      <div className={styles.tableListOperator}>
        {createButtonName ? (
          <Button icon="plus" type="primary" onClick={() => this.handleVisible(CreateName, true)}>
            {createButtonName}
          </Button>
        ) : null}
        {renderChildren(operators, { __curd__: this.curd })}
      </div>
    );
  };

  renderContainer = () => {
    let result = null;
    const {
      data,
      fetchLoading,
      containerType,
      container,
      containerProps,
      checkable,
      renderItem,
    } = this.props;
    const { selectedRows } = this.state;

    const composeCommenContainerProps = {
      selectedRows,
      loading: fetchLoading,
      data,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
      checkable,
    };

    if (containerType === 'table') {
      result = (
        <StandardTable
          {...containerProps}
          rowKey={row => row.id}
          {...composeCommenContainerProps}
          columns={this.enhanceColumns()}
        />
      );
    } else if (containerType === 'list') {
      result = (
        <TableList
          {...containerProps}
          rowKey={row => row.id}
          {...composeCommenContainerProps}
          setActions={record => setActions(record, this, this.props)}
          renderItem={renderItem}
        />
      );
    }
    return container ? renderChildren(container, composeCommenContainerProps) : result;
  };

  renderPopup = () => {
    let result = null;
    const {
      detail,
      createLoading,
      detailLoading,
      updateLoading,
      setFormItemsConfig,
      popupType,
      popupProps,
    } = this.props;
    const { drawerConfig, modalConfig, ...restPopupProps } = popupProps;
    const loading = createLoading || detailLoading || updateLoading;
    const [mode, record] = this.setContainerModeAndRecord();
    const showDetail = [DetailName, UpdateName].includes(mode);

    const composePopupProps = {
      ...modalConfig,
      ...drawerConfig,
      title: this.getContainerTitle(),
      visible: this.getVisibleState().includes('1'),
      onCancel: this.setVisibleToFalse,
      onClose: this.setVisibleToFalse,
    };

    if (popupType === 'drawer') {
      result = (
        <DetailFormDrawer
          drawerConfig={composePopupProps}
          {...restPopupProps}
          loading={loading}
          onOk={this.handleOk}
          setItemsConfig={setFormItemsConfig}
          detail={this.doFetchDetail() && showDetail ? detail : record}
          mode={mode}
        />
      );
    } else if (popupType === 'modal') {
      result = (
        <DetailFormModal
          modalConfig={{
            ...composePopupProps,
            onOk: this.handleOk,
          }}
          {...restPopupProps}
          loading={loading}
          setItemsConfig={setFormItemsConfig}
          detail={this.doFetchDetail() && showDetail ? detail : record}
          mode={mode}
        />
      );
    }
    return result;
  };

  render() {
    return (
      <Card bordered={false}>
        {this.renderQueryPanel()}
        {this.renderOperators()}
        {this.renderContainer()}
        {this.renderPopup()}
      </Card>
    );
  }
}

export default Curd;
