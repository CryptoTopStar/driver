<template>
  <div class="content">
    <Label label="产业主体"></Label>
    <div class="contentBox">
      <div class="item" v-for="(value,key) in topData" :key="key">
        <div class="left">
          <img :src="value.img" alt="">
        </div>
        <div class="right">
          <div>{{ value.label }}</div>
          <div><b>{{ value.value }}</b>{{ value.unit }}</div>
        </div>
      </div>
    </div>
    <Label label="产业面积趋势"></Label>
    <div class="chart-container trend-line-chart" id="trend-line-chart">
      <LineChart
          chartId="trend-line-chart"
          :xData="trendXAxisData"
          :chartData="trendChartData"
          yAxisTitle="亩"
          toolTipTail="亩"
      ></LineChart>
    </div>
    <Label label="产业面积排行"></Label>
    <div class="chart-container budget-chart" id="budget-chart">
      <BarChartSpecial
          chartId="budget-chart"
          :option="budgetChartOption"
          :zoom="true"
          :reverse="true"
      ></BarChartSpecial>
    </div>
<!--    <div class="main">-->
<!--      <div class="mainBox" v-for="(item,index) in areaSort" :key="index">-->
<!--        <div class="mainLeft">-->
<!--          <span>No.{{ index + 1 }}</span>-->
<!--          <span :style="item.fontStyle">{{ item.xz || '' }}</span>-->
<!--        </div>-->
<!--        <div class="mainmiddle">-->
<!--          <div class="line" :style="item.lineStyle">-->
<!--            <img :src="require('@/assets/images/area_icon.png')" class="areaIcon" alt="">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mainRight">-->
<!--          <span>{{ item.ms || 0 }}</span>-->
<!--          <span>亩</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <Label label="产业加工趋势分析"></Label>
    <div class="chart-wrapper" id="bar-line-chart">
      <BarLineChartSpecial
          :xAxisData="areaValueXData"
          :barYAxisData="areaValueYDataBar"
          barYAxisName="吨"
          :lineYAxisData="areaValueYDataLine"
          lineYAxisName="吨"
          chartId="bar-line-chart"
      ></BarLineChartSpecial>
      <!--      <LineChartSpecial-->
      <!--          chartId="bar-line-chart"-->
      <!--          :xData="areaValueXData"-->
      <!--          :chartData="areaValueYDataLine"-->
      <!--          yAxisTitle="吨"-->
      <!--          toolTipTail="吨"-->
      <!--      ></LineChartSpecial>-->
    </div>
  </div>
</template>

<script>
import Label from "./Label";

import bar_dot from '@/assets/images/area_icon.png'
import BarLineChartSpecial from '@/components/AcChart/Chart/BarLineChartSpecial.vue'
import LineChart from '@/components/AcChart/Chart/LineChart.vue'
import LineChartSpecial from '@/components/AcChart/Chart/LineChartSpecial.vue'
import {
  onMounted, reactive, ref, toRefs,
  getCurrentInstance,
  shallowRef,
} from "vue";
import * as echarts from 'echarts'
import {areaSort, getMainBody, getTendency} from "../api/api";

import BarChart from "@/components/AcChart/Chart/BarChart";
import BarChartSpecial from "@/components/AcChart/Chart/BarChartSpecial";

export default {
  name: "leftContent",
  components: {
    Label,
    LineChart,
    BarChart,
    LineChartSpecial,
    BarLineChartSpecial,
    BarChartSpecial
  },
  props: {
    type: {
      type:String,
      default: 'fungi'
    }
  },
  setup(props) {
    const {
      proxy: {
        $tools: {fitChartSize, keepTwoDecimal, sendMessage},
      },
    } = getCurrentInstance()
    // 4.处理种植面积和产值数据
    const areaValueData = reactive({
      areaValueXData: ref([]),
      areaValueYDataBar: ref([]),
      areaValueYDataLine: ref([]),
    });
    const state = reactive({

      budgetChartOption: shallowRef({}), // 6.预算使用进度图表配置
      topData: {
        icon_1: {img: require('@/assets/images/icon/icon_1.png'), label: '重点乡镇', value: '0', unit: '个'},
        icon_2: {img: require('@/assets/images/icon/icon_2.png'), label: '合作社', value: '0', unit: '个'},
        icon_3: {img: require('@/assets/images/icon/icon_3.png'), label: '家庭农场', value: '0', unit: '个'},
        icon_4: {img: require('@/assets/images/icon/icon_4.png'), label: '重点企业', value: '0', unit: '个'},
        icon_5: {img: require('@/assets/images/icon/icon_5.png'), label: '品牌企业', value: '0', unit: '个'},
        icon_6: {img: require('@/assets/images/icon/icon_6.png'), label: '农资企业', value: '0', unit: '个'},
        icon_7: {img: require('@/assets/images/icon/icon_7.png'), label: '示范基地', value: '0', unit: '个'},
        icon_8: {img: require('@/assets/images/icon/icon_8.png'), label: '农技专家', value: '0', unit: '个'},
        icon_9: {img: require('@/assets/images/icon/icon_9.png'), label: '产业专家', value: '0', unit: '个'},
      },
      trendXAxisData: ref([]), // 趋势图x轴
      trendChartData: ref([]), // 趋势图数据
      areaChartOption: shallowRef({}), // 面积统计图表配置
      areaSort: []
    })
    const sum = (arr) => {
      return arr.reduce(function(prev, curr, idx, arr){
        return Number(prev) + Number(curr);
      });
    }
    // 6.2021年预算使用进度
    const handleBudgetData = (data) => {
      // console.log(data)
      let totalData = [] // 预算总数
      let useData = [] // 预算已用数据
      let nameData = [] // 乡镇街道名称
      let percentData = [] // 百分比数据
      data.forEach((item) => {
        nameData.unshift(item.xz)
        useData.unshift(item.ms)
        totalData.unshift(item.ms)
      })
      let total = Math.max.apply(null, totalData);
      // console.log(total)
      data.forEach((item) => {
        item.percentData = parseInt((Number(item.ms) / total) * 100)
      })
      data.forEach((item) => {
        percentData.unshift({
          value: item.percentData,
          label: {
            position: item.percentData <= 20 ? 'right' : 'insideRight',
            offset: item.percentData <= 20 ? [fitChartSize(10), 0] : [fitChartSize(-10), 0],
          }
        })
      })
      state.budgetChartOption = {
        dataZoom: [
          {
            yAxisIndex: [0, 1],
            show: false,
            type: 'slider',
            orient: 'vertical',
            startValue: nameData.length - 1,
            endValue: nameData.length - 3,
          },
        ],
        tooltip: {
          formatter: (params) => {
            const { dataIndex } = params[0]
            return `${nameData[dataIndex]}<br>面积：${useData[dataIndex]}亩`
          },
        },
        yAxis: [
          {
            type: 'category',
            axisTick: 'none',
            axisLine: 'none',
            offset: 0,
            axisLabel: {
              color: '#ffffff',
              fontSize: fitChartSize(16),
            },
            data: nameData,
          },
          {
            type: 'category',
            axisTick: 'none',
            axisLine: 'none',
            offset: 0,
            axisLabel: {
              color: '#ffffff',
              fontSize: fitChartSize(16),
              formatter: '{value}亩',
            },
            data: totalData,
          },
        ],
        xAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: '已使用',
            type: 'bar',
            barWidth: fitChartSize(10),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                {
                  offset: 0,
                  color: '#10ECFD',
                },
                {
                  offset: 1,
                  color: '#FD541A',
                },
              ]),
            },
            label: {
              show: false,
              fontSize: fitChartSize(18),
              color: '#e4e4e4',
              formatter: (params) => {
                const { data } = params
                return `${data.value}%`
              },
              offset: [fitChartSize(-10), 0],
              position: 'insideRight',
            },
            data: percentData,
            z: 1,
          },
          {
            name: '总额',
            type: 'bar',
            barGap: '-100%',
            showBackground: true,
            barWidth: fitChartSize(10),
            backgroundStyle: {
              color: '#024789',
            },
            itemStyle: {
              color: 'transparent',
            },
            data: Array.from(new Array(useData.length).keys()).fill(100),
            z: 1,
          },
          {
            name: '点',
            type: 'pictorialBar',
            barGap: '-100%',
            barWidth: fitChartSize(10),
            symbol: `image://${bar_dot}`,
            symbolPosition: 'end',
            symbolSize: [fitChartSize(30), fitChartSize(30)],
            symbolOffset: [fitChartSize(15), 0],
            data: percentData,
            z: 2,
          },
        ],
      }
    }
    onMounted(() => {
      // 获取产业主体
      getMainBody({type:props.type}).then(res => {
        if (res.code === 0) {
          let d = res.data;
          state.topData['icon_1'].value = d.village_town_count ?? 0;
          state.topData['icon_2'].value = d.cooperative_count ?? 0;
          state.topData['icon_3'].value = d.planter_count ?? 0;
          state.topData['icon_4'].value = d.enterprise_count ?? 0;
          state.topData['icon_5'].value = d.brand_enterprise_count ?? 0;
          state.topData['icon_6'].value = d.farm_enterprise_count ?? 0;
          state.topData['icon_7'].value = d.demonstration_base_count ?? 0;
          state.topData['icon_8'].value = d.agricultural_expert_count ?? 0;
          state.topData['icon_9'].value = d.industry_expert_count ?? 0;
        }
      })
      getTendency({type:props.type}).then((res) => {
        if (res.code === 0) {
          let d = res.data;
          let xData = [];
          let syjzdmjData = [];
          let jglData = []; // 产业加工趋势分析
          d.map(item => {
            xData.push(item.year)
            syjzdmjData.push(props.type === 'fungi'?item.syjzdmj:item.mhtzdmj)
            jglData.push(item.jgl)
          })
          handleTrendData(xData, syjzdmjData)
          handleAreaAndValueData(xData, jglData, jglData)
        }
      })
      // 产业面积排行
      areaSort({type:props.type}).then(res => {
        if (res.code === 0) {
          handleBudgetData(res.data)
        }
      })
    })

    // 2.处理面积变化趋势数据
    const handleTrendData = (xData, yData) => {
      yData.map(item => {
        encodeURIComponent(item).replace('%E4%BA%A9', '');
      })
      state.trendXAxisData = xData
      state.trendChartData = yData
      console.log('xData')
      console.log(xData)
      console.log(yData)
    }
    // 处理折线 柱状图
    const handleAreaAndValueData = (xData, barData, lineData) => {
      areaValueData.areaValueXData = xData;
      let max = Math.max.apply(null, barData);
      let arr = [], newBarData = [];
      lineData.map(item => {
        newBarData.push(max)
        arr.push({
          value: item, symbol: 'image://' + require('@/assets/images/icon/line_icon.png'), symbolSize: 32
        })
      })
      areaValueData.areaValueYDataBar = newBarData;
      areaValueData.areaValueYDataLine = arr;
      // console.log(areaValueData, 'areaValueData')
    };
    return {
      ...toRefs(state),
      ...toRefs(areaValueData),
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  width: vw(460);
  height: 100%;
  .budget-chart {
    width: vw(424);
    height: vh(140);
    margin: vh(10) auto;
  }
  .chart-wrapper {
    position: relative;

  }

  #bar-line-chart {
    height: vh(200);
  }

  .main {
    width: 100%;
    padding: vh(25) vw(15);
    box-sizing: border-box;

    .mainBox {
      width: 100%;
      height: auto;
      display: flex;
      margin-bottom: vh(25);

      &:last-of-type {
        margin-bottom: 0;
      }

      .mainLeft {
        width: vw(115);

        span {
          font-size: vh(16);
          color: rgba(175, 226, 246, 1);
          display: block;
          float: left;

          &:first-of-type {
            margin-right: vw(4);
          }
        }
      }

      .mainmiddle {
        width: 55%;
        height: vh(14);
        background: rgba(175, 200, 255, .2);
        box-sizing: border-box;
        padding: vh(4) 0;

        .line {
          height: 100%;
          position: relative;

          .areaIcon {
            position: absolute;
            right: vw(-14);
            top: vw(-11);
            width: vw(28);
            height: vw(28);
          }
        }
      }

      .mainRight {
        margin-left: vw(10);

        span {
          display: block;
          float: left;
          color: rgba(175, 226, 246, 1);
          font-size: vh(16);

          &:first-of-type {
            font-family: HuXiaoBoNanShenTi;
            color: rgba(234, 202, 96, 1);
            margin-right: vw(3);
            font-size: vh(20);
            line-height: vh(10);
          }
        }
      }
    }
  }

  .trend-line-chart {
    height: vh(210);
    margin: vh(10) auto;
  }

  .contentBox {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: vw(15) vw(15) 0 vw(15);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 33%;
      box-sizing: border-box;
      padding: 0 vw(15);
      height: auto;
      display: flex;
      justify-content: flex-start;
      margin-bottom: vh(20);

      &:nth-of-type(3n-1) {
        border-right: vw(1) dashed rgba(54, 119, 179, .5);
        border-left: vw(1) dashed rgba(54, 119, 179, .5);
      }

      .left {
        margin-right: vw(5);

        img {
          width: vw(37);
          height: vw(37);
          display: block;
        }
      }

      .right {
        width: vw(80);

        div {
          font-size: vh(16);
          color: #fff;

          &:last-of-type {
            margin-top: vw(5);

            b {
              font-family: HuXiaoBoNanShenTi;
              color: rgba(234, 202, 96, 1);
              margin-right: vw(3);
            }
          }
        }

      }
    }
  }
}
</style>
