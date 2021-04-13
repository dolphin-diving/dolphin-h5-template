<template>
    <div class="demo-wrapper">
        <div class="demo-btn-yellow" @click="showLoading">显示海报弹窗</div>
    </div>
</template>

<script>
import base from '../../base'
export default {
    data() {
        return {
            back: true
        }
    },
    mixins: [base],
    methods: {
        showLoading() {
            // 分享链接
            let url = `${location.origin}${location.pathname}#/Invite?teamNumber=35NQ9&channelId=IoT}`
            if (this.isWeiXin) { // 微信分享，需对带#的链接做特殊处理
                url = `${location.origin}${location.pathname}?#/Invite?teamNumber=35NQ9&channelId=IoT}`
            }
            // 显示海报弹窗
            this.$poster.showPosterBox({
                inviteUrl: url,
	            appVersion: this.$store.state.appVersion
            }).then(() => {
                console.log('confirm')
                this.back = true
            }).catch(() => {
                this.back = true
            })
            this.back = false
        }
    },
    // 开启导航守卫，若海报弹窗处于显示状态，路由返回要强制关闭弹窗
    beforeRouteLeave(to, from, next) {
        if (this.back) {
            next()
        } else {
            this.$poster.cancel()
            this.back = true
            next()
        }
    }
}
</script>

<style scoped>
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
        border-radius:120px;/*no*/
    }
    .demo-wrapper{
        height: 100vh;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
