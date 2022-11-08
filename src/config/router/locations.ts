import { RouteRecordRaw } from 'vue-router';

export const locations: RouteRecordRaw = {
  name: 'Locations',
  path: 'locations',
  component: () => import('@/pages/Location/index.vue'),
  meta: {
    breadcrumb: [
      {
        title: 'Locations'
      }
    ]
  },
  children: [
    {
      name: 'LocationList',
      path: '',
      component: () => import('@/pages/Location/List/index.vue')
    },
    {
      name: 'LocationDetail',
      path: ':id',
      component: () => import('@/pages/Location/Detail/index.vue'),
      meta: {
        breadcrumb: [
          {
            title: ({ name }) => `${name}`
          }
        ]
      }
    },
    {
      name: 'LocationCreate',
      path: 'create',
      component: () => import('@/pages/Location/Detail/Edit.vue'),
      meta: {
        breadcrumb: [
          {
            title: 'Create'
          }
        ]
      }
    },
    {
      name: 'LocationEdit',
      path: ':id/:type(edit|duplicate)',
      component: () => import('@/pages/Location/Detail/Edit.vue'),
      meta: {
        breadcrumb: [
          {
            title: ({ name }) => `${name}`,
            path: (v) => v.replace(/\/edit$/, '')
          },
          {
            title: ({ route }) =>
              route?.params.type === 'edit' ? 'Edit' : 'Duplicate'
          }
        ]
      }
    }
  ]
};
