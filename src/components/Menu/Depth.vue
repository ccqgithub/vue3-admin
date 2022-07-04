<script setup lang="ts">
import { inject, computed, provide } from 'vue';
import { MenuItemKey } from './context';

const itemCtx = inject(MenuItemKey, null);
const depth = computed(() => itemCtx?.depth || 0);

provide(MenuItemKey, {
  depth: depth.value + 1
});
</script>

<template>
  <slot />
</template>
