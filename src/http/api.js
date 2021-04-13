/*
* created by linanyi 2019-12-24
* update 2021-04-09
* 请求接口相关方法
*/
import request from './request'
import { getUID, generateStamp, objectToQuery, getQueryString, isIos, toNum, Toast } from '../utils/util.js'
import { Base64 } from 'js-base64'
import mjUtil from '../utils/mjUtil'
import config from '../config'
import errorMsgMap from './errorMsg'

let env = config.env
const localUserDataKey = `${config.activityId}_userData`
const HOST = `https://mp-${env}.smartmidea.net/mas/v5/app/proxy?alias=`
const BURIAL_POINT_URL = `https://mp-${env}.smartmidea.net/mop/v5/app/actions/sendmsgCustom`
const LOGON_PATH = (location.origin + location.pathname.replace(/\d{6}\//,'')).replace(/\/[0-9a-zA-z-]*\/index\.html/, '/logon/index.html')

//配置接口地址
let serviceList = {
	//业务接口
	teamInfoByNum:'/v1/activity/posting/team/infoByNum',//(美居内)根据团队编号获取团队信息
	teamInfoByNum_web:'/v1/activity/posting/team/infoByNum_web',//(美居外)根据团队编号获取团队信息

	//通用接口
	authorizeWechat:'/v1/activity/wechat/authorize/state',// (美居内)查询用户是否已经微信授权
	getAreaList: '/v1/activity/province/city/list',//(美居内外通用)获取省市区数据列表
	spreadId:'/v1/activity/spread/id/get',//(美居内)获取用户的传播者ID
	spreadId_web:'/v1/activity/spread/id/get_web',//(美居外)获取用户的传播者ID
	getUserInfoOnline:'/ccrm2-core/userApi/getUserInfo',//(美居内)中控-获取用户信息(手机号码)
	getUserInfoOnline_web:'/ccrm2-core/userApi/getUserInfo_web',//(美居外)中控-获取用户信息(手机号码)
}
//获取当前用户的传播者id
export function getSpreadId(params = {}) {
	let url = mjUtil.isMeiju() ? serviceList.spreadId : (HOST + serviceList.spreadId_web)
	return requestWrapper(url,params);
}
//获取省市区数据
export function getAreaData(param = {}) {
	let url = mjUtil.isMeiju() ? serviceList.getAreaList : (HOST + serviceList.getAreaList)
	return requestWrapper(url, {src:'activity',...param})
}
// 查询用户是否已经微信授权()
export function checkAuthorizeWechat() {
	let url = serviceList.authorizeWechat
	return requestWrapper(url)
}
// 查询团队信息
export function getMyTeamInfo(params = {}) {
	let url = mjUtil.isMeiju() ? serviceList.teamInfoByNum : (HOST + serviceList.teamInfoByNum_web);
	return requestWrapper(url, params);
}

export function getCommonParams() {
	return {
		stamp: generateStamp(),
		reqId: getUID(),
		activityId: config.activityId,//活动编号，由云平台定义
	}
}

/**
 * 请求接口通用方法
 * @param url 接口地址
 * @param params 接口入参
 * @param method 请求方式
 * @param needClientData 美居爱加密风控开关
 * @param needBase64 美居返回数据base64编译后返回 true-编译 false-不编译
 * @returns {Promise<unknown>}
 */
export async function requestWrapper(url,params = {},method='POST',needClientData=false,needBase64=false) {
	let userData = {}
	if (!mjUtil.isMeiju()) {
		userData = await getUserData()
	}
	if (method == 'GET' && Object.keys(params).length>0) {
		url = url.concat(`&${objectToQuery(params)}`)
	}
	return new Promise((resolve, reject) => {
		if (mjUtil.isMeiju()) {
			let param = {}
			if (method == 'POST') {
				param = {
					url: url, // 请求接口路径,
					method: method,
					headers: {}, // 请求header
					data: {
						...getCommonParams(),
						...params
					} // 请求参数
				}
			}else {
				param = {
					url: url, // 请求接口路径,
					method: method,
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					}, // 请求header
					data: {}
				}
			}
			if(!isIos() && needClientData){//爱加密风控字段
				param.needClientData=true
			}
			if (needBase64) {
				param.needBase64 = needBase64
			}
			window.mdSmartios.bridge.sendCentralCloundRequest(param, (resp) => {
				// 美居内过滤英文引号再返回
				if (needBase64) {
					let respStr = Base64.decode(resp);
					let dataStr = respStr
						.replace(new RegExp("\\\\'", "gm"), "")
						.replace(new RegExp('\\\\"', "gm"), "")
					resp = JSON.parse(dataStr)
					console.info(`${url} needBase64 resp`, resp)
				}
				if(!!resp.errorCode && resp.errorCode!=0){ // 美居报错
					Toast(resp.errorMessage || errorMsgMap.errorMsg['commonMsg'])
					reject(resp)
					return
				}
				let code = resp.code
				code = parseInt(code)
				if (code === 0) {
					resolve(resp)
				} else {
					console.error(param, resp)
					if (code > 3000 && code < 4000){ // 云平台返回错误码
						if (errorMsgMap.errorMsg[code] !== (void 0)){
							// 在错误码表里定义的错误,统一toast提示
							Toast(errorMsgMap.errorMsg[code])
						}
					}else { //其他系统异常
						Toast(errorMsgMap.errorMsg[code] || errorMsgMap.errorMsg['commonMsg'])
					}
					reject(resp)
				}
			}, (error) => {
				console.error(param, error)
				let msg = (error.message).toLowerCase()
				if(msg.includes('network error')){
					Toast(errorMsgMap.errorMsg['netErrorMsg'])
				}else if (msg.includes('timeout')){
					Toast(errorMsgMap.errorMsg['timeoutMsg'])
				}else {
					Toast(errorMsgMap.errorMsg['commonMsg'])
				}
				reject(error)
			})
		} else {
			let headers = {}
			if(method == 'POST'){
				headers = {'Content-Type': 'application/json'}
			}else {
				headers = {"Content-Type": "application/json;charset=utf-8"}
			}
			if (userData && userData.mdata && userData.mdata.accessToken) {
				headers['access-token'] = userData.mdata.accessToken
			}
			let param = {}
			if (method == 'POST') {
				param = {
					url: url,
					method: method,
					headers: headers,
					data: {
						...getCommonParams(),
						...params
					}
				}
			}else {
				param = {
					url: url,
					method: method,
					headers: headers,
					data: {}
				}
			}
			request(param).then(resp => {
				let code
				if (!!resp.data){
					code = resp.data.code
				}
				if (code === 0) {
					resolve(resp.data)
				} else if (code === 40002 || code === 99) {
					localStorage.removeItem(localUserDataKey) //清除登录态
					if (url.includes('_web')){ //token过期重新登录（此处判断条件'_web'可根据接口自定义）
						if (config.env === 'sit') alert('(SIT弹窗)token失效,请重新登录')
						gotoLogon(500)
					}
				} else {
					console.error(param, resp)
					if (code > 3000 && code < 4000){ // 云平台返回错误码
						if (errorMsgMap.errorMsg[code] !== (void 0)){
							// 在错误码表里定义的错误,统一toast提示
							Toast(errorMsgMap.errorMsg[code])
						}
					}else { //其他系统异常
						Toast(errorMsgMap.errorMsg[code] || errorMsgMap.errorMsg['commonMsg'])
					}
					reject(resp.data)
				}
			}).catch(error => {
				console.error(param, error)
				let msg = (error.message).toLowerCase()
				if(msg.includes('network error')){
					Toast(errorMsgMap.errorMsg['netErrorMsg'])
				}else if (msg.includes('timeout')){
					Toast(errorMsgMap.errorMsg['timeoutMsg'])
				}else {
					Toast(errorMsgMap.errorMsg['commonMsg'])
				}
				reject(error)
			})
		}
	})
}
export function getUserData() {
	return new Promise((resolve, reject) => {
		if (mjUtil.isMeiju()) {
			window.mdSmartios.bridge.getAppInfo(data => {
				if (toNum(data.appVersion) < toNum('6.4.0')) {
					window.mdSmartios.bridge.getUserInfo(data => {
						console.info(data)
						if (data && data.userId) {
							resolve(data)
						} else {
							resolve()
						}
					})
				}else {
					window.mdSmartios.bridge.getUserInfoBase64(data => {
						let u = JSON.parse(Base64.decode(data))
						console.info(u)
						if (data && u.userId) {
							resolve(u)
						} else {
							resolve()
						}
					})
				}
			})
		} else {
			let sessionUserData = sessionStorage.getItem('userData')
			if (sessionUserData) {
				let userData = JSON.parse(sessionUserData)
				resolve(userData)
			} else {
				let localUserData = localStorage.getItem(localUserDataKey)
				if (localUserData) {
					resolve(JSON.parse(localUserData))
				} else {
					// eslint-disable-next-line
					resolve()
				}
			}
		}
	})
}
export function checkLogon() {
	return new Promise((resolve, reject) => {
		getUserData().then((data) => {
			if (data) {
				console.log('已登录')
				resolve(true)
			} else {
				console.log('未登录')
				reject(false)
			}
		})
	})
}

/**
 * 跳转登录页
 * @param timeout      延时跳转
 * @param isNeedReload 刷新当前页
 * @param targetUrl  登录成功后返回指定页面
 */
export function gotoLogon(timeout = 0, isNeedReload = true,targetUrl) {
	if (mjUtil.isMeiju()) {
		window.mdSmartios.bridge.goToMeijuPage('jumpNative', {
			pageName: 'login',
			needNavigation: '1',
			needTabbar: '1'
		})
	} else {
		sessionStorage.removeItem('userData')
		localStorage.removeItem(localUserDataKey)
		let activityId = getQueryString('activityId') || config.activityId
		let channelId = getQueryString('channelId') || ''
		let mediumId = getQueryString('fm') || ''    //投放渠道ID
		//登录后跳转指定页面
		let adjParam = ''
		if (targetUrl) {
			adjParam = '&targetUrl='+encodeURIComponent(targetUrl)
		}
		// 设置timeout因为在打开页面就跳转的时，页面未加载完成就跳转，历史栈没有保留，导致登录后无法返回的问题
		setTimeout(() => {
			location.href = `${LOGON_PATH}#/?isKeep=Y&appKey=${config.appKey}&appId=${config.appId}&activityId=${activityId}&channelId=${channelId}&mediumid=${mediumId}${adjParam}&t=${new Date().getTime()}`
			if (!isIos()) return;
			if (isNeedReload) {
				setTimeout(() => {
					// 设置reload因为部分版本的浏览器返回后没有触发visibilitychange，导致登录返回后没有刷新页面的问题
					location.reload()
				}, 500)
			}
		}, timeout)
	}
}

/**
 * 埋点接口
 * @param params
 */
export function burialPoint(params = {}) {
	if (mjUtil.isMeiju()) {
		if(config.eventTrackType === 'mj'){
			let param = {
				pluginType: 1,
				...params
			}
			window.mdSmartios.bridge.burialPoint(param, null, null)
		}else { // 6.8开始支持
			console.log('字节埋点meiju~')
			window.mdSmartios.bridge.trackEvent(params, null, null)
		}
	} else {
		if(config.eventTrackType === 'mj'){
			let burialData = {
				topic: 'app_operate_point',
				msgJson: JSON.stringify({
					createTime: +new Date(),
					...params
				})
			}
			let data = ''
			for (let it in burialData) {
				data += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(burialData[it])
			}
			data = data.substr(1)
			return request({
				url: BURIAL_POINT_URL,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data
			})
		}else {
			console.log('字节埋点web~', params)
			window.collectEvent(params.event, params.eventParams)
		}
	}
}
