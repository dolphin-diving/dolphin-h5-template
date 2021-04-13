<template>
  <transition name="fade">
    <div v-show="visible">{{ message }}</div>
  </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            message: ''
        }
    }
}
</script>

<style scoped>
div {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 50%;
  transition: all 0.5s;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px; /*no*/
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  line-height: 1.5em;
  padding: 20px;
  max-width: 75vw;
  min-width: 57vw;
  font-size: 26px; /*px*/
  letter-spacing: 1px; /*no*/
}
@media only screen and (max-device-width: 320px) {
  div {
    font-size: 24px; /*px*/
  }
}
</style>
