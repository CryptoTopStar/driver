import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import $util from '@/util/util.js'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from "./store";
import tools from "@/util/tools";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/custion_element.scss'

const app = createApp(App)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(store)

app.config.globalProperties.$tools = tools;
Object.keys($util).forEach(v => {
  app.config.globalProperties[`$${v}`] = $util[v]
})
app.mount('#app')
