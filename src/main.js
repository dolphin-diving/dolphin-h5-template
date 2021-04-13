import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'lib-flexible'
import './assets/css/reset.css'
import './assets/css/style.css'
import mjUtil from './utils/mjUtil.js'
import wxUtil from './utils/wxUtil.js'
import preventReClick from './utils/preventReClick'
import errorMsg from './http/errorMsg'
import Loading from './components/loading'
import Toast from './components/toast'
import Dialog from './components/dialog'
import Poster from './components/poster'
import vConsole from 'vconsole'
import config from './config'
import pj from '../package'

/*字节埋点初始化 start*/
window.collectEvent('init', {
	app_id: config.env === 'sit' ? 10000010 : 10000011, //  必须替换成申请的 app_id
	channel: 'cn', //可选值：cn（国内）、va（美东）、sg（新加坡）
	channel_domain: 'https://iotsdk.midea.com',
	disable_sdk_monitor: true,//用于禁止SDK启动后自身监控事件的上报，（但目前并不会禁止错误日志的上报。）
	log: config.env === 'sit', // 开启调试日志
	autotrack: false // 开启全埋点采集，默认关闭，需要热力图及圈选功能可开启
})
window.collectEvent('config', {
	// disable_auto_pv: true,
	is_app: '否'
})
window.collectEvent('start')
/*字节埋点初始化 end*/

if (window.location.href.includes('/sit/') || process.env.NODE_ENV === 'development') {
  new vConsole()
  console.info(`current version : v${pj.version}`)
}
const device = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
if (!device || parseInt(device[1]) < 11) {
	FastClick.attach(document.body)
}
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Poster)

console.info(`运行环境：${mjUtil.isMeiju()?'美居App':'web'}`)
if (mjUtil.isMeiju()) {
	try {
		const mjBridge = require("mdSmartios")
		console.log('mdSmartios-->', mjBridge)
		Vue.prototype.$bridge = mjBridge.bridge
	}catch (e) {
		console.error('挂载$bridge失败',e)
	}
}
Vue.prototype.$errMap = errorMsg
Vue.prototype.$mjUtil = mjUtil
Vue.prototype.$wxUtil = wxUtil
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
