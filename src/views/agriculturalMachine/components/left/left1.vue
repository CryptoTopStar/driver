<template>
  <div class="_left1">
    <title-bar
      title="机械作业面积统计"
      customStyle="margin-left: 0px;margin-top: 0px"
    />
    <div class="_chart">
      <div id="left1-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
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
  components: { TitleBar },
  setup(props) {
    let chartInstance;

    const start = ref(0); //
    const end = ref(4); // 结束，目前默认为5条，这里也暂时不做请求之后的初始化，默认为4，表示0、1、2、3、4
    const roomTimers = ref(null);

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataY1 = [];
      for (let item of list) {
        dataX.push(item.village);
        dataY1.push({
          value: item.working_area,
        });
      }
      let chart = echarts.init(document.getElementById("left1-chart"));

      let option = {
        color: ["#00BAFE"],
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
              "</div>"
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
            name: "万亩",
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
        dataZoom: {
          type: "inside",
          startValue: start.value,
          endValue: end.value,
          zoomOnMouseWheel: false,
        },
        series: [
          {
            name: "机械作业面积",
            data: dataY1,
            barWidth: "20px",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#35FDDC" },
                { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
              ]),
              borderRadius: [15, 15, 0, 0], //（顺时针左上，右上，右下，左下）
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}万亩",
              textStyle: {
                color: "#fff",
              },
            },
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
    return {};
  },
};
</script>

<style scoped lang="scss">
._left1 {
  width: 100%;
  height: vh(286);
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
  box-sizing: border-box;

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
