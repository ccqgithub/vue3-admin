<script setup lang="ts">
import * as S from './index.module.scss';
</script>

<template>
  <div :class="S.card">
    <div :class="S.cardCon">
      <slot></slot>
    </div>
  </div>
</template>
