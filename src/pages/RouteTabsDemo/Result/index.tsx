import React from 'react';
import { Card } from 'antd';
import { match as Match } from 'react-router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { BeautifulLocation } from '@/components/RouteTabs/data';
import { withRouteTab } from '@/components/RouteTabs/utils';
import { useConsole } from '@/hooks/test/lifeCycle';

export default withRouteTab(
  ({ match, location }: { match: Match; location: BeautifulLocation }) => {
    useConsole('Result');

    return (
      <PageHeaderWrapper title='Result'>
        <Card title='Result'>
          <p>match: {JSON.stringify(match)}</p>
          <p>location: {JSON.stringify(location)}</p>
        </Card>
      </PageHeaderWrapper>
    );
  },
);
