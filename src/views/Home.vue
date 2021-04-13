<template>
    <div>
        <h2 class="text-center">运营活动业务组件</h2>
        <ul>
            <li @click="m('AddressPicker')">全国城市级联弹窗</li>
            <li @click="m('Dialog')">模态框</li>
            <li @click="m('Toast')">toast提示</li>
            <li @click="m('Loading')">等待加载动画</li>
            <li @click="m('Rule')">活动规则弹窗</li>
            <li @click="m('Poster')">海报弹窗</li>
            <li @click="m('IosHint')">美居内苹果公司免责声明</li>
        </ul>
        <h2 class="text-center">调用接口</h2>
        <ul>
            <li @click="m('Api')">查看接口调用示例</li>
        </ul>
        <h2 v-if="isMeiju" class="text-center">美居路由跳转</h2>
        <ul v-if="isMeiju" class="last">
            <li @click="toAddDevice">打开扫一扫配网 (跳转APP原生页面)</li>
            <li @click="toCommunity">社区中心 (跳转weex页)</li>
            <li @click="toCardCenter">卡券中心 (跳转weex页)</li>
            <li @click="toWelfare">会员福利社 (跳转电商h5页)</li>
            <li @click="toOrder">查看我的订单 (跳转电商weex页)</li>
        </ul>
        <launch-app v-if="!isMeiju" :targetUrl = '"https://www.smartmidea.net/activity/sit/202002/activity-demo/index.html"'></launch-app>
    </div>
</template>

<script>
import base from '../base.js'
import config from '../config'
import LaunchApp from '../components/launchApp'
import {toNum} from '../utils/util'
export default {
    components: {
        LaunchApp
    },
    mixins: [base],
    // 在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        next()
    },
    // 进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter (to, from, next) {
        next(vm => {
            document.body.scrollTop = vm.scrollTop
        })
    },
    mounted() {
	    // 配置右上角按钮
	    this.configSetupMenu(config.setupMenuShow)
    },
    methods: {
        m(index) {
            this.pageJump('Demo' + index)
        },
        // 美的统一路由跳转 http://confluence.msmart.com/pages/viewpage.action?pageId=10020956
        toAddDevice() {
            this.$bridge.goToMeijuPage('jumpNative', {
            	pageName: 'addDevice',
                needNavigation: '1',
                needTabbar: '1'
            })
        },
        toCommunity() {
            this.$bridge.goToMeijuPage('jumpWeex', {
                pageName: 'community',
                needNavi: '1'
            })
        },
        toCardCenter() {
            this.$bridge.goToMeijuPage('jumpWeex', {
                url: 'card-center/weex.js',
                needNavi: '1'
            })
        },
        toWelfare() {
            this.$bridge.goToMeijuPage('jumpElecBusiness', {
                url: 'https://mvip.midea.cn/my/score_welfare/index',
                needNavi: '1'
            })
        },
        toOrder() {
	        if (toNum(this.appVersion) < toNum('6.9')) {
	        	this.$dialog.showDialogBox({
                    title: '当前版本太低',
                    message: 'jumpElecBusinessWeex从6.9才开始支持，请转换成html地址后使用jumpElecBusiness跳转'
                })
		        return
	        }
            this.$bridge.goToMeijuPage('jumpElecBusinessWeex', {
                url: 'dist/pages/order/deal_index.js?androidback',
                needNavi: '1'
            })
        }
    }
}
</script>
<style scoped>
    div{
        background-color: #F7F7F7;
    }
    h2{
        padding: 40px 0;
        border-bottom: 1px solid #ddd;/*no*/
        font-size: 36px;/*px*/
    }
    li{
        position: relative;
        color: #333;
        font-size: 30px;/*px*/
        padding: 30px 40px;
        border-bottom: 1px solid #ddd;/*no*/
    }
    li:after{
        content: '';
        display: inline-block;
        position: absolute;
        top: 40px;
        right: 40px;
        width: 20px;
        height: 20px;
        border-top: 2px solid #ddd;/*no*/
        border-right: 2px solid #ddd;/*no*/
        transform: rotate(45deg);
    }
    .last{
        padding-bottom: 110px;
    }
</style>
