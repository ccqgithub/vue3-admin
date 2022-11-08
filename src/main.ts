import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { useProvideStores } from 'pinia-di';
import { ElLoading } from 'element-plus';
import '@/styles/element.scss';
import '@/styles/base.scss';
import { i18n } from '@/i18n';
import { router } from '@/config/router';
import { AppStore, setGlobalStore } from '@/store';
import { App } from '@/components';

const app = createApp({
  setup() {
    const { getStore } = useProvideStores({
      stores: [AppStore]
    });
    const appStore = getStore(AppStore);
    setGlobalStore(appStore);

    return () => {
      return h(App);
    };
  }
});

app.use(ElLoading);
app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount('#app');
