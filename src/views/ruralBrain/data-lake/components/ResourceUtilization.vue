<template>
  <article class="dl-resource-utilization">
    <slot name="header" />
    <ul class="dl-resource-utilization__list">
        <li
          v-for="(item, idx) in items"
          :key="item.key"
          :class="{
            'dl-resource-utilization__row-item': true,
          }"
          :style="{
            cursor: item.key === '服务应用' ? 'pointer' : undefined
          }"
          :aria-label="item.key"
          @click="()=>{item.key === '服务应用' && (modalVisible = true)}"
        >
          <img :src="require(`@/assets/rural-brain/dl/utilization-row-1-icon-${idx}.svg`)" class="dl-resource-utilization__item-icon" />
          <img :src="require('@/assets/rural-brain/dl/utilization-row-1-icon-base.webp')" class="dl-resource-utilization__item-icon-base" />
          <div>
            <AnimatedNumber class="dl-resource-utilization__item-value" :value="data[`资源使用::${item.key}`]?.sl" :scale="0" />
            <span class="dl-resource-utilization__item-unit">{{data[`资源使用::${item.key}`]?.dw}}</span>
          </div>
          <div class="dl-resource-utilization__item-label">
            {{ item.key }}
            <button v-if="item.key === '服务应用'" class="dl-resource-utilization__item-label-button">
              <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="show-details"/>
            </button>
          </div>
        </li>
    </ul>
    <ul class="dl-resource-utilization__list2">
      <li v-for="(item, idx) in items2" :key="item.key" class="dl-resource-utilization__row-item" :aria-label="item.key">
        <div class="dl-resource-utilization__item-icon-container">
          <el-progress :stroke-width="4" :width="82" :show-text="false" type="circle" :percentage="parseInt(data[`资源使用::${item.key}`]?.sl ?? 0, 10)" />
          <img :src="require(`@/assets/rural-brain/dl/utilization-row-2-icon-${idx}.svg`)" class="dl-resource-utilization__item-icon" />
        </div>
        <div>
          <div class="dl-resource-utilization__item-value_group">
            <AnimatedNumber class="dl-resource-utilization__item-value" :value="data[`资源使用::${item.key}`]?.sl" :scale="0" />
            <span class="dl-resource-utilization__item-unit">{{data[`资源使用::${item.key}`]?.dw}}</span>
          </div>
          <div class="dl-resource-utilization__item-label">
            {{ item.key }}
            <button v-if="item.key === '服务应用'" @click="modalVisible = true">open</button>
          </div>
        </div>
      </li>
    </ul>
    <DetailPopup
      v-model="modalVisible"
      title="服务应用明细"
      :data="modalData"
      :columns="columns"
    />
  </article>
</template>

<script setup>
import DetailPopup from './DetailPopup.vue';
import {ref} from 'vue';
import {fetchDtapi} from "@/views/ruralBrain/data-lake/api-tokens";
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const items = [
  {key: '服务应用'},
  {key: '数据项条数'},
  {key: '数据条数'},
  {key: '日均交换量'},
]
const items2 = [
  {key: 'CPU使用率'},
  {key: '内存使用率'},
]

// 弹窗
const modalVisible = ref(false);
const modalData = ref([])
const columns = [
  {field: '_index', name: '序号', width: '10%'},
  {field: 'fwyymc', name: '服务应用名称', width: '30%'},
  {field: 'sjsm', name: '数据说明', width: '40%'},
  {field: 'sjtgqk', name: '数据提供情况', width: '20%'},
]
fetchDtapi('jsc_sjzc_zysytc').then(result=>{
  modalData.value = result.data//.concat(result.data).concat(result.data)
    .map((e, idx)=>({
      ...e,
      _index: idx + 1
    }))
})
</script>

<style scoped lang="scss">
.dl-resource-utilization {
  color: white;
  font-size: 16px;
}
// list
@mixin _dl-resource-utilization-list-mixin($cols) {
  margin-block-start: 20px;
  display: grid;
  gap: 12px 12px;
  grid-template-columns: repeat($cols, minmax(0, 1fr));
}
.dl-resource-utilization__list {
  @include _dl-resource-utilization-list-mixin(4);
  // 1st row items
  .dl-resource-utilization__row-item {
    text-align: center;
    min-width: 6em;
    display: flex;
    flex-flow: column;
    align-items: center;
    column-gap: 20px;
    .dl-resource-utilization__item-icon {
      height: 54px;
      width: 54px;
      margin-block-end: -24px ;
    }
  }
}
.dl-resource-utilization__list2 {
  @include _dl-resource-utilization-list-mixin(2);
  // 2nd row items
  .dl-resource-utilization__row-item {
    text-align: center;
    min-width: 6em;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    .dl-resource-utilization__item-icon-container {
      width: 82px;
      height: 82px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      //background: conic-gradient(#0072E630, #0072E6);
      ::v-deep(.el-progress) {
        position: absolute;
        top: 0;
        left: 0;
        .el-progress-circle__path {
          stroke: #0072E6;
        }
        .el-progress-circle__track {
          stroke: rgba(255, 255, 255, 0.10);
        }
      }
    }
    .dl-resource-utilization__item-icon {
      width: 30px;
    }
    .dl-resource-utilization__item-value_group {
      text-align: right;
      border-block-end: 2px solid;
      border-image: linear-gradient(to right, #57D8FF, transparent) 1;
    }
    .dl-resource-utilization__item-label {
      display: inline-block;
      margin-block-start: 8px;
      &::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        vertical-align: 2px;
        margin-inline-end: 8px;
        background: #3994FF;
        border-radius: 50%;
        box-shadow: 0 0 2px 2px #3994FF;
      }
    }
  }
}


.dl-resource-utilization__item-icon {
  height: 52px;
  width: 60px;
  pointer-events: none;
}
.dl-resource-utilization__item-icon-base {
  pointer-events: none;
}
.dl-resource-utilization__item-label {
  font-size: 16px;
  line-height: 24px;
  color: #CCEAFF;
}
.dl-resource-utilization__item-label-button {
  background: none;
  cursor: pointer;
  line-height: 16px;
  vertical-align: -6px;
  img {
    width: 24px;
  }
}
.dl-resource-utilization__item-value {
  font-size: 22px;
  line-height: 22px;
  font-family: PangMenZhengDao, fantasy;
  color: #FFFFFF;
}
.dl-resource-utilization__item-unit {
  font-size: 14px;
  color: #CCEAFF;
}
</style>
