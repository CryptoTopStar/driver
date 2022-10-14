<template>
  <div ref="chartRef" class="chart">
  </div>
</template>

<script setup>
import {ref, onMounted,watchEffect,watch } from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
import { getPigMarketSaleList} from "@/api/dataExploration/api";

const props = defineProps({
  data: {
    type:Array,
    default:[]
  },
  type:{
      type:String
  }
})
const chartRef = ref(null);
const pigMarketSaleData = ref([]);
const {instance} = useResponsiveChart(chartRef);
const createChartsFn=(data=[])=>{//生成charts
        const {type}=props
        let yAxisName=''
        let seriesName=''
        let yAxisValue = []
        console.log(data,type)
        switch(type){//根据三个表格使用需求做单独处理
            case 'pigSale':
              yAxisName='元/kg'
              seriesName='日销售价格'
              yAxisValue=Array.isArray(data)&&data?.map(e=>e.price)
            break;
            case 'pigMarketSale':
              yAxisName='头'
              seriesName='日销售量'
              yAxisValue=Array.isArray(data)&&data.map(e=>e.sales)
            break;
            case 'piglet':
              yAxisName='元'
              seriesName='猪仔价格'
              yAxisValue=data.map(e=>e.price)
            break;
            default:
              yAxisName='万头'
              seriesName='能繁殖母猪存量'
              yAxisValue=data.map(e=>e.sow)
            break;
        }
      const xAxisValue = (type=='pigSale'||type=='pigMarketSale')?Array.isArray(data)&&data?.map(e=>e.date.slice(5,7)+'.'+e.date.slice(8,10)):data.map(e=>e.month.slice(5,7)+'月')
      const option = {
        tooltip: {
          trigger: 'axis',
          borderColor: "#278BFF",
          borderWidth: 1,
          textStyle:{
              color:'#fff'
          },
          backgroundColor: "#07266C",
        },
        grid: {
          top: 30,
          bottom: 40,
          right: 0
        },
        // legend: {
        //   show: true
        // },
        legend: {
              show: true,
              top: 'bottom',
              textStyle:{
                color:'#fff'
              }
              // data: [{textStyle:{color:'#FFFFFF'}}]
        },
        yAxis: {
          type: 'value',
          name:  yAxisName,
          nameTextStyle: {
            color: 'white',
            align: 'right',
          },
          axisLabel: {
            color: 'white',
            fontSize: '1em',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: xAxisValue,
          // offset: -14 * 8,
          axisLabel: {
            fontSize: '1em',
            color: 'white',
            overflow: 'breakAll',
            interval: 0, // show all
            width: 14 * 4
          },
        },
        series: [
          {
            name:  seriesName,
            type: 'bar',
            data: yAxisValue,
            barWidth: '30%',
            label: {
              show: true,
              position: 'top',
              color: 'white',
            },
            itemStyle:{
              barBorderRadius:  [10, 10, 0, 0],
            },
            color:  {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: type=='pigMarketSale'?'#00BAFE':'rgba(42, 235, 234, 1)'
                },
                {
                  offset: 1,
                  color:  type=='pigMarketSale'?'rgba(51, 143, 249, 0.3)':'rgba(0, 114, 123, 1)'
                },
              ],
              global: false, // 缺省为 false
            },
          },
        ],
      };
      instance.value?.setOption(option)
}
// const reload = () => {
//     getPigMarketSaleList({}).then((res) => {
//         if (res.code == 0) {
//             data = Array.isArray(res.data)?res.data:[res.data];
            
//         }
//     });
// };
onMounted(()=>{
  // reload()
})
watchEffect(() => {//props更新函数
  // data==props?.data
  createChartsFn(props?.data)
});
</script>

<style scoped lang="scss">
.chart {
  margin-block: vh(16);
  height: vh(250);
  font-size: vw(12);
}
</style>
