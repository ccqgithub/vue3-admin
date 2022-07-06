<script setup lang="ts">
import { PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { BreadcrumbItem } from './types';
import * as S from './index.module.scss';

const props = defineProps({
  list: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: () => []
  }
});
</script>

<template>
  <ul :class="S.bread">
    <li
      v-for="item in props.list"
      :key="item.path || item.title"
      :class="S.item"
    >
      <RouterLink
        v-if="item.path"
        :to="item.path"
        :class="{
          [S.itemLink]: true
        }"
      >
        {{ item.title }}
      </RouterLink>
      <span v-else>{{ item.title }}</span>
    </li>
  </ul>
</template>
