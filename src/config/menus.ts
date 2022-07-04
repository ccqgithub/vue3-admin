import { FunctionalComponent, SVGAttributes } from 'vue';
import imgDashboard from '@/assets/icons/dashboard.svg?component';
import imgSetting from '@/assets/icons/setting.svg?component';
import imgUser from '@/assets/icons/user.svg?component';

export type MenuItem = {
  index: string;
  title: string;
  icon?: FunctionalComponent<SVGAttributes, {}>;
  path?: string;
  children?: MenuItem[];
};

export const menus: MenuItem[] = [
  {
    index: '/',
    title: '首页',
    icon: imgDashboard,
    path: '/'
  },
  {
    index: '/ur',
    title: '用户和权限',
    icon: imgUser,
    children: [
      {
        index: '/users',
        title: '用户管理',
        path: '/users'
      },
      {
        index: '/roles',
        title: '角色管理',
        path: '/roles'
      }
    ]
  },
  {
    index: '/settings',
    title: '设置',
    icon: imgSetting,
    path: '/settings'
  }
];
