<script lang="ts">
export default {
  name: 'PurePage'
};
</script>

<script setup lang="ts">
import { Header } from '@/components/Header';
import S from './index.module.scss';

const props = defineProps({
  header: {
    type: Boolean,
    default: true
  },
  breadcrumbs: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div :class="S.purePage">
    <!-- header -->
    <Header v-if="props.header" :breadcrumbs="props.breadcrumbs">
      <template #left>
        <slot name="headerLeft"></slot>
      </template>
      <template #right>
        <slot name="headerRight"></slot>
      </template>
      <template #default>
        <slot name="header"></slot>
      </template>
    </Header>
    <!-- wrapper -->
    <div :class="S.pureWrapper">
      <slot />
    </div>
  </div>
</template>
