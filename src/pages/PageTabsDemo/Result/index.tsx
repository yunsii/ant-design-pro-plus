import React from 'react';
import { Card } from 'antd';
import { match as Match } from 'react-router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default ({ match }: { match: Match }) => {
  console.log(match);

  return (
    <PageHeaderWrapper
      title="Result"
    >
      <Card title="Result">
        {JSON.stringify(match)}
      </Card>
    </PageHeaderWrapper>
  )
}
