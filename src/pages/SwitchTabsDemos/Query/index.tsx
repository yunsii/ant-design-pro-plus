import { useEffect, useRef, useState } from 'react';
import { Card, Input, Checkbox, Button, Form } from 'antd';
import { history, useLocation } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { withSwitchTab } from 'use-switch-tabs';

export default withSwitchTab(() => {
  const [text, setText] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);

  const pageLocation = useLocation();
  const pageTabKeyRef = useRef(window.tabsAction.getTabKey(pageLocation));
  const [active, setActive] = useState(pageTabKeyRef.current === window.tabsAction.getTabKey());

  useEffect(() => {
    const disposer = window.tabsAction.listenActiveChange((tabKey) => {
      setActive(pageTabKeyRef.current === tabKey);
    });

    return () => disposer();
  }, []);

  const handleSearch = () => {
    history.push({
      pathname: `/switch-tabs-demos/result`,
      state: options.includes('withState') ? { state: 'yes', text } : null,
      query: options.includes('withQuery')
        ? { query: 'yes', text: text || null }
        : { text: text || null },
    });
  };

  return (
    <PageHeaderWrapper
      title={`Query [${active ? 'active' : 'inactive'}]`}
      content="Input and press enter to new page"
    >
      <Card title={`Query [${active ? 'active' : 'inactive'}]`}>
        <Form.Item
          labelCol={{ xs: 24 }}
          labelAlign="left"
          label="text"
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
                onChange={(_options) => {
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
            onChange={(e) => setText(e.target.value)}
            onPressEnter={() => {
              handleSearch();
            }}
          />
        </Form.Item>
        <Button type="primary" onClick={() => handleSearch()}>
          查询
        </Button>
      </Card>
    </PageHeaderWrapper>
  );
});
