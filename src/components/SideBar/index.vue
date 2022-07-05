<script lang="ts">
export default {
  name: 'SideBar'
};
</script>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ElTooltip } from 'element-plus';
import { useAppStore } from '@/use';
import { menus } from '@/config';
import { Menu } from '@/components';
import imgLogo from '@/assets/logo.png';
import imgAvt from '@/assets/avt.jpeg';
import imgToggle from '@/assets/icons/toggle.svg';
import MenuItem from './SideBarMenuItem.vue';
import * as S from './index.module.scss';

const appStore = useAppStore();
</script>

<template>
  <div
    :class="{
      [S.side]: true,
      [S.isFolded]: appStore.sideBarCollapsed
    }"
  >
    <RouterLink :class="S.logo" to="/">
      <div :class="S.logoImg">
        <img :src="imgLogo" alt="Logo" />
      </div>
      <span :class="S.logoText">后台管理系统</span>
    </RouterLink>

    <div :class="S.navs">
      <Menu :collapsed="appStore.sideBarCollapsed">
        <MenuItem v-for="item in menus" :key="item.path" :item="item">
        </MenuItem>
      </Menu>
    </div>

    <ElTooltip
      content="Season Chen"
      :disabled="!appStore.sideBarCollapsed"
      placement="right"
    >
      <div :class="S.user">
        <div :class="S.avt">
          <img :src="imgAvt" alt="Avatar" />
        </div>
        <span :class="S.name">Season Chen</span>
      </div>
    </ElTooltip>

    <div :class="S.toggle" @click="appStore.toggleSideBar()">
      <img :class="S.img" :src="imgToggle" alt="Toggle" />
    </div>
  </div>
</template>
