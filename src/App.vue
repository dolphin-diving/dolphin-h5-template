<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import config from './config'
import {iPhoneXcompatible, toNum} from './utils/util.js'
export default {
    provide() {
        return {
            app: this
        }
    },
    created() {
        const that = this
	    if (!that.$mjUtil.isMeiju()) return
	    let self = this
        // 兼容美居iPhoneX底部留白。底部安全距离计算方式美居5.7与其他版本不同，5.7可用js给父元素加上paddingBottom=100px
        if (iPhoneXcompatible()) {
	        try {
		        mdSmartios.bridge.setBottomStatusBar({
			        isDisplay: false// 选填参数，设置是否显示下面安全区域，true:下面安全区域高度属于APP控制，false:下面安全区域高度属于H5
			        // 勿设置bgColor参数，否则会造成iPhoneX加载前页面闪烁
		        })
	        } catch (e) {
	        	console.error(e)
	        }
        }
	    // 查询app版本号
	    mdSmartios.bridge.getAppInfo(data => {
		    self.$store.commit('updateAppVersion', data.appVersion) // 美居当前版本号，保存至全局变量
		    console.info(`meiju version:${this.$store.state.appVersion}`)
	    })
    }
}
</script>
