import React from 'react';
import { Tooltip } from 'antd';
import { useIntl, SelectLang } from 'umi';
import { connect } from 'dva';
import { Settings as ProSettings } from '@ant-design/pro-layout';
import { ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import { Mode } from '../RouteTabs';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  navTheme?: ProSettings['navTheme'];
  layout: ProSettings['layout'];

  routeTabsMode?: Mode;
  routeTabsReloadable?: boolean;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { navTheme, layout, routeTabsMode, routeTabsReloadable } = props;

  const { formatMessage } = useIntl();

  let className = styles.right;

  if (navTheme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder='站内搜索'
        defaultValue='umi ui'
        options={[
          { label: <a href='https://umijs.org/zh/guide/umi-ui.html'>umi ui</a>, value: 'umi ui' },
          {
            label: <a href='next.ant.design'>Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href='https://protable.ant.design/'>Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href='https://prolayout.ant.design/'>Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      {routeTabsMode && routeTabsReloadable ? (
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
      <Tooltip title='使用文档'>
        <a
          style={{
            color: 'inherit',
          }}
          target='_blank'
          href='https://pro.ant.design/docs/getting-started'
          rel='noopener noreferrer'
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  navTheme: settings.navTheme,
  layout: settings.layout,

  routeTabsMode: settings?.routeTabs?.mode,
  routeTabsReloadable: settings?.routeTabs?.reloadable,
}))(GlobalHeaderRight);
