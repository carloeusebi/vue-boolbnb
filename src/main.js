import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import App from './App.vue';
import { router } from './routes';

createApp(App).use(router).mount('#app');
