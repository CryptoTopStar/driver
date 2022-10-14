<template>
  <div class="container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <Transition
      name="recognition-result"
      :css="false"
      @enter="onEnter"
      @leave="onLeave"
    >
      <HealthCheckResult :data="item" :key="item?.serialNo" />
    </Transition>
    <div class="manual-scroll-container">
      <button class="manual-scroll-button" @click="scrollToPrev">
        <img class="button-arrow" :style="{transform: 'rotateY(180deg)'}" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="arrow" />
        上一张</button>
      <button class="manual-scroll-button" @click="scrollToNext">
        下一张
        <img class="button-arrow" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="arrow" />
      </button>
    </div>
  </div>
</template>

<script setup>
import HealthCheckResult from '@/components/data-exploration/mushroom/monitoring/sub-components/HealthCheckResult.vue'
import useSlidingWindow from "@/composables/useSlidingWindow";
import {ref, provide, computed} from 'vue';
import request from '@/util/http.js';

const dataSrc = ref([])
const {data, interrupt, resume, setStartingIdx, cursorIdx} = useSlidingWindow(dataSrc, 1, 2000)
provide('interrupt', interrupt)
provide('resume', resume)

request.get('/api/fungus/growth-monitor-list').then(result=>{
  dataSrc.value = result.data.map(e=>({
    labeledSrc: e.photo,
    source:  e.refer_photo,
    serialNo: e.number,
    phase: e.cycle,
    desc: e.abnormal,
    date: e.date
  }))
})
const transitionDirection = ref('normal')

const scrollToPrev = () => {
  transitionDirection.value = 'reverse'
  setStartingIdx(cursorIdx.value - 1)
}
const scrollToNext = () => {
  transitionDirection.value = 'normal'
  setStartingIdx(cursorIdx.value + 1)
}

const onMouseEnter = () => {
  interrupt('hover')
}

const onMouseLeave = () => {
  resume('hover')
}


// called one frame after the element is inserted.
// use this to start the animation.
const onEnter = (el, done) => {
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  const anim = el.animate([
    { transform: 'translateX(100%)'},
    { transform: 'translateX(0%)'},
  ], {
    duration: 500,
    iterations: 1,
    direction: transitionDirection.value,
    easing: 'ease-in-out'
  });
  anim.onfinish = () => {
    done()
    transitionDirection.value = 'normal'
  }
}

// called when the leave transition starts.
// use this to start the leaving animation.
const onLeave = (el, done) => {
  // call the done callback to indicate transition end
  // optional if used in combination with CSS
  el.style.position = 'absolute'
  const anim = el.animate([
    { transform: 'translateX(0%)'},
    { transform: 'translateX(-100%)'},
  ], {
    duration: 500,
    iterations: 1,
    direction: transitionDirection.value,
    easing: 'ease-in-out'
  });
  anim.onfinish = () => {
    done();
    transitionDirection.value = 'normal'
  }
}

const item = computed(()=>{
  return Array.isArray(data.value) ? data.value[0] : null
})



</script>

<style scoped lang="scss">
.container {
  padding: vh(20) vw(20);
  overflow: hidden;
  position: relative;
}
.manual-scroll-container {
  display: flex;
  justify-content: center;
  column-gap: vw(16);
  margin-top: vh(20);
}
.manual-scroll-button {
  height: vh(31);
  width: vw(99);
  background: no-repeat center/100% 100% url('~@/assets/images/data-exploration/shared/scroll-button-bg.webp');
  font-size: vh(14);
  line-height: vh(31);
  color: #FFFFFF;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-gap: vw(6);
  &:active {
    transform: scale(0.9);
  }
}
.button-arrow {
  width: 1.3em;
  height: 1.3em;
}
</style>
