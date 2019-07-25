import React, { PureComponent, Fragment } from 'react';
import { List, Alert, Pagination, Checkbox, Spin } from 'antd';
import _ from 'lodash';
// import classNames from 'classnames';
import styles from './index.less';

function isValidPagination(pagination) {
  const filterPagination = _.pickBy(pagination, _.isNumber);
  return _.keys(filterPagination).length;
}

class TableList extends PureComponent {
  static defaultProps = {
    data: {},
    loading: false,
  };

  static getDerivedStateFromProps(nextProps, state) {
    let result = {};
    const { checkable, data, pagination } = nextProps;
    const { pagination: listPagination, list } = data;
    const { pagination: currentPagination } = state;
    // console.log(list);
    // console.log(currentPagination);
    if (_.isBoolean(pagination) && !pagination) {
      result = {
        showPagination: false,
      };
    } else if (
      list.length &&
      !isValidPagination(listPagination) &&
      !isValidPagination(currentPagination)
    ) {
      result = {
        pagination: {
          current: 1,
          pageSize: 10,
          total: list.length,
        },
      };
    } else if (
      list.length &&
      !isValidPagination(listPagination) &&
      isValidPagination(currentPagination)
    ) {
      result = {
        pagination: currentPagination,
      };
    } else if (list.length && isValidPagination(listPagination)) {
      return {
        ...result,
        pagination: listPagination,
      };
    }

    if (checkable && nextProps.selectedRows.length === 0) {
      result = {
        ...result,
        selectedRowKeys: [],
      };
    }
    return Object.keys(result).length ? result : null;
  }

  state = {
    selectedRowKeys: [],
    pagination: {},
    showPagination: true,
  };

  cleanSelectedKeys = () => {
    this.handleSelectChange([]);
  };

  onCheckAllChange = () => {
    const { data = {} } = this.props;
    const { list = [] } = data;
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length < list.length) {
      this.handleSelectChange(list.map(item => item.id));
      return;
    }
    this.handleSelectChange([]);
  };

  handleSelectChange = selectedRowKeys => {
    const { data = {}, onSelectRow } = this.props;
    const { list = [] } = data;
    this.setState({
      selectedRowKeys,
    });
    if (onSelectRow) {
      onSelectRow(list.filter(item => selectedRowKeys.includes(item.id)));
    }
  };

  handlePageChange = (page, pageSize) => {
    const { onChange, data } = this.props;
    const { pagination } = data;
    const { pagination: thisPagination } = this.state;
    // console.log(pagination);
    this.setState({
      pagination: {
        ...thisPagination,
        current: page,
        pageSize,
      },
    });
    if (isValidPagination(pagination)) {
      onChange({
        current: page,
        pageSize,
      });
    }
  };

  handleShowSizeChange = (current, pageSize) => {
    this.handlePageChange(current, pageSize);
  };

  renderPagination = () => {
    const { pagination: currentPagination, showPagination } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      hideOnSinglePage: true,
      showTotal: (total, range) => `${range[0]}-${range[1]}，总计 ${total} 条`,
      ...currentPagination,
    };

    let paginationComponent = (
      <Pagination
        style={{ float: 'right' }}
        {...paginationProps}
        onChange={this.handlePageChange}
        onShowSizeChange={this.handleShowSizeChange}
      />
    );
    if (!showPagination) {
      paginationComponent = null;
    }
    return paginationComponent;
  };

  render() {
    const {
      data = {},
      checkable = true,
      renderItem,
      selectedRows,
      setActions,
      onSelectRow,
      loading,
      onChange,
      pagination,
      ...rest
    } = this.props;
    const { selectedRowKeys, pagination: currentPagination, showPagination } = this.state;
    const { current, pageSize } = currentPagination;
    const { list = [] } = data;

    let recordSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
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
          dataSource={
            showPagination ? list.slice((current - 1) * pageSize, current * pageSize) : list
          }
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
              {renderItem({
                record,
                actions: setActions ? setActions(record) : null,
                recordSelection,
                checkable,
              })}
            </List.Item>
          )}
        />
        {this.renderPagination()}
      </Spin>
    );
    if (checkable) {
      renderList = (
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={this.handleSelectChange}
          value={selectedRowKeys}
        >
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
