<template>
  <article class="dl-storage-capacity">
    <slot name="header" />
    <div class="dl-storage-capacity__list" role="list">
      <div role="listitem" class="dl-storage-capacity__row" v-for="item in rows" :key="item.key">
        <img class="dl-storage-capacity__item-icon" :src="item.icon" />
        <span class="dl-storage-capacity__item-label">{{ item.key }}</span>
        <el-progress class="dl-storage-capacity__item-percentage-bar" :duration="0" :percentage="item.pct" :show-text="false" />
        <span :style="{whiteSpace: 'nowrap'}">
          <AnimatedNumber
            class="dl-storage-capacity__item-value"
            :value="data[`存储能力::${item.key}`]?.sl"
            :scale="2"
            @update:visual-value="(v)=>updatePercentage(item.key, v)"
          />
          <span class="dl-storage-capacity__item-unit">{{data[`存储能力::${item.key}`]?.dw}}</span>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import {ref, computed} from 'vue';
import {fetchDtapi} from "@/views/ruralBrain/data-lake/api-tokens";
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'
import icon1 from '@/assets/rural-brain/dl/storage-icon-1.svg'
import icon2 from '@/assets/rural-brain/dl/storage-icon-2.svg'
import icon3 from '@/assets/rural-brain/dl/storage-icon-3.svg'


import {round} from 'lodash';

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const rows = ref([
  {key: '总存储量', pct: 0, icon: icon1},
  {key: '公有云存储', pct: 0, icon: icon2},
  {key: '政务私有云', pct: 0, icon: icon3}
])
const updatePercentage = (key, value)=>{
  const item = rows.value.find(e=>e.key === key);
  if (item) {
    item.pct = round(100 * (value || 0) / (props.data[`存储能力::总存储量`]?.sl || Number.POSITIVE_INFINITY) , 2)
  }
}



</script>

<style scoped lang="scss">
.dl-storage-capacity {
  color: white;
  font-size: 16px;

  .dl-storage-capacity__row:first-of-type {
    .dl-storage-capacity__item-icon {
      animation-delay: 0.8s;
    }
    ::v-deep(.el-progress-bar__inner) {
      background: linear-gradient( to right, #E0C2601A, #E0C260);
      &::after {
        filter: hue-rotate(-144deg);
      }
    }
  }
  .dl-storage-capacity__row:nth-of-type(2) {
    .dl-storage-capacity__item-icon {
      animation-delay: 1.7s;
    }
    ::v-deep(.el-progress-bar__inner) {
      background: linear-gradient( to right, #8EFFCE1A, #8EFFCE);
      &::after {
        filter: hue-rotate(-35deg);
      }
    }
  }

  ::v-deep(.el-progress-bar) {
    .el-progress-bar__outer {
      overflow: visible;
      background-color: #0A285Eb0;
    }
    .el-progress-bar__inner {
      transition: none; // 覆盖默认的进度条transition
      position: relative;
      background: linear-gradient( to right, #2CE1FF1A, #26DAF8);
      &::after {
        position: absolute;
        right: -25px;
        top: -22px;
        width: 50px;
        height: 50px;
        background: no-repeat center / 100% 100% url("~@/assets/images/progress-bar-handle.webp");
      }
    }
  }
}
.dl-storage-capacity__row {
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-inline-start: 12px;
}
.dl-storage-capacity__list {
  height: 62px * 3;
  margin-block: 30px;
  display: flex;
  flex-flow: column;
  font-size: 16px;
  line-height: 24px;
}
.dl-storage-capacity__item-icon {
  width: 54px;
  height: 62px;
  animation: sc-icon-hover-anim 2.5s linear infinite ;
}
.dl-storage-capacity__item-label {
  display: inline-block;
  color: #CCEAFF;
  width: 5em;
}
.dl-storage-capacity__item-percentage-bar {
  width: 229px;
}
.dl-storage-capacity__item-value {
  margin-inline-end: 4px;
  color: #EACA60;
  font-size: 22px;
  line-height: 38px;
  font-family: PangMenZhengDao;
}
.dl-storage-capacity__item-unit {width: 20px;
  font-size: 14px;
  color: #CCEAFF;
}
</style>
