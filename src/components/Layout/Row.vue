<script setup lang="ts">
import * as S from './index.module.scss';
</script>

<template>
  <div :class="S.row">
    <slot></slot>
  </div>
</template>
