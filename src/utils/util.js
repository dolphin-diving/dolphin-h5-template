/*
* created by linanyi 2019-12-24
* 工具类
*/
function getUID() { // get UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

function generateStamp() {
    let nowTime = new Date()
    let month = nowTime.getMonth() + 1
    month = month < 10 ? '0' + month : '' + month
    let date = nowTime.getDate()
    date = date < 10 ? '0' + date : '' + date
    let hour = nowTime.getHours()
    hour = hour < 10 ? '0' + hour : '' + hour
    let minite = nowTime.getMinutes()
    minite = minite < 10 ? '0' + minite : '' + minite
    let second = nowTime.getSeconds()
    second = second < 10 ? '0' + second : '' + second
    return (
        '' +
        nowTime.getFullYear() +
        month +
        date +
        hour +
        minite +
        second
    )
}
function objectToQuery(obj) {
    return Object.keys(obj).map(k =>
        k + '=' + obj[k]
    ).join('&')
}
function getQueryString(key) {
    // key存在先通过search取值如果取不到就通过hash来取
    let after = window.location.search.substr(1) || window.location.hash.split('?')[1]
    if (after) {
        if (!after.includes(key)) {// 微信分享带参数的链接，做特殊处理
            after = window.location.hash.split('?')[1]
            if (!after){//无自带参数
                return null
            }
        }
        let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
        let r = after.match(reg)
        if (r != null) {
            return decodeURIComponent(r[2])
        } else {
            return null
        }
    } else {
        return null
    }
}
function getParams() {
    let params = window.location.search.substr(1) || window.location.hash.split('?')[1]
    if (params == '') {
        return null
    }
    if (params) {
        if (params.includes('from')) {// 微信分享带参数的链接，做特殊处理
            params = window.location.hash.split('?')[1]
        }
    }
    return params
}
function toNum(a) {
    let b = a.toString();
    let c = b.split('.');
    const r = ['0000', '000', '00', '0', ''];
    for (let i = 0; i < c.length; i++) {
        let len = c[i].length;
        c[i] = r[len] + c[i];
    }
    let res = c.join('');
    return res;
}
function formatDate(fmt,d) {
    let date = new Date(d);
    let o = {
        "M+" : date.getMonth()+1,  //月份
        "d+" : date.getDate(),     //日
        "h+" : date.getHours(),    //小时
        "m+" : date.getMinutes(),  //分
        "s+" : date.getSeconds(),  //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds()    //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
function isLottieSize() {
    let ua = navigator.userAgent.toLowerCase()
    if (/vivo/.test(ua) && /5.0.2/.test(ua)) {
        return true
    } else {
        return false
    }
}
function isIos() {
    let ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
        return true
    } else {
        return false
    }
}
function iPhoneXcompatible(){
    if (!isIos()) return;
    let userAgent = window.navigator.userAgent
    let devicePixelRatio = window.devicePixelRatio
    let width = window.screen.width
    let height = window.screen.height
    // iPhone X、iPhone XS、iPhone 11 Pro
    let isIPhoneX = /iphone/gi.test(userAgent) && devicePixelRatio && devicePixelRatio === 3 && width === 375 && height === 812;
    // iPhone XS Max、iPhone 11 Pro Max
    let isIPhoneXSMax = /iphone/gi.test(userAgent) && devicePixelRatio && devicePixelRatio === 3 && width === 414 && height === 896;
    // iPhone XR、iPhone11
    let isIPhoneXR = /iphone/gi.test(userAgent) && devicePixelRatio && devicePixelRatio === 2 && width === 414 && height === 896;
    if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
        return true;
    }else {
        return false;
    }
}
function isAndroid5() {
    if (isIos()) return false;
    let ua = navigator.userAgent.toLowerCase()
    let index = ua.indexOf("android")
    let androidVersion = parseFloat(ua.slice(index+8));
    if(androidVersion<6){
        return true
    }else {
        return false
    }
}
function Toast(msg,duration){
    console.log("Toast - "+!!document.getElementById('errToast'))
    if (!!document.getElementById('errToast')){
        return
    }
    duration=isNaN(duration)?2500:duration;
    let m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="max-width:70%;min-width:56vw;padding:.32rem;color: rgb(255, 255, 255);line-height: 1.5em;text-align: center;border-radius: .24rem;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 2000;background: rgba(17, 17, 17, 0.7);font-size: .32rem;";
    m.setAttribute('id','errToast')
    document.body.appendChild(m);
    setTimeout(function() {
        let d = 0.5;
        m.style.transition = 'transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 600);
    }, duration);
}
function loadImage(url, callback) {
    //创建一个Image对象，
    let img = new Image();
    img.src = url;
    // 如果图片已经存在于浏览器缓存，直接调用回调函数
    if (img.complete) {
        callback.call(this, img);
        return;
    }
    //图片下载完毕时异步调用callback函数。
    img.onload = () => {
        callback.call(this, img);
    };
}
//解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
const ModalHelper = ((bodyCls) => {
    let scrollTop;
    return {
        afterOpen: function () {
            try {
                scrollTop = document.scrollingElement.scrollTop;
            }catch (e) {//兼容Android<6 (oppo，vivo低版本浏览器不支持scrollingElement)
                scrollTop = Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)
            }
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function () {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            try {
                document.scrollingElement.scrollTop = scrollTop;
            }catch (e) {
                window.scrollTo(0, scrollTop);
            }
        }
    };
})('popup-open');
export { getUID,generateStamp,objectToQuery,getQueryString,getParams,toNum,formatDate,isLottieSize,isIos,iPhoneXcompatible,isAndroid5,Toast,loadImage,ModalHelper}
