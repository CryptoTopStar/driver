<template>
  <div
      class="icon-container"
      :style="{'--scale': scale}"
  >
    <img ref="bg" class="background" :src="config.background">
    <img class="inner-icon" :src="icon" />
  </div>
</template>

<script setup>
import {defineProps, computed, watchEffect, ref} from 'vue'

const props = defineProps({
  animated: Boolean,
  preset: String, // static, animated
  background: String,
  icon: String,
  scale: Number,
})

const bg = ref(null);

const config = computed(() => {
  let valueSet = {
    background: undefined,
    animated: false
  };
  // change default value
  switch (props.preset) {
    case 'static': {
      valueSet.background = require('@/assets/images/smart-communities/icon_preset_static.png')
      valueSet.animated = false
      break;
    }
    case 'animated': {
      valueSet.background = require('@/assets/images/smart-communities/icon_preset_animated.svg')
      valueSet.animated = true
      break;
    }
  }
  // overwrite with value from props
  if (props.animated) {
    // undefined was converted to false
    valueSet.animated = true;
  }
  if (props.background !== undefined) {
    valueSet.background = props.background;
  }
  return valueSet
})

let bgAnimation;
const cleanupFn = () =>{
  if (bgAnimation) {
    bgAnimation.cancel();
    bgAnimation = undefined;
  }
}
watchEffect( (onCleanup)=>{
  if (config.value.animated && bg.value) {
    bgAnimation = bg.value.animate([
      { transform: 'rotate(0)'},
      { transform: 'rotate(360deg)'}
    ], {
      duration: 5000,
      iterations: Infinity
    });
  }
  onCleanup(cleanupFn)
})
</script>


<style scoped lang="scss">
.icon-container {
  display: flex;
  box-sizing: border-box;
  min-width: calc(vw(40)*var(--scale, 1));
  width: calc(vw(40)*var(--scale, 1));
  height: calc(vw(40)*var(--scale, 1));
  position: relative;
  align-items: center;
  justify-content: center;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .inner-icon {
    width: calc(vw(18)*var(--scale, 1));
    height: calc(vw(18)*var(--scale, 1));
    z-index: 1;
  }
}
</style>
