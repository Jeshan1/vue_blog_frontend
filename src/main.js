import { createApp } from 'vue'
import App from './App.vue'
import route from './router/route'
import index from './store/index'
import './assets/tailwind.css'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the styles for Toast
import Chart from 'primevue/chart'
createApp(App)
.use(index)
.use(Toast)
.use(route)
.use(Chart)
.mount('#app')
