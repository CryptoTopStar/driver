<template>
  <div ref="chartRef" class="chart">

  </div>
</template>

<script setup>
import {ref, onMounted ,watchEffect} from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
const props = defineProps({
  data: {
    type:Array,
    default:[]
  },
  type:{
    type:String,
  }
})
const chartRef = ref(null);
const sourceData = ref([]);
const {instance} = useResponsiveChart(chartRef);
const createChartsFn=()=>{//生成charts
      const {type}=props
      sourceData.value=props?.data.map(item=>[item.month.slice(5,7)+'月',item.live_pigs,item.pig_stock])
      sourceData.value.splice(0,0,['name', '存栏数', '出栏数']);
      const option = {
          color:type=='pigMarket'?['#26B4FC','#EF9E4E']:['#10EDFF','#6F74F0'],
          legend: {
              show: true,
              top: 'bottom',
              data: [{name:'出栏数',textStyle:{color:'#FFFFFF'}},{name:'存栏数',textStyle:{color:'#FFFFFF'}}]
          },
          tooltip: {
            trigger: 'axis',
            borderColor: "#278BFF",
            borderWidth: 1,
            backgroundColor: "#07266C",
            textStyle:{
                color:'#fff'
            },
          },
          grid: {
             top: 30,
            bottom: '25%',
            right: 0
          },
          dataset: {
              source: sourceData.value
          },
          xAxis: { type: 'category',
          axisLabel: {
            fontSize: '1em',
            color: 'white',
            overflow: 'breakAll',
            interval: 0, // show all
            width: 14 * 4
          }
          },
          yAxis: {
            type: 'value',
            name:'万头',
            nameTextStyle: {
            color: 'white',
            align: 'right',
          },
            axisLabel: {
            color: 'white',
            fontSize: '1em',
          },splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
          }},
          series: [
            { type: 'bar', 
            itemStyle: {
            color: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                    offset: 0, color: type=='pigMarket'?'#26B4FC':'#10EDFF' // 0% 处的颜色
                }, {
                    offset: 1, color: type=='pigMarket'?'#26B4FC':'#349AFF' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
          }
          }, 
          { type: 'bar',
            itemStyle: {
            color: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                    offset: 0, color: type=='pigMarket'?'#EF9E4E':'#84C2FF' // 0% 处的颜色
                }, {
                    offset: 1, color: type=='pigMarket'?'#EF9E4E':'#6F74F0' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            }
          }}]
          };
        instance.value?.setOption(option)
}
onMounted(()=>{
  // createChartsFn()
})
watchEffect(() => {//props更新函数
  createChartsFn()
});
</script>

<style scoped lang="scss">
.chart {
  margin-block: vh(16);
  height: vh(250);
  // height: 100%;
  font-size: vw(12);
}
</style>
