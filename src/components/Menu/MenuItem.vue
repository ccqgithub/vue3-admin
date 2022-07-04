<script setup lang="ts">
import { inject, computed } from 'vue';
import { IconArrowDown } from '@/components';
import MenuItemTag from './MenuItemTag.vue';
import { MenuItemKey, SubMenuKey } from './context';
import * as S from './index.module.scss';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  subTitle: {
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
const itemCtx = inject(MenuItemKey, null);
const sCtx = inject(SubMenuKey)!;
const depth = computed(() => itemCtx?.depth || 0);
const onClick = () => {
  emit('click');
  props.subTitle && sCtx.toggle();
};
</script>

<template>
  <MenuItemTag
    :class="{
      [S.item]: true,
      [S.isActive]: props.active,
      [S.isSubTitle]: !!props.subTitle
    }"
    :style="{
      paddingLeft: `${depth * 16 + 16}px`
    }"
    :sub-title="props.subTitle"
    @click="onClick"
  >
    <span :class="S.con">
      <i v-if="props.icon" :class="S.icon"><slot name="icon"></slot></i>
      <slot></slot>
    </span>
    <i v-if="props.subTitle" :class="S.arrow">
      <IconArrowDown />
    </i>
  </MenuItemTag>
</template>
