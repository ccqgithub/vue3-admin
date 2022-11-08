import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { getBreakpoint } from '@/utils';

export const useBreakpoint = () => {
  const { width } = useWindowSize();
  const point = computed(() => {
    return getBreakpoint(width.value);
  });

  return point;
};
