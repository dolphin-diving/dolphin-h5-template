<template>
    <div>
        <!--iPhoneX增加高度，避免刘海条遮挡-->
        <div :class="['footer',iPhoneXcompatible?'height-ipx':'']">
            <img src="https://m-apps.oss-cn-shenzhen.aliyuncs.com/30001/logo.png" alt="logo">
            <p>美的美居，享受美好生活</p>
            <div class="btn-to-mj" @click="jumpToApp">
                <span>打开美的美居App</span>
            </div>
        </div>
    </div>
</template>

<script>
import {iPhoneXcompatible, isIos} from '../../utils/util'
import base from '../../base.js'
export default {
    mixins: [base],
    name: 'launchApp',
    components: {},
    data() {
        return {
            rewriteURL: '',
            iPhoneXcompatible: iPhoneXcompatible(),
            isIos: isIos()
        }
    },
    props: {
	        pgfromParam: String, // 下载引导页面的url参数，例如: BL-XYJ
	        targetUrl: String, // 需跳转至美居内指定页面的url
	        iosDownload: String, // ios的通用链接设置了404重定向，打不开美居时会直接跳转rewriteURL设置的地址
	        androidDownload: String
    },
    methods: {
        /**
             * 外部app调起美居
             */
        jumpToApp () {
	            if (this.iosDownload == '0') {
		            this.rewriteURL = 'https://apps.apple.com/cn/app/id948600146?mt=8'// Apple Store
	            } else if (this.iosDownload == '1') {
		            this.rewriteURL = `http://iot4.midea.com.cn/downloads/app/index.html?pgfrom=${this.pgfromParam ? this.pgfromParam : ''}`// 美居通用下载引导页
	            } else {
		            this.rewriteURL = this.iosDownload || ''
	            }
	            let scheme = this.isIos ? `https://i.msmartlife.com/share?rewriteURL=${encodeURIComponent(this.rewriteURL)}&` : 'meiju://com.midea.meiju/main?'
	            let downloadUrl = `http://iot4.midea.com.cn/downloads/app/index.html?pgfrom=${this.pgfromParam ? this.pgfromParam : ''}`
	            let yingyongbao = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.midea.ai.appliances'
	            let androidMarket = 'market://details?id=com.midea.ai.appliances'
	            let apkUrl = 'http://iot4.midea.com.cn/v1/downloads/app?redirect=true&a=a.apk'
	            let openUrl = ''
	            if (this.isWeiXin && !this.isIos) {
		            window.location.href = yingyongbao
		            return
	            }
	            if (!!this.targetUrl && this.targetUrl.length > 1) {
		            openUrl = `${scheme}type=jumpElecBusiness&needNavi=1&url=${this.targetUrl}`
	            } else {
		            openUrl = `${scheme}type=jumpElecBusiness&pageName=home&needNavi=1`
	            }
	            if (this.androidDownload == '0') {//eslint-disable-line
		            downloadUrl = androidMarket // 跳转应用市场
	            }else if (this.androidDownload == '1') {//eslint-disable-line
		            downloadUrl = apkUrl // 直接下载安卓安装包
	            }
	            this.aCallAPP(openUrl, downloadUrl)
        },
	        aCallAPP (url, downloadUrl) {
		        let timeout
		        let t = Date.now()
		        let interval = 2000
		        timeout && clearTimeout(timeout)
		        timeout = setTimeout(function () {
			        if (Date.now() - t < interval + 1000) {
				        location.href = downloadUrl
			        }
		        }, interval)
		        document.addEventListener(
			        'visibilitychange',
			        function () {
				        clearTimeout(timeout)
			        }, false)
		        window.addEventListener('pagehide', function () {
			        clearTimeout(timeout)
		        }, false)
		        window.location.href = url
	        }
    }
}
</script>
<style lang="scss" scoped>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        background: #fff;
        height: 108px;
        width: 100%;
        padding: 0 32px;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .1);
        p {
            flex: 1;
            margin-left: 7px;
        }
        img {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: #ffffff;
        }
        .btn-to-mj {
            min-width: 228px;
            height: 56px;
            border-radius: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #267aff;
            &:active {
                background-color: #1a64d8;
            }
            span {
                font-size: 24px;/*px*/
                color: #ffffff;
            }
        }
    }
    .height-ipx {
        height: 118px;
        padding-bottom: 22px;
    }
</style>
