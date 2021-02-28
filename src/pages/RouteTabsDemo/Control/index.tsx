import React from 'react';
import { Card, Alert, Button, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper content='控制台'>
    <Card>
      <Alert
        message='可通过调用全局方法控制标签页的刷新，返回和关闭'
        type='success'
        showIcon
        banner
      />
      <Alert
        message='请打开控制台查看相关操作反馈'
        type='warning'
        showIcon
        banner
        style={{
          marginBottom: 48,
        }}
      />
      <Space>
        <Button
          type='primary'
          onClick={() => {
            window.reloadTab();
          }}
        >
          reloadTab
        </Button>
        <Button
          onClick={() => {
            window.goBackTab();
          }}
        >
          goBackTab
        </Button>
        <Button
          onClick={() => {
            window.closeTab();
          }}
        >
          closeTab
        </Button>
        <Button
          onClick={() => {
            window.closeAndGoBackTab('/list', () => window.reloadTab('/list'));
          }}
        >
          closeAndGoBackTab
        </Button>
      </Space>
    </Card>
  </PageHeaderWrapper>
);
