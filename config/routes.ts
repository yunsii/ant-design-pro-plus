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
                component: './SwitchTabsDemos/Control',
              },
              {
                name: 'parent',
                path: '/switch-tabs-demos/parent',
                component: './SwitchTabsDemos/Parent',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/switch-tabs-demos/parent',
                    redirect: '/switch-tabs-demos/parent/child1',
                  },
                  {
                    path: '/switch-tabs-demos/parent/child1',
                    component: './SwitchTabsDemos/Parent/Child1',
                  },
                  {
                    path: '/switch-tabs-demos/parent/child2',
                    name: 'child2',
                    component: './SwitchTabsDemos/Parent/Child2',
                  },
                  {
                    path: '/switch-tabs-demos/parent/child3',
                    component: './SwitchTabsDemos/Parent/Child3',
                  },
                ],
              },
              {
                name: 'query',
                path: '/switch-tabs-demos/query',
                component: './SwitchTabsDemos/Query',
              },
              {
                name: 'result',
                path: '/switch-tabs-demos/result',
                follow: '/switch-tabs-demos/query',
                hideInMenu: true,
                component: './SwitchTabsDemos/Result',
              },
              {
                name: 'dynamic',
                path: '/switch-tabs-demos/dynamic/:anyStr',
                hideInMenu: true,
                component: './SwitchTabsDemos/Dynamic',
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
