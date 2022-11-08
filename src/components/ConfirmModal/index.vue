<script lang="ts">
export default {
  name: 'ConfirmModal'
};
</script>

<script setup lang="ts">
import { ElDialog, ElButton } from 'element-plus';
import { IConfirmModalProps } from './types';
import S from './index.module.scss';

const props = defineProps(IConfirmModalProps);
const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();

const doOk = () => {
  emit('ok');
  emit('update:visible', false);
};

const doCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};
</script>

<template>
  <ElDialog
    :model-value="props.visible"
    :show-close="false"
    :title="props.title"
    :width="360"
    :class="S.dialog"
    :append-to-body="true"
    @update:model-value="(v) => emit('update:visible', v)"
  >
    <div :class="S.content">{{ props.content }}</div>
    <!-- footer -->
    <template #footer>
      <span :class="S.footer">
        <ElButton :class="S.btn" @click="doCancel">
          {{ props.cancelText }}
        </ElButton>
        <ElButton :class="S.btn" type="primary" @click="doOk">
          {{ props.okText }}
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>
