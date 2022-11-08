import { Component } from 'vue';
import { IconDashboard, IconSetting } from '@/components/Icons';
import IconLocation from '@/assets/icons/location.svg?component';

export type MenuItem = {
  title: string;
  icon?: Component;
  path?: string;
  children?: MenuItem[];
  link?: string;
};

export const menus: MenuItem[] = [
  {
    title: 'Favorites',
    children: [
      {
        title: 'DashBoard',
        icon: IconDashboard,
        path: '/dashboard'
      }
    ]
  },
  {
    title: 'Space Management',
    children: [
      {
        title: 'Locations',
        icon: IconLocation,
        path: '/locations'
      }
    ]
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Settings',
        icon: IconSetting,
        path: '/settings'
      }
    ]
  }
];
