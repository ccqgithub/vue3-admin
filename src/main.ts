import { createApp } from 'vue';
import { router } from '@/config';
import '@/styles/base.scss';
import { App } from '@/components';

const app = createApp(App);
app.use(router);

app.mount('#app');
