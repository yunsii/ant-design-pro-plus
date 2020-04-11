import React, { useState } from 'react';
import { Card, Input, Checkbox, Button } from 'antd';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { withRouteTab } from '@/components/RouteTabs/utils';

export default withRouteTab(() => {
  const [text, setText] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);

  return (
    <PageHeaderWrapper title='Query' content='Input and press enter to new page'>
      <Card title='Query'>
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          onPressEnter={() => {
            if (text?.trim()) {
              history.push({
                pathname: `/route-tabs-demo/result/${text}`,
                state: options.includes('withState') ? { state: 'yes' } : undefined,
                query: options.includes('withQuery') ? { query: 'yes' } : undefined,
              });
            }
          }}
        />
        <Checkbox.Group
          style={{ marginTop: 12 }}
          value={options}
          options={[
            {
              label: 'with state (`{ state: "yes"}`)',
              value: 'withState',
            },
            {
              label: 'with query (`{ query: "yes"}`)',
              value: 'withQuery',
            },
          ]}
          onChange={_options => {
            setOptions(_options);
          }}
        />
        <Button
          onClick={() => {
            setText('123');
          }}
        >
          setText: 123
        </Button>
      </Card>
    </PageHeaderWrapper>
  );
});
