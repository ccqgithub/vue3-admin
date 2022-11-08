<script lang="ts">
export default {
  name: 'VHeader'
};
</script>

<script setup lang="ts">
import { toRefs, ref, onActivated, onDeactivated } from 'vue';
import { RouterLink } from 'vue-router';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useBreadcrumbs, useAppStore } from '@/use';
import imgLogo from '@/assets/logo.png';
import S from './index.module.scss';

const props = defineProps({
  breadcrumbs: {
    type: Boolean,
    default: true
  },
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
});
const appStore = useAppStore();
const { id, name } = toRefs(props);
const breadcrumbsList = useBreadcrumbs({ id, name });
const active = ref(true);

onDeactivated(() => {
  active.value = false;
});

onActivated(() => {
  active.value = true;
});
</script>

<template>
  <Teleport :to="appStore.headerRef">
    <div v-show="active" :class="S.header">
      <div :class="S.headerLeft">
        <RouterLink :class="S.logo" to="/">
          <img :src="imgLogo" />
        </RouterLink>
        <Breadcrumb v-if="props.breadcrumbs" :list="breadcrumbsList" />
        <slot name="left"></slot>
      </div>
      <div :class="S.headerCon">
        <slot></slot>
      </div>
      <div :class="S.headerRight">
        <slot name="right"></slot>
      </div>
    </div>
  </Teleport>
</template>
