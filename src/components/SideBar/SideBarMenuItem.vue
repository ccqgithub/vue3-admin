<script lang="ts">
export default {
  name: 'SideBarMenuItem'
};
</script>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { trimPath } from '@/utils';
import { SubMenu, MenuItem } from '@/components';
import { MenuItem as IMenuItem } from '@/config';
import SideBarMenuItem from './SideBarMenuItem.vue';

const props = defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true
  }
});
const { item } = toRefs(props);
const route = useRoute();
const router = useRouter();
const isActive = (v: IMenuItem): boolean => {
  if (v.children?.length) {
    return v.children.some((obj) => {
      return isActive(obj);
    });
  }
  return trimPath(route.fullPath) === trimPath(v.path!);
};
const click = () => {
  router.push(item.value.path!);
};
</script>

<template>
  <!-- submenu -->
  <SubMenu v-if="item.children?.length">
    <template #title>
      <MenuItem sub-title :icon="!!item.icon" :active="isActive(item)">
        <template #icon>
          <component :is="item.icon"></component>
        </template>
        <span>{{ item.title }}</span>
      </MenuItem>
    </template>
    <SideBarMenuItem
      v-for="obj in item.children"
      :key="obj.index"
      :item="obj"
    ></SideBarMenuItem>
  </SubMenu>
  <!-- menu item -->
  <MenuItem
    v-if="!item.children?.length"
    :icon="!!item.icon"
    :active="isActive(item)"
    @click="click"
  >
    <template #icon>
      <component :is="item.icon"></component>
    </template>
    <span>{{ item.title }}</span>
  </MenuItem>
</template>
