<script lang="ts">
export default {
  name: 'SideBar'
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { ElMessage, ElMessageBox, ElTooltip } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/use';
import { encryptPhone } from '@/utils';
import { logout } from '@/service';
import { menus } from '@/config';
import imgLogo from '@/assets/logo.png';
import IconMore from '@/assets/icons/more.svg?component';
import IconLogout from '@/assets/icons/box-arrow-left.svg?component';
import * as S from './index.module.scss';

const appStore = useAppStore();
const router = useRouter();
const user = computed(() => {
  return appStore.user!;
});

const mouseEnter = () => {
  appStore.toggleSideBar(false);
};
const mouseLeave = () => {
  appStore.toggleSideBar(true);
};

const doLogout = async () => {
  try {
    await logout();
    appStore.clearLogin();
    router.replace('/login');
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};
const questLogout = () => {
  ElMessageBox.confirm('Do you sure want to logout?', 'Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    type: 'info'
  }).then(() => {
    doLogout();
  });
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
      <div :class="S.logoMin">
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
                <a
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  :class="S.menuLink"
                >
                  <span :class="S.menuText">{{ item.title }}</span>
                  <i :class="S.menuIcon">
                    <component :is="item.icon"></component>
                  </i>
                </a>
                <RouterLink
                  v-if="!item.link"
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
      <span :class="S.logout" title="Logout" @click="questLogout">
        <IconLogout></IconLogout>
      </span>
      <ElTooltip
        placement="top"
        :content="user.email ? user.email : encryptPhone(user?.phone || '')"
      >
        <span :class="S.name">{{
          user?.email || encryptPhone(user?.phone || '')
        }}</span>
      </ElTooltip>
      <div :class="S.avt">
        <img :src="user?.photo || ''" alt="Avatar" />
      </div>
    </div>
  </div>
</template>
