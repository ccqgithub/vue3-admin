import { FunctionalComponent, SVGAttributes } from 'vue';
import imgDashboard from '@/assets/icons/dashboard.svg?component';
import imgSetting from '@/assets/icons/setting.svg?component';
import imgUser from '@/assets/icons/user.svg?component';

export type MenuItem = {
  title: string;
  icon?: FunctionalComponent<SVGAttributes, {}>;
  path?: string;
  children?: MenuItem[];
};

export const menus: MenuItem[] = [
  {
    title: '首页',
    icon: imgDashboard,
    path: '/'
  },
  {
    title: '用户和权限',
    icon: imgUser,
    children: [
      {
        title: '用户管理',
        path: '/users'
      },
      {
        title: '角色管理',
        path: '/roles'
      }
    ]
  },
  {
    title: '设置',
    icon: imgSetting,
    path: '/settings'
  }
];
