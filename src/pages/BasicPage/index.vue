<script lang="ts">
export default {
  name: 'BasicPage'
};
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { SideBar, RouterView, ErrorCapture, Loading } from '@/components';
import { useAppStore } from '@/use';
import { GeneralError } from '@/utils';
import { getUserInfo } from '@/service';
import * as S from './index.module.scss';

const appStore = useAppStore();
const router = useRouter();
const error = ref<GeneralError | null>(null);
const loading = ref(true);

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
</script>

<template>
  <div :class="S.basicPage">
    <ErrorCapture :error="error" @clear-error="refresh">
      <div v-if="!appStore.user" :class="S.loading">
        <Loading></Loading>
      </div>
      <template v-if="appStore.user">
        <SideBar />
        <div :class="S.main">
          <RouterView></RouterView>
        </div>
      </template>
    </ErrorCapture>
  </div>
</template>
