<template>
  <div class="container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="item-list">
      <TransitionGroup
        name="recognition-result"
        @enter="onEnter"
        @leave="onLeave"
      >
        <YieldForecastSample v-for="item in data" :data="item" :key="item.serialNo" />
      </TransitionGroup>
    </div>
    <div class="summary">
      <el-tooltip
        popper-class="de-tooltip"
        content="只有所有采样点的所在生长期为”出菇阶段“时才可估算"
        placement="top-start"
        :disabled="canUseEstimate"
      >
        <div :style="{margin: 'auto'}">
          <button :disabled="!canUseEstimate" class="get-estimate-btn" @click="getEstimate">产量估算</button>
        </div>
      </el-tooltip>
      <div class="estimate-row">
        <span class="estimate-result-label">栽培总瓶(袋)数：</span>
        <span class="estimate-result">{{batchSize}}瓶(袋)</span>
        <span class="estimate-result-label">综合产量：</span>
        <span class="estimate-result">{{estimateResult}}吨</span>
      </div>
    </div>
<!--    <div class="manual-scroll-container">-->
<!--      <button class="manual-scroll-button" @click="scrollToPrev">-->
<!--        <img class="button-arrow" :style="{transform: 'rotateY(180deg)'}" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="arrow" />-->
<!--        上一张</button>-->
<!--      <button class="manual-scroll-button" @click="scrollToNext">-->
<!--        下一张-->
<!--        <img class="button-arrow" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="arrow" />-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import YieldForecastSample from '@/components/data-exploration/mushroom/forecast/sub-components/YieldForecastSample.vue'
import useSlidingWindow from "@/composables/useSlidingWindow";
import {ref, provide, computed} from 'vue'
import request from "@/util/http";

const dataSrc = ref([])
const {data, interrupt, resume, setStartingIdx, cursorIdx} = useSlidingWindow(dataSrc, 2, 2000)
provide('interrupt', interrupt)
provide('resume', resume)

request.get('/api/fungus/yield-estimate-list').then(result=>{
  dataSrc.value = result.data.map(e=>({
    labeledSrc: e.photo,
    serialNo: e.point,
    phase: e.cycle,
  }))
  canUseEstimate.value = !result.data.some(e=>e.cycle !== '出菇阶段')
})
const transitionDirection = ref('normal')
const scrollToPrev = () => {
  transitionDirection.value = 'reverse'
  setStartingIdx(cursorIdx.value - 1 - 1)
}
const scrollToNext = () => {
  transitionDirection.value = 'normal'
  setStartingIdx(cursorIdx.value + 1  - 1)
}
const onMouseEnter = () => {
  interrupt('hover')
}
const onMouseLeave = () => {
  resume('hover')
}
//anim
const onEnter = (el, done) => {
  const anim = el.animate([
    { transform: 'translateY(100%)', opacity: 0},
    { transform: 'translateY(0%)', opacity: 1},
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
const onLeave = (el, done) => {
  const anim = el.animate([
    { transform: 'translateY(0%)', opacity: 1},
    { transform: 'translateY(-100%)', opacity: 0},
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

// 产量估算
const canUseEstimate = ref(false)
const batchSize = ref(1000)
// 237g
const unitYield = ref(237 / 1000/ 1000)
const estimateResult = ref('-');
const getEstimate = () => {
  estimateResult.value = (batchSize.value * unitYield.value).toFixed(2)
}


</script>

<style scoped lang="scss">
.container {
  padding: vh(12) vw(20);
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
.recognition-result-leave-active {
  position: absolute;
}
.item-list {
  height: vh(300);
  overflow: hidden;
}
.summary {
  margin-block-start: vh(12);
  display: grid;
  grid-template-columns: vw(176) 1fr;
  align-items: center;
  .get-estimate-btn {
    padding: vh(8) vw(24);
    font-size: vw(18);
    margin: auto;
    line-height: vw(24);
    font-weight: 600;
    color: #FFFFFF;
    background: no-repeat center/100% 100% url('~@/assets/images/data-exploration/shared/button-bg.png');
    cursor: pointer;
    &[disabled] {
      cursor: not-allowed;
    }
  }
  .estimate-row {
    padding-inline-start: vw(4);
  }
  .estimate-result-label {
    display: inline-block;
    font-size: vw(16);
    font-weight: 400;
    color: #FFFFFF;
    vertical-align: middle;
  }
  .estimate-result {
    font-size: vw(18);
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #58FFFF;
    vertical-align: middle;
    &:not(:last-of-type) {
      margin-inline-end: vw(24);
    }
  }
}
</style>
<style lang="scss">
.de-tooltip.el-popper {
  --el-popup-modal-bg-color: #011e5f;
  --el-text-color-primary: #011e5f;
  border-color: #51C2FE;
  .el-popper__arrow::before {
    border-color: #51C2FE;
  }
}
</style>
