<template>
    <div>
        <h2 class="text-center">调用接口</h2>
        <p><button v-preventReClick @click="apiMethod1()">查询我的传播者ID(登录查看)</button></p>
        <section class="data-board">我的传播者ID：{{spreadId}}</section>
        <p><button v-preventReClick @click="apiMethod2()">查看团队信息(示例：瓜分百万红包活动)</button></p>
        <section class="data-board">
            <h4>团队编号：{{teamNumber}}，团队人数：{{teamList.length}}</h4>
            <ul class="team_item" v-for="(item,index) in teamList" :key="index">
                <li>{{index}}号队员：{{item.userName}}</li>
            </ul>
        </section>
        <p @click="eventTracking">埋点的使用</p>
        <section class="data-board">
            埋点入参：<br/>
            {{eventTrackingParams}}
        </section>
    </div>
</template>

<script>
import base from '../../base.js'
import {checkLogon, gotoLogon, getMyTeamInfo, getSpreadId} from '../../http/api.js'
export default {
    mixins: [base],
    data() {
        return {
            teamNumber: '-',
            teamList: [],
            eventTrackingParams: {}
        }
    },
    methods: {
        /**
         * 请求接口，需登录
         */
        apiMethod1() {
            checkLogon().then(() => {
	                this.$loading.show()
	                getSpreadId({src: 'activity'}).then(resp => {
                    this.spreadId = resp.data.spreadId
		                this.$loading.hide()
                }).catch(e => {
		                this.$loading.hide()
                })
            }).catch(() => {
                gotoLogon(1000)
            })
        },
        /**
         * 请求接口，无需登录
         */
        apiMethod2() {
	            this.$loading.show()
	            getMyTeamInfo({teamNumber: '2f6912'}).then(resp => {
		            this.teamNumber = resp.data.teamNumber
                this.teamList = resp.data.members
		            this.$loading.hide()
	            }).catch(e => {
		            this.$loading.hide()
	            })
        },
        /**
         * 请求埋点接口
         */
        eventTracking() {
	        this.eventTrackingParams = {
		        'event': 'activity_widget_event',
		        'eventParams': {
			        page_name: document.title
		        }
	        }
	        this.trackEvent(this.eventTrackingParams)
        }
    }
}
</script>
<style scoped>
    h2{
        padding: 40px 0;
        font-size: 32px;/*px*/
    }
    p{
        position: relative;
        color: #333;
        font-size: 28px;/*px*/
        padding: 30px 40px;
        border-top: 1px solid #ddd;/*no*/
        border-bottom: 1px solid #ddd;/*no*/
    }
    p:after{
        content: '';
        display: inline-block;
        position: absolute;
        top: 40px;
        right: 40px;
        width: 20px;
        height: 20px;
        border-top: 2px solid #888;/*no*/
        border-right: 2px solid #888;/*no*/
        transform: rotate(45deg);
    }
    .data-board{
        width: 90%;
        padding: 40px 20px;
        margin: 20px auto;
        border: 1px solid #ddd;/*no*/
        border-radius: 20px;
        font-size: 26px;/*px*/
    }
</style>
