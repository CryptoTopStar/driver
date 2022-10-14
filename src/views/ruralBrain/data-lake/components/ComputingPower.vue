<template>
  <article>
    <slot name="header" />
    <div class="dl-computing-container">
      <img class="dl-computing__comp-bg" height="200" :src="require('@/assets/rural-brain/dl/computing-comp.webp')" />
      <span class="dl-computing__comp-bg-title">云安全中心</span>
      <ul class="dl-computing__comp-list">
        <li v-for="(item, idx) in items" :key="item.key" class="dl-computing__item" :data-key="item.key" :aria-label="item.key">
          <div class="dl-computing__item-line" :style="{'--index': idx}" />
          <div class="dl-computing__item-value-group">
            <span class="dl-computing__item-label">
              {{ item.key }}
            </span>
            <AnimatedNumber class="dl-computing__item-value" :value="data[`计算能力::${item.key}`]?.sl" :scale="item.scale" />
            <span class="dl-computing__item-unit">{{data[`计算能力::${item.key}`]?.dw}}</span>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'
import gsap from 'gsap';

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const items = [
  {key: '离线计算节点', scale: 0, width: 260-60},
  {key: '计算管控', scale: 0, width: 260-138},
  {key: '堡垒机', scale: 0, width: 260-150},
  {key: '应用服务器', scale: 0, width: 260-138},
  {key: '存储', scale: 2, width: 260-60},
]

let tl;
onMounted(()=>{
  tl = gsap.timeline();
  for (const item of items) {
    const rowTl = gsap.timeline()
    rowTl.fromTo(`.dl-computing__item[data-key="${item.key}"] .dl-computing__item-line`, {
      width: 0,
      opacity: 0
    },{
      opacity: 1,
      width: item.width,
    })
      .fromTo(`.dl-computing__item[data-key="${item.key}"] .dl-computing__item-value-group`, {opacity: 0}, {opacity: 1});
    tl.add(rowTl, '<0.2')
  }
})
onUnmounted(()=>{
  tl?.kill();
  tl = null;
})

</script>

<style scoped lang="scss">
.dl-computing-container {
  position: relative;
  display: flow-root;
  padding-block: 40px;
  height: 200px;
}
.dl-computing__item {
  display: flex;
  align-items: center;
  $guiding-line-width: 260px;
  font-size: 16px;
  line-height: 24px + 2px;
  color: #CCEAFF;
  .dl-computing__item-line {
    box-sizing: border-box;
    height: 1.5px;
    position: relative;
    margin-inline-end: 16px;
    background: linear-gradient(to right, #B3ADE600, #B3ADE6);
    &::before {
      content: '';
      position: absolute;
      width: max(calc(10px - 2px * var(--index)), 2px);
      height: max(calc(10px - 2px * var(--index)), 2px);
      background: #7FF8EF;
      border-radius: 50%;
      box-shadow: 0px 0px 6px 2px #7FF8EF;
      transform: translate(-50%, -50%);
    }
    &::after {
      content: '';
      position: absolute;
      width: 4px;
      height: 4px;
      background: #E0965F;
      inset-inline-end: -2px;
      inset-block-end: -1px;
    }
  }
  &[data-key='离线计算节点'] {
    .dl-computing__item-line {
      $margin: 60px;
      margin-inline-start: $margin;
      //width: $guiding-line-width - $margin;
    }
  }
  &[data-key='计算管控'] {
    .dl-computing__item-line {
      $margin: 138px;
      margin-inline-start: $margin;
      //width: $guiding-line-width - $margin;
    }
  }
  &[data-key='堡垒机'] {
    .dl-computing__item-line {
      $margin: 150px;
      margin-inline-start: $margin;
      //width: $guiding-line-width - $margin;
    }
  }
  &[data-key='应用服务器'] {
    .dl-computing__item-line {
      $margin: 136px;
      margin-inline-start: $margin;
      //width: $guiding-line-width - $margin;
    }
  }
  &[data-key='存储'] {
    .dl-computing__item-line {
      $margin: 60px;
      margin-inline-start: $margin;
      width: $guiding-line-width - $margin;
    }
  }
}
.dl-computing__item-label {
  display: inline-flex;
  flex: 1;
}
.dl-computing__item-value {
  font-size: 22px;
  margin-inline-end: 8px;
  font-family: PangMenZhengDao, fantasy;
  color: #39D9FF;
}
.dl-computing__item-value-group {
  opacity: 0;
  display: flex;
  flex: 1;
}
.dl-computing__item-unit {
}
.dl-computing__comp-bg {
  pointer-events: none;
  position: absolute;
  top: 40px;
  height: 200px;
}
.dl-computing__comp-bg-title {
  pointer-events: none;
  position: absolute;
  top: 170px;
  left: 12px;
  font-size: 22px;
  font-family: PangMenZhengDao, fantasy;
  color: #FFFFFF;
}
.dl-computing__comp-list {
  display: flex;
  flex-flow: column;
  row-gap: 20px;
  margin-block-start: -2px;
}
</style>
