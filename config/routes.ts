export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
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
            component: './Admin',
            authority: ['admin'],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './TableList',
          },
          {
            name: 'switch-tabs-demo',
            icon: 'star',
            path: '/switch-tabs-demo',
            routes: [
              {
                path: '/switch-tabs-demo',
                redirect: '/switch-tabs-demo/control',
              },
              {
                name: 'control',
                path: '/switch-tabs-demo/control',
                component: './SwitchTabsDemo/Control',
              },
              {
                name: 'parent',
                path: '/switch-tabs-demo/parent',
                component: './SwitchTabsDemo/Parent',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/switch-tabs-demo/parent',
                    redirect: '/switch-tabs-demo/parent/child1',
                  },
                  {
                    path: '/switch-tabs-demo/parent/child1',
                    component: './SwitchTabsDemo/Parent/Child1',
                  },
                  {
                    path: '/switch-tabs-demo/parent/child2',
                    name: 'child2',
                    component: './SwitchTabsDemo/Parent/Child2',
                  },
                  {
                    path: '/switch-tabs-demo/parent/child3',
                    component: './SwitchTabsDemo/Parent/Child3',
                  },
                ],
              },
              {
                name: 'query',
                path: '/switch-tabs-demo/query',
                component: './SwitchTabsDemo/Query',
              },
              {
                name: 'result',
                path: '/switch-tabs-demo/result',
                follow: '/switch-tabs-demo/query',
                hideInMenu: true,
                component: './SwitchTabsDemo/Result',
              },
              {
                name: 'dynamic',
                path: '/switch-tabs-demo/dynamic/:anyStr',
                hideInMenu: true,
                component: './SwitchTabsDemo/Dynamic',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
