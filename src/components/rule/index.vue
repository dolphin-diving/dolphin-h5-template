<template>
    <div class="column center">
        <div class="btn-rule" @click="showRule"></div>
        <Overlay :visible="isShowRule" :zIndex="9"></Overlay>
        <transition name="scale">
            <div v-if="isShowRule" class="mj-activity-dialog popup" @click="cancel">
                <div class="popup-content">
                    <h2>活动规则</h2>
                    <article>
                        <p>1. 口罩申领时间：即日起-{{closeTime}}</p>
                        <p>2. 口罩申领方式：用户进入活动页面，点击立即申领口罩，填写个人信息提交预约即可。申领结束后，后台会随机抽取500名用户免费送出20个口罩。</p>
                        <p>3. 申领结果公布：{{closeTime}}将会公布成功申领口罩的用户名单，届时用户可进入活动页面查看申领结果。申领成功的用户，我们将在活动结束后7个工作日内寄出口罩。</p>
                        <p>4. 活动期间，同一用户仅可进行一次口罩申领。同一账号、手机号、移动设备及其他信息相同均视为同一用户。</p>
                        <p>5. 免责条款：该口罩采购于新乡市金环医疗器械有限公司，产品为一次性使用医用口罩，质量问题由该厂家负责。如果由于国家政策或厂家的原因导致口罩数量减少，具体发放数量将根据口罩实际到货数量进行调整。</p>
                        <p>6. 活动过程中，如果出现因网络攻击、黑客攻击、数据泄露等原因导致活动无法继续，美的美居有权提前终止活动。</p>
                        <p>7. 活动过程中，用户不得使用任何外挂、插件以及其他破坏活动规则、违背活动公平原则的方式参加本次活动（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、机器注册、机器模拟客户端等），美的美居有权永久取消违规用户参与美的美居任意活动的资格，并追究法律责任。</p>
                        <p>8. 本活动规则由美的美居在法律范围内进行解释。</p>
                    </article>
                </div>
                <div class="full-width text-center" @click="cancel"><i class="popup-close"></i></div>
            </div>
        </transition>
    </div>
</template>

<script>
import config from '../../config.js'
import {formatDate, ModalHelper} from '../../utils/util'
import Overlay from '../overlay'
export default {
    name: 'Rule',
    components: {
        Overlay
    },
    data() {
        return {
            isShowRule: false,
            closeTime: formatDate('yyyy年M月dd日hh:mm', config.closeTime)
        }
    },
    methods: {
        showRule() {
            this.isShowRule = true
            this.$nextTick(() => {
                ModalHelper.afterOpen()// 解决滚动穿透
            })
        },
        overlayBodyClicking() {
            this.cancel()
        },
        cancel() {
            ModalHelper.beforeClose()
            this.isShowRule = false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/css/var";
    .btn-rule{
        position: absolute;
        top: 64px;
        right: 0;
        height: 60px;
        width: 132px;
        background:url("https://www.smartmidea.net/activity/202003/spring-mask/img/rule.ce552ec1.png") no-repeat;
        background-size:contain;
    }
    .popup{
        &-close{
            display: inline-block;
            background: url("img/btn_close.png") no-repeat center;
            background-size: 100%;
            width: 1rem;
            height: 2rem;
        }
        &-content{
            transform: translate3d(0,0,0);
            border-radius: 20px;
            background: #ffffff;
            padding: 55px 40px 65px;
            width: 77%;
            h2{
                font-size: $titleFontSize;/*px*/
                color: $dialogFontColor;
                margin-bottom: 38px;
                text-align: center;
            }
            article{
                font-size: $termsFontSize;/*px*/
                color: $termsColor;
                line-height: 40px;
                height: 625px;
                overflow-x: hidden;
                overflow-y: auto;
                p{
                    text-align: justify;
                }
            }
        }
    }
</style>
