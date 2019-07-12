import React, { PureComponent } from 'react';
import { Row, Col, Form, Icon, Button } from 'antd';

import { FormProvider, createFormItems } from '@/components/antd-form-pro';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';
import styles from './index.less';

const SIMPLE_COUNT = 2;

const addAllowClearToItemsConfig = itemsConfig =>
  itemsConfig.map(item => ({ ...item, allowClear: true }));

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

  renderSimpleForm() {
    const { form, queryArgsConfig = [] } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <FormProvider value={form}>
            {createFormItems(
              addAllowClearToItemsConfig(queryArgsConfig).slice(0, SIMPLE_COUNT)
            ).map(item => (
              <Col key={item.key} md={8} sm={24}>
                {item}
              </Col>
            ))}
          </FormProvider>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {queryArgsConfig.length <= SIMPLE_COUNT ? null : (
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              )}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form, queryArgsConfig = [] } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormProvider value={form}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {createFormItems(addAllowClearToItemsConfig(queryArgsConfig).slice(0, 3)).map(item => (
              <Col key={item.key} md={8} sm={24}>
                {item}
              </Col>
            ))}
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {createFormItems(addAllowClearToItemsConfig(queryArgsConfig).slice(3, 6)).map(item => (
              <Col key={item.key} md={8} sm={24}>
                {item}
              </Col>
            ))}
          </Row>
        </FormProvider>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { expandForm } = this.state;
    let queryForm = this.renderSimpleForm();
    if (expandForm) {
      queryForm = this.renderAdvancedForm();
    }

    return <div className={styles.tableListForm}>{queryForm}</div>;
  }
}

export default QueryPanel;
