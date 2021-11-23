import React from 'react';
import { Card } from 'antd';
import { match as Match } from 'react-router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as H from 'history-with-query';

import { withSwitchTab } from 'use-switch-tabs';
import { useConsole } from '@/hooks/test/lifeCycle';

export default withSwitchTab(
  ({ match, location }: { match: Match; location: H.LocationDescriptorObject }) => {
    useConsole('Result');

    return (
      <PageHeaderWrapper title='Result'>
        <Card title='Result'>
          <pre>
            <b>match</b>: {JSON.stringify(match, null, 2)}
          </pre>
          <pre>
            <b>location</b>: {JSON.stringify(location, null, 2)}
          </pre>
        </Card>
      </PageHeaderWrapper>
    );
  },
);
