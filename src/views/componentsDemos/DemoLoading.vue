<template>
    <div class="demo-wrapper">
        <div class="demo-btn-yellow" @click="showLoading1">显示加载中动画(3s后消失)</div>
        <div class="demo-btn-yellow" @click="showLoading2">显示“请稍等”动画</div>
        <div class="demo-btn-yellow" @click="showLoading3">显示加载中动画，页面有遮罩</div>
    </div>
</template>

<script>
export default {
    methods: {
        showLoading1() {
            // 显示loading动画
            this.$loading.show()
            // 3s后关闭loading动画
            this.clearLoading()
        },
	    showLoading2() {
		    // 显示loading动画
		    this.$loading.show('请稍等')
		    // 3s后关闭loading动画
		    this.clearLoading()
	    },
	    showLoading3() {
		    // 显示loading动画
		    this.$loading.show('加载中', true)
		    // 3s后关闭loading动画
		    this.clearLoading()
	    },
        clearLoading() {
	        setTimeout(() => {
		        this.$loading.hide()
	        }, 3000)
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
        border-radius:49px;/*no*/
        margin-bottom: 100px;
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
