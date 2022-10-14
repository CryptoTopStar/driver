<template>
  <article class="dl-data-gathering-overview">
    <slot name="header" />
    <div class="dl-data-gathering-overview__list">
      <div class="dl-data-gathering-overview__item" :style="{textAlign: 'center'}" aria-label="数源系统数量">
        <div class="dl-data-gathering-overview__primary-label">已归集</div>
        <div>
          <AnimatedNumber class="dl-data-gathering-overview__primary-value" :value="data['采集汇总::已归集']?.sl" />
          <span class="dl-data-gathering-overview__primary-unit">{{data['采集汇总::已归集']?.dw}}</span>
        </div>
      </div>
      <img :src="require('@/assets/rural-brain/dl/gathering-comp-bracket.svg')" alt="decor" />
      <div class="dl-data-gathering-overview__secondary-container">
        <div class="dl-data-gathering-overview__secondary-data-grid">
          <div class="dl-data-gathering-overview__secondary-decor">
            <img :src="require('@/assets/rural-brain/dl/gathering-comp-col-1.svg')" />
            <div class="dl-data-gathering-overview__secondary-decor-label">数据采集容量</div>
          </div>
          <div class="dl-data-gathering-overview__secondary-decor">
            <img :src="require('@/assets/rural-brain/dl/gathering-comp-col-2.svg')" />
            <div class="dl-data-gathering-overview__secondary-decor-label">
              数据构成
            </div>
          </div>
        </div>
        <hr class="dl-data-gathering-overview__secondary-hr" />
        <div class="dl-data-gathering-overview__secondary-data-grid">
          <li v-for="item in items" :key="item.key" class="dl-data-gathering-overview__secondary-item" :aria-label="item.key">
              <span class="dl-data-gathering-overview__item-label">{{ item.name || item.key }}</span>
              <AnimatedNumber
                class="dl-data-gathering-overview__item-value"
                :value="data[`采集汇总::${item.key}`]?.sl"
                :scale="item.scale"
              />
              <span class="dl-data-gathering-overview__item-unit">{{data[`采集汇总::${item.key}`]?.dw}}</span>
          </li>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import {ref} from 'vue';
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const items = [
  {key: '归集目标', scale: 0},
  {key: '结构化数据', scale: 2},
  {key: '已采集', scale: 2},
  {key: '矢量/栅格数据', scale: 1, name: '空间数据'},
  {key: '已入仓', scale: 2},
  {key: '其他数据', scale: 2}
]

</script>

<style scoped lang="scss">
.dl-data-gathering-overview {
  color: white;
  font-size: 16px;
  margin-bottom: 12px;
}
.dl-data-gathering-overview__row {
  display: flex;
  column-gap: 20px;
  background: #7bc3fa80;
  padding: 0px 20px;
}
.dl-data-gathering-overview__list {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 20px;
}

.dl-data-gathering-overview__item {
  font-size: 18px;
  color: #CCEAFF;
  line-height: 24px;
}
// primary
.dl-data-gathering-overview__primary-label {
  min-width: 4.5em;
}
.dl-data-gathering-overview__primary-value {
  font-size: 24px;
  line-height: 24px;
  margin-inline-end: 4px;
  font-family: PangMenZhengDao, fantasy;
  color: #FFFFFF;
  text-shadow: 0px 0px 6px rgba(43, 228, 255, 0.30196078431372547);
}
.dl-data-gathering-overview__primary-unit {
  font-size: 14px;
}
// secondary
.dl-data-gathering-overview__secondary-container {
  display: flex;
  flex-flow: column;
  align-self: flex-start;
  flex: 1;
}
.dl-data-gathering-overview__secondary-decor {
  display: flex;
  flex-flow: column;
  align-items: center;
  > img {
    width: 40px;
  }
}
.dl-data-gathering-overview__secondary-decor-label {
  width: 180px;
  height: 46px;
  box-sizing: border-box;
  padding: 2px 0px 2px 8px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #31E9FF;
  line-height: 42px;
  text-shadow: 0px 0px 3px rgba(49, 233, 255, 0.4);
  background: no-repeat center / 100% 100% url('~@/assets/rural-brain/dl/gathering-comp-col-header-bg.svg');
}
.dl-data-gathering-overview__secondary-hr {
  height: 15px;
  background: no-repeat center / 100% 100% url('~@/assets/rural-brain/dl/gathering-comp-hr.svg');
}

.dl-data-gathering-overview__secondary-data-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 12px;
}
.dl-data-gathering-overview__secondary-item {
  @extend .dl-data-gathering-overview__item;
  margin-inline-start: 20px;
  display: flex;
}
.dl-data-gathering-overview__item-label {
  flex: 1;
  font-size: 16px;
}
.dl-data-gathering-overview__item-value {
  font-size: 20px;
  color: #FFFFFF;
  margin-inline-end: 4px;
}
.dl-data-gathering-overview__item-unit {
  font-size: 14px;
}
//
//.dl-data-gathering-overview__item-label {
//  color: lime;
//}
//.dl-data-gathering-overview__item-value {
//  font-size: 24px;
//  font-family: PangMenZhengDao, fantasy;
//  color: #FFFFFF;
//  text-shadow: 0px 0px 6px rgba(43, 228, 255, 0.30196078431372547);
//}
//.dl-data-gathering-overview__item-unit {
//  color: coral;
//  font-size: 14px;
//}
</style>
