import React from 'react';
import { Spin, Button, Drawer, Form } from 'antd';
import { FormProvider, createFormItems } from '@/components/antd-form-pro';

const DetailFormDrawer = props => {
  const { visible, title, form, itemsConfig, handleOk, handleVisible, loading } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleOk(fieldsValue);
    });
  };

  const afterVisibleChange = isVisible => {
    if (!isVisible) {
      form.resetFields();
    }
  };

  return (
    <Drawer
      width={560}
      title={title}
      visible={visible}
      onClose={() => handleVisible(false)}
      afterVisibleChange={afterVisibleChange}
    >
      <Spin spinning={!loading ? false : loading}>
        <FormProvider value={form}>{createFormItems(itemsConfig)}</FormProvider>
        {handleOk ? (
          <div
            style={{
              // position: 'absolute',
              // left: 0,
              // bottom: -10,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={() => handleVisible(false)} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={okHandle} type="primary">
              确定
            </Button>
          </div>
        ) : null}
      </Spin>
    </Drawer>
  );
};

export default Form.create()(DetailFormDrawer);
