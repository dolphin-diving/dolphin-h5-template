<template>
    <div>
        <Overlay v-if="overlay" :visible="visible"></Overlay>
        <transition name="scale">
            <section class="mj-activity-dialog" v-show="visible" @touchmove.prevent>
                <div :class="['dialog', className]">
                    <div class="dialog-content">
                        <h2 v-if="isShowTitle">{{title}}</h2>
                        <p :style="{textAlign:messageAlign}">{{message}}</p>
                    </div>
                    <div class="dialog-button">
                        <div class="dialog-button-cancel" v-if="isShowCancelBtn" @click="cancel">{{cancelText}}</div>
                        <div class="dialog-button-confirm" @click="confirm">{{confirmText}}</div>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>
<script>
import Overlay from '../overlay'
export default {
    props: {
        message: String,
        className: String,
        isShowTitle: {
            type: Boolean,
            default: true
        },
        isShowCancelBtn: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '提示'
        },
        messageAlign: {
            type: String,
            default: 'center'
        },
        confirmText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            visible: false,
            resolve: '',
            reject: '',
            promise: '' // 保存promise对象
        }
    },
    components: {
        Overlay
    },
    methods: {
        // 确定,将promise断定为resolve状态
        confirm: function () {
            this.visible = false
            this.resolve('confirm')
            this.remove()
        },
        // 取消,将promise断定为reject状态
        cancel: function () {
            this.visible = false
            this.reject('cancel')
            this.remove()
        },
        // 弹出dialogBox,并创建promise对象
        showDialogBox: function () {
            this.visible = true
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
            // 返回promise对象
            return this.promise
        },
        remove: function () {
            setTimeout(() => {
                this.destroy()
            }, 300)
        },
        destroy: function () {
            this.$destroy()
            document.body.removeChild(this.$el)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.dialog {
    width: 72%;
    height: auto;
    background: #fff;
    border-radius: 30px;
    backface-visibility: hidden; /*avoid blurry text after scale animation*/
    &-content {
        color: $dialogFontColor;
        font-size: $termsColor;/*px*/
        line-height: 1.5em;
        &>h2{
            font-size: 1.2em;
            line-height: 3em;
            text-align: center;
        }
        &>p{
            padding: 40px 5%;
        }
    }
    &-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1PX solid $colorIvory;/*no*/
        &>div{
            flex: 1;
            text-align: center;
            font-size: $btnFontSize;/*px*/
            padding: 30px 0;
        }
        &-confirm{
            color: $confirmColor;
        }
        &-cancel{
            color: $cancelColor;
            border-right: 1PX solid $colorIvory;/*no*/
        }
    }
}
/*iPhone5/SE*/
@media only screen and (max-device-width: 320px){
    .dialog {
        &-content {
            font-size: $termsFontSize - $iPhone5Diff; /*px*/
        }
        &-button {
            & > div {
                font-size: $btnFontSize - $iPhone5Diff; /*px*/
                padding: 28px 0;
            }
        }
    }
}
</style>
