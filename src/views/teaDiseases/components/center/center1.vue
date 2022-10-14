<template>
  <div class="_center1">
    <sub-title-bar
      title="温度"
      icon="https://img.hzanchu.com/acimg/9a26b7cfb2a42eed9d6cc56d80e44c26.png"
    ></sub-title-bar>
    <div class="_chart">
      <div id="center1-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import SubTitleBar from "@/components/subTitleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { SubTitleBar },
  setup(props) {
    let chartInstance;

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataLines = [],
        dataY1 = [],
        dataY2 = [];
      for (let item of list) {
        // dataLines.push([item.date.substring(6, 10), item.high_temperature]);
        dataX.push(item.date.substring(6, 10));
        dataY1.push({
          value: item.high_temperature,
        });
        dataY2.push({
          value: item.low_temperature,
        });
      }
      let chart = echarts.init(document.getElementById("center1-chart"));

      let option = {
        color: ["#DF6FF4"],
        tooltip: {
          show: true,
          trigger: "axis",
          borderColor: "#278BFF",
          borderWidth: 1,
          backgroundColor: "#07266C",
          formatter: function (params) {
            return (
              "<div style='width: 100%; font-size: 14px;font-weight: bold;color: #fff;'>" +
              params[0].name +
              "</div>" +
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
              params[0].seriesName +
              "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params[0].value +
              "度</span>" +
              "</div>" +
              (params[1]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[1].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[1].value +
                  "度</span>" +
                  "</div>"
                : "")
            );
          },
        },
        xAxis: {
          type: "category",
          data: dataX,
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.14)",
              type: "dashed",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#90B6D2",
          },
        },
        yAxis: [
          {
            type: "value",
            name: "度",
            nameLocation: "end",

            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.14)",
              },
            },
            splitNumber: 5,
            axisLabel: {
              color: "#90B6D2",
              fontSize: 12,
            },
            nameTextStyle: {
              color: "#90B6D2",
              fontSize: 12,
            },
          },
        ],
        grid: {
          top: "18%",
          left: "3%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
        series: [
          {
            name: "最高温度",
            data: dataY1,
            type: "line",
            yAxisIndex: 0,
            itemStyle: {
              color: "#DF6FF4",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(223, 111, 244, 0.4)" },
                { offset: 1, color: "rgba(223, 111, 244, 0.2)" },
              ]),
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}度",
              textStyle: {
                color: "#fff",
              },
            },
          },
          {
            name: "最低温度",
            data: dataY2,
            type: "line",
            itemStyle: {
              color: "rgba(252, 183, 73, 1)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(252, 183, 73, 0.4)" },
                { offset: 1, color: "rgba(252, 183, 73, 0.2)" },
              ]),
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}度",
              textStyle: {
                color: "#fff",
              },
            },
          },
          // {
          //   name: "",
          //   type: "lines",
          //   yAxisIndex: 0,
          //   coordinateSystem: "cartesian2d",
          //   polyline: true,
          //   effect: {
          //     show: true,
          //     trailLength: 0.3,
          //     symbolSize: 8,
          //     symbol: "circle",
          //     color: "#fff",
          //   },
          //   zlevel: 100,
          //   lineStyle: {
          //     color: "rgba(14, 156, 255, 0)",
          //     width: 0,
          //     opacity: 0,
          //   },
          //   areaStyle: {
          //     color: "rgba(14, 156, 255, 0)",
          //   },
          //   label: {
          //     show: false,
          //   },
          //   data: [{ coords: dataLines }],
          // },
        ],
      };
      chart.setOption(option);
      chartInstance = chart;
    };
    const resizeHandler = () => {
      chartInstance?.resize();
    };
    onMounted(() => {
      initChart(props.data);
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      chartInstance.dispose();
      window.removeEventListener("resize", resizeHandler);
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
._center1 {
  width: 100%;
  // height: vh(240);
  ._chart {
    width: 100%;
    ._chart-chart {
      width: 96%;
      height: vh(200);
      margin-left: vw(32);
      margin-top: vh(10);
    }
  }
}
</style>
