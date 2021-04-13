<template>
    <div>
        <Overlay :visible="isShowPicker" v-on:overlayBodyClicked="overlayBodyClicking()"></Overlay>
        <transition name="slide-up">
            <div class="address-popup" v-show="isShowPicker">
                <div class="picker-header">
                    <div class="picker-header-area-wrapper">
                        <span v-if="currentRegionLevel>0" class="picker-header-area" @click="getAreaList(0)">{{areaObj.provinceName||''}}</span>
                        <span v-if="currentRegionLevel>1" class="picker-header-area" @click="getAreaList(areaObj.province)">{{areaObj.cityName}}</span>
                        <span v-if="currentRegionLevel>2" class="picker-header-area" @click="getAreaList(areaObj.city)">{{areaObj.countyName}}</span>
                        <span v-if="currentRegionLevel>3" class="picker-header-area" @click="getAreaList(areaObj.county)">{{areaObj.streetName}}</span>
                        <span class="picker-header-area-current">{{nextRegionDesc}}</span>
                    </div>
                </div>
                <section class="picker-content" ref="scroller">
                    <div ref="areaStart"></div>
                    <div class="picker-content-item-wrapper" v-for="(item, index) in currentRegionList" :key="index" :ref="'item'+index" @click="selectItem(item)">
                        <span v-bind:class="['picker-content-item']">{{item.regionName}}</span>
                        <img v-if="selectedRegionCode==item.regionCode" class="check-icon" src="./img/public_ic_done@3x.png" />
                    </div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
import {ModalHelper} from '../../utils/util'
import Overlay from '../overlay'
import {getAreaData} from '../../http/api'
export default {
    components: {
        Overlay
    },
    props: {
        isShowPicker: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            elHeight: '',
            areaObj: {
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: ''
            },
            areaListObj: {},
            currentRegionLevel: 0,
            currentregionCode: '0',
            selectedRegionCode: '0'
        }
    },
    watch: {
        isShowPicker(value) {
            if (value) {
                this.$nextTick(() => {
                    ModalHelper.afterOpen()// 解决滚动穿透
                    this.areaObj = Object.assign(this.areaObj, this.data)
                    if (this.areaObj.street) {
                        // 修改地址
                        this.currentRegionLevel = 4
                        this.currentregionCode = this.areaObj.county
                        this.selectedRegionCode = this.areaObj.street
                        this.getAreaList(this.areaObj.county, this.selectedRegionCode)
                    } else {
                        // 新选
                        this.getAreaList()
                    }
                })
            } else {
                ModalHelper.beforeClose()// 解决滚动穿透
            }
        }
    },
    computed: {
        nextRegionDesc() {
            let result = ''
            switch (this.currentRegionLevel) {
            case 0:
                result = '选择省'
                break
            case 1:
                result = '选择市'
                break
            case 2:
                result = '选择区/县'
                break
            case 3:
                result = '选择街道'
                break
            }
            return result
        },
        currentRegionList() {
            let result = []
            if (this.areaListObj) {
                result = this.areaListObj.children || []
            }
            return result
        }
    },
    methods: {
        getAreaList(regionCode = 0, selectedRegionCode = null) {
            let param = {
                'regionCode': regionCode
                /* "sourceSys":"APP" */
            }
            getAreaData(param).then((data) => {
                this.areaListObj = data.content
                if (this.areaListObj.self) {
                    this.currentRegionLevel = this.areaListObj.self.level
                } else {
                    this.currentRegionLevel = 0
                }
                this.currentregionCode = regionCode
                this.$nextTick(() => {
                    if (selectedRegionCode) {
                        let index = this.currentRegionList.findIndex((item) => {
                            return item.regionCode == selectedRegionCode
                        })
                        if (index > -1) {
                            this.$refs.scroller.scrollTop = this.elHeight
                        }
                    } else {
                        this.$refs.scroller.scrollTop = 0
                    }
                })
            })
        },
        selectItem(item) {
            switch (item.level) {
            case 1:
                this.areaObj.province = item.regionCode
                this.areaObj.provinceName = item.regionName
                break
            case 2:
                this.areaObj.city = item.regionCode
                this.areaObj.cityName = item.regionName
                break
            case 3:
                this.areaObj.county = item.regionCode
                this.areaObj.countyName = item.regionName
                break
            case 4:
                this.areaObj.street = item.regionCode
                this.areaObj.streetName = item.regionName
                break
            }
            if (item.level < 4) { // 仍有下级区域
                this.getAreaList(item.regionCode)
            } else {
                this.confirm()
            }
        },
        overlayBodyClicking() {
            this.$emit('oncancel')
        },
        confirm() {
            this.elHeight = this.$refs.scroller.scrollTop
            this.$emit('onchanged', this.areaObj)
        }
    }
}
</script>

<style lang="scss" scoped>
    .address-popup {
        height: 600px;
        width: 100%;
        z-index: 10;
        position: fixed;
        bottom: 0;
        left: 0;
        .picker-header {
            height: 90px;
            width: 100%;
            display: inline-flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            background-color: #f9f9f9;
            padding-right: 32px;
            border-bottom-color: #e5e5e8;
            border-bottom-width: 1px;
            &-area-wrapper {
                overflow: hidden;
                white-space: nowrap;
            }
            &-area {
                font-size: 24px;/*px*/
                color: #8a8a8f;
                padding-left: 32px;
                &-current {
                    font-weight: 600;
                    color: #000000;
                    padding-left: 32px;
                }
            }
        }
        .picker-content {
            background: #fff;
            width: 100%;
            height: 510px;
            overflow-y: auto;
            flex: 1;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            &-item{
                font-size: 26px;/*px*/
                color: #333;
            }
            &-item-wrapper {
                width: 91%;
                height: 80px;
                margin-left: 32px;
                margin-right: 32px;
                border-bottom: 1PX solid #e5e5e8;/*no*/
                display: inline-flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }
        .check-icon {
            height: 40px;
            width: 40px;
        }
    }
</style>
