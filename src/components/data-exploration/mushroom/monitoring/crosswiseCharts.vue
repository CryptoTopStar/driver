<template>
    <div class="chart-Ref-Box">
    <div ref="chartRef" class="chart">

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted ,watchEffect} from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
import * as ecStat from 'echarts-stat';
import * as echarts from 'echarts';
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
const data = ref({
    forecastData:[1, '23.8', '32.2'],todayData:[2, '20', '22'],realityData:[3, '26.46', '29.58'],
    forecastSaleData:[1, '2700', '3653'],todaySaleData:[2, '3400', '3500'],realitySaleData:[3, '2017', '4817'],
});
const {instance} = useResponsiveChart(chartRef);
const createChartsFn=()=>{//生成charts
      const {type}=props
      const {forecastData,todayData,realityData,forecastSaleData,todaySaleData,realitySaleData}=data.value
      const text=type=='todayPrice'?'价格':'销量'
       const imgs={
            url:require('./tip_2.png'),
            name: 'bg'
        }
      const option = {
        color:type=='todayPrice'?['#EF9E4E','#009FD0']:['#776AFF','#35FDDC'],
        legend: {
              show: true,
               data: [{name:`预测${text}`,textStyle:{color:'#FFFFFF'}},{name:`实际${text}`,textStyle:{color:'#FFFFFF'}}],
              top: 'bottom',
        },
         tooltip: {
             axisPointer: {
                    type: "cross",
                },
                position:'bottom',
                confine:true,
                borderColor: "#278BFF",
                borderWidth: 1,
                textStyle:{
                    color:'#fff'
                },
                backgroundColor: "#07266C",
            },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '15%',
        //     top:'10%',
        //     containLabel: true
        // },
        xAxis: {
            type: 'value',
            axisLabel: {
            fontSize: '1em',
            color: 'white',
            overflow: 'breakAll',
            interval: 0, // show all
            width: 14 * 4
          }
        },
        yAxis: {
          scale: true, //自适应
            type: 'category',
            data: [`今日${text}`],
            axisLabel: {
            color: 'white',
            fontSize: '1em',
          },splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
          }
        },
        series: [
            {
            type: 'custom',
            stack: 'total',
             renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
                    var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
                    var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                    var end = api.coord([api.value(2), categoryIndex]);
                    var height = 32;//柱体宽度
                    return {
                        type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                        shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0],
                            height: height
                        }, { // 当前坐标系的包围盒。
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        }),
                        style: api.style()
                    };
            },
            markLine : {   //添加警戒线
                symbol:"none",               //去掉警戒线最后面的箭头
                silent:true,
                label:{
                    position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                    formatter: `今日${text}(${type=='todayPrice'?todayData[1]:todaySaleData[1]}${type=='todayPrice'?'元':'头'})`,
                    color:"white",
                    fontSize:14
                },
                data : [{
                    silent:true,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:"white"
                    },
                    xAxis: type=='todayPrice'?todayData[1]:todaySaleData[1]
                }]
            },
            encode: {
                x: [1,2,3], // data 中『维度1』和『维度2』对应到 X 轴
            },
            // label: {
            //     show: true
            // },
            name:`预测${text}`,
            emphasis: {
                focus: 'series'
            },
            data: [ 
                {
                    itemStyle: { 
                    normal: { 
                        color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: type=='todayPrice'?'#EF9E4E':'#776AFF'
                    }, {
                        offset: 1,
                        color: type=='todayPrice'?'rgba(239, 158, 78, 0)':' rgba(119, 106, 255, 0)'
                    }]),
                    } 
                    },
                    name: `预测${text}`,
                    value: type=='todayPrice'?forecastData:forecastSaleData
                },
                ],
            },
            {
            type: 'custom',
            stack: 'total',
             renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
                    var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
                    var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                    var end = api.coord([api.value(2), categoryIndex]);
                    var height = 32;//柱体宽度
                    return {
                        type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                        shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0],
                            height: height
                        }, { // 当前坐标系的包围盒。
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        }),
                        style: api.style()
                    };
            },
            markLine : {   //添加警戒线
                symbol:"none",               //去掉警戒线最后面的箭头
                silent:true,
                label:{
                    position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                    formatter: `今日${text}(${type=='todayPrice'?todayData[1]:todaySaleData[1]}${type=='todayPrice'?'元':'头'})`,
                    color:"white",
                    fontSize:14
                },
                data : [{
                    silent:true,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:"white"
                    },
                    xAxis: type=='todayPrice'?todayData[1]:todaySaleData[1]
                }]
            },
            encode: {
                x: [1,2,3], // data 中『维度1』和『维度2』对应到 X 轴
            },
            // label: {
            //     show: true
            // },
            name:`实际${text}`,
            emphasis: {
                focus: 'series'
            },
            data: [ 
                { 
                    itemStyle: { 
                    normal: {
                       color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color:  type=='todayPrice'?'#009FD0':'#35FDDC'
                    }, {
                        offset: 1,
                        color:type=='todayPrice'?'rgba(0, 159, 208, 0)':' rgba(53, 253, 220, 0)'
                    }]),
                    } 
                    },
                    name:`实际${text}`,
                    value: type=='todayPrice'?realityData:realitySaleData
                },
                ],
            }
        ]
        }
    instance.value?.setOption(option)
    // instance.value?.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex:0,  // 显示第几个series
    //     dataIndex: 2 // 显示第几个数据
    // });
}
onMounted(()=>{
  // createChartsFn()
})
watchEffect(() => {//props更新函数
 //获取今日销售量和价格
  const price=props?.data[props?.data.length-1]?.price
  const sales=props?.data[props?.data.length-1]?.sales
  if(props?.data.length>0){
      data.value.todayData[1]=price
      data.value.todaySaleData[1]=sales
    }
  createChartsFn()
});
</script>

<style scoped lang="scss">
.chart-Ref-Box{
    position: relative;
    .chart {
    margin-block: vh(16);
    height: vh(250);
    // height: 100%;
    font-size: vw(12);
    }
    .tip-box{
        position: absolute;
        top: -4px;
        text-align: center;
        line-height: 20px;
        color: #CCEAFF;
        padding-top: 5px;
        width: 86px;
        height: 55px;
        left: 254px;
        background: url('~@/assets/images/data-exploration/shared/tip_2.png');
        background-size: 100% 100%;
        b{
            color: #27E0FD;
            font-size: 20px;
        }
    }
}
</style>
