<script setup lang="ts">
import * as S from './index.module.scss';

const props = defineProps({
  flex: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <div :class="S.col" :style="{ flex: props.flex }">
    <slot></slot>
  </div>
</template>
