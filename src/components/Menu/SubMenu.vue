<script setup lang="ts">
import { computed, inject, onUnmounted, provide, ref, watchEffect } from 'vue';
import { ElPopover } from 'element-plus';
import { useElementSize } from '@vueuse/core';
import SubMenuCtx from './SubMenuCtx.vue';
import { MenuKey } from './context';
import * as S from './index.module.scss';

const props = defineProps({
  initFolded: {
    type: Boolean,
    default: false
  }
});
const ctx = inject(MenuKey)!;
const { collapsed } = ctx;
const list = ref(null);
const folded = ref(props.initFolded);
const subShow = ref(false);
const visible = ref(false);
const { height } = useElementSize(list);
const maxHeight = computed(() => {
  if (height.value === 0) return 'auto';
  return folded.value && !collapsed.value ? '0px' : `${height.value}px`;
});

let isEnter = false;
let timer: ReturnType<typeof setTimeout> | null = null;
const toggleSub = (v: boolean) => {
  subShow.value = v;
  if (!v && !isEnter) {
    visible.value = false;
  }
};
const toggle = (v = !folded.value) => {
  folded.value = v;
};
const enterSub = () => {
  isEnter = true;
  timer && clearTimeout(timer);
};
const leaveSub = () => {
  isEnter = false;
  timer = setTimeout(() => {
    if (subShow.value) return;
    visible.value = false;
  }, 200);
};
const enterTitle = () => {
  isEnter = true;
  timer && clearTimeout(timer);
  visible.value = true;
};
const leaveTitle = () => {
  isEnter = false;
  timer = setTimeout(() => {
    if (subShow.value) return;
    visible.value = false;
  }, 200);
};

const stopWatch = watchEffect(() => {
  if (visible.value) {
    ctx.toggleSub(true);
  } else {
    ctx.toggleSub(false);
  }
});
onUnmounted(() => {
  stopWatch();
});

provide(MenuKey, {
  ...ctx,
  toggle,
  folded,
  toggleSub,
  enterTitle,
  leaveTitle
});
</script>

<template>
  <li :class="S.sub">
    <!-- not collapse -->
    <template v-if="!collapsed">
      <slot name="title"></slot>
      <div :class="S.subWrapper" :style="{ maxHeight }">
        <ul ref="list" :class="S.subMenu">
          <SubMenuCtx><slot /></SubMenuCtx>
        </ul>
      </div>
    </template>
    <!-- collapse -->
    <template v-if="collapsed">
      <ElPopover
        placement="right-start"
        :width="180"
        trigger="hover"
        :show-arrow="false"
        :offset="2"
        :popper-class="S.popup"
        :visible="visible"
      >
        <template #reference>
          <slot name="title"></slot>
        </template>
        <div
          :class="S.subWrapper"
          :style="{ maxHeight }"
          @mouseenter="enterSub()"
          @mouseleave="leaveSub()"
        >
          <ul ref="list" :class="S.subMenu">
            <SubMenuCtx is-popup><slot /></SubMenuCtx>
          </ul>
        </div>
      </ElPopover>
    </template>
  </li>
</template>
