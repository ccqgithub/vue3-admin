<script setup lang="ts">
import { toRefs, provide, ref } from 'vue';
import { MenuKey } from './context';
import * as S from './index.module.scss';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});
const { collapsed } = toRefs(props);

provide(MenuKey, {
  collapsed,
  folded: ref(false),
  depth: ref(0),
  popup: ref(false),
  toggle: () => {},
  toggleSub: () => {},
  enterTitle: () => {},
  leaveTitle: () => {}
});
</script>

<template>
  <ul :class="S.menu">
    <slot></slot>
  </ul>
</template>
