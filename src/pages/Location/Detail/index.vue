<script lang="ts">
export default {
  name: 'LocationDetail'
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  ElMessage,
  ElForm,
  ElFormItem,
  ElButton,
  ElRow,
  ElCol,
  ElIcon
} from 'element-plus';
import {
  Edit as IconEdit,
  Delete as IconDelete
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useDetailPage } from '@/use';
import { InfoPage, Block } from '@/components';
import { confirm } from '@/utils';
import { LocationDetail } from '@/types';
import { locationDetail, locationDelete } from '@/service';
import S from './index.module.scss';

const router = useRouter();

const { params, type } = useDetailPage();
const detail = ref<LocationDetail | null>(null);
const id = computed(() => {
  return (params.value?.id as string) || '';
});
const name = computed(() => {
  return (detail.value?.name as string) || '';
});
const loading = ref(false);

const fetchDetail = async () => {
  const pId = params.value.id as string;
  if (!pId) return;
  try {
    loading.value = true;
    const res = await locationDetail(pId);
    detail.value = res;
    loading.value = false;
  } catch (e: any) {
    loading.value = false;
    ElMessage.error(e.message);
  }
};

const edit = () => {
  router.push({ name: 'LocationEdit', params: { id: id.value, type: 'edit' } });
};

const back = () => {
  if (history.state.from) {
    router.back();
    return;
  }
  router.replace({ name: 'LocationList' });
};

const handleDelete = async () => {
  const id = detail.value?.id;
  if (!id) return;
  const res = await confirm({
    title: 'Delete location',
    content: 'Are you sure to delete the location?'
  });
  if (!res) return;
  try {
    await locationDelete(id);
    ElMessage.success('Unpublished');
    back();
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <InfoPage :id="id" :key="type" :name="name" :loading="loading">
    <template #headerRight>
      <template v-if="detail">
        <ElButton @click="edit">
          <ElIcon><IconEdit /></ElIcon>
          <span>Edit</span>
        </ElButton>
        <ElButton type="danger" @click="handleDelete">
          <ElIcon><IconDelete /></ElIcon>
          <span>Delete</span>
        </ElButton>
      </template>
    </template>
    <!-- main -->
    <div :style="{ minHeight: '200px' }">
      <ElForm v-if="detail" label-width="120px" :class="S.form">
        <!-- General Info -->
        <Block title="General Info">
          <ElRow>
            <!-- name -->
            <ElCol :span="24">
              <ElFormItem label="Name:" :class="S.formItem">
                {{ detail.name }}
              </ElFormItem>
            </ElCol>
            <!-- country -->
            <ElCol :span="12" :xs="{ span: 24 }">
              <ElFormItem label="Country Code:" :class="S.formItem">
                {{ detail.countryCode }}
              </ElFormItem>
            </ElCol>
            <ElCol :span="12" :xs="{ span: 24 }">
              <ElFormItem label="Country:" :class="S.formItem">
                {{ detail.countryName }}
              </ElFormItem>
            </ElCol>
            <!-- city -->
            <ElCol :span="12" :xs="{ span: 24 }">
              <ElFormItem label="City Code:" :class="S.formItem">
                {{ detail.cityCode }}
              </ElFormItem>
            </ElCol>
            <ElCol :span="12" :xs="{ span: 24 }">
              <ElFormItem label="City:" :class="S.formItem">
                {{ detail.cityName }}
              </ElFormItem>
            </ElCol>
          </ElRow>
        </Block>
      </ElForm>
    </div>
  </InfoPage>
</template>
