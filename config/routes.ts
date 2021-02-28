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
            name: 'page-tabs-demo',
            icon: 'star',
            path: '/route-tabs-demo',
            routes: [
              {
                path: '/route-tabs-demo',
                redirect: '/route-tabs-demo/control',
              },
              {
                name: 'control',
                path: '/route-tabs-demo/control',
                component: './RouteTabsDemo/Control',
              },
              {
                name: 'parent',
                path: '/route-tabs-demo/parent',
                component: './RouteTabsDemo/Parent',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/route-tabs-demo/parent',
                    redirect: '/route-tabs-demo/parent/child1',
                  },
                  {
                    path: '/route-tabs-demo/parent/child1',
                    component: './RouteTabsDemo/Parent/Child1',
                  },
                  {
                    path: '/route-tabs-demo/parent/child2',
                    name: 'child2',
                    component: './RouteTabsDemo/Parent/Child2',
                  },
                  {
                    path: '/route-tabs-demo/parent/child3',
                    component: './RouteTabsDemo/Parent/Child3',
                  },
                ],
              },
              {
                name: 'query',
                path: '/route-tabs-demo/query',
                component: './RouteTabsDemo/Query',
              },
              {
                name: 'result',
                path: '/route-tabs-demo/result',
                follow: '/route-tabs-demo/query',
                hideInMenu: true,
                component: './RouteTabsDemo/Result',
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
