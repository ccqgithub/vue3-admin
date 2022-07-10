<script lang="ts">
export default {
  name: 'App'
};
</script>

<script setup lang="ts">
import { RouterView, ErrorCapture } from '@/components';
</script>

<template>
  <ErrorCapture>
    <RouterView></RouterView>
  </ErrorCapture>
</template>
