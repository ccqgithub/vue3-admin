<script lang="ts">
export default {
  name: 'RouterView'
};
</script>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouterView } from 'vue-router';
import S from './index.module.scss';

const props = defineProps({
  keepAlive: {
    type: Boolean,
    default: false
  },
  keepAliveInclude: {
    type: [String, RegExp, Array] as PropType<string | RegExp | string[]>,
    default: undefined
  },
  keepAliveExclude: {
    type: [String, RegExp, Array] as PropType<string | RegExp | string[]>,
    default: undefined
  },
  transition: {
    type: String as PropType<'fade' | 'move'>,
    default: 'fade'
  },
  mode: {
    type: String as PropType<'out-in' | 'in-out'>,
    default: undefined
  }
});

const getTransition = () => {
  if (props.transition === 'fade') {
    return {
      'enter-from-class': S.fadeEnterFrom,
      'leave-active-class': S.fadeLeaveActive,
      'enter-active-class': S.fadeEnterActive,
      'leave-to-class': S.fadeLeaveTo
    };
  }
  if (props.transition === 'move') {
    return {
      'enter-from-class': S.moveEnterFrom,
      'leave-active-class': S.moveLeaveActive,
      'enter-active-class': S.moveEnterActive,
      'leave-to-class': S.moveLeaveTo
    };
  }
  return {};
};
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition
      v-if="props.keepAlive"
      v-bind="(getTransition() as any)"
      :mode="props.mode"
      appear
    >
      <KeepAlive
        v-if="props.keepAlive"
        :include="props.keepAliveInclude"
        :exclude="props.keepAliveExclude"
      >
        <component :is="Component" />
      </KeepAlive>
    </transition>
    <transition
      v-if="!props.keepAlive"
      v-bind="(getTransition() as any)"
      :mode="props.mode"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
