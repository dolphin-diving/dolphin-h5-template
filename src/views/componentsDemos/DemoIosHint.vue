<template>
    <div>
        <p class="text-center">请使用ios设备在美居App内查看</p>
        <!--引用iosHint组件-->
        <ios-hint :className="iosText"></ios-hint>
    </div>
</template>

<script>
import IosHint from '../../components/iosHint'
export default {
    components: {
        IosHint // 注册iosHint组件
    },
    data() {
        return {
            iosText: 'ios-hint' // 添加免责声明类名
        }
    }
}
</script>

<style scoped>
    div{
        padding-top: 40%;
    }
</style>
