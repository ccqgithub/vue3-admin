import { Ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BreadcrumbItem } from '@/components';

export const useBreadcrumbs = (
  args: {
    id?: Ref<string>;
    name?: Ref<string>;
  } = {}
) => {
  const router = useRouter();
  const route = useRoute();
  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const list: BreadcrumbItem[] = [];
    const id = args.id?.value || '';
    const name = args.name?.value || '';

    for (const match of route.matched) {
      const { fullPath } = router.resolve(match);
      const breadcrumbList = match.meta.breadcrumb || [];
      for (const breadcrumb of breadcrumbList) {
        const { title, path } = breadcrumb;
        const titleStr =
          typeof title === 'function'
            ? title({
                id,
                name,
                matched: match,
                route
              })
            : title;
        list.push({
          title: titleStr,
          path: typeof path === 'function' ? path(fullPath) : fullPath
        });
      }
    }

    return list;
  });

  return breadcrumbs;
};
