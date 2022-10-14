<template>
  <article class="dl-api-overview-">
    <slot name="header" />
    <div class="dl-api-overview-container">
<!--      <map name="dl-api-overview">-->
<!--        <img class="dl-api-overview__comp-bg" usemap="#dl-api-overview" :src="require('@/assets/images/smart-communities/region.webp')" />-->
<!--      </map>-->
      <img class="dl-api-overview__comp-bg" :src="require('@/assets/rural-brain/dl/api-overview-comp-bg.webp')" />
      <div class="dl-api-overview__item-list" role="list">
        <div class="dl-api-overview__row0">
          <div
            role="listitem"
            v-for="item in items0"
            :key="item.key"
            class="dl-api-overview__item"
            :data-key="item.key"
            :aria-label="item.key"
            @click="popupTargetType = item.typeKey; modalVisible = true;"
          >
            <div class="dl-api-overview__item-label">
              {{ item.key }}
            </div>
            <div>
              <AnimatedNumber class="dl-api-overview__item-value" :value="data[`数据服务::${item.key}`]?.sl" :scale="item.scale" />
<!--              <span class="dl-api-overview__item-unit">{{data[`数据服务::${item.key}`]?.dw}}</span>-->
              <button class="dl-api-overview__item-value-button">
                <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="show-details"/>
              </button>
            </div>
          </div>
        </div>

        <div class="dl-api-overview__row1">
          <div
            role="listitem"
            v-for="item in items1"
            :key="item.key"
            class="dl-api-overview__item"
            :style="{
              animationDelay: item.animDelay
            }"
            :data-key="item.key"
            :aria-label="item.key"
            @click="popupTargetType = item.typeKey; modalVisible = true;"
          >
            <div class="dl-api-overview__item-wrapper">
              <div class="dl-api-overview__item-label">
                {{ item.key }}
              </div>
              <AnimatedNumber class="dl-api-overview__item-value" :value="data[`数据服务::${item.key}`]?.sl" :scale="item.scale" />
            </div>
          </div>
        </div>

        <div class="dl-api-overview__row2">
          <div role="listitem" v-for="item in items2" :key="item.key" class="dl-api-overview__item" :data-key="item.key" :aria-label="item.key">
            <span class="dl-api-overview__item-label">
              {{ item.key }}
            </span>
            <AnimatedNumber class="dl-api-overview__item-value" :value="data[`数据服务2::${item.key}`]?.sl" :scale="item.scale" />
            <span class="dl-api-overview__item-unit">{{data[`数据服务2::${item.key}`]?.dw}}</span>
          </div>
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
import {computed, ref, watchEffect} from 'vue';
import AnimatedNumber from '@/components/shared/AnimatedNumber.vue'
import DetailPopup from './DetailPopup.vue';
import {fetchDtapi, tokenMap} from "@/views/ruralBrain/data-lake/api-tokens";

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const items0 = [
  {key: '开放服务', scale: 0, typeKey: null}
]
const items1 = [
  // 单独项
  {key: '乡村治理', scale: 0, typeKey: '乡村治理', animDelay: `-0.2s`},
  {key: '流通营销', scale: 0, typeKey: '流通营销', animDelay: `-1.6s`},
  {key: '行业监管', scale: 0, typeKey: '行业监管', animDelay: `-0.94s`},
  {key: '生产管理', scale: 0, typeKey: '生产管理', animDelay: `-1.73s`},
]
const items2 = [
  {key: '即将开放服务', scale: 0},
  {key: '累计调用总次数', scale: 0},
]


// 弹窗
const modalVisible = ref(false);
const popupTargetType = ref(null)
const isLoading = ref(false);
const dataCache = ref(new Map());
const modalData = computed(()=>{
  return dataCache.value.get(popupTargetType.value) ?? []
});

watchEffect(()=>{
  const targetedType = popupTargetType.value;
  if (!dataCache.value.has(targetedType)) {
    dataCache.value.set(targetedType, []);
    isLoading.value = true;
    const searchParams = targetedType? new URLSearchParams({type: targetedType}).toString() : ''
    fetchDtapi(`jsc_sjzc_sjfwtc?${searchParams}`, undefined, {
      method: 'GET',
      headers: {
        'API-TOKEN': tokenMap['jsc_sjzc_sjfwtc'],
      }
    })
      .then((result)=>{
        dataCache.value.set(targetedType, result.data.map((e, idx)=>({
          ...e,
          _index: idx + 1
        })));
      })
      .catch(console.error)
      .finally(()=>{
        isLoading.value = false
      })
  }
})

const columns = [
  {field: '_index', name: '序号', width: '10%'},
  {field: 'type', name: '服务类型', width: '10%'},
  {field: 'fwsm', name: '服务说明', width: '40%', textAlign: 'center'},
  {field: 'fwjkmc', name: '服务接口名称', width: '40%', textAlign: 'center'},
]
</script>

<style scoped lang="scss">
.dl-api-overview-container {
  position: relative;
  display: flow-root;
  height: 300px;
}
// components
.dl-api-overview__comp-bg {
  width: 386px;
  pointer-events: none;
  position: absolute;
  inset-block-start: 40px;
  inset-inline-start: 85px;
  z-index: 1;
}

.dl-api-overview__item-value-button {
  background: none;
  cursor: pointer;
  vertical-align: -2px;
  width: 0;
  img {
    width: 20px;
  }
}
.dl-api-overview__item {
  position: absolute;
  text-align: center;
  column-gap: 20px;
  z-index: 2;
  &[data-key='开放服务'] {
    left: 240px;
    top: 144px;
  }
  $initial-item-left: 30px;
  $initial-item-top: 140px;
  &[data-key='乡村治理'] {
    left: $initial-item-left;
    top: $initial-item-top;
  }
  &[data-key='流通营销'] {
    left: $initial-item-left + 27px + 82px;
    top: $initial-item-top - 29px - 82px;
  }
  &[data-key='行业监管'] {
    left: $initial-item-left + 27px + 82px * 2 + 100px;
    top: $initial-item-top - 29px - 82px;
  }
  &[data-key='生产管理'] {
    left: $initial-item-left + 27px + 82px * 3 + 100px + 47px;
    top:  $initial-item-top;
  }
  // 底部两个
  &[data-key='即将开放服务'] {
    left: 20px;
    bottom: 20px;
  }
  &[data-key='累计调用总次数'] {
    right: 20px;
    bottom: 20px;
  }
}
.dl-api-overview__row0 {
  font-size: 16px;
  color: #FFFFFF;
  .dl-api-overview__item {
    cursor: pointer;
    .dl-api-overview__item-label {
      font-size: 18px;
      color: #CCEAFF;
    }
    .dl-api-overview__item-value {
      font-size: 24px;
      font-family: PangMenZhengDao;
      color: #FFFFFF;
      text-shadow: 0px 0px 6px rgba(43, 228, 255, 0.30196078431372547);
      margin-inline-end: 4px;
    }
    .dl-api-overview__item-unit {
    }
  }
}

.dl-api-overview__row1 {
  font-size: 16px;
  color: #FFFFFF;
  .dl-api-overview__item {
    width: 82px;
    height: 82px;
    background: no-repeat center/ 100% 100% url("~@/assets/rural-brain/dl/api-overview-comp-item-bg.svg");
    cursor: pointer;
    animation: jscm-icon-scale-down-anim 3s infinite ease;
    transition: all 0.5s ease;
    &:hover {
      filter: brightness(1.5);
    }
  }
  .dl-api-overview__item-wrapper {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    //background: linear-gradient(to right bottom, #002368 50%, #82CDFE);
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    //&::before {
    //  content: '';
    //  position: absolute;
    //  transition: background 0.5s ease;
    //  height: 90%;
    //  width: 90%;
    //  border-radius: 50%;
    //  background: #002368;
    //  inset-inline-start: 5%;
    //  inset-block-start: 5%;
    //  z-index: 0;
    //}
    .dl-api-overview__item-label {
      z-index: 5;
    }
    .dl-api-overview__item-value {
      font-size: 20px;
      line-height: 24px;
      z-index: 5;
      //font-family: PangMenZhengDao;
    }
    .dl-api-overview__item-unit {
    }
  }
}

.dl-api-overview__row2 {
  .dl-api-overview__item {
    .dl-api-overview__item-label {
      font-size: 16px;
      color: #CCEAFF;
    }
    .dl-api-overview__item-value {width: 61px;
      font-size: 22px;
      font-family: PangMenZhengDao;
      color: #EACA60;
      margin-inline: 8px 4px;
    }
    .dl-api-overview__item-unit {
      font-size: 14px;
      color: #CCEAFF;
    }
  }
}


</style>
