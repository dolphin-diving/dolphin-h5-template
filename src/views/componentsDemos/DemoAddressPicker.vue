<template>
    <div class="bg">
        <div @click="isShow=true" class="picker-wrapper">
            <p>{{areaDesc}}</p><i></i>
        </div>
        <AddressPicker :isShowPicker="isShow" @oncancel="cancel" @onchanged='servieAddressSelected'></AddressPicker>
    </div>
</template>

<script>
import AddressPicker from '../../components/addressPicker'
export default {
    components: {
        AddressPicker
    },
    data: function() {
        return {
            isShow: false,
            area: '',
            userAddress: {
                receiverName: '',
                receiverMobile: '',
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: '',
                addr: '',
                defaultAddr: false
            }
        }
    },
    computed: {
        areaDesc() {
            return this.userAddress.province ? (this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName) : '请选择所在区域'
        }
    },
    methods: {
        servieAddressSelected(event) {
            this.userAddress = Object.assign({}, this.userAddress, event)
            this.isShow = false
        },
        cancel() {
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .bg{
        height: 100vh;/*在iPhone11中，原生设置底部安全区域无效；设置高度为100vh可覆盖底部安全区域*/
    }
    .picker-wrapper{
        width: 100%;
        color: #333;
        font-size: 28px;/*px*/
        padding:30px 50px 30px 20px;
        border-bottom: 1PX solid #ddd;/*no*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        p+i{
            display: inline-flex;
            width: 20px;
            height: 20px;
            border-top: 2PX solid #888;/*no*/
            border-right: 2PX solid #888;/*no*/
            transform: rotate(45deg);
        }
    }
</style>
