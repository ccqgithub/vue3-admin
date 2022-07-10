<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { createForm, Field, FormProvider } from 'vfm';
import { ElButton } from 'element-plus';
import { Loading } from '@/components';
import { useAppStore } from '@/use';
import { loginByPhone } from '@/service/user';
import * as S from './index.module.scss';

const form = createForm<{
  phone: string;
  password: string;
}>({
  initValues: {
    phone: '',
    password: ''
  }
});

const showFieldError = (name: string) => {
  const n = name as any;
  return form.fieldError(n) && (form.state.isSubmitted || form.isTouched(n));
};

const appStore = useAppStore();
const router = useRouter();
const loading = ref(false);

const submit = () => {
  form.submit({
    onSuccess: async (data) => {
      loading.value = true;
      try {
        const user = await loginByPhone({
          phone: data.phone,
          password: data.password
        });
        loading.value = false;
        appStore.login({
          user,
          token: user.token!
        });
        router.replace('/');
      } catch (e: any) {
        loading.value = false;
        ElMessage.error(e.message);
      }
    },
    onError: (err) => {
      ElMessage.error(err.message);
    }
  });
};
</script>

<template>
  <FormProvider :form="form">
    <form action="javascript: void;" :class="S.form">
      <Loading v-if="loading" :icon="false" />
      <div :class="S.p">
        <div :class="S.pi">
          <div :class="S.ins">
            <Field
              v-slot="scope"
              :form="form"
              name="phone"
              touch-type="BLUR"
              change-type="ONINPUT"
              :transform="(v) => v.trim()"
              :rules="[
                {
                  required: true,
                  pattern: /^\d{3,13}$/i,
                  message: 'Please input valid phone!'
                }
              ]"
            >
              <input
                v-bind="scope.field"
                :class="S.input"
                type="text"
                placeholder="Phone"
              />
            </Field>
          </div>
        </div>
        <div v-if="showFieldError('phone')" :class="S.error">
          {{ form.fieldError('phone')?.message }}
        </div>
      </div>
      <div :class="S.p">
        <div :class="S.pi">
          <div :class="S.ins">
            <Field
              v-slot="scope"
              :form="form"
              name="password"
              touch-type="BLUR"
              change-type="ONINPUT"
              :transform="(v) => v.trim()"
              :rules="[
                {
                  required: true,
                  message: 'Please input password!'
                }
              ]"
            >
              <input
                :class="S.input"
                type="password"
                placeholder="Password"
                v-bind="scope.field"
              />
            </Field>
          </div>
        </div>
        <div v-if="showFieldError('password')" :class="S.error">
          {{ form.fieldError('password')?.message }}
        </div>
      </div>
      <div :class="S.p">
        <ElButton
          :class="S.submit"
          :loading="loading"
          type="primary"
          @click="submit"
          >Login</ElButton
        >
      </div>
    </form>
  </FormProvider>
</template>
