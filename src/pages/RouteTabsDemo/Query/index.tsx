import React, { useState } from 'react';
import { Card, Input, Checkbox } from 'antd';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import _find from 'lodash/find';

export default () => {
  const [text, setText] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);

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
              router.push({
                pathname: `/route-tabs-demo/result/${text}`,
                state: options.includes("withState") ? { state: "yes" } : undefined,
                query: options.includes("withQuery") ? { query: "yes" } : undefined,
              });
            }
          }}
        />
        <Checkbox.Group
          style={{ marginTop: 12 }}
          value={options}
          options={[
            {
              label: "with state (`{ state: \"yes\"}`)",
              value: "withState",
            },
            {
              label: "with query (`{ query: \"yes\"}`)",
              value: "withQuery",
            },
          ]}
          onChange={(_options) => {
            setOptions(_options);
          }}
        />
      </Card>
    </PageHeaderWrapper>
  )
}
