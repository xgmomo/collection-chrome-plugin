import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import setAxios from './axios';
import store from './store'
import 'element-plus/lib/theme-chalk/index.css';
import './index.css'

import App from './App.vue'

setAxios();
const app = createApp(App);
app.use(store);
app.use(ElementPlus);
app.mount('#app')
