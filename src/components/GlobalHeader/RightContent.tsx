import { Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi';
import { ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { RouteTabsMode } from '../RouteTabs/data';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';

  routeTabsMode?: RouteTabsMode | false;
  reloadTab: boolean;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout, routeTabsMode, reloadTab } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
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
      {routeTabsMode && reloadTab ? (
        <Tooltip title={formatMessage({ id: 'component.globalHeader.reload' })}>
          <a className={styles.action} onClick={() => window.reloadCurrentTab()}>
            <ReloadOutlined />
          </a>
        </Tooltip>
      ) : null}
      <Tooltip title='使用文档'>
        <a
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
  theme: settings.navTheme,
  layout: settings.layout,

  routeTabsMode: settings.routeTabsMode,
  reloadTab: settings.reloadTab,
}))(GlobalHeaderRight);
