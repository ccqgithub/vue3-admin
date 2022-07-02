import { onUnmounted, toRaw } from 'vue';
import { RouteRecordRaw, useRouter, useRoute } from 'vue-router';

export const useRoutes = (routes: RouteRecordRaw[]) => {
  const router = useRouter();
  const route = useRoute();
  const dels: (() => void)[] = [];

  for (const item of routes) {
    const opts = {
      ...item,
      name: item.name || Symbol('route')
    };
    const del = route.name
      ? router.addRoute(route.name, opts)
      : router.addRoute(opts);
    dels.push(del);
  }
  console.log(toRaw(router.getRoutes()));

  router.replace(route.fullPath);

  onUnmounted(() => {
    dels.forEach((del) => {
      del();
    });
  });
};
