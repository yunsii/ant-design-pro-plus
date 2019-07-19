import React from 'react';
import { Spin, Button, Drawer, Form } from 'antd';
import { FormProvider, createFormItems } from '@/components/antd-form-pro';

const DetailFormDrawer = props => {
  const { drawerConfig, onOk: handleOk, form, setItemsConfig, itemsLayout, loading } = props;
  const itemsConfig = setItemsConfig(form);

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleOk(fieldsValue);
    });
  };

  return (
    <Drawer destroyOnClose width={560} {...drawerConfig}>
      <Spin spinning={!loading ? false : loading}>
        <FormProvider value={form}>{createFormItems(itemsConfig, itemsLayout)}</FormProvider>
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
            <Button onClick={drawerConfig.onClose} style={{ marginRight: 8 }}>
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
