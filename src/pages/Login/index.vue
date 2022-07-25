<script lang="ts">
export default {
  name: 'Login'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTabs, ElTabPane, TabsPaneContext } from 'element-plus';
import iconLogo from '@/assets/logo.png';
import IconLang from '@/assets/icons/language.svg?component';
import NameLogin from './NameLogin.vue';
import EmailLogin from './EmailLogin.vue';
import * as S from './index.module.scss';

const activeTab = ref('email');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};
</script>

<template>
  <div :class="S.page">
    <div :class="S.bg"></div>
    <div :class="S.main">
      <div :class="S.wrapper">
        <h1 :class="S.header">
          <span :class="S.logo">
            <img :src="iconLogo" alt="Logo" />
          </span>
          <span :class="S.title">Admin</span>
        </h1>

        <div :class="S.loginMain">
          <ElTabs v-model="activeTab" :class="S.tab" @tab-click="handleClick">
            <ElTabPane label="邮箱登录" name="email">
              <EmailLogin />
            </ElTabPane>
            <ElTabPane label="用户名登录" name="name">
              <NameLogin />
            </ElTabPane>
          </ElTabs>
        </div>

        <div :class="S.lang">
          <IconLang :class="S.icon" />
          <span>English</span>
        </div>
      </div>
    </div>
  </div>
</template>
