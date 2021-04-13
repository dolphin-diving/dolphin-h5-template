<template>
    <p v-if="this.isIos && this.$mjUtil.isMeiju()" :class="[className]">{{hintText}}</p>
</template>

<script>
import {isIos} from '../../utils/util.js'
export default {
    name: 'IosHint',
    props: {
        className: String,
        hintText: {
            type: String,
            default: '奖品与活动和设备生产商Apple Inc.公司无关'
        }
    },
    data () {
        return {
            isIos: isIos()
        }
    }
}
</script>
