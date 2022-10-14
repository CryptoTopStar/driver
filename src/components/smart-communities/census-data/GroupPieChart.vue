<template>
  <Label label="重点人员类型"/>
  <div class="container">
    <div ref="chart" class="chart" />
    <div class="pie-decor" ref="pieBubble" v-show="data.length > 0">
      <img :src="require('@/assets/images/smart-communities/fire-stats/pie-pt-l.png')" />
      <img :src="require('@/assets/images/smart-communities/fire-stats/pie-pt-r.png')" />
    </div>
    <div class="legend">
      <div v-for="(item, idx) in data" :key="item.device_name" class="legend-item">
        <span class="dot" :style="{background: colors[idx]}"/>
        <span class="name">{{item.type_title}}</span>
        <span class="quant" :style="{color: colors[idx]}">{{item.number}}人</span>
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
import * as echarts from 'echarts';

// chart
const chart = ref(null);
const colors = ['#FC6759', '#3AA0FC', '#FEC539', '#35F292', '#24D9D6', '#8277FF']
const chartInstance = shallowRef(null);
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

const pieBubble = ref(null)
// data
const isLoading = ref(false);
const data = ref([]);
request.get('/api/Person/getPersonType').then((result)=>{
  const validGroups = ['低收入农户', '残疾人', '独居老人', '大病人群', '孤儿', '其他'];
  const validData = validGroups.map(name=>result.data.find(r=>r.type_title === name) ?? {
    type_title: name,
    number: "-"
  },)
  const popCount = validData.reduce((sum, curr)=>(sum + Number(curr.number)), 0);
  data.value = validData.map((e, idx)=>({...e, _pct: (100 * Number(e.number) / popCount).toFixed(0)}));
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '重点人员类型',
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
            fontSize: 14,
            width: 14 * 5,
            overflow: 'break',
            fontWeight: 'bold',
            color: 'white',
            formatter: [
              '{b}\n',
              '{em|{c}}{emu|人}'
            ].join('\n'),
            rich: {
              em: {
                color: '#27E0FD',
                fontSize: '24px',
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
        data: data.value.map(e=>({
          value: Number(e.number),
          name: e.type_title,
        }))
      }
    ],
    color: colors,
  };
  chartInstance.value?.setOption(option);
  startAutoplay();
}).finally(()=>{
  isLoading.value = false;
});
const resizeHandler = ()=>{
  chartInstance.value?.resize();
};
onMounted(()=>{
  pieBubble.value.animate([
    { transform: 'scaleX(0.9) scaleY(0.9)'},
  ], {
    duration: 2000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });
  chartInstance.value = echarts.init(chart.value);
  chartInstance.value.on('mouseover', endAutoPlay);
  chartInstance.value.on('mouseout', startAutoplay);
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(()=>{
  clearInterval(autoHighlightClock.value);
  chartInstance.value?.off('mouseover', endAutoPlay);
  chartInstance.value?.off('mouseout', startAutoplay);
  chartInstance.value?.dispose();
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
}
.ring-effect {
  height: vh(210);
  mix-blend-mode: screen;
  position: absolute;
  top: 0;
  left: 50%;
  margin-block-start: vh(-10);
  transform: translateX(-50%);
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
  height: vh(190);
  z-index: 2;
}
.legend {
  height: vh(80);
  display: grid;
  padding: 0 vw(35) vh(20) vw(35);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: vh(0) vw(50)
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
