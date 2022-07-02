import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404/index.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
