import config from '../config'
export default (function() {
	'use strict'
	function isMeiju() {
		let ua = navigator.userAgent.toLowerCase()
		// eslint-disable-next-line
		if (/meiju|msmart/.test(ua)) {
			return true
		} else {
			return false
		}
	}

	function configMJ(vm, callback) {
		console.log('开始配置美居右上角按钮,type=',config.setupMenuType)
		let setupParams = [{
			key: config.setupMenuType, // 菜单标示
			icon: config.setupMenuType==='share'?'https://www.smartmidea.net/activity/common/images/ic_shareto@3x.png':'https://www.smartmidea.net/activity/202010/smartLink/refresh.png',
			desc: config.setupMenuType==='share'?'分享':'刷新' // 菜单描述，若没有配置icon则显示描述
		}]
		vm.$bridge.setupMenu({items: setupParams}, callback, callback)
	}
	function configMJMenu(vm, shareInfo, callback) {
		console.log('配置美居分享参数：', shareInfo===(void 0)?'reload':shareInfo)
		$(document).unbind('receiveMessageFromApp').bind('receiveMessageFromApp', {}, function(event, message) {
			console.log('bind receiveMessageFromApp: ', message)
			if (typeof message == 'string') {
				message = JSON.parse(message)
			}
			if (message.messageType == 'menuItemClick' && message.messageBody.key == 'reload'){
				window.location.reload()
			} else if (message.messageType == 'menuItemClick' && message.messageBody.key == 'share') {
				// 右上角分享菜单点击事件
				if (shareInfo.types) {
					let shareParams = {
						...shareInfo
					}
					vm.$bridge.showSharePanel(shareParams, function() {}, function() {})
				} else {
					vm.$bridge.UMengshare({
						title: shareInfo.title, // 分享的标题
						content: shareInfo.desc, // 分享的内容
						url: shareInfo.link, // 分享的链接
						pic: shareInfo.imgUrl // 分享的图片链接
					}, () => {}, () => {})
				}
			}
			if (callback && callback.apply) {
				callback.apply(vm, [message])
			}
		})
	}

	return {
		isMeiju: isMeiju,
		configMJ: configMJ,
		configMJMenu: configMJMenu
	}
})()
