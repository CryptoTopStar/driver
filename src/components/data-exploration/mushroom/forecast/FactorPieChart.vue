<template>
  <div class="container">
    <div ref="chart" class="chart" />
    <div class="legend">
      <div v-for="(item, idx) in data" :key="item.name" class="legend-item">
        <span class="dot" :style="{background: colors[idx]}"/>
        <span class="name">{{item.name}}</span>
        <span class="quant" :style="{color: colors[idx]}">{{item.value}}%</span>
      </div>
    </div>
    <transition name="ring-effect">
      <video
        v-show="data.length > 0"
        muted
        autoplay
        loop
        :src="require('@/assets/images/smart-communities/fire-stats/ring.mp4')"
        class="ring-effect"
      />
    </transition>
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount, shallowRef} from "vue";
import request from '@/util/http.js';
import useResponsiveChart from "@/composables/useResponsiveChart";
import echartTheme from "@/components/data-exploration/mushroom/shared/echart-theme.json";

// chart
const chart = ref(null);
const {instance: chartInstance} = useResponsiveChart(chart, echartTheme);
const colors = ['#71D964', '#DED82E', '#17C4EB', '#ED9D1A', '#9580FF', '#25D9D6', '#3BA0FC', '#FC6759']
const autoHighlightIdx = ref(0);
const autoHighlightClock = shallowRef(null);
const startAutoplay = () => {
  autoHighlightClock.value = setInterval(()=>{
    chartInstance.value?.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: autoHighlightIdx.value,
    });
    autoHighlightIdx.value = (autoHighlightIdx.value + 1) % 6;
    chartInstance.value?.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: autoHighlightIdx.value,
    });
  },2000)
}
const endAutoPlay = (e) => {
  clearInterval(autoHighlightClock.value)
  if (e.dataIndex !== autoHighlightIdx.value) {
    chartInstance.value?.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: autoHighlightIdx.value,
    });
  }
}

// data
const isLoading = ref(false);
const data = ref([]);

onMounted(()=>{
  Promise.resolve({data: [
      {name:'投料重量', value: 3},
      {name:'栽培面积', value: 12},
      {name:'培养基含水量', value: 10},
      {name:'培养基PH值', value: 8},
      {name:'湿度', value: 14},
      {name:'二氧化碳浓度', value: 19},
      {name:'菌丝生长温度', value: 11},
      {name:'光线情况', value: 23},
    ]}).then((result)=>{
    const names = result.data.map(e=>e.name);
    data.value =  result.data;
    const option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '影响因子',
          type: 'pie',
          radius: ['70%', '80%'],
          // avoidLabelOverlap: false,
          itemStyle: {
            borderColor: 'transparent',
            borderWidth: 5
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              width: 20 * 6,
              overflow: 'break',
              fontWeight: 'bold',
              color: 'white',

              formatter: [
                '{b}\n',
                '{em|{c}}{emu|%}'
              ].join('\n'),
              rich: {
                em: {
                  color: '#27E0FD',
                  fontSize: '38px',
                  fontFamily: 'PangMenZhengDao-Regular, PangMenZhengDao',
                  verticalAlign: 'bottom'
                },
                emu: {
                  verticalAlign: 'bottom'
                }
              }
            }
          },
          labelLine: {
            show: false
          },
          tooltip: {
            show: false
          },
          data: data.value
        }
      ],
      color: colors,
    };
    chartInstance.value?.setOption(option);
    startAutoplay();
  }).finally(()=>{
    isLoading.value = false;
  });
  chartInstance.value.on('mouseover', endAutoPlay);
  chartInstance.value.on('mouseout', startAutoplay);
})
onBeforeUnmount(()=>{
  clearInterval(autoHighlightClock.value);
  chartInstance.value?.off('mouseover', endAutoPlay);
  chartInstance.value?.off('mouseout', startAutoplay);
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: grid;
  grid-template-columns: vw(305) 1fr;
  margin-block: auto;
}
.ring-effect {
  height: vw(340);
  mix-blend-mode: screen;
  position: absolute;
  top: vw(-20);
  left: vw(-20);
  pointer-events: none;
  z-index: 1;
  opacity: 1;
}
.ring-effect-enter-active,
.ring-effect-leave-active {
  transition: opacity 5s ease;
}
.ring-effect-enter-from {
  opacity: 0;
}
.ring-effect-leave-to {
  opacity: 0;
}
.pie-decor {
  position: absolute;
  width: 80%;
  left: 10%;
  top: vh(25);
  height: vh(138);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 3;
}
.chart {
  height: vw(305);
  width: vw(305);
  z-index: 2;
}
.legend {
  padding: 0 vw(35) vh(20) vw(35);
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: vh(16) vw(50)
}
.legend-item {
  font-size: vw(16);
  font-weight: normal;
  line-height: vw(20);
  display: flex;
  align-items: center;
  width: 100%;
}
.dot {
  width: vw(12);
  height: vw(12);
  margin-inline-end: vw(4);
  //border-radius: 50%;
}
.name {
  color: #A1CEEF;
}
.quant {
  flex: 1;
  text-align: right;
  justify-self: flex-end;
}
</style>
