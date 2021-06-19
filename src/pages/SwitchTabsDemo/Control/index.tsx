import React from 'react';
import { Card, Alert, Button, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper content='控制台'>
    <Card>
      <Alert
        message={
          <div>
            🎉🎉🎉 <a href='https://github.com/theprimone/use-switch-tabs' target='_blank'>use-switch-tabs</a>
            &nbsp;已发布
          </div>
        }
        description={
          <div>
            <b>页面标签化功能</b>已打包发布，该项目已完全适配，欢迎试用与反馈。
          </div>
        }
        type='info'
        showIcon
        style={{ marginBottom: 12 }}
      />
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
            window.tabsAction.reloadTab();
          }}
        >
          reloadTab
        </Button>
        <Button
          onClick={() => {
            window.tabsAction.goBackTab();
          }}
        >
          goBackTab
        </Button>
        <Button
          onClick={() => {
            window.tabsAction.closeTab();
          }}
        >
          closeTab
        </Button>
        <Button
          onClick={() => {
            window.tabsAction.closeAndGoBackTab('/list', () =>
              window.tabsAction.reloadTab('/list'),
            );
          }}
        >
          closeAndGoBackTab
        </Button>
      </Space>
    </Card>
  </PageHeaderWrapper>
);
