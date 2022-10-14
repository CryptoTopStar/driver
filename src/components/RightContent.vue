<template>
  <div class="content">
    <Label label="产业产量与产值趋势分析"></Label>
    <div
        class="chart-container bar-chart change-line-chart"
        id="change-line-chart"
    >
      <DoubleLineChartAndYAxis
          :option="yearLineOption"
          chartId="change-line-chart"
          :needResize="true"
      ></DoubleLineChartAndYAxis>
    </div>
    <Label label="市场行情"></Label>
    <div class="mainBox">
      <div class="mainItem" v-for="(item,index) in mainItemList" :key="index">
        <div class="top">
          {{ item.title }}
        </div>
        <div class="bottom">
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
    <div
        class="chart-container line-chart-box change-line-chart"
        id="change-line-chart1"
    >
      <DoubleLineChart
          :option="lineOption"
          chartId="change-line-chart1"
          :needResize="true"
      ></DoubleLineChart>
    </div>
    <Label label="营销指数"></Label>
    <div class="bar-chart" id="collect-chart">
      <BarChart
          chartId="collect-chart"
          :option="collectBarOption"
          :needResize="false"
      ></BarChart>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  shallowRef,
  getCurrentInstance,
} from 'vue'
import Label from "./Label";
import DoubleLineChartAndYAxis from '@/components/AcChart/Chart/DoubleLineChartAndYAxis.vue'
import DoubleLineChart from '@/components/AcChart/Chart/DoubleLineChart.vue'
import BarChart from '@/components/AcChart/Chart/BarChart.vue'
import {getPriceMarket, getTendency} from "../api/api";

import * as echarts from 'echarts'

export default defineComponent({
  name: "rightContent",
  components: {Label, DoubleLineChart, BarChart, DoubleLineChartAndYAxis},
  props: {
    type: {
      type: String,
      default: 'fungi'
    }
  },
  setup(props) {
    const {
      proxy: {
        $tools: {fitChartSize, keepTwoDecimal, sendMessage},
      },
    } = getCurrentInstance()
    const state = reactive({
      collectBarOption: shallowRef([]), // 1.集体分布图表配置
      lineOption: ref({}), // 市场行情
      yearLineOption: ref({}), // 三年周转变化配置
      mainItemList: [
        {title: '今日指导价', value: 0, unit: '元/斤'},
        {title: '今日市场价', value: 0, unit: '元/斤'},
        {title: '产地收购价', value: 0, unit: '元/斤'},
        {title: '批发销售价', value: 0, unit: '元/斤'},
      ]
    })
    // const drawChart = () => {
    //   state.myChart.setOption(props.option, true);
    // };
    // 产业产量与产值趋势分析
    const handleYearData = (xData, zclData, zczData) => {
      state.yearLineOption = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a0}:{c0}吨<br/>{a1}:{c1}万元',
          textStyle:{
            color:'#fff',
          },
          borderWidth:'0',
          borderColor:'rgba(7,38,108, 1)',
          backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        },
        grid: {
          left: fitChartSize(40),
          right: fitChartSize(20),
          top: fitChartSize(40),
          bottom: 0,
        },
        xAxis: {
          data: xData,
          axisLabel: {
            show: true,
            fontSize: fitChartSize(12),
            showMaxLabel: true,
            color: "#ffffff",
          },
          axisTick: {
            show: false
          },

        },
        yAxis: [
          {
            name: '吨',
            nameTextStyle: {
              color: "#fff",
              align: 'right',
              padding: [fitChartSize(40), fitChartSize(10), fitChartSize(0), fitChartSize(0)],
              lineHeight: fitChartSize(-30)
            },
            axisLabel: {
              show: true,
              margin: fitChartSize(6),
              fontSize: fitChartSize(12),
              showMaxLabel: false,
              color: "#ffffff",
            },
            splitLine: {
              show: true,
              showMaxLine: true,
            }
          },
          {
            name: '万元',
            nameTextStyle: {
              color: "#fff",
              lineHeight: fitChartSize(-30) ,
              padding: [fitChartSize(140), fitChartSize(0), fitChartSize(0), fitChartSize(40)],
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: fitChartSize(6),
              fontSize: fitChartSize(12),
              showMaxLabel: false,
              color: "#ffffff",
            },
            splitLine: {
              show: false,
              showMaxLine: false,
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, .14)",
              },
            },
          },
        ],
        series: [
          {
            name: '总产量',
            data: zclData,
            yAxisIndex: 0,
            lineStyle: {
              color: '#24D8F0',
            },
            itemStyle: {
              color: '#24D8F0',
            },
            areaStyle: {
              normal: { ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(36, 216, 240, .4)'
                }, {
                  offset: 1,
                  color: 'rgba(36, 216, 240, 0)'
                }])
              },
            },
          },
          {
            name: '总产值',
            data: zczData,
            yAxisIndex: 1,
            lineStyle: {
              color: '#EACA60',
            },
            itemStyle: {
              color: '#EACA60',
            },
            areaStyle: {
              normal: { ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(234, 202, 96, .4)'
                }, {
                  offset: 1,
                  color: 'rgba(234, 202, 96, 0)'
                }])
              },
            },
          },
        ],
      }
    }
    onMounted(() => {
      getTendency({type:props.type}).then((res) => {
        if (res.code === 0) {
          let d = res.data;
          let xData = [];
          let zclData = [];
          let zczData = []; // 产业加工趋势分析
          d.map(item => {
            xData.push(item.year)
            zclData.push(parseInt(item.zcl)) // 总产量
            zczData.push(item.zcz) // 总产值
          })
          handleYearData(xData, zclData, zczData)
        }
      })
      // 获取市场行情 marketing_index  营销指数
      getPriceMarket({type:props.type}).then(res => {
        if (res.code === 0) {
          let xData = [];
          let today_guide_price = [];// 今日指导价
          let today_market_price = []; // 今日市场价
          let purchase_price = []; // 今日收购价
          let trade_price = []; // 批发销售价
          let marketing_index = []; // 营销指数
          res.data.map((item,index) => {
            xData.push(item.report_date.substr(5));
            today_guide_price.push(item.today_guide_price);
            today_market_price.push(item.today_market_price);
            purchase_price.push(item.purchase_price);
            trade_price.push(item.trade_price);
            marketing_index.push(item.marketing_index);
            if(index === res.data.length - 1){
              state.mainItemList[0].value = item.today_guide_price // 今日指导价
              state.mainItemList[1].value = item.today_market_price // 今日市场价
              state.mainItemList[2].value = item.purchase_price   // 收购价
              state.mainItemList[3].value = item.trade_price // 批发销售价
            }
          })
          state.lineOption = {
            tooltip: {
              trigger: 'axis',
              formatter: '{b}<br/>{a0}:{c0}元<br/>{a1}:{c1}元<br/>{a2}:{c2}元<br/>{a3}:{c3}元',
              textStyle:{
                color:'rgba(255, 255, 255, .8)',
              },
              borderWidth:'0',
              borderColor:'rgba(7,38,108, 1)',
              backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
            },
            grid: {
              left: fitChartSize(15),
              right: fitChartSize(15),
              top: fitChartSize(40),
              bottom: 0,
            },
            xAxis: {
              data: xData,

            },
            legend: {
              data: ['指导价', '市场价', '收购价', '批发销售价'],
              width: fitChartSize(460),
              top: fitChartSize(5),
              height: fitChartSize(60),
              itemWidth: fitChartSize(15),
              itemHeight: fitChartSize(2),
              itemGap: fitChartSize(10)
            },
            yAxis: {
              name: '元',
            },
            series: [
              {
                name: '指导价',
                data: today_guide_price,// 今日指导价
                type: 'line',
                lineStyle: {
                  color: '#EACA60',
                },
                itemStyle: {
                  color: '#EACA60',
                },
                areaStyle: {
                  color: 'none',
                },
              },
              {
                name: '市场价',
                data: today_market_price,// 今日市场价
                type: 'line',
                lineStyle: {
                  color: '#1EC579',
                },
                itemStyle: {
                  color: '#1EC579',
                },
                areaStyle: {
                  color: 'none',
                },
              },
              {
                name: '收购价',
                data: purchase_price, // 收购价
                type: 'line',
                lineStyle: {
                  color: '#B88BFC',
                },
                itemStyle: {
                  color: '#B88BFC',
                },
                areaStyle: {
                  color: 'none',
                },
              },
              {
                name: '批发销售价',
                data: trade_price, // 批发销售价
                type: 'line',
                lineStyle: {
                  color: '#1BA5FB',
                },
                itemStyle: {
                  color: '#1BA5FB',
                },
                areaStyle: {
                  color: 'none',
                },
              },

            ]
          }
          // 营销指数
          state.collectBarOption = {
            grid: {left: fitChartSize(10), right: fitChartSize(30)},
            tooltip: {
              formatter: '{b}:{c}',
              textStyle:{
                color:'rgba(255, 255, 255, .8)',
              },
              borderWidth:'0',
              borderColor:'rgba(7,38,108, 1)',
              backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
            },
            xAxis: {
              data: xData,
              axisLabel: {
                interval: 0,
                rotate: 0, //倾斜度 -90 至 90 默认为0
                fontSize: fitChartSize(12),
                color: '#ffffff',
              },
            },
            yAxis: {
              name: '',
            },
            series: [
              {
                name: '营销指数',
                type: 'bar',
                data: marketing_index,
                barWidth: fitChartSize(20),
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: "rgba(27, 223, 252, 1)" // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: "rgba(32, 93, 219, 1)" // 100% 处的颜色
                    }], false)
                  }
                }
              },
            ],
          }
        }
      })
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>

<style scoped lang="scss">
.content {
  width: vw(460);
  height: 100%;

  #change-line-chart {
    padding-right: vw(15);
  }

  .bar-chart {
    height: vh(240);
    margin-top: vh(10);
  }

  #collect-chart {
    padding: 0 0 0 vw(15);
    box-sizing: border-box;
    height: vh(220);
  }

  .line-chart-box {
    height: vh(240);
    margin-bottom: vh(15);
    box-sizing: border-box;
    padding: 0 vh(15);
  }

  .mainBox {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 vw(15);
    display: flex;
    justify-content: space-between;

    .mainItem {
      width: 25%;
      height: auto;
      padding: vh(15) 0;

      .top {
        font-size: vh(16);
        color: #fff;
        text-align: center;
        margin-bottom: vh(8);
      }

      .bottom {
        display: flex;
        justify-content: center;

        span {
          display: block;
          font-size: vh(16);
          color: #fff;

          &:first-of-type {
            font-size: vh(18);
            font-family: HuXiaoBoNanShenTi;
            color: rgba(234, 202, 96, 1);
            margin-right: vw(5);
          }
        }
      }
    }
  }
}
</style>
