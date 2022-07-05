<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TransitionType } from '@/types';
import * as S from './index.module.scss';

const getTransition = (type: TransitionType) => {
  console.log(type);
  if (type === 'FADE') {
    return {
      'enter-from-class': S.fadeEnterFrom,
      'enter-active-class': S.fadeEnterActive,
      'leave-active-class': S.fadeLeaveActive,
      'leave-to-class': S.fadeLeaveTo
    };
  }
  if (type === 'SLIDE_LEFT') {
    return {
      'enter-from-class': S.slideLeftEnterFrom,
      'leave-active-class': S.slideLeftLeaveActive,
      'enter-active-class': S.slideLeftEnterActive,
      'leave-to-class': S.slideLeftLeaveTo
    };
  }
  if (type === 'SLIDE_RIGHT') {
    return {
      'enter-from-class': S.slideRightEnterFrom,
      'leave-active-class': S.slideRightLeaveActive,
      'enter-active-class': S.slideRightEnterActive,
      'leave-to-class': S.slideRightLeaveTo
    };
  }
  return {};
};
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition v-bind="getTransition(route.meta.transitionType)" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
