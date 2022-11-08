import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import { TransitionType } from '@/types';
import { joinUrl } from '@/utils/url';
import { i18n, isLangFromPath } from '@/i18n';
import { getGlobalStore } from '@/store';
import { baseUrl } from '../util';
import { locations } from './locations';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export const routes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login/index.vue')
  },
  {
    name: 'BasicPage',
    path: '/',
    component: () => import('@/pages/BasicPage/index.vue'),
    meta: {
      breadcrumb: [
        {
          title: 'Home'
        }
      ]
    },
    children: [
      {
        name: 'Default',
        path: '',
        redirect: { name: 'Dashboard' }
      },
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('@/pages/Home/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: 'Dashboard'
            }
          ]
        }
      },
      locations,
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('@/pages/Setting/index.vue')
      }
    ]
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404/index.vue')
  }
];

const base = isLangFromPath.value ? `/${i18n.global.locale.value}/` : '/';
export const router = createRouter({
  history: createWebHistory(joinUrl(baseUrl, base)),
  routes
});

router.beforeEach(async (to) => {
  NProgress.start();
  const globalStore = getGlobalStore();
  if (!globalStore?.isLogin() && to.name !== 'Login') {
    return { name: 'Login', query: { from: encodeURIComponent(to.fullPath) } };
  }
  if (globalStore?.isLogin() && to.name === 'Login') {
    let toPath = '/';
    if (to.query.from) {
      toPath = decodeURIComponent(to.query.from as string);
    }
    return { path: toPath };
  }
});

router.afterEach((to, from) => {
  let type: TransitionType = 'REPLACE';
  const isReplace = to.fullPath === from.fullPath;
  const isBack = to.fullPath.startsWith(from.fullPath) && !isReplace;
  const isForward = from.fullPath.startsWith(to.fullPath) && !isReplace;

  if (isReplace) {
    type = 'REPLACE';
  } else if (isBack) {
    type = 'BACK';
  } else if (isForward) {
    type = 'FORWARD';
  }
  to.meta.transitionType = type!;
  NProgress.done();
});

router.onError((err) => {
  console.log(err);
  NProgress.done();
});
