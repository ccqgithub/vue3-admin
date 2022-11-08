<script lang="ts">
export default {
  name: 'ListPage'
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
  },
  cover: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div v-loading="props.loading" :class="S.listPage">
    <!-- cover -->
    <div v-if="props.cover" :class="S.cover"></div>
    <!-- header -->
    <Header v-if="props.header" :breadcrumbs="props.breadcrumbs">
      <template #left>
        <slot name="headerLeft" />
      </template>
      <template #right>
        <slot name="headerRight" />
      </template>
      <template #default>
        <slot name="header" />
      </template>
    </Header>
    <!-- wrapper -->
    <div :class="S.listWrapper">
      <div :class="S.listCard">
        <div :class="S.listTop">
          <slot name="top" />
        </div>
        <div :class="S.listMain">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
