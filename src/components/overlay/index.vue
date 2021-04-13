<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="overlay"
      :style="{ zIndex: zIndex }"
      @touchmove="onTouchmove"
      @click="overlayClicked"
    ></div>
  </transition>
</template>

<script>
export default {
    name: 'overlay',
    props: {
        visible: Boolean,
        zIndex: Number
    },
    methods: {
        onTouchmove(event) {
            event.preventDefault()
            event.stopPropagation()
        },
        overlayClicked(event) {
            this.$emit('overlayBodyClicked', event)
        }
    }
}
</script>

<style scoped>
.overlay {
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
