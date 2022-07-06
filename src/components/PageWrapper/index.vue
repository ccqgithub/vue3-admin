<script setup lang="ts">
import { PropType } from 'vue';
import { BreadcrumbItem, Breadcrumb } from '@/components';
import * as S from './index.module.scss';

const props = defineProps({
  header: {
    type: Boolean,
    default: false
  },
  breadCrumbs: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: () => []
  }
});
</script>

<template>
  <div :class="S.page">
    <div v-if="props.header" :class="S.header">
      <div :class="S.headerLeft">
        <Breadcrumb :list="props.breadCrumbs" />
      </div>
      <div :class="S.headerRight"></div>
    </div>
    <slot />
  </div>
</template>
