<template>
    <div class="demo-wrapper column center">
        <div class="demo-btn-yellow" @click="showDialog1">默认样式</div>
        <div class="demo-btn-yellow" @click="showDialog2">无取消按钮</div>
        <div class="demo-btn-yellow" @click="showDialog3">无标题</div>
    </div>
</template>

<script>
import {formatDate} from '../../utils/util'
import config from '../../config.js'
export default {
    data() {
        return {
            back: true
        }
    },
    // 开启导航守卫，若dialog弹窗处于显示状态，路由返回要强制关闭弹窗
    beforeRouteLeave(to, from, next) {
        try {
            this.$dialog.cancel()
        } catch (e) {}
        next()
    },
    methods: {
        showDialog1() {
            this.$dialog.showDialogBox({
                title: '温馨提示',
                message: formatDate('yyyy年MM月dd日hh点', config.closeTime) + '将公布中奖名单，敬请关注~'
            }).then(() => {
                console.log('confirm')
            }).catch(() => {

            })
        },
	    showDialog2() {
		    this.$dialog.showDialogBox({
			    title: '您的手机还没安装微信App',
			    isShowCancelBtn: false,
			    confirmText: '我知道了',
			    message: '红包将直接发放至您的微信账号，请在手机上安装微信App后参与，否则红包无法正常发放 '
		    })
	    },
	    showDialog3() {
		    this.$dialog.showDialogBox({
			    isShowTitle: false,
			    isShowCancelBtn: false,
			    confirmText: '我知道了',
			    message: '您的微信当前登录账号与美的美居App绑定的微信账号不一致，请切换至同一账号后参与活动，否则红包无法正常发放'
		    })
	    }
    }
}
</script>

<style scoped>
    .demo-wrapper{
        height: 100vh;
        padding: 0 60px;
    }
    .demo-btn-yellow{
        width:100%;
        height:100px;
        line-height:100px;
        text-align: center;
        letter-spacing:1px;
        font-size:36px;/*px*/
        color:rgba(51,51,51,1);
        background:linear-gradient(180deg,rgba(255,216,69,1) 0%,rgba(255,238,114,1) 10%,rgba(255,168,29,1) 100%);
        box-shadow:0 5px 0 0 rgba(196,53,50,1);/*no*/
        border-radius:49px;/*no*/
        margin-bottom: 100px;
    }
</style>
