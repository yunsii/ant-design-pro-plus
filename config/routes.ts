export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'switch-tabs-demos',
    icon: 'star',
    path: '/switch-tabs-demos',
    routes: [
      {
        path: '/switch-tabs-demos',
        redirect: '/switch-tabs-demos/control',
      },
      {
        name: 'control',
        path: '/switch-tabs-demos/control',
        component: './switchTabsDemos/Control',
      },
      {
        name: 'parent',
        path: '/switch-tabs-demos/parent',
        component: './switchTabsDemos/Parent',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/switch-tabs-demos/parent',
            redirect: '/switch-tabs-demos/parent/child1',
          },
          {
            path: '/switch-tabs-demos/parent/child1',
            component: './switchTabsDemos/Parent/Child1',
          },
          {
            path: '/switch-tabs-demos/parent/child2',
            name: 'child2',
            component: './switchTabsDemos/Parent/Child2',
          },
          {
            path: '/switch-tabs-demos/parent/child3',
            component: './switchTabsDemos/Parent/Child3',
          },
        ],
      },
      {
        name: 'query',
        path: '/switch-tabs-demos/query',
        component: './switchTabsDemos/Query',
      },
      {
        name: 'result',
        path: '/switch-tabs-demos/result',
        follow: '/switch-tabs-demos/query',
        hideInMenu: true,
        component: './switchTabsDemos/Result',
      },
      {
        name: 'dynamic',
        path: '/switch-tabs-demos/dynamic/:anyStr',
        hideInMenu: true,
        component: './switchTabsDemos/Dynamic',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
