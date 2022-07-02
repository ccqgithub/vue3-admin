<script lang="ts">
export default {
  name: 'App'
};
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SideBar } from '@/components';
import * as S from './index.module.scss';
</script>

<template>
  <SideBar />
  <div :class="S.main">
    <RouterView></RouterView>
  </div>
</template>
