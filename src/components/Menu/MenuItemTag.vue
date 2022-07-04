<script setup lang="ts">
const props = defineProps({
  subTitle: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div v-if="props.subTitle">
    <slot></slot>
  </div>
  <li v-else><slot></slot></li>
</template>
