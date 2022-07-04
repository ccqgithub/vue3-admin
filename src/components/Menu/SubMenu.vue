<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue';
import { ElPopover } from 'element-plus';
import { useElementSize } from '@vueuse/core';
import Depth from './Depth.vue';
import { MenuInjectionKey, SubMenuKey } from './context';
import * as S from './index.module.scss';

const ctx = inject(MenuInjectionKey)!;
const list = ref(null);
const folded = ref(false);
const { height } = useElementSize(list);
const maxHeight = computed(() => {
  if (height.value === 0) return 'auto';
  return folded.value ? '0px' : `${height.value}px`;
});
const toggle = () => {
  console.log('toggle', folded.value, height.value);
  folded.value = !folded.value;
};
provide(SubMenuKey, {
  toggle
});
</script>

<template>
  <li :class="S.sub">
    <!-- not collapse -->
    <template v-if="!ctx.collapse">
      <slot name="title"></slot>
      <div :class="S.subWrapper" :style="{ maxHeight }">
        <ul ref="list" :class="S.subMenu">
          <Depth><slot /></Depth>
        </ul>
      </div>
    </template>
    <!-- collapse -->
    <template v-else>
      <ElPopover placement="right" :width="400" trigger="click">
        <template #reference>
          <slot name="title"></slot>
        </template>
        <div :class="S.subWrapper" :style="{ maxHeight }">
          <ul ref="list" :class="S.subMenu">
            <Depth><slot /></Depth>
          </ul>
        </div>
      </ElPopover>
    </template>
  </li>
</template>
