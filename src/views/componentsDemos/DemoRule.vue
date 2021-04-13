<template>
    <div class="demo-wrapper column center">
        <!--方式一-->
        <Rule ref="rule"></Rule>
        <!--方式二-->
        <p>点击<span class="blue" @click="showRule()">《活动规则》</span>了解详细内容</p>
    </div>
</template>

<script>
import Rule from '@/components/rule'
export default {
    components: {
        Rule
    },
    // 进入该页面时滚动置顶部
    beforeRouteEnter (to, from, next) {
        next(() => {
            document.body.scrollTop = 0
        })
    },
    methods: {
        /**
             * 显示活动规则
             */
        showRule() {
            this.$refs.rule.showRule()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/css/var.scss";
    .blue{
        color: $colorBlue;
    }
    .demo-wrapper{
        width: 750px;
        height: 2158px;
        background: url("https://www.smartmidea.net/activity/202003/spring-mask/img/bg@3x.43aadcc8.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: 28px;/*px*/
    }
</style>
