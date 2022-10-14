<template>
  <div ref="chartRef" class="chart" :style="{height:type=='todayPirce'?'150px':'200px'}">

  </div>
</template>

<script setup>
import {ref, onMounted,watchEffect} from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
import * as ecStat from 'echarts-stat';
import * as echarts from 'echarts';
// 生猪销量拟合后的曲线：
const ChartsDataType={
    pigMarket:'pigMarket',//生猪区域价格红线预警
    pigMarketSale:'pigMarketSale'//生猪区域销量突变预警
}
const MarketData={ x:[1,2,3,4,5,6]
,y: [27.09, 27.42, 28.19, 27.86, 29.03, 28.69]
,ySale: [9.72, 8.45, 10.97, 9.95, 9.00, 9.12]
}
// pigMarketSale // 算法模块 暂时自己mook数据 后端给的说法是:直接发你值，展示吧。用算法的话，数据都是假的，返回值不对 后端对接玉龙
const props = defineProps({
  type: {
    type:String,
  }
})
const chartRef = ref(null);
const data = ref( [[1, 13.75],
                [2, 9.7],
                [3, 34.5],
                [4, 71.0],
                [5, 64.4],
                [6, 2.2],
                [7, 62.5],
                [8, 28.3],
                [9, 9.2],
                [10, 94.9]]);
const {instance} = useResponsiveChart(chartRef);
const createChartsFn=()=>{//生成charts
      const {type}=props
      echarts.registerTransform(ecStat.transform.regression);
        const option = {
        color:type==ChartsDataType.pigMarket?['#0E9CFF']:['#DF6FF4'],
         dataset: [
            {
            source:data.value
            },
            {
            transform: {
                type: 'ecStat:regression',
                config: {
                method: 'exponential'
                // 'end' by default
                // formulaOn: 'start'
                }
            }
            }
        ],
        grid: {
          top: 30,
          bottom: 30,
          right: 50,
        },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //     type: 'cross'
        //     }
        // },
        tooltip: {
            trigger: 'axis',
            borderColor: "#278BFF",
            borderWidth: 1,
            textStyle:{
                color:'#fff'
            },
            backgroundColor: "#07266C",
            axisPointer: {
            type: 'cross'
            },
            formatter: function (params) {
                const {data=[],seriesName,marker}=params[0]
                return   `<div>
                        <div>${data[0]}月</div>
                    <div>${marker+seriesName}${data[1]}</div>
                    <div>${params[1].marker+params[1].seriesName}${params[1].data[1]}</div>
                </div>` ;
            }
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                  color: 'rgba(255,255,255,0.14)',
                }
            },
            axisLabel: {
                color: 'white',
                fontSize: '1em',
                formatter: '{value}月'
            },
        },
        yAxis: {
          min:'dataMin', //取最小值为最小刻度
          max: 'dataMax', //取最大值为最大刻度
          minInterval: 0.01, //分割刻度
          min: function(value) {//取最小值向下取整为最小刻度
            return Math.floor(value.min)
          },
          max: function(value) {//取最大值向上取整为最大刻度
            return  Math.ceil(value.max)
          },
          scale: true, //自适应
            axisLabel: {
            color: 'white',
            fontSize: '1em',
          },
            splitLine: {
            lineStyle: {
                type: 'dashed',
              color: 'rgba(255,255,255,0.14)',
            }
            }
        },
        series: [
            {
            name: '销量',
            type: 'scatter',
            datasetIndex: 0
            },
            {
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            // label: {
            //   show: true,
            //   position: "top",
            //   formatter: "{c}元",
            //   textStyle: {
            //     color: "#fff",
            //   },
            // },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 }
            },

        ]
        };
      instance.value?.setOption(option)
}
const getMarketDataList=()=>{
    const {type} = props;
    const arr =[]
    MarketData.x.forEach((item,i)=>{
        arr.push([MarketData.x[i],type==ChartsDataType.pigMarket?MarketData.y[i]:MarketData.ySale[i]])
    })
    data.value=arr
}
onMounted(()=>{
    getMarketDataList()
})
watchEffect(() => {//props更新函数
  createChartsFn()
});
</script>

<style scoped lang="scss">
.chart {
  margin-block: vh(16);
  height: vh(200);
  width: 100%;
  font-size: vw(12);
}
</style>
