<script setup lang="ts">
import { toRefs, provide, reactive } from 'vue';
import { MenuInjectionKey } from './context';
import * as S from './index.module.scss';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});
const { collapse } = toRefs(props);
const ctx = reactive({ collapse });
provide(MenuInjectionKey, ctx);
</script>

<template>
  <ul :class="S.menu">
    <slot></slot>
  </ul>
</template>
