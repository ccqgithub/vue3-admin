import { FunctionalComponent, SVGAttributes } from 'vue';
import {
  IconDashboard,
  IconUser,
  IconRole,
  IconSetting,
  IconWorkspace
} from '@/components';

export type MenuItem = {
  title: string;
  icon?: FunctionalComponent<SVGAttributes, {}>;
  path?: string;
  children?: MenuItem[];
  link?: string;
};

export const menus: MenuItem[] = [
  {
    title: '基础',
    children: [
      {
        title: 'DashBoard',
        icon: IconDashboard,
        path: '/'
      }
    ]
  },
  {
    title: '用户和权限',
    children: [
      {
        title: '用户管理',
        icon: IconUser,
        path: '/users'
      },
      {
        title: '角色管理',
        icon: IconRole,
        path: '/roles'
      }
    ]
  },
  {
    title: '其他',
    children: [
      {
        title: '设置',
        icon: IconSetting,
        path: '/settings'
      }
    ]
  }
];
