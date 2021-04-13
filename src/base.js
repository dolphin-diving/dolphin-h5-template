/*
* created by linanyi 2019-12-24
* 初始化
*/
import config from './config.js'
import {toNum,getQueryString,objectToQuery} from './utils/util.js'
import {burialPoint} from './http/api'
export default {
    data() {
        return {
            env: config.env,//开发环境:sit-测试,prod-生产
            channelId: getQueryString('channelId') || '',//事业部渠道ID
            mediumid:getQueryString('fm')||'007iot',//投放渠道
	        spreadId: '',//传播者ID
            isMeiju: this.$mjUtil.isMeiju(),
            isWeiXin: this.$wxUtil.isWeiXin(),
            isSupportedVersion:true
        }
    },
    methods:{
        /**
         * 页面跳转
         * @param pagePath 目标页面
         */
        pageJump(pagePath = "", params = {}) {
	        if (this.isMeiju) {
		        let afterUrl = ""
		        if (Object.keys(params).length>0) afterUrl = '&'+objectToQuery(params)
		        this.$bridge.goToMeijuPage('jumpWebView', {
			        url: `${location.origin}${location.pathname}${location.search}${afterUrl}#/${pagePath}`,
			        needNavi: '0'
		        })
	        } else {
		        this.$router.push({
			        path: pagePath,
			        query: params
		        })
	        }
        },
	    /**
	     * 字节埋点
	     * @param action 事件英文名
	     * @param params {json} 属性名称
	     */
	    trackEvent(action, params) {
		    let trackParams = {
			    'event': action,
			    'eventParams': {
				    module: '活动',
				    ...params
			    }
		    }
		    burialPoint(trackParams)
	    },
        /**
         * 配置右上角分享按钮
         * @param setupMenuShow 1-显示美居内右上角按钮;0-隐藏
         */
        configSetupMenu(setupMenuShow=''){
            let link = location.href
            if (this.isMeiju) {
                if (setupMenuShow==1) {
                    this.$mjUtil.configMJ(this, ()=>{})
	                this.$mjUtil.configMJMenu(this, {
	                	//types:['wx','wxTimeline','qq','qzone','weibo'],
		                title: config.shareTitle,
		                desc: config.shareDesc,
		                link: link,
		                imgUrl: config.shareImgUrl
	                })
                }else {
                    this.$bridge.setupMenu({items: []});//消息推送窗口隐藏右上角菜单
                }
            } else if (this.isWeiXin) {
	            this.$wxUtil.configWX(this, ()=>{
		            this.$wxUtil.configWXShare({
			            title: config.shareTitle,
			            desc: config.shareDesc,
			            link: link,
			            imgUrl:config.shareImgUrl
		            })
	            })
            }
        }
    },
    created() {
        if (!this.isMeiju) return
        let self = this
        if (toNum(this.$store.state.appVersion) < toNum(config.compatibleMeijuVer)) {
            self.isSupportedVersion = false;
        }
    }
}
