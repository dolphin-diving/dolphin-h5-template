var env = 'prod'
if (window.location.href.includes('/sit/') || process.env.NODE_ENV === 'development') {
    env = 'sit'
}

export default {
    env: env,
    appId: 'xxxxxx', //需配置实际的appId
    appKey: 'xxxxxx', //需配置实际的appkey
    activityId: 'xxxxxx', //需配置实际的活动ID
    compatibleMeijuVer:'6.8.0',//最低兼容的美居版本号
	eventTrackType:'rangers', // 埋点方案：rangers-字节SDK(美居6.8开始支持)，mj-美居旧版本埋点
    setupMenuShow:1,//1-(美居)显示并配置右上角按钮 0-隐藏右上角按钮
	setupMenuType:'share',//(美居)右上角按钮类型：share-分享 reload-刷新
    shareTitle: '分享标题文案~',
    shareDesc: '分享描述文案！',
	shareImgUrl:'',//分享小图
	mjAccountQRUrl:'https://activity.msmartlife.cn/activity/202012/mallSeckill/saved.png', // 美居公众号二维码(红包活动)
    closeTime: '2021/3/11 23:59:59', //结束
    endTime: '2021/3/18 23:59:59'   //下线
}
