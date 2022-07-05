<script setup lang="ts">
import { inject, ref } from 'vue';
import { ElTooltip } from 'element-plus';
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
  },
  title: {
    type: String,
    default: ''
  }
});
const emit = defineEmits<{
  (e: 'click'): void;
}>();
const ctx = inject(MenuKey)!;
const { depth, popup, collapsed } = ctx;

const trigger = ref<HTMLElement | null>(null);
const onClick = () => {
  emit('click');
};
</script>

<template>
  <li
    ref="trigger"
    :class="{
      [S.item]: true,
      [S.isActive]: props.active
    }"
    :style="{
      paddingLeft: `${popup ? 16 : depth * 16 + 16}px`
    }"
    @click="onClick"
  >
    <span :class="S.con">
      <i v-if="props.icon" :class="S.icon"><slot name="icon"></slot></i>
      <slot></slot>
    </span>
  </li>
  <ElTooltip
    v-if="depth === 0 && collapsed"
    placement="right"
    :virtual-ref="trigger!"
    virtual-triggering
    content="test"
  ></ElTooltip>
</template>
