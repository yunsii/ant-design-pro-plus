import React, { useState } from 'react';
import { Card, Input, Checkbox, Button, Form, Alert } from 'antd';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { withRouteTab } from '@/components/RouteTabs/utils';

export default withRouteTab(() => {
  const [text, setText] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = () => {
    router.push({
      pathname: `/route-tabs-demo/result`,
      state: options.includes('withState') ? { state: 'yes', id: text } : undefined,
      query: options.includes('withQuery') ? { query: 'yes', id: text } : undefined,
    });
  };

  return (
    <PageHeaderWrapper title='Query' content='Input and press enter to new page'>
      <Card title='Query'>
        <Alert
          message={
            <>
              点击 <b>查询</b> 按钮跳转到结果页，结果页 Tab 会紧挨着本页面 Tab
            </>
          }
        />
        <Form.Item
          labelCol={{ xs: 24 }}
          labelAlign='left'
          label='Text'
          extra={
            <>
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
                  setText('nice');
                }}
              >
                setText: nice
              </Button>
            </>
          }
        >
          <Input
            value={text}
            onChange={e => setText(e.target.value)}
            onPressEnter={() => {
              handleSearch();
            }}
          />
        </Form.Item>
        <Button type='primary' onClick={() => handleSearch()}>
          查询
        </Button>
      </Card>
    </PageHeaderWrapper>
  );
});
