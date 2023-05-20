import {
  CodeSandboxOutlined,
  DashboardOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import { RouterItem } from '.';

export const routerConfig: RouterItem[] = [
  {
    path: 'dashboard',
    name: 'dashboard',
    title: 'router.title.dashboard',
    element: lazy(() => import('../pages/Dashboard')),
    icon: <DashboardOutlined />,
    menuType: 'Other',
  },
  {
    path: 'component',
    name: 'component',
    icon: <CodeSandboxOutlined />,
    title: 'router.title.component',
    menuType: 'Other',
    children: [
      {
        path: '/component/input',
        element: lazy(() => import('../pages/Component/Input')),
        name: 'input',
        title: 'router.title.input',
      },
      {
        path: '/component/table',
        element: lazy(() => import('../pages/Component/Table')),
        name: 'table',
        title: 'router.title.table',
      },
    ],
  },
  {
    path: 'mini-grep',
    name: 'mini-grep',
    title: 'router.title.miniGrep',
    element: lazy(() => import('../pages/GrepUi')),
    icon: <SearchOutlined />,
  },
  {
    path: '/404',
    name: 'not_found',
    title: 'Not Found',
    element: lazy(() => import('../pages/Anomaly/NotFound')),
    menuType: 'Hidden',
  },
];
export const unAuthRouter: RouterItem[] = [
  {
    path: '/login',
    name: 'login',
    element: lazy(() => import('../pages/Login')),
    title: 'login',
    menuType: 'Authentication',
  },
];
