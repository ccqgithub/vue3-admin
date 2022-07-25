<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { createForm, Field, FormProvider } from 'vfm';
import { ElButton } from 'element-plus';
import { Loading } from '@/components';
import { useAppStore } from '@/use';
import { loginByUsername, getUserInfo } from '@/service';
import IconAccount from '@/assets/icons/account.svg?component';
import IconPassword from '@/assets/icons/password.svg?component';
import * as S from './index.module.scss';

const form = createForm<{
  username: string;
  password: string;
}>({
  initValues: {
    username: '',
    password: ''
  }
});

const showFieldError = (name: string) => {
  const n = name as any;
  return form.fieldError(n) && (form.state.isSubmitted || form.isTouched(n));
};

const appStore = useAppStore();
const loading = ref(false);
const router = useRouter();

const submit = () => {
  form.submit({
    onSuccess: async (data) => {
      loading.value = true;
      try {
        const res = await loginByUsername({
          username: data.username,
          password: data.password
        });
        appStore.setToken(res);
        const user = await getUserInfo();
        appStore.setUser(user);
        loading.value = false;
        router.push('/');
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
          <div :class="S.inputWrapper">
            <div :class="S.inputPrefix">
              <IconAccount />
            </div>
            <div :class="S.inputArea">
              <Field
                v-slot="scope"
                :form="form"
                name="username"
                touch-type="BLUR"
                change-type="ONINPUT"
                :transform="(v) => v.trim()"
                :rules="[
                  {
                    required: true,
                    message: 'Please input valid user name!'
                  }
                ]"
              >
                <input
                  v-bind="scope.field"
                  :class="S.input"
                  type="text"
                  placeholder="Username"
                />
              </Field>
            </div>
          </div>
        </div>
        <div v-if="showFieldError('username')" :class="S.error">
          {{ form.fieldError('username')?.message }}
        </div>
      </div>
      <div :class="S.p">
        <div :class="S.pi">
          <div :class="S.inputWrapper">
            <div :class="S.inputPrefix">
              <IconPassword />
            </div>
            <div :class="S.inputArea">
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
