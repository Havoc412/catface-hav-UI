import App from './App'

// 引入全局uview-plus
import uviewPlus from './uni_modules/uview-plus'

// i18n部分的配置
// 引入语言包，注意路径
import zhHans from '@/common/locales/zh.js';
import en from '@/common/locales/en.js';
const messages = {
	en,
	'zh-Hans': zhHans,
}
let i18nConfig = {
  locale: uni.getLocale(),// 获取已设置的语言
  messages
}

// 引入uView对小程序分享的mixin封装
import mpShare from '@/uni_modules/uview-plus/libs/mixin/mpShare.js'
import mixin from './common/mixin'

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
import * as Pinia from 'pinia'

// import { initRequest } from './utils/request/index.js'
// import { Request } from './request';

// info 自定义全局组件
import tabbar from "./components/com/tabbar.vue";
import vtButton from "./components/com/button.vue";
import svgIcon from "./components/com/svgIcon.vue";


export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  
  // 引入请求封装
  // initRequest(app)

  app.use(i18n)
	.use(pinia)
	.use(uviewPlus)

  // #ifdef MP
  app.mixin(mpShare)
  app.mixin(mixin)
  // #endif

  // info nick name components
  app.component("h-tabbar", tabbar);
  app.component("h-btn", vtButton);
  app.component("h-icon", svgIcon);

  return {
    app,
    pinia,
  }
}
// #endif






