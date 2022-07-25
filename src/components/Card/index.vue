<script setup lang="ts">
import { useSlots, computed } from 'vue';
import * as S from './index.module.scss';

const props = defineProps({
  full: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
});
const slots = useSlots();
const hasTitle = computed(() => {
  return props.title || slots.title || slots.extra;
});
</script>

<template>
  <div
    :class="{
      [S.card]: true,
      [S.isFull]: props.full
    }"
  >
    <div v-if="hasTitle" :class="S.head">
      <div v-if="!!props.title" :class="S.title">{{ props.title }}</div>
      <slot name="title"></slot>
      <div :class="S.extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div :class="S.body">
      <slot></slot>
    </div>
  </div>
</template>
