<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import { GeneralError, normalizeError } from '@/utils';
import ErrorWrapper from './ErrorWrapper.vue';
import { VErrorWrapperProps } from './types';

const props = defineProps(VErrorWrapperProps);
const emit = defineEmits<{
  (e: 'clear-error'): void;
}>();

const error = ref<GeneralError | null>(null);
const refresh = () => {
  error.value = null;
  emit('clear-error');
};

onErrorCaptured((err) => {
  error.value = normalizeError(err);
});
</script>

<template>
  <ErrorWrapper :error="props.error || error" @clear-error="refresh">
    <slot />
  </ErrorWrapper>
</template>
