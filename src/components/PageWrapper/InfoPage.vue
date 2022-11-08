<script lang="ts">
export default {
  name: 'InfoPage'
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
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div v-loading="props.loading" :class="S.infoPage">
    <!-- header -->
    <Header
      v-if="props.header"
      :id="props.id"
      :name="props.name"
      :breadcrumbs="props.breadcrumbs"
    >
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
    <div :class="S.infoWrapper">
      <div :class="S.infoCard">
        <slot />
      </div>
    </div>
  </div>
</template>
