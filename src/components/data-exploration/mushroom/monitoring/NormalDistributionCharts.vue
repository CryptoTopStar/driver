<template>
  <div ref="chartRef" class="chart">
  </div>
</template>

<script setup>
import {ref, onMounted,watchEffect,watch } from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";

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
const pigMarketSaleData = ref({
    x:[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    xSale:[3400, 3420, 3440, 3460, 3480, 3500, 3520, 3540, 3560, 3580, 3600, 3620, 3640, 3660, 3680, 3700, 3720, 3740, 3760, 3780, 3800, 3820, 3840, 3860, 3880, 3900, 3920, 3940, 3960, 3980, 4000, 4020, 4040, 4060, 4080, 4100, 4120, 4140, 4160, 4180],
    y: [0.003819715043458537, 0.010140176843706824, 0.02318438310752026, 0.04565422886791249, 0.07742869330696633, 0.1130988789387542, 0.14228205253151427, 0.15416202081027125, 0.14386002089030162, 0.1156214189716413, 0.08003352076533032, 0.047713469915828415, 0.024498840587301854, 0.010833917239687466, 0.004126301398606774, 0.001353542298085237],
    ySale:[5.1315122657011046e-05, 7.957270569519334e-05, 0.00012037654236850452, 0.00017765547202141854, 0.0002557845437994248, 0.0003592766495574635, 0.0004923145498452841, 0.0006581355268122723, 0.0008583155566901175, 0.0010920376656913496, 0.0013554616569622423, 0.0016413297473819061, 0.0019389358004360461, 0.00223454962165037, 0.0025123235076145453, 0.002755624933735714, 0.002948652775790366, 0.0030781242617511357, 0.003134784181562034, 0.003114498529505656, 0.0030187531319543267, 0.002854473740832422, 0.002633197842582623, 0.0023697357151280063, 0.0020805364190625143, 0.0017820082720764313, 0.0014890287872014781, 0.0012138232650498201, 0.0009653100005318307, 0.0007489229488570379, 0.0005668477887303923, 0.0004185571449336806, 0.0003015102272134542, 0.00021188895592672908, 0.0001452692114187283, 9.716230787714996e-05, 6.339880177670375e-05, 4.0357407755393666e-05, 2.5062504077718966e-05, 1.5183945750731461e-05]
    });
const markLineData={
    xOriginal:[26.46,26.98,27.5,28.02,28.54,29.06,29.58],
    xOriginalSale:[6.05,7.45,8.85,10.25,11.65,13.05,14.45],
}
const markLineDataList=markLineData.xOriginal.map(item=>[{
                    silent:true,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:"white"
                    },
                    xAxis: item
                }])
const {instance} = useResponsiveChart(chartRef);
const createChartsFn=()=>{//生成charts
        const {data=[],type}=props
     const colors = ['#0E9CFF', '#DF6FF4'];
        const option = {
        color: type=='pigMarket'?colors[0]:colors[1],
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
          right: 40
        },
        xAxis: [
            {
            type: 'category',
            data: type=='pigMarket'?pigMarketSaleData.value.x:pigMarketSaleData.value.xSale,
            axisLabel: {
            fontSize: '1em',
            color: 'white',
            overflow: 'breakAll',
            },
            }
        ],
        yAxis: [
            {
            type: 'value',
            position: 'right',
            axisLabel: {
                color: 'white',
                fontSize: '1em',
            },
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
            },
            {
            type: 'value',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                color: '#fff',
                }
            },
            axisLabel: {
                color: 'white',
                fontSize: '1em',
            },
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
            }
        ],
        series: [
            {
            name: '原数据频率',
            type: 'bar',
            },
            {
              name: '正态分布',
              type: 'line',
              yAxisIndex: 1,
              smooth:true,
              data:type=='pigMarket'?pigMarketSaleData.value.y:pigMarketSaleData.value.ySale,
              areaStyle: {},
            //   markLine : {   //添加警戒线
            //     symbol:"none",               //去掉警戒线最后面的箭头
            //     silent:true,
            //     label:{
            //         position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            //         // formatter: `今日${text}(${type=='todayPrice'?todayData[1]:todaySaleData[1]}${type=='todayPrice'?'元':'头'})`,
            //         color:"white",
            //         fontSize:14
            //     },
            //     data : markLineDataList
            // },
            }
        ]
        };
      instance.value?.setOption(option)
}
onMounted(()=>{
})
watchEffect(() => {//props更新函数
  createChartsFn()
});
</script>

<style scoped lang="scss">
.chart {
  margin-block: vh(16);
  height: vh(350);
  font-size: vw(12);
}
</style>
