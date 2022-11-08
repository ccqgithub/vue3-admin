<script lang="ts">
export default {
  name: 'App'
};
</script>

<script setup lang="ts">
import { RouterView } from '@/components/RouterView';
import { ErrorCapture } from '@/components/ErrorWrapper';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useAppStore } from '@/use';

const appStore = useAppStore();
</script>

<template>
  <ErrorCapture>
    <RouterView mode="out-in"></RouterView>
    <!-- ConfirmModal -->
    <teleport to="body">
      <div :style="{ height: '0px', width: '0px' }">
        <ConfirmModal
          v-for="[
            key,
            { ok, cancel, visibleRef, props: p }
          ] in appStore.confirmModals"
          :key="key"
          :visible="visibleRef.value"
          v-bind="p"
          @update:visible="(v) => (visibleRef.value = v)"
          @ok="ok"
          @cancel="cancel()"
        />
      </div>
    </teleport>
  </ErrorCapture>
</template>
