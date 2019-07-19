/* eslint-disable no-use-before-define */
import React from 'react';
import { Modal, Form, Row, Col, Spin } from 'antd';
import { FormProvider, createFormItems } from '@/components/antd-form-pro';

function DetailFormModal(props) {
  const {
    modalConfig: { onOk: handleOk, ...restModalConfig },
    cols = 1,
    children,
    itemsConfig,
    itemsWrapperStyle,
    itemsWrapperClassName,
    loading,
    form,
  } = props;

  const onOk = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleOk(fieldsValue);
    });
  };

  const colsItems =
    cols === 1 ? (
      createFormItems(itemsConfig)
    ) : (
      <Row type="flex">
        {createFormItems(itemsConfig).map(item => {
          return (
            <Col span={24 / cols} key={item.key}>
              {item}
            </Col>
          );
        })}
      </Row>
    );

  return (
    <Modal destroyOnClose {...restModalConfig} onOk={onOk}>
      <Spin spinning={loading || false}>
        <div className={itemsWrapperClassName} style={itemsWrapperStyle}>
          <FormProvider value={form}>{colsItems}</FormProvider>
        </div>
        {children}
      </Spin>
    </Modal>
  );
}

export default Form.create()(DetailFormModal);
