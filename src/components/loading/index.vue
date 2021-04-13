<template>
  <transition name="fade">
    <section v-show="visible" :class="{ bg: showLayer }">
      <div class="loading">
        <img width="24px" height="24px" src="./img/loading.gif" />
        <p class="desc">{{ message }}</p>
      </div>
    </section>
  </transition>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            message: '加载中...',
            showLayer: false
        }
    }
}
</script>
<style scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2999;
  display: flex;
  align-items: center;
  justify-content: center;
}
section.bg {
  background: rgba(0, 0, 0, 0.3);
}
.loading {
  width: 160px;
  text-align: center;
  background: rgba(51, 51, 51, 0.6);
  border-radius: 12px; /*no*/
  padding-top: 32px;
  padding-bottom: 32px;
}
.loading img {
  display: inline-block;
  width: 48px;
  height: 48px;
}
.loading p {
  color: #e8e8e8;
  margin-top: 20px;
  font-size: 20px; /*px*/
  line-height: 20px; /*px*/
  text-align: center;
  letter-spacing: 1px;
}
</style>
