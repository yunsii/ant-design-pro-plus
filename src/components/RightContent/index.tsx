import { Space, Tooltip } from 'antd';
import { QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang, useIntl } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps {
  switchTabsReloadable?: boolean;
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = ({ switchTabsReloadable }) => {
  const { initialState } = useModel('@@initialState');
  const { formatMessage } = useIntl();

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      {switchTabsReloadable ? (
        <Tooltip title={formatMessage({ id: 'component.globalHeader.reload' })}>
          <a
            style={{
              color: 'inherit',
            }}
            className={styles.action}
            onClick={() => window.tabsAction.reloadTab()}
          >
            <ReloadOutlined />
          </a>
        </Tooltip>
      ) : null}
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  );
};

export default GlobalHeaderRight;
