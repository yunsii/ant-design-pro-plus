import React from 'react';
import { Card, Steps } from 'antd';
import type * as H from 'history-with-query';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { withSwitchTab } from 'use-switch-tabs';
import styles from './index.less';

export default withSwitchTab(
  ({ children, location }: { children: React.ReactChildren; location: H.Location }) => {
    const setCurrentByLocation = () => {
      if (location.pathname.endsWith('1')) {
        return 0;
      }
      if (location.pathname.endsWith('2')) {
        return 1;
      }
      return 2;
    };

    return (
      <PageHeaderWrapper title="Nested Route" content="Child update by route">
        <Card title="Parent">
          <Steps
            current={setCurrentByLocation()}
            onChange={(_current) => {
              history.push(`/switch-tabs-demos/parent/child${_current + 1}`);
            }}
          >
            <Steps.Step title="child 1" />
            <Steps.Step title="child 2" />
            <Steps.Step title="child 3" />
          </Steps>
          <div className={styles.childContainer}>{children}</div>
        </Card>
      </PageHeaderWrapper>
    );
  },
);
