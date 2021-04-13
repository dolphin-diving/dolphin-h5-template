<template>
    <div v-if="visible" @touchmove.prevent>
        <Overlay :visible="visible" v-on:overlayBodyClicked="cancel()"></Overlay>
        <!--海报弹窗-->
        <section ref="posterPopup" class="popup">
            <div class="popup-bg">
                <img :src="popupBgSrc">
            </div>
            <div class="row justify-around popup-btn">
                <button v-preventReClick class="popup-btn-saved" @click="savePicture">保存图片至相册</button>
            </div>
        </section>
    </div>
</template>

<script>
import {loadImage, isIos, toNum} from '../../utils/util'
import Overlay from '../overlay'
import QRCode from 'qrcode'
export default {
    components: {
        Overlay
    },
    props: {
        inviteUrl: String, // 生成二维码的超链接
	    appVersion: {
        	type: String,
            default: '0'
        }
    },
    data() {
        return {
	        visible: false,
            resolve: '',
            reject: '',
            promise: '', // 保存promise对象
            popupBgSrc: '',
            qrCode: null,
            qrCodeSize: 90, // 二维码宽高,
            logoImg: require('./img/logo.png'),
            popupImg: require('./img/bg_popup.png') /* 图片宽560，高931 */
        }
    },
    watch: {
        // 给inviteUrl赋值
        inviteUrl: function(newVal) {
            this.inviteUrl = newVal
            newVal && this.drawPoster() // newVal存在的话执行drawPoster函数
        }
    },
    methods: {
        // 绘制海报
        drawPoster() {
            let self = this
            this.$loading.show()
            const sw = window.screen.width
            const sh = window.screen.height
            const dpr = this.$mjUtil.isMeiju() ? 2 : window.devicePixelRatio // 当前设备的物理像素分辨率(美居必须降低清晰度，否则生成的base64长度过长导致保存失败)
            const cWidth = sw * dpr // 画布宽度(放大dpr倍可提高canvas在移动端的清晰度)
            const cHeight = Math.floor(cWidth * 1.66)// 画布高度
            const qrCodeX = Math.floor(cWidth * 0.07)// 二维码轴X坐标
            const qrCodeY = Math.floor(cHeight * 0.72)// 二维码轴Y坐标
            if (sw <= 320 && sh <= 568) { // iPhone5/SE
                this.qrCodeSize -= 8
            }
            if (sw > 410 || sh >= 800) {
                this.qrCodeSize += 8
            }
            // eslint-disable-next-line handle-callback-err
            QRCode.toDataURL(this.inviteUrl, {margin: 1}, (err, url) => {
                // 生成背景图片
                loadImage(this.popupImg, (posterBgImg) => {
                    // logo
                    loadImage(this.logoImg, (logoImg) => {
                        // 将二维码连接转base64
                        loadImage(url, (qrCodeImg) => {
                            // 生成canvas
                            const canvas = document.createElement('canvas')
                            canvas.width = cWidth
                            canvas.height = cHeight
                            const ctx = canvas.getContext('2d')
                            // 根据分辨率放大二维码，提升清晰度
                            this.qrCodeSize *= dpr
                            this.qrCodeSize = Math.floor(this.qrCodeSize)
                            const logoSize = Math.floor(this.qrCodeSize / 4)
                            const logoX = (this.qrCodeSize - logoSize) / 2 + qrCodeX
                            const logoY = (this.qrCodeSize - logoSize) / 2 + qrCodeY
                            ctx.drawImage(posterBgImg, 0, 0, cWidth, cHeight)
                            ctx.drawImage(qrCodeImg, qrCodeX, qrCodeY, this.qrCodeSize, this.qrCodeSize)
                            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
                            this.popupBgSrc = canvas.toDataURL('image/png')
                            this.$nextTick(() => {
                                self.$refs.posterPopup.style.opacity = 1
                                self.$loading.hide()
                            })
                        })
                    })
                })
            })
        },
        // 弹出海报弹窗,并创建promise对象
        showPosterBox: function () {
            this.visible = true
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
            // 返回promise对象
            return this.promise
        },
        // 保存图片-鉴权
        savePicture() {
	        let that = this
            if (!this.$mjUtil.isMeiju() || toNum(this.appVersion) < toNum('6.7.0')) {
	            that.$toast(that.$errMap.errorMsg['downloadMsg'])
                return
            }
            if (!isIos()) {
                this.savePicture_save()
            } else {
                this.$bridge.checkAndRequestPermission({
                    type: 'CAMERA' // 根据不同的权限，传入不同的type
                },
                (resp) => {
                    if (resp.errorCode == '-1') {
                        that.$toast(resp.errorMsg)
                        return
                    }
                    that.savePicture_save()
                },
                // eslint-disable-next-line handle-callback-err
                (error) => {
                    that.$toast(that.$errMap.errorMsg['authorizationErr'])
                })
            }
        },
        // 保存图片-下载
        savePicture_save() {
            let that = this
	        let base64PNG = that.popupBgSrc.split(';base64,')[1]
            this.$bridge.imageSaveAs({
                base64: base64PNG
            }, (resp) => {
                that.$toast(resp.errorMsg)
                that.cancel() // 关掉弹窗
                // eslint-disable-next-line handle-callback-err
            }, (error) => {
	            that.$toast(that.$errMap.errorMsg['saveErr'])
            })
        },
        // 确定,将promise断定为resolve状态
        confirm: function () {
            this.visible = false
            this.resolve('confirm')
        },
        // 取消,将promise断定为reject状态
        cancel: function () {
            this.visible = false
            this.reject('cancel')
            this.remove()
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
    .popup{
        position: fixed;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 560px;
        height: 931px;
        opacity: 0;
        transition: opacity .5s ease;
        img{
            width: 100%;
            -webkit-touch-callout: none;
        }
        &-btn{
            margin: 20px auto 0;
            width: 340px;
            height: 70px;
            background: $colorBlue;
            border-radius: 40px;
            button{
                color: #fff;
                font-size: 26px;/*px*/
            }
        }
    }
</style>
