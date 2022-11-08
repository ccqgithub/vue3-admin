<script lang="ts">
export default {
  name: 'Block'
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { useElementSize, MaybeElement } from '@vueuse/core';
import S from './index.module.scss';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  toggle: {
    type: Boolean,
    default: true
  }
});
const bodyEl = ref<MaybeElement>();
const { height } = useElementSize(bodyEl);
const toggle = ref(false);
const maxHeight = computed(() => {
  if (toggle.value) return 0;
  return height.value;
});
</script>

<template>
  <div :class="S.block">
    <div :class="S.blockTitle" @click="toggle = !toggle">
      <div :class="S.titleLeft">
        {{ props.title }}
        <slot name="title" />
      </div>
      <div :class="S.titleToggle">
        <div
          :class="{
            [S.titleArrow]: true,
            [S.isToggle]: toggle
          }"
        >
          <ElIcon><ArrowDown /></ElIcon>
        </div>
      </div>
    </div>
    <div :class="S.blockBody" :style="{ maxHeight: `${maxHeight}px` }">
      <div ref="bodyEl" :class="S.blockBodyCon">
        <slot />
      </div>
    </div>
  </div>
</template>
