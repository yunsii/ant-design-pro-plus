import React from 'react';
import { Card, Steps } from 'antd';
import * as H from 'history';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './index.less';

export default ({ children, location }: { children: React.ReactChildren, location: H.Location }) => {

  const setCurrentByLocation = () => {
    if (location.pathname.endsWith('1')) {
      return 0;
    } else if (location.pathname.endsWith('2')) {
      return 1;
    }
    return 2;
  }

  return (
    <PageHeaderWrapper
      title="Nested Route"
      content="Child update by route"
    >
      <Card title="Parent">
        <Steps
          current={setCurrentByLocation()}
          onChange={(_current) => {
            router.push(`/route-tabs-demo/parent/child${_current + 1}`);
          }}
        >
          <Steps.Step title="child 1" />
          <Steps.Step title="child 2" />
          <Steps.Step title="child 3" />
        </Steps>
        <div className={styles.childContainer}>
          {children}
        </div>
      </Card>
    </PageHeaderWrapper>
  )
}
