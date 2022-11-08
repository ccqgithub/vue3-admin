<script lang="ts">
export default {
  name: 'Settings'
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  ElFormItem,
  ElForm,
  ElSelect,
  ElOption,
  ElRow,
  ElCol
} from 'element-plus';
import { getLangItem, LangType, setLanguage, LangSelects } from '@/i18n';
import { PurePage, Card } from '@/components';
import S from './index.module.scss';

const { locale } = useI18n();
const lang = computed(() => {
  console.log(getLangItem(locale.value as any)!);
  return getLangItem(locale.value as any)!;
});
const selectLang = (v: LangType) => {
  setLanguage(v);
};
</script>

<template>
  <PurePage>
    <Card title="settings">
      <div :class="S.box">
        <ElForm :label-width="120" @submit="(e: any) => e.preventDefault()">
          <ElRow>
            <ElCol :span="12" :xs="{ span: 24 }">
              <ElFormItem label="Language">
                <ElSelect
                  :model-value="lang.value"
                  :style="{ width: '100%' }"
                  @update:model-value="selectLang"
                >
                  <ElOption
                    v-for="item in LangSelects"
                    :key="item.value"
                    :value="item.value"
                    :label="item.text"
                  ></ElOption>
                </ElSelect>
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
      </div>
    </Card>
  </PurePage>
</template>
