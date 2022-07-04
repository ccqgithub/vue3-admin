import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/Home/index.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login/index.vue')
  },
  {
    name: 'Users',
    path: '/users',
    component: () => import('@/pages/User/index.vue'),
    children: [
      {
        name: 'UsersList',
        path: '',
        component: () => import('@/pages/User/List.vue')
      },
      {
        name: 'UsersAdd',
        path: 'add',
        component: () => import('@/pages/User/index.vue')
      },
      {
        name: 'UsersInfo',
        path: ':id',
        component: () => import('@/pages/User/Detail.vue')
      },
      {
        name: 'UsersEdit',
        path: ':id/edit',
        component: () => import('@/pages/User/Edit.vue')
      }
    ]
  },
  {
    name: 'Roles',
    path: '/roles',
    component: () => import('@/pages/Role/index.vue'),
    children: [
      {
        name: 'RolesList',
        path: '',
        component: () => import('@/pages/Role/List.vue')
      },
      {
        name: 'RolesAdd',
        path: 'add',
        component: () => import('@/pages/Role/index.vue')
      },
      {
        name: 'RolesInfo',
        path: ':id',
        component: () => import('@/pages/Role/Detail.vue')
      },
      {
        name: 'RolesEdit',
        path: ':id/edit',
        component: () => import('@/pages/Role/Edit.vue')
      }
    ]
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('@/pages/Setting/index.vue')
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404/index.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
