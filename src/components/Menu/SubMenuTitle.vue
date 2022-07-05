<script setup lang="ts">
import { inject } from 'vue';
import { IconArrowDown } from '@/components';
import { MenuKey } from './context';
import * as S from './index.module.scss';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{
  (e: 'click'): void;
}>();
const ctx = inject(MenuKey)!;
const { toggle, folded, depth, popup, collapsed } = ctx;

const onClick = () => {
  emit('click');
  if (collapsed.value) {
    return;
  }
  toggle?.();
};
const onEnter = () => {
  if (!collapsed.value) {
    return;
  }
  ctx.enterTitle();
};
const onLeave = () => {
  if (!collapsed.value) {
    return;
  }
  ctx.leaveTitle();
};
</script>

<template>
  <div
    ref="trigger"
    :class="{
      [S.item]: true,
      [S.isActive]: props.active,
      [S.isSubTitle]: true
    }"
    :style="{
      paddingLeft: `${popup ? 16 : depth * 16 + 16}px`
    }"
    @click="onClick"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span :class="S.con">
      <i v-if="props.icon" :class="S.icon"><slot name="icon"></slot></i>
      <slot v-if="!collapsed || depth !== 0"></slot>
    </span>
    <i
      v-if="!collapsed || depth !== 0"
      :class="{
        [S.arrow]: true,
        [S.isFolded]: !!folded,
        [S.isPopup]: popup
      }"
    >
      <IconArrowDown />
    </i>
  </div>
</template>
