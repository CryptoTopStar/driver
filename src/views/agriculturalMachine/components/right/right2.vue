<template>
  <div class="_right2">
    <title-bar
      title="农机资源数"
      customStyle="margin-left: 0px;margin-top: 0px"
    />

    <div class="_chart">
      <div id="right2-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getResourceInputQuantity } from "@/api/hospital/api";
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { TitleBar },
  setup(props) {
    let chartInstance;

    const start = ref(0); //
    const end = ref(4); // 结束，目前默认为5条，这里也暂时不做请求之后的初始化，默认为4，表示0、1、2、3、4
    const roomTimers = ref(null);

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataY = [],
        dataY1 = [],
        dataY2 = [],
        dataY3 = [],
        dataY4 = [],
        dataY5 = [];

      for (let item of list) {
        dataY.push(item.village);
        dataY1.push({
          value: item.tractor,
        });
        dataY2.push({
          value: item.precipitation,
        });
        dataY3.push({
          value: item.dryer,
        });
        dataY4.push({
          value: item.planter,
        });
        dataY5.push({
          value: item.drone,
        });
      }
      let chart = echarts.init(document.getElementById("right2-chart"));

      let option = {
        color: ["#00BAFE"],
        legend: {
          top: "5%",
          right: "5%",
          textStyle: {
            color: "#fff",
          },
        },
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
              getUnit(params[0].seriesName) +
              "</span>" +
              "</div>" +
              (params[1]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[1].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[1].value +
                  getUnit(params[1].seriesName) +
                  "</span>" +
                  "</div>"
                : "") +
              (params[2]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[2].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[2].value +
                  getUnit(params[2].seriesName) +
                  "</span>" +
                  "</div>"
                : "") +
              (params[3]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[3].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[3].value +
                  getUnit(params[3].seriesName) +
                  "</span>" +
                  "</div>"
                : "") +
              (params[4]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[4].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[4].value +
                  getUnit(params[4].seriesName) +
                  "</span>" +
                  "</div>"
                : "")
            );
          },
        },
        xAxis: {
          type: "value",
          // data: dataX,
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
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(255, 255, 255, 0.14)",
            },
          },
          splitNumber: 5,
        },
        yAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#90B6D2",
              fontSize: 12,
            },
            axisTick: {
              show: false,
            },
            nameTextStyle: {
              color: "#90B6D2",
              fontSize: 12,
            },
            data: dataY,
          },
        ],
        grid: {
          top: "18%",
          left: "3%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
        dataZoom: {
          type: "inside",
          orient: "vertical",
          yAxisIndex: [0],
          startValue: start.value,
          endValue: end.value,
           zoomOnMouseWheel: false
        },
        series: [
          {
            name: "拖拉机",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            // emphasis: {
            //   focus: "series",
            // },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(203, 130, 60, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#CB823C", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: dataY1,
          },
          {
            name: "联合收割机",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            // emphasis: {
            //   focus: "series",
            // },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0, 159, 208, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#009FD0", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: dataY2,
          },
          {
            name: "烘干机",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            // emphasis: {
            //   focus: "series",
            // },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(119, 106, 255, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#776AFF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: dataY3,
          },
          {
            name: "插秧机",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            // emphasis: {
            //   focus: "series",
            // },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(53, 253, 220, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#35FDDC", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: dataY4,
          },
          {
            name: "无人机",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            // emphasis: {
            //   focus: "series",
            // },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(252, 107, 146, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FC6B92", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: dataY5,
          },
        ],
      };
      chart.setOption(option);
      chartInstance = chart;
      initZoomTimer();
    };

    const getUnit = (name) => {
      let unit = "";
      if (name == "拖拉机" || name == "联合收割机" || name == "插秧机") {
        unit = "辆";
      } else if (name == "烘干机") {
        unit = "台";
      } else if (name == "无人机") {
        unit = "架";
      }
      return unit;
    };
    //  开启柱状图滚动展示
    const initZoomTimer = () => {
      if (roomTimers.value) {
        clearInterval(roomTimers.value);
      }
      roomTimers.value = setInterval(() => {
        ++start.value;
        ++end.value;

        if (start.value > props.data.length - 4) {
          start.value = 0;
          end.value = 4;
        }
        setTimeout(() => {
          chartInstance.setOption({
            dataZoom: {
              type: "inside",
              orient: "vertical",
              yAxisIndex: [0],
              startValue: start.value,
              endValue: end.value,
               zoomOnMouseWheel: false
            },
          });
        }, 0);
      }, 3000);
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
._right2 {
  width: 100%;
  height: vh(286);
  margin-top: vh(20);
  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);

  ._chart {
    width: 100%;
    ._chart-chart {
      width: 96%;
      height: vh(240);
      margin-left: vw(20);
    }
  }
}
</style>
