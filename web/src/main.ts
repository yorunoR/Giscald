import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import i18n from './services/i18n'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import Password from 'primevue/password'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Sidebar from 'primevue/sidebar'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'

const app = createApp(App)

app
  .use(createPinia())
  // .use(i18n)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component('Avatar', Avatar)
  .component('Button', Button)
  .component('Chart', Chart)
  .component('Checkbox', Checkbox)
  .component('Chip', Chip)
  .component('Dialog', Dialog)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputText', InputText)
  .component('Paginator', Paginator)
  .component('Password', Password)
  .component('ProgressSpinner', ProgressSpinner)
  .component('RadioButton', RadioButton)
  .component('Sidebar', Sidebar)
  .component('Textarea', Textarea)
  .component('Toast', Toast)
  .mount('#app')
