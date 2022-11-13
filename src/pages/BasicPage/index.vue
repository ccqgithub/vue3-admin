<script lang="ts">
export default {
  name: 'BasicPage'
};
</script>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { SideBar, RouterView, ErrorCapture, Loading } from '@/components';
import { useAppStore } from '@/use';
import { GeneralError } from '@/utils';
import { getUserInfo } from '@/service';
import S from './index.module.scss';

const appStore = useAppStore();
const router = useRouter();
const error = ref<GeneralError | null>(null);
const loading = ref(true);
// ele
const refMain = ref<HTMLDivElement>();
const refHeader = ref<HTMLDivElement>();
const refMainPage = ref<HTMLDivElement>();
const { height: mainHeight } = useElementSize(refMain);
const { height: headerHeight } = useElementSize(refHeader);
const { height: mianPageHeight } = useElementSize(refMainPage);

const getUser = async () => {
  loading.value = true;
  try {
    const user = await getUserInfo();
    if (!user) {
      appStore.clearLogin();
      router.replace('/login');
      return;
    }
    appStore.setUser(user);
    loading.value = false;
  } catch (e: any) {
    loading.value = false;
    error.value = e;
    ElMessage.error(e.message);
  }
};

const refresh = () => {
  error.value = null;
  getUser();
};

onMounted(() => {
  if (!appStore.user) {
    getUser();
  }
});

watchEffect(() => {
  if (!refMain.value || !refHeader.value || !refMainPage.value) return;
  appStore.setLayout({
    mainHeight: mainHeight.value,
    mainHeaderHeight: headerHeight.value,
    mainPageHeight: mianPageHeight.value
  });
});
</script>

<template>
  <div :class="S.basicPage">
    <ErrorCapture :error="error" @clear-error="refresh">
      <div v-if="!appStore.user" :class="S.loading">
        <Loading></Loading>
      </div>
      <template v-if="appStore.user">
        <SideBar />
        <div ref="refMain" :class="S.main">
          <div
            :ref="(el) => {
              appStore.setHeaderRef(el as HTMLDivElement);
              refHeader = el as HTMLDivElement
            }"
            :class="S.header"
          ></div>
          <div ref="refMainPage" :class="S.page">
            <RouterView transition="fade" mode="out-in"></RouterView>
          </div>
        </div>
      </template>
    </ErrorCapture>
  </div>
</template>
