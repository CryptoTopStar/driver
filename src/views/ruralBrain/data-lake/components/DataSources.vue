<template>
  <article class="dl-data-source">
    <slot name="header" />
    <div class="dl-data-source__list">
      <div class="dl-data-source__primary" aria-label="数源系统数量"  @click="modalVisible = true">
        <img class="dl-data-source__primary-ring-effect" :src="require('@/assets/images/smart-communities/ring.png')" alt="decor"/>
        <div class="dl-data-source__item-label">数源系统数量</div>
        <div>
          <AnimatedNumber class="dl-data-source__item-value" :value="data['数据来源::数源系统数量']?.sl" />
          <span class="dl-data-source__item-unit">{{data['数据来源::数源系统数量']?.dw}}</span>
        </div>
        <button class="dl-data-source__primary-detail-button">
          <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="show-details"/>
        </button>
        </div>
      <img class="dl-data-source__stagger" :src="require('@/assets/rural-brain/dl/arrows.svg')" alt="separator"/>
      <div class="dl-data-source__col dl-data-source__stagger" :style="{columnGap: '10px'}">
        <div v-for="item in row2" :key="item" class="dl-data-source__item" :aria-label="item">
          <span class="dl-data-source__item-label">{{ item }}</span>
          <AnimatedNumber class="dl-data-source__item-value" :value="data[`数据来源::${item}`]?.sl" />
          <span class="dl-data-source__item-unit">{{data[`数据来源::${item}`]?.dw}}</span>
        </div>
      </div>
      <img class="dl-data-source__stagger" :src="require('@/assets/rural-brain/dl/arrows.svg')" alt="separator"/>
      <div class="dl-data-source__col dl-data-source__stagger" :style="{columnGap: '60px'}">
        <div v-for="item in row3" :key="item" class="dl-data-source__item" :aria-label="item">
          <span class="dl-data-source__item-label">{{ item }}</span>
          <AnimatedNumber class="dl-data-source__item-value" :value="data[`数据来源::${item}`]?.sl" />
          <span class="dl-data-source__item-unit">{{data[`数据来源::${item}`]?.dw}}</span>
        </div>
      </div>
    </div>
    <DetailPopup
      v-model="modalVisible"
      title="数源系统明细"
      :data="modalData"
      :columns="columns"
    />
  </article>
</template>

<script setup>
import DetailPopup from './DetailPopup.vue';
import {ref, onMounted} from 'vue';
import {fetchDtapi} from "@/views/ruralBrain/data-lake/api-tokens";
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'
import gsap from 'gsap'

onMounted(()=>{
  gsap.fromTo('.dl-data-source__stagger', {
    opacity: 0,
    translateX: -30
  },{
    opacity: 1,
    translateX: 0,
    duration: 1.5,
    stagger: 0.2,
  })
})

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const row2 = ['原有系统数量', '新建系统数量']
const row3 = ['上级系统', '本级系统', '其他']

// 弹窗
const modalVisible = ref(false);
const modalData = ref([])
const columns = [
  {field: '_index', name: '序号', width: '10%'},
  {field: 'xtlx', name: '系统名称', width: '30%'},
  {field: 'xtlyks', name: '系统类型', width: '30%'},
  {field: 'xtmc', name: '数据来源科室', width: '30%'},
]
fetchDtapi('jsc_sjzc_sjlytc').then(result=>{
  modalData.value = result.data//.concat(result.data).concat(result.data)
    .map((e, idx)=>({
      ...e,
      _index: idx + 1
    }))
})
</script>

<style scoped lang="scss">
.dl-data-source {
  color: white;
  font-size: 16px;
}
.dl-data-source__col {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding-block: 20px;
  width: 182px;
  height: 145px / 168 * 182;
  box-sizing: border-box;
  background: no-repeat center / 100% 100% url('~@/assets/rural-brain/dl/source-col-bg.svg');
}
.dl-data-source__list {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
}
.dl-data-source__primary {
  position: relative;
  text-align: center;
  min-width: 6em;
  font-size: 18px;
  color: #CCEAFF;
  cursor: pointer;
  .dl-data-source__item-value {
    color: white;
  }
  .dl-data-source__primary-detail-button {
    background: none;
    img {
      width: 24px;
    }
  }
  .dl-data-source__primary-ring-effect {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 180%;
    transform: rotateX(70deg) translate(-23%, 280px);
    pointer-events: none;
  }
}




.dl-data-source__item {
  display: flex;
  align-items: baseline;
  font-size: 16px;
  width: calc(100% - 40px);
  padding-inline: 20px;
  color: #CCEAFF;
}
.dl-data-source__item-label {
  flex: 1;
}
.dl-data-source__item-value {
  font-size: 22px;
  margin-inline-end: 4px;
  font-family: PangMenZhengDao;
  color: #39D9FF;
}
.dl-data-source__item-unit {
  font-size: 14px;
}
</style>
