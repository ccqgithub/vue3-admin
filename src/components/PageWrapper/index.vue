<script setup lang="ts">
import * as S from './index.module.scss';
</script>

<template>
  <div :class="S.page">
    <div :class="S.wrapper">
      <slot />
    </div>
  </div>
</template>
