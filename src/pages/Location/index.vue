<script lang="ts">
export default {
  name: 'Locations'
};
</script>

<script setup lang="ts">
import { RouterView } from '@/components';
</script>

<template>
  <div :style="{ height: '100%' }">
    <RouterView
      mode="in-out"
      keep-alive
      :keep-alive-include="['LocationList']"
    ></RouterView>
  </div>
</template>
