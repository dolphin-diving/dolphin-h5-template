import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = () => import(/* webpackChunkName: 'Home' */ '@/views/Home')
const DemoAddressPicker = () => import(/* webpackChunkName: 'DemoAddressPicker' */ '@/views/componentsDemos/DemoAddressPicker')
const DemoDialog = () => import(/* webpackChunkName: 'DemoDialog' */ '@/views/componentsDemos/DemoDialog')
const DemoIosHint = () => import(/* webpackChunkName: 'DemoIosHint' */ '@/views/componentsDemos/DemoIosHint')
const DemoLoading = () => import(/* webpackChunkName: 'DemoLoading' */ '@/views/componentsDemos/DemoLoading')
const DemoPoster = () => import(/* webpackChunkName: 'DemoPoster' */ '@/views/componentsDemos/DemoPoster')
const DemoRule = () => import(/* webpackChunkName: 'DemoRule' */ '@/views/componentsDemos/DemoRule')
const DemoToast = () => import(/* webpackChunkName: 'DemoToast' */ '@/views/componentsDemos/DemoToast')
const DemoApi = () => import(/* webpackChunkName: 'DemoApi' */ '@/views/apiDemos/DemoApi')

export default new Router({
  routes: [
    { path: '/', name: 'Home', meta: { keepAlive: true, title: 'activity-demo示例'}, component: Home },
    { path: '/DemoAddressPicker', name: 'DemoAddressPicker', meta: { keepAlive: false, title: '组件-全国城市级联弹窗' }, component: DemoAddressPicker },
    { path: '/DemoDialog', name: 'DemoDialog', meta: { keepAlive: false, title: '组件-模态框' }, component: DemoDialog },
    { path: '/DemoIosHint', name: 'DemoIosHint', meta: { keepAlive: true, title: '组件-美居内苹果公司免责声明' }, component: DemoIosHint },
    { path: '/DemoLoading', name: 'DemoLoading', meta: { keepAlive: true, title: '组件-等待加载动画' }, component: DemoLoading },
    { path: '/DemoPoster', name: 'DemoPoster', meta: { keepAlive: false, title: '组件-海报弹窗' }, component: DemoPoster },
    { path: '/DemoRule', name: 'DemoRule', meta: { keepAlive: true, title: '组件-活动规则弹窗' }, component: DemoRule },
    { path: '/DemoToast', name: 'DemoToast', meta: { keepAlive: true, title: '组件-toast' }, component: DemoToast },
    { path: '/DemoApi', name: 'DemoApi', meta: { keepAlive: true, title: '接口请求示例' }, component: DemoApi }
  ]
})
