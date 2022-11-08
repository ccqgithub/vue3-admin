import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useDetailPage = () => {
  const route = useRoute();
  const id = route.params.id;
  const params = computed(() => route.params);
  const isEdit = computed(() => {
    return id && route.params.type === 'edit';
  });
  const isDuplicate = computed(() => {
    return id && route.params.type === 'duplicate';
  });
  const isView = computed(() => {
    return id && !isEdit.value;
  });
  const isCreate = computed(() => {
    return !isEdit.value && !isView.value;
  });
  const type = computed(() => {
    if (isCreate.value) return 'create';
    if (isEdit.value) return 'edit';
    if (isDuplicate.value) return 'duplicate';
    return 'view';
  });

  return {
    params,
    isEdit,
    isView,
    isCreate,
    type
  };
};
