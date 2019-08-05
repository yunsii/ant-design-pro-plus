/* eslint-disable no-use-before-define */
import React from 'react';
import { Modal, Form, Row, Col, Spin } from 'antd';
import { FormProvider, createFormItems } from '@/components/antd-form-mate';
import injectChildren from '@/utils/childrenUtils.ts';


function DetailFormModal(props) {
  const {
    modalConfig: { onOk: handleOk, ...restModalConfig },
    cols = 1,
    children,
    setItemsConfig,
    detail = {},
    mode,
    itemsLayout,
    itemsWrapperStyle,
    itemsWrapperClassName,
    loading = false,
    form,
  } = props;

  const onOk = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleOk(fieldsValue);
    });
  };
  const itemsConfig = setItemsConfig(detail, mode, form);

  const colsItems =
    cols === 1 ? (
      createFormItems(itemsConfig, itemsLayout)
    ) : (
      <Row type="flex">
        {createFormItems(itemsConfig, itemsLayout).map(item => {
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
      <Spin spinning={loading}>
        <div className={itemsWrapperClassName} style={itemsWrapperStyle}>
          <FormProvider value={form}>{colsItems}</FormProvider>
        </div>
        {mode ? injectChildren(children, { mode }) : children}
      </Spin>
    </Modal>
  );
}

export default Form.create()(DetailFormModal);
