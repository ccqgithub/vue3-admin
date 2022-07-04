<script lang="ts">
export default {
  name: 'SideBar'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { menus } from '@/config';
import { Menu } from '@/components';
import imgLogo from '@/assets/logo.png';
import imgAvt from '@/assets/avt.jpeg';
import imgToggle from '@/assets/icons/toggle.svg';
import MenuItem from './SideBarMenuItem.vue';
import * as S from './index.module.scss';

const folded = ref(false);
</script>

<template>
  <div
    :class="{
      [S.side]: true,
      [S.isFolded]: folded
    }"
  >
    <RouterLink :class="S.logo" to="/">
      <div :class="S.logoImg">
        <img :src="imgLogo" alt="Logo" />
      </div>
      <span :class="S.logoText">后台管理系统</span>
    </RouterLink>

    <div :class="S.navs">
      <Menu :collapse="false">
        <MenuItem v-for="item in menus" :key="item.index" :item="item">
        </MenuItem>
      </Menu>
    </div>

    <div :class="S.user">
      <div :class="S.avt">
        <img :src="imgAvt" alt="Avatar" />
      </div>
      <span :class="S.name">Season Chen</span>
    </div>

    <div :class="S.toggle" @click="folded = !folded">
      <img :class="S.img" :src="imgToggle" alt="Toggle" />
    </div>
  </div>
</template>
