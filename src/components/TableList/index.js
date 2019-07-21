import React, { PureComponent, Fragment } from 'react';
import { List, Alert, Pagination, Checkbox, Spin } from 'antd';
import _isEqual from 'lodash/isEqual';
// import classNames from 'classnames';
import styles from './index.less';

class TableList extends PureComponent {
  static getDerivedStateFromProps(nextProps, state) {
    let result = null;
    const { checkable, data = {} } = nextProps;
    const { propsPaination } = state;
    const { pagination, list } = data;
    console.log(pagination, propsPaination);
    console.log(!pagination && !propsPaination);
    console.log(pagination && !_isEqual(propsPaination, pagination));
    if (!pagination && !propsPaination) {
      result = {
        propsPaination: pagination,
        pagination: {
          current: 1,
          pageSize: 10,
          total: list.length,
        },
      };
    }
    if (pagination && !_isEqual(propsPaination, pagination)) {
      result = {
        propsPaination: pagination,
        pagination,
      };
    }
    if (checkable && nextProps.selectedRows.length === 0) {
      result = {
        ...result,
        selectedRowKeys: [],
      };
    }
    return result;
  }

  state = {
    selectedRowKeys: [],
    propsPaination: null,
    pagination: {},
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.onChange([]);
  };

  onCheckAllChange = () => {
    const { data = {} } = this.props;
    const { list = [] } = data;
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length < list.length) {
      this.onChange(list.map(item => item.id));
      return;
    }
    this.onChange([]);
  };

  onChange = selectedRowKeys => {
    const { data = {}, onSelectRow } = this.props;
    const { list = [] } = data;
    this.setState({
      selectedRowKeys,
    });
    if (onSelectRow) {
      onSelectRow(list.filter(item => selectedRowKeys.includes(item.id)));
    }
  };

  handlePageChange = (current, pageSize) => {
    const { onChange } = this.props;
    const { pagination } = this.state;
    // console.log(pagination);
    this.setState({
      pagination: {
        current,
        pageSize,
        ...pagination,
      },
    });
    onChange({
      current,
      pageSize,
    });
  };

  handleShowSizeChange = (current, pageSize) => {
    this.handlePageChange(current, pageSize);
  };

  render() {
    const {
      data = {},
      rowKey,
      checkable = true,
      renderItem,
      selectedRows,
      setActions,
      onSelectRow,
      loading,
      ...rest
    } = this.props;
    const { selectedRowKeys, pagination } = this.state;
    const { list = [] } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      hideOnSinglePage: true,
      showTotal: (total, range) => `${range[0]}-${range[1]}，总计 ${total} 条`,
      ...pagination,
    };
    console.log(pagination);

    let recordSelection = {
      selectedRowKeys,
      onChange: this.onChange,
      // getCheckboxProps: record => ({
      //   disabled: record.disabled,
      // }),
    };
    if (!checkable) {
      recordSelection = {};
    }

    let renderList = (
      <Spin spinning={loading}>
        <List
          rowKey="id"
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          {...rest}
          dataSource={list}
          renderItem={record => (
            <List.Item style={{ position: 'relative' }}>
              {checkable ? (
                <Checkbox
                  value={record.id}
                  className={styles.checkBox}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: 5,
                    right: 4,
                  }}
                />
              ) : null}
              {renderItem({ record, actions: setActions(record), recordSelection, checkable })}
            </List.Item>
          )}
        />
        <Pagination
          style={{ float: 'right' }}
          {...paginationProps}
          onChange={this.handlePageChange}
          onShowSizeChange={this.handleShowSizeChange}
        />
      </Spin>
    );
    if (checkable) {
      renderList = (
        <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} value={selectedRowKeys}>
          {renderList}
        </Checkbox.Group>
      );
    }

    return (
      <div className={styles.standardTable}>
        {checkable ? (
          <div className={styles.tableAlert}>
            <Alert
              message={
                <Fragment>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                  {selectedRowKeys.length ? (
                    <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                      清空
                    </a>
                  ) : (
                    <a onClick={this.onCheckAllChange} style={{ marginLeft: 24 }}>
                      全选
                    </a>
                  )}
                </Fragment>
              }
              type="info"
              showIcon
            />
          </div>
        ) : null}
        {renderList}
      </div>
    );
  }
}

export default TableList;
