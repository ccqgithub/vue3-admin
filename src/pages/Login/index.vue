<script lang="ts">
export default {
  name: 'Login'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTabs, ElTabPane, TabsPaneContext, ElButton } from 'element-plus';
// import IconLang from '@/assets/icons/lang.svg?component';
import IconLogo from '@/assets/logo.png';
import PhoneLogin from './PhoneLogin.vue';
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
      <div :class="S.lang">
        <!-- <span :class="S.langBtn">
          <IconLang />
        </span> -->
      </div>
      <div :class="S.content">
        <h1 :class="S.header">
          <span :class="S.logo">
            <img :src="IconLogo" alt="Logo" />
          </span>
          <span :class="S.title">Vue Admin</span>
        </h1>
        <div :class="S.loginMain">
          <ElTabs v-model="activeTab" :class="S.tab" @tab-click="handleClick">
            <ElTabPane label="Email Login" name="email">
              <EmailLogin />
            </ElTabPane>
            <ElTabPane label="Phone Login" name="phone">
              <PhoneLogin />
            </ElTabPane>
          </ElTabs>
        </div>
      </div>
    </div>
  </div>
</template>
