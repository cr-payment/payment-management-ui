// component
import React, { ReactNode } from 'react';
import { SvgColor } from 'app/components';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'project',
    path: '/projects',
    icon: icon('ic_cart'),
  },
  {
    title: 'setting',
    path: '/setting',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export interface NavProps {
  title: string;
  path: string;
  icon: ReactNode;
}

export default navConfig;
