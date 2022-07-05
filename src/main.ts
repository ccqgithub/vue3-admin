import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { useProvideStores } from 'pinia-di';
import { router } from '@/config';
import { AppStore, setGlobalStore } from '@/store';
import '@/styles/base.scss';
import { App } from '@/components';

const pinia = createPinia();
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
app.use(router);
app.use(pinia);
app.mount('#app');
