<script setup lang="ts">
import { inject, ref, provide, toRefs } from 'vue';
import { MenuKey } from './context';

const props = defineProps({
  isPopup: {
    type: Boolean,
    default: false
  }
});
const ctx = inject(MenuKey)!;
const { isPopup } = toRefs(props);

provide(MenuKey, {
  ...ctx,
  depth: ref(ctx.depth.value + 1),
  popup: isPopup
});
</script>

<template>
  <slot />
</template>
