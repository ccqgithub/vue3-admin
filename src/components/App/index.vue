<script lang="ts">
export default {
  name: 'App'
};
</script>

<script setup lang="ts">
import { SideBar, RouterView } from '@/components';
import * as S from './index.module.scss';
</script>

<template>
  <SideBar />
  <div :class="S.main">
    <RouterView></RouterView>
  </div>
</template>
