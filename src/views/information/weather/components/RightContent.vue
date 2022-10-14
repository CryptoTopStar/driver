<template>
  <div class="content">
    <Label label="本年度受灾天数"></Label>
    <div class="bar-chart change-line-chart" id="change-line-chart">
      <BarLineChart
        :tooltip="disasterTooltip"
        :xAxisData="disasterValueXData"
        barYAxisName="天"
        :barYAxisData="disasterValueYDataBar"
        barYAxisDataName="年度受灾天数"
        :lineYAxisData="disasterValueYDataLine"
        lineYAxisDataName="历史平均受灾天数"
        :name="disasterName"
        chartId="change-line-chart"
        :yAxisIndex="0"
        :needResize="true"
      ></BarLineChart>
    </div>
    <Label label="本年度气象条件与历年平均值差异"></Label>
    <SubTitleBar
      title="温度"
      :icon="require('@/assets/images/infomation/weather/temperature.png')"
      customStyle="margin-left: 0px"
    ></SubTitleBar>
    <div class="line-chart-box change-line-chart" id="change-line-chart1">
      <DoubleLineChart
        :option="tempOption"
        chartId="change-line-chart1"
        :needResize="true"
      ></DoubleLineChart>
    </div>
    <SubTitleBar
      title="降水量"
      :icon="require('@/assets/images/infomation/weather/water.png')"
      customStyle="margin-left: 0px;margin-top: 0"
    ></SubTitleBar>
    <div class="bar-chart" id="collect-chart">
      <DoubleLineChart
        :option="waterBarOption"
        chartId="collect-chart"
        :needResize="false"
      ></DoubleLineChart>
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
} from "vue";
import Label from "@/components/Label";
import DoubleLineChartAndYAxis from "@/components/AcChart/Chart/DoubleLineChartAndYAxis.vue";
import DoubleLineChart from "@/components/AcChart/Chart/DoubleLineChart.vue";
import BarLineChartSpecial from "@/components/AcChart/Chart/BarLineChartSpecial";
import BarLineChart from "@/components/AcChart/Chart/BarLineChart";
import SubTitleBar from "@/components/subTitleBar";

import BarChart from "@/components/AcChart/Chart/BarChart.vue";
import { getPriceMarket, getTendency } from "@/api/api";
import {
  getWeatherToken,
  weatherGetWeatherLastFiveMonth,
} from "@/api/weather/api";
import * as echarts from "echarts";

export default defineComponent({
  name: "rightContent",
  components: {
    Label,
    DoubleLineChart,
    BarChart,
    DoubleLineChartAndYAxis,
    BarLineChartSpecial,
    BarLineChart,
    SubTitleBar,
  },
  props: {
    type: {
      type: String,
      default: "fungi",
    },
  },
  setup(props) {
    const {
      proxy: {
        $tools: { fitChartSize, keepTwoDecimal, sendMessage },
      },
    } = getCurrentInstance();
    const state = reactive({
      waterBarOption: shallowRef([]), // 降水量
      tempOption: ref({}), // 温度
      disasterValueXData: ["高温", "低温冷害", "暴雨", "干旱", "大风", "雷电"],
      disasterValueYDataBar: [12, 8, 6, 2, 15, 5],
      disasterValueYDataLine: [15, 12, 9, 5, 18, 8],
      disasterTooltip: {
        trigger: "axis",
        formatter: "{b}<br/>{a0}:{c0}天<br/>{a1}:{c1}天",
        textStyle: {
          color: "#fff",
        },
        borderWidth: "0",
        borderColor: "rgba(7,38,108, 1)",
        backgroundColor: "rgba(7,38,108,1)", //通过设置rgba调节背景颜色与透明度
      },
      disasterName: ["年度受灾天数", "历史平均受灾天数"],
    });

    // 这里获取天气预报
    const getWeather = () => {
      weatherGetWeatherLastFiveMonth({}).then((res) => {
        console.log(res);
        let xData1 = [],
          data11 = [],
          data12 = [],
          data13 = [],
          data14 = [],
          data21 = [],
          data22 = [];

        let list1 = res.data.overTheYearsWeather;
        let list2 = res.data.thisYearWeather;

        for (let item of list1) {
          xData1.push(item.statisticMonth);
          data12.push(item.monthlyTemp);
          data14.push(item.averageTemp);
          data22.push(item.precip);
        }

        for (let item of list2) {
          data11.push(item.monthlyTemp);
          data13.push(item.averageTemp);
          data21.push(item.precip);
        }

        state.tempOption = {
          tooltip: {
            trigger: "axis",
            formatter:
              "{b}<br/>{a0}:{c0}度<br/>{a1}:{c1}度<br/>{a2}:{c2}度<br/>{a3}:{c3}度",
            textStyle: {
              color: "rgba(255, 255, 255, .8)",
            },
            borderWidth: "0",
            borderColor: "rgba(7,38,108, 1)",
            backgroundColor: "rgba(7,38,108,1)", // 通过设置rgba调节背景颜色与透明度
          },
          grid: {
            left: fitChartSize(15),
            right: fitChartSize(15),
            top: fitChartSize(15),
            bottom: fitChartSize(55),
          },
          legend: {
            show: true,
            data: [
              "月积温",
              "历史同期月积温",
              "月平均温度",
              "历史同期月平均温度",
            ],
            width: fitChartSize(300),
            bottom: fitChartSize(0),
            height: fitChartSize(60),
            itemWidth: fitChartSize(15),
            itemHeight: fitChartSize(2),
            itemGap: fitChartSize(10),
          },
          xAxis: {
            data: xData1,
          },
          yAxis: [
            {
              name: "度",
              nameGap: 0,
              nameTextStyle: {
                color: "#fff",
                fontSize: fitChartSize(12),
                align: "right",
                padding: [0, fitChartSize(8), fitChartSize(0), fitChartSize(0)],
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                fontSize: fitChartSize(12),
                showMaxLabel: false,
                textStyle: {
                  color: "#ffffff",
                },
              },
              splitLine: {
                show: true,
                showMaxLine: false,
                lineStyle: {
                  type: "dashed",
                  color: "rgba(255,255,255,.3)",
                },
              },
            },
            {
              name: "度",
              nameGap: 0,
              nameTextStyle: {
                color: "#fff",
                fontSize: fitChartSize(12),
              },
              axisLabel: {
                show: true,
                fontSize: fitChartSize(12),
                showMaxLabel: false,
                textStyle: {
                  color: "#ffffff",
                },
              },
              nameTextStyle: {
                color: "#fff",
                fontSize: fitChartSize(12),
                align: "left",
                padding: [0, fitChartSize(0), fitChartSize(0), fitChartSize(8)],
              },
              splitLine: {
                show: false,
              },
              splitArea: {
                show: false,
              },
              axisTick: {
                show: false,
              },
            },
          ],

          series: [
            {
              name: "月积温",
              data: data11, // 月积温
              type: "line",
              lineStyle: {
                color: "#EACA60",
              },
              itemStyle: {
                color: "#EACA60",
              },
              areaStyle: {
                color: "none",
              },
            },
            {
              name: "历史同期月积温",
              data: data12, // 历史同期月积温
              type: "line",
              lineStyle: {
                color: "#1EC579",
              },
              itemStyle: {
                color: "#1EC579",
              },
              areaStyle: {
                color: "none",
              },
            },
            {
              name: "月平均温度",
              data: data13, // 月平均温度
              type: "line",
              yAxisIndex: 1,
              lineStyle: {
                color: "#B88BFC",
              },
              itemStyle: {
                color: "#B88BFC",
              },
              areaStyle: {
                color: "none",
              },
            },
            {
              name: "历史同期月平均温度",
              data: data14, // 历史同期月平均温度
              type: "line",
              yAxisIndex: 1,
              lineStyle: {
                color: "#1BA5FB",
              },
              itemStyle: {
                color: "#1BA5FB",
              },
              areaStyle: {
                color: "none",
              },
            },
          ],
        };
        // 降水量
        state.waterBarOption = {
          tooltip: {
            trigger: "axis",
            formatter: "{b}<br/>{a0}:{c0}mm<br/>{a1}:{c1}mm",
            textStyle: {
              color: "#fff",
            },
            borderWidth: "0",
            borderColor: "rgba(7,38,108, 1)",
            backgroundColor: "rgba(7,38,108,1)", //通过设置rgba调节背景颜色与透明度
          },
          grid: {
            left: fitChartSize(15),
            right: fitChartSize(15),
            top: fitChartSize(15),
            bottom: fitChartSize(40),
          },
          legend: {
            show: true,
            data: ["月降水量", "历史同期月降水量"],
            width: fitChartSize(460),
            bottom: fitChartSize(0),
            height: fitChartSize(60),
            itemWidth: fitChartSize(15),
            itemHeight: fitChartSize(2),
            itemGap: fitChartSize(10),
          },
          xAxis: {
            data: xData1,
            axisLabel: {
              show: true,
              fontSize: fitChartSize(12),
              showMaxLabel: true,
              color: "#ffffff",
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              name: "mm",
            },
          ],
          series: [
            {
              name: "月降水量",
              data: data21,
              lineStyle: {
                color: "#0093FF",
              },
              itemStyle: {
                color: "#0093FF",
              },
              areaStyle: {
                normal: {
                  ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(0, 147, 255, .4)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 147, 255, 0)",
                    },
                  ]),
                },
              },
            },
            {
              name: "历史同期月降水量",
              data: data22,
              lineStyle: {
                color: "#B88BFC",
              },
              itemStyle: {
                color: "#B88BFC",
              },
              areaStyle: {
                normal: {
                  ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(184, 139, 252, .4)",
                    },
                    {
                      offset: 1,
                      color: "rgba(184, 139, 252, 0)",
                    },
                  ]),
                },
              },
            },
          ],
        };
      });
    };

    onMounted(() => {
      getWeatherToken({
        grant_type: "client_credentials",
        client_id: "anchu_js",
        client_secret: "123456",
      }).then((res) => {
        console.log(res);
        localStorage.setItem("weatherToken", res.data.access_token);
        setTimeout(() => {
          getWeather();
        }, 0);
      });
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  width: vw(460);
  height: 100%;

  #change-line-chart {
    box-sizing: border-box;
    padding-right: vw(15);
  }

  .bar-chart {
    height: vh(240);
    margin-top: vh(15);
    margin-bottom: vh(15);
    padding: 0 vh(15);
    box-sizing: border-box;
  }

  .line-chart-box {
    height: vh(240);
    margin-top: vh(15);
    margin-bottom: vh(15);
    padding: 0 vh(15);
    box-sizing: border-box;
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
