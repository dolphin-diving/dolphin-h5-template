<template>
    <div class="demo-wrapper">
        <div class="demo-btn-yellow" @click="showMe('one')">一行文案</div>
        <div class="demo-btn-yellow" @click="showMe('two')">两行文案</div>
    </div>
</template>

<script>
export default {
    methods: {
        showMe(line) {
        	if (line === 'one') {
                this.$toast(this.$errMap.errorMsg[3025])
            } else {
		        this.$toast(this.$errMap.errorMsg['commonMsg'])
            }
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
