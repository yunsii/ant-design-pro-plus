import React, { useState } from 'react';
import { Card, Input } from 'antd';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default () => {
  const [text, setText] = useState<string>();

  return (
    <PageHeaderWrapper
      title="Query"
      content="Input and press enter to new page"
    >
      <Card title="Query">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={() => {
            if (text?.trim()) {
              router.push(`/page-tabs-demo/result/${text}`);
            }
          }}
        />
      </Card>
    </PageHeaderWrapper>
  )
}
