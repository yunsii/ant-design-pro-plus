import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import SwitchTabsLayout from './layouts/SwitchTabsLayout';
import type { Settings } from '../config/defaultSettings';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<Settings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  if (process.env.NODE_ENV === 'production') {
    return {
      fetchUserInfo,
      currentUser: {
        name: 'Yuns',
        avatar: 'https://avatars.githubusercontent.com/u/18096089',
      },
      settings: defaultSettings,
    };
  }
  if (history.location.pathname !== loginPath) {
    // 如果是登录页面，不执行
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const { switchTabs, ...restSettings } = initialState?.settings || {};
  return {
    rightContentRender: () => (
      <RightContent switchTabsReloadable={switchTabs?.mode && switchTabs.reloadable} />
    ),
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    className: switchTabs?.mode && 'custom-by-switch-tabs',
    childrenRender: (children, props) => {
      const { route } = props;
      return (
        <SwitchTabsLayout
          mode={switchTabs?.mode}
          persistent={switchTabs?.persistent}
          fixed={switchTabs?.fixed}
          routes={route!.routes}
          footerRender={() => <Footer />}
        >
          {children}
        </SwitchTabsLayout>
      );
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    ...restSettings,
  };
};
