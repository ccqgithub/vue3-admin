<script lang="ts">
export default {
  name: 'SideBar'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import {
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElIcon
} from 'element-plus';
import imgLogo from '@/assets/logo.png';
import imgAvt from '@/assets/avt.jpeg';
import imgToggle from '@/assets/icons/toggle.svg';
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
      <ElMenu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="false"
      >
        <ElSubMenu index="1">
          <template #title>
            <ElIcon></ElIcon>
            <span>Navigator One</span>
          </template>
          <ElMenuItemGroup>
            <template #title><span>Group One</span></template>
            <ElMenuItem index="1-1">item one</ElMenuItem>
            <ElMenuItem index="1-2">item two</ElMenuItem>
          </ElMenuItemGroup>
          <ElMenuItemGroup title="Group Two">
            <ElMenuItem index="1-3">item three</ElMenuItem>
          </ElMenuItemGroup>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <ElMenuItem index="1-4-1">item one</ElMenuItem>
          </el-sub-menu>
        </ElSubMenu>
        <ElMenuItem index="2">
          <ElIcon>1</ElIcon>
          <template #title>Navigator Two</template>
        </ElMenuItem>
        <ElMenuItem index="3" disabled>
          <ElIcon></ElIcon>
          <template #title>Navigator Three</template>
        </ElMenuItem>
        <ElMenuItem index="4">
          <ElIcon>1</ElIcon>
          <template #title>Navigator Four</template>
        </ElMenuItem>
      </ElMenu>
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
