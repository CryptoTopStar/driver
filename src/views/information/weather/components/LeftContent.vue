<template>
  <div class="content">
    <Label label="天气预报"></Label>
    <div class="contentBox">
      <img src="@/assets/images/infomation/weather/left-1-bg.png" class="bg" />
      <img :src="weather.icon" class="icon" />
      <div class="weather">
        <div>天气：{{ weather.text }}</div>
        <div>{{ weather.temp }}℃</div>
      </div>

      <div class="detail">
        <div class="item">
          <div>{{ weather.windDir }}</div>
          <div>{{ weather.windScale }} <span>级</span></div>
        </div>
        <div class="item">
          <div>湿度</div>
          <div>{{ weather.humidity }} <span>%</span></div>
        </div>
        <div class="item">
          <div>{{ weather.category }}</div>
          <div>{{ weather.aqi }}</div>
        </div>
      </div>
    </div>

    <div class="trend-line-chart" id="trend-line-chart">
      <LineChart
        chartId="trend-line-chart"
        :xData="trendXAxisData"
        :chartData="trendChartData"
        yAxisTitle="度"
        toolTipTail="度"
      ></LineChart>
    </div>

    <Label label="未来7日温度"></Label>
    <div class="trend-line-chart1" id="trend-line-chart1">
      <DoubleLineChart
        :option="yearLineOption"
        chartId="trend-line-chart1"
        :needResize="true"
      ></DoubleLineChart>
    </div>

    <Label label="未来7日降水量"></Label>
    <div class="trend-line-chart" id="trend-line-chart2">
      <LineChart
        chartId="trend-line-chart2"
        :xData="waterXAxisData"
        :chartData="waterChartData"
        :grid="waterGrid"
        yAxisTitle="毫米"
        toolTipTail="毫米"
      ></LineChart>
    </div>
  </div>
</template>

<script>
import Label from "@/components/Label";
import bar_dot from "@/assets/images/area_icon.png";
import BarLineChartSpecial from "@/components/AcChart/Chart/BarLineChartSpecial.vue";
import LineChart from "@/components/AcChart/Chart/LineChart.vue";
import LineChartSpecial from "@/components/AcChart/Chart/LineChartSpecial.vue";
import {
  onMounted,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  shallowRef,
} from "vue";
import * as echarts from "echarts";
import { areaSort, getTendency } from "@/api/api";

import BarChart from "@/components/AcChart/Chart/BarChart";
import BarChartSpecial from "@/components/AcChart/Chart/BarChartSpecial";
import DoubleLineChart from "@/components/AcChart/Chart/DoubleLineChart.vue";
import DoubleLineChartAndYAxis from "@/components/AcChart/Chart/DoubleLineChartAndYAxis.vue";
import axios from "axios";

export default {
  name: "leftContent",
  components: {
    Label,
    LineChart,
    BarChart,
    LineChartSpecial,
    BarLineChartSpecial,
    BarChartSpecial,
    DoubleLineChart,
    DoubleLineChartAndYAxis,
  },
  props: {
    type: {
      type: String,
      default: "fungi",
    },
  },
  setup(props) {
    const hfKey = "95faeb082d704c31aced2cab95b65321";
    const location = "101211005";
    const {
      proxy: {
        $tools: { fitChartSize, keepTwoDecimal, sendMessage },
      },
    } = getCurrentInstance();
    // 4.处理种植面积和产值数据
    const areaValueData = reactive({
      areaValueXData: ref([]),
      areaValueYDataBar: ref([]),
      areaValueYDataLine: ref([]),
    });
    const state = reactive({
      weather: ref({
        windDir: "", // 风向
        windScale: "", // 等级
        humidity: "", // 湿度
        temp: "", // 当前温度
        text: "", // 当前天气
        icon: "", // 天气图标
        category: "", // 空气质量指数级别
        aqi: "", // 空气质量指数
      }), // 当日的天气预报
      trendXAxisData: ref([]), // 趋势图x轴
      trendChartData: ref([]), // 趋势图数据
      areaChartOption: shallowRef({}), // 面积统计图表配置
      areaSort: [],
      yearLineOption: ref({}),
      waterXAxisData: ref([]), // 降水量趋势图x轴
      waterChartData: ref([]), // 降水量趋势图数据
      waterGrid: ref({
        left: fitChartSize(15),
        right: fitChartSize(10),
        top: fitChartSize(40),
        bottom: fitChartSize(0),
        containLabel: true,
      }),
    });

    // 这里获取实时天气
    const getWeather = () => {
      // 这里获取近7日最高温度、7日最低温度、7日降雨量
      axios
        .get(
          "https://devapi.qweather.com/v7/weather/7d?location=" +
            location +
            "&key=" +
            hfKey
        )
        .then((res) => {
          // console.log(res);
          let xData = [];
          let data1 = [],
            data2 = []; // 温度未来7日 最高温度、最低温度
          let data3 = []; // 未来降雨量

          if (res.data.code == "200") {
            let list = res.data.daily;
            for (let item of list) {
              // console.log(item);
              xData.push(item.fxDate.substring(5, 10));
              data1.push(item.tempMax);
              data2.push(item.tempMin);
              data3.push(item.precip);
            }
            dealTemperature(xData, data1, data2);
            state.waterXAxisData = xData;
            state.waterChartData = data3;
          }
        });

      axios
        .get(
          "https://devapi.qweather.com/v7/weather/now?location=" +
            location +
            "&key=" +
            hfKey
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            let now = res.data.now;
            state.weather.windDir = now.windDir;
            state.weather.windScale = now.windScale;
            state.weather.humidity = now.humidity;
            state.weather.temp = now.temp;
            state.weather.text = now.text;
            state.weather.icon = require("@/assets/color-64/" +
              now.icon +
              ".png");
          }
        });

      // 24小时的温度变化（目前取0、4、8、12、16、20、24）
      axios
        .get(
          "https://devapi.qweather.com/v7/weather/24h?location=" +
            location +
            "&key=" +
            hfKey
        )
        .then((res) => {
          // console.log(res);
          let xData = [];
          let data1 = []; // 温度变化

          if (res.data.code == "200") {
            let list = res.data.hourly;
            for (let item of list) {
              // console.log(item.fxTime.substring(11, 13));
              xData.push(item.fxTime.substring(11, 13) + "时");
              data1.push({
                value: item.temp,
                label: {
                  show: false,
                },
              });
            }

            state.trendXAxisData = xData;
            state.trendChartData = data1;
          }
        });

      axios
        .get(
          "https://devapi.qweather.com/v7/air/now?location=116.41,39.92&key=" +
            hfKey
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            let now = res.data.now;
            state.weather.category = now.category;
            state.weather.aqi = now.aqi;
          }
        });
    };

    // 这里处理最高最低温度
    const dealTemperature = (xData, data1, data2) => {
      state.yearLineOption = {
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br/>{a0}:{c0}度<br/>{a1}:{c1}度",
          textStyle: {
            color: "#fff",
          },
          borderWidth: "0",
          borderColor: "rgba(7,38,108, 1)",
          backgroundColor: "rgba(7,38,108,1)", //通过设置rgba调节背景颜色与透明度
        },
        grid: {
          left: fitChartSize(15),
          right: fitChartSize(10),
          top: fitChartSize(40),
          bottom: fitChartSize(0),
        },
        legend: {
          data: ["未来7日最高温度", "未来7日最低温"],
          width: fitChartSize(460),
          top: fitChartSize(5),
          height: fitChartSize(60),
          itemWidth: fitChartSize(15),
          itemHeight: fitChartSize(2),
          itemGap: fitChartSize(10),
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
            show: false,
          },
        },
        yAxis: [
          {
            name: "度",
          },
        ],
        series: [
          {
            name: "未来7日最高温度",
            data: data1,
            lineStyle: {
              color: "#EACA60",
            },
            itemStyle: {
              color: "#EACA60",
            },
            areaStyle: {
              normal: {
                ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(234, 202, 96, .4)",
                  },
                  {
                    offset: 1,
                    color: "rgba(234, 202, 96, 0)",
                  },
                ]),
              },
            },
          },
          {
            name: "未来7日最低温",
            data: data2,
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
        ],
      };
    };

    onMounted(() => {
      getWeather();
    });

    return {
      ...toRefs(state),
      ...toRefs(areaValueData),
    };
  },
};
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
        background: rgba(175, 200, 255, 0.2);
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
    height: vh(200);
    margin: vh(10) auto;
    padding: 0 vw(15);
    box-sizing: border-box;
  }

  .trend-line-chart1 {
    height: vh(230);
    margin: vh(15) auto;
    padding: 0 vw(15);
    box-sizing: border-box;
  }

  .contentBox {
    position: relative;
    width: 100%;
    height: auto;
    margin-top: vh(12);
    padding: 0 vw(15);
    box-sizing: border-box;

    .bg {
      width: vw(432);
      height: vh(108);
    }

    .icon {
      position: absolute;
      z-index: 2;
      top: vh(46);
      left: vw(44);
      width: vw(32);
      height: vh(32);
    }

    .weather {
      position: absolute;
      top: vh(8);
      right: vw(9);
      width: vw(308);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      div:nth-of-type(1) {
        font-size: vh(22);
        line-height: vh(24);
        color: #ffffff;
      }
      div:nth-of-type(2) {
        font-size: vh(24);
        line-height: vh(24);
        color: #2ed3ff;
      }
    }

    .detail {
      position: absolute;
      top: vh(54);
      right: vw(9);
      width: vw(308);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-of-type(1) {
        font-size: vh(16);
        line-height: vh(24);
        color: #cceaff;
      }
      div:nth-of-type(2) {
        font-size: vh(22);
        font-family: Microsoft YaHei;
        font-weight: 600;
        line-height: vh(24);
        color: #ffffff;
        span {
          font-size: vh(16);
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: vh(24);
        }
      }
    }
  }
}
</style>
