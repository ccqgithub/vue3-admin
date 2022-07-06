<script lang="ts">
export default {
  name: 'SideBar'
};
</script>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAppStore } from '@/use';
import { menus } from '@/config';
import imgLogo from '@/assets/logo.png';
import imgAvt from '@/assets/avt.jpeg';
import IconMore from '@/assets/icons/more.svg?component';
import * as S from './index.module.scss';

const appStore = useAppStore();
const mouseEnter = () => {
  appStore.toggleSideBar(false);
};
const mouseLeave = () => {
  appStore.toggleSideBar(true);
};
</script>

<template>
  <div
    :class="{
      [S.side]: true,
      [S.isFolded]: appStore.sideBarCollapsed
    }"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <RouterLink :class="S.logo" to="/">
      <div :class="S.logoBig">
        <div :class="S.logoImg">
          <img :src="imgLogo" alt="Logo" />
        </div>
        <span :class="S.logoText">后台管理系统</span>
      </div>
      <div :class="S.logMin">
        <div :class="S.logoImg">
          <img :src="imgLogo" alt="Logo" />
        </div>
      </div>
    </RouterLink>

    <div :class="S.navs">
      <ul :class="S.menu">
        <li v-for="group in menus" :key="group.title" :class="S.menuGroup">
          <div :class="S.menuGroupTit">
            <span>{{ group.title }}</span>
            <i :class="S.menuGroupDots">
              <IconMore />
            </i>
          </div>
          <div :class="S.menuWrapper">
            <ul>
              <li
                v-for="item in group.children!"
                :key="item.path"
                :class="S.menuItem"
              >
                <RouterLink
                  :class="S.menuLink"
                  :to="item.path!"
                  :active-class="S.isActive"
                >
                  <span :class="S.menuText">{{ item.title }}</span>
                  <i :class="S.menuIcon">
                    <component :is="item.icon"></component>
                  </i>
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <div :class="S.user">
      <span :class="S.name">Season Chen</span>
      <div :class="S.avt">
        <img :src="imgAvt" alt="Avatar" />
      </div>
    </div>
  </div>
</template>
