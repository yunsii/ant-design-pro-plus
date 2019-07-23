import React, { PureComponent } from 'react';
import { Row, Col, Form, Icon, Button } from 'antd';

import { FormProvider, createFormItems } from '@/components/antd-form-pro';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
import styles from './index.less';

const RowCount = [1, 2, 3, 4, 6, 8, 12, 24];

const addAllowClearToItemsConfig = itemsConfig =>
  itemsConfig.map(item => ({ ...item, allowClear: true }));

function calculateSpan(rowCount) {
  if (RowCount.includes(rowCount)) {
    return 24 / rowCount;
  }
  throw new Error(`QueryPanel: rowCount value only one of [${RowCount}]`);
}

@Form.create()
class QueryPanel extends PureComponent {
  state = {
    expandForm: false,
  };

  handleFormReset = () => {
    const { form, onReset } = this.props;
    form.resetFields();

    callFunctionIfFunction(onReset)();
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { form, onSearch } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('QueryPanel form:', fieldsValue);
      callFunctionIfFunction(onSearch)(fieldsValue);
    });
  };

  renderForm() {
    const {
      form,
      queryArgsConfig = [],
      rowCount = 3,
      maxCount = 2,
      rowProps = {},
      colProps: customColProps,
    } = this.props;
    let colProps = { span: calculateSpan(rowCount) };
    if (customColProps) {
      colProps = customColProps;
    }
    const { expandForm } = this.state;
    let formItems = [];
    if (!expandForm) {
      formItems = addAllowClearToItemsConfig(queryArgsConfig).slice(0, maxCount);
    } else {
      formItems = addAllowClearToItemsConfig(queryArgsConfig);
    }

    const action = expandForm ? (
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
        收起 <Icon type="up" />
      </a>
    ) : (
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
        展开 <Icon type="down" />
      </a>
    );
    const actions = (
      <div style={{ overflow: 'hidden' }}>
        <div style={{ marginBottom: 24 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button>
          {queryArgsConfig.length > maxCount ? action : null}
        </div>
      </div>
    );
    formItems = [...createFormItems(formItems), actions];

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormProvider value={form}>
          <Row type="flex" gutter={{ md: 8, lg: 24, xl: 48 }} {...rowProps}>
            {formItems.map(item => (
              <Col {...colProps} key={item.key}>
                {item}
              </Col>
            ))}
          </Row>
        </FormProvider>
      </Form>
    );
  }

  render() {
    return <div className={styles.tableListForm}>{this.renderForm()}</div>;
  }
}

export default QueryPanel;
