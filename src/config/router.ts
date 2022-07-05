import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteRecordNormalized
} from 'vue-router';
import { TransitionType } from '@/types';

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
        component: () => import('@/pages/User/Add.vue')
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
        component: () => import('@/pages/Role/Add.vue')
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

const findRoute = (list: RouteRecordNormalized[], path: string) => {
  return list.find((v) => {
    const res = router.resolve(v);
    return res.fullPath === path;
  });
};

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to, from) => {
  let type: TransitionType = 'FADE';
  const isBack = !!findRoute(from.matched, to.fullPath);
  const isForward = !!findRoute(to.matched, from.fullPath);

  if (to.fullPath === from.fullPath) {
    type = 'FADE';
  } else if (isBack) {
    type = 'SLIDE_RIGHT';
  } else if (isForward) {
    type = 'SLIDE_LEFT';
  }
  to.meta.transitionType = type!;
});
