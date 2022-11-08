<script lang="ts">
export default {
  name: 'LocationEdit'
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  ElMessage,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElRow,
  ElCol,
  ElIcon
} from 'element-plus';
import { Back as IconBack } from '@element-plus/icons-vue';
import { FormProvider, Field } from 'vfm';
import { useDetailPage, useBreakpoint } from '@/use';
import { InfoPage, Block } from '@/components';
import { LocationDetail, LocationForm } from '@/types';
import { locationDetail, locationCreate, locationUpdate } from '@/service';
import { getForm } from './form';
import S from './index.module.scss';

const breakpoint = useBreakpoint();
// route
const router = useRouter();
const form = getForm();
const { params, isCreate, type } = useDetailPage();
// detail
const detail = ref<LocationDetail | null>(null);
const id = computed(() => {
  return (params.value?.id as string) || '';
});
const name = computed(() => {
  return (detail.value?.name as string) || '';
});
// status
const loading = ref(false);
const inited = ref(false);

const initForm = async () => {
  if (isCreate.value) {
    inited.value = true;
    return;
  }

  if (!id.value) return;
  try {
    loading.value = true;
    const res = await locationDetail(id.value);
    detail.value = res;
    loading.value = false;
    form.reset({
      values: {
        ...res
      }
    });
    inited.value = true;
  } catch (e: any) {
    loading.value = false;
    ElMessage.error(e.message);
  }
};

const createItem = async (data: Partial<LocationForm>) => {
  try {
    loading.value = true;
    const res = await locationCreate(data);
    router.replace({ name: 'LocationDetail', params: { id: res.id! } });
    loading.value = false;
    ElMessage.success('Location created');
  } catch (e: any) {
    loading.value = false;
    ElMessage.error(e.message);
  }
};

const updateItem = async (data: Partial<LocationForm>) => {
  try {
    loading.value = true;
    const res = await locationUpdate({
      ...data,
      id: id.value
    });
    ElMessage.success('Location updated');
    // back();
    loading.value = false;
  } catch (e: any) {
    loading.value = false;
    ElMessage.error(e.message);
  }
};

const save = () => {
  if (!form) return;
  form.submit({
    onSuccess: async (data) => {
      const postData: Partial<LocationDetail> = {
        ...data
      };

      if (id.value) {
        updateItem(postData);
      } else {
        createItem(postData);
      }
    },
    onError: (err) => {
      ElMessage.error(err.message);
    }
  });
};

const back = () => {
  if (history.state.from) {
    router.back();
    return;
  }
  if (isCreate.value) {
    router.replace({ name: 'LocationList' });
    return;
  }
  router.replace({ name: 'LocationDetail', params: { id: id.value } });
};

onMounted(() => {
  initForm();
});
</script>

<template>
  <InfoPage :id="id" :key="type" v-loading="loading" :name="name">
    <template #headerRight>
      <ElButton @click="back">
        <ElIcon><IconBack /></ElIcon>
        <span>Back</span>
      </ElButton>
    </template>
    <FormProvider v-if="inited" :form="form">
      <ElForm
        label-width="120px"
        :label-position="breakpoint.below.s ? 'top' : 'right'"
        :size="breakpoint.below.s ? 'small' : 'default'"
        :class="S.form"
        @submit="(e: any) => e.preventDefault()"
      >
        <!-- General Info -->
        <Block title="General Info">
          <ElRow>
            <!-- name -->
            <ElCol :span="24">
              <Field
                v-slot="{ field }"
                :form="form"
                name="name"
                :rules="[
                  {
                    required: true,
                    message: 'Please input name'
                  },
                  {
                    minLength: 3,
                    message: 'The name needs at least 5 characters'
                  }
                ]"
              >
                <ElFormItem
                  label="Name:"
                  :class="S.formItem"
                  :error="form.fieldError('name')?.message"
                >
                  <ElInput
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(v) => field.onChange(v)"
                  />
                </ElFormItem>
              </Field>
            </ElCol>
            <!-- country -->
            <ElCol :span="24">
              <Field
                v-slot="{ field }"
                :form="form"
                name="countryCode"
                :rules="[
                  {
                    required: true,
                    message: 'Please input country code'
                  },
                  {
                    minLength: 3,
                    message: 'The country code needs at least 5 characters'
                  }
                ]"
              >
                <ElFormItem
                  label="Country Cide:"
                  :class="S.formItem"
                  :error="form.fieldError('countryCode')?.message"
                >
                  <ElInput
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(v) => field.onChange(v)"
                  />
                </ElFormItem>
              </Field>
            </ElCol>
            <ElCol :span="24">
              <Field
                v-slot="{ field }"
                :form="form"
                name="countryName"
                :rules="[
                  {
                    required: true,
                    message: 'Please input country name'
                  },
                  {
                    minLength: 3,
                    message: 'The country name needs at least 5 characters'
                  }
                ]"
              >
                <ElFormItem
                  label="Country Name:"
                  :class="S.formItem"
                  :error="form.fieldError('countryName')?.message"
                >
                  <ElInput
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(v) => field.onChange(v)"
                  />
                </ElFormItem>
              </Field>
            </ElCol>
            <!-- city -->
            <ElCol :span="24">
              <Field
                v-slot="{ field }"
                :form="form"
                name="cityCode"
                :rules="[
                  {
                    required: true,
                    message: 'Please input cityCode'
                  },
                  {
                    minLength: 3,
                    message: 'The cityCode needs at least 5 characters'
                  }
                ]"
              >
                <ElFormItem
                  label="City Cide:"
                  :class="S.formItem"
                  :error="form.fieldError('cityCode')?.message"
                >
                  <ElInput
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(v) => field.onChange(v)"
                  />
                </ElFormItem>
              </Field>
            </ElCol>
            <ElCol :span="24">
              <Field
                v-slot="{ field }"
                :form="form"
                name="cityName"
                :rules="[
                  {
                    required: true,
                    message: 'Please input city name'
                  },
                  {
                    minLength: 3,
                    message: 'The city name needs at least 5 characters'
                  }
                ]"
              >
                <ElFormItem
                  label="City Name:"
                  :class="S.formItem"
                  :error="form.fieldError('cityName')?.message"
                >
                  <ElInput
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(v) => field.onChange(v)"
                  />
                </ElFormItem>
              </Field>
            </ElCol>
          </ElRow>
        </Block>
      </ElForm>
      <div :class="S.bottom">
        <ElButton
          :loading="loading"
          type="primary"
          size="large"
          :style="{ minWidth: '100px' }"
          @click="save"
        >
          Save
        </ElButton>
      </div>
    </FormProvider>
  </InfoPage>
</template>
