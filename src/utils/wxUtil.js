import qs from 'qs'
import axios from 'axios'
export default (function() {
    function isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    }
    function configWXshare(shareInfo) {
        console.log('开始配置微信分享', shareInfo)
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:favorite']
        })
        // 好友分享
        wx.updateAppMessageShareData({
            title: shareInfo.title,
            desc: shareInfo.desc.substring(0, 25),
            link: shareInfo.link,
            imgUrl: shareInfo.imgUrl,
            success: shareAppMessage
        })
        // 朋友圈分享
        wx.updateTimelineShareData({
            title: shareInfo.title,
            link: shareInfo.link,
            imgUrl: shareInfo.imgUrl,
            success: shareTimeline
        })
        function shareAppMessage() {
            console.log('配置好友分享成功')
        }
        function shareTimeline() {
            console.log('配置朋友圈分享成功')
        }
    }

    function error(options) {
        if(!options) {
            throw new Error('options 不存在')
        }
        console.log('hello')
    }
/**
 * 获取微信签名
 * @param {*} ctx 
 * @param {*} callback 获取签名成功后回调函数
 * @param {Object} options 参数配置项
 * @param {String} options.appKey 实际的appKey
 * @param {String} options.url 实际的appKey
 * 
 */
    function getSignature(ctx, options = {}, callback) {
        console.log('开始请求获取微信签名')
        if(!options.url || !options.appKey) {
            let errorMsg = 'appkey or url is required in options'
            throw new Error(errorMsg)
        }
        let param = {
            appKey: options.appKey,
            url: location.href.split('#')[0] //(location.origin + location.pathname)
        }
        console.log('微信签名请求参数:', param)
        axios({
            url: options.url,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(param)
        }).then(res => {
            if (res.data.code === 0) {
                if (callback && callback.apply) {
                    callback.apply(ctx, [res.data.data])
                }
            }
        }).catch(err => {
            console.error(err)
        })
    }
    //第三个参数：配置实际的appKey
    function configWX(ctx, callback, show) {
        console.log('开始配置微信')
        //此处配置实际的appKey
        getSignature(ctx, {appKey: 'xxxxxx'}, function(data) {
            if (data) {
                wx.config({
                    //debug: true,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems',
                        'hideOptionMenu', 'showOptionMenu', 'showAllNonBaseMenuItem', 'updateAppMessageShareData', 'updateTimelineShareData']
                })

                wx.ready(function() {
                    console.log('wx ready')
                    if (show) {
                        wx.showAllNonBaseMenuItem()
                    } else {
                        wx.hideAllNonBaseMenuItem()
                        if (callback && callback.apply) {
                            callback.apply(ctx, [data])
                        }
                    }
                })

                wx.error(function(error) { // res
                    console.log('wx error', error)
                })
            }
        })
    }

    return {
        isWeiXin: isWeiXin,
        getSignature: getSignature,
        configWX: configWX,
        configWXShare: configWXshare
    }
})()
