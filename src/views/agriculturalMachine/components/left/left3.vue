<template>
  <div class="_left3">
    <title-bar
      title="主要农作物面积"
      customStyle="margin-left: 0px;margin-top: 0px"
      :showMore="true"
      :moreType="1"
      tipTitle="算法说明"
      :tips="tips"
    />

    <div class="_chart">
      <div id="left3-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
export default {
  components: { TitleBar },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    let chartInstance;

    const start = ref(0); //
    const end = ref(4); // 结束，目前默认为5条，这里也暂时不做请求之后的初始化，默认为4，表示0、1、2、3、4
    const roomTimers = ref(null);
    const tips = [
      {
        title: "算法简介：",
        sub: "采用基于U-net的网络结构对遥感图像进行语义分割训练，依据江山市各乡、镇、街道遥感图像，将早稻、单季稻、连作晚稻和油菜等主要农作物地块区域识别出来，分别计算各自主要农作物面积之和。",
      },
    ];

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataY = [],
        dataY1 = [],
        dataY2 = [],
        dataY3 = [],
        dataY4 = [];

      for (let item of list) {
        dataY.push(item.village);
        dataY1.push({
          value: item.early_rice_area,
        }); // 早稻
        dataY2.push({
          value: item.single_rice_area,
        }); // 单季稻
        dataY3.push({
          value: item.late_rice_area,
        }); // 连作晚稻
        dataY4.push({
          value: item.rape_area,
        }); // 油菜
      }
      let chart = echarts.init(document.getElementById("left3-chart"));

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
              "万亩</span>" +
              "</div>" +
              (params[1]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[1].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[1].value +
                  "万亩</span>" +
                  "</div>"
                : "") +
              (params[2]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[2].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[2].value +
                  "万亩</span>" +
                  "</div>"
                : "") +
              (params[3]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[3].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[3].value +
                  "万亩</span>" +
                  "</div>"
                : "")
            );
          },
        },
        xAxis: {
          type: "value",

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
          zoomOnMouseWheel: false,
        },
        series: [
          {
            name: "早稻",
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
            name: "单季稻",
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
            name: "连作晚稻",
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
            name: "油菜",
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
        ],
      };
      chart.setOption(option);
      chartInstance = chart;

      initZoomTimer();
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
              zoomOnMouseWheel: false,
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
      clearInterval(roomTimers.value);
    });
    return { tips };
  },
};
</script>

<style scoped lang="scss">
._left3 {
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
