<template>
  <div class="_center3">
    <sub-title-bar
      title="降水量"
      icon="https://img.hzanchu.com/acimg/8a3863ae41ca129e41978adaa92f5279.png"
    ></sub-title-bar>
    <div class="_chart">
      <div id="center3-chart" class="_chart-chart"></div>
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
        dataY1 = [];

      for (let item of list) {
        dataX.push(item.date.substring(6, 10));
        dataY1.push({
          value: item.precipitation,
        });
      }
      let chart = echarts.init(document.getElementById("center3-chart"));

      let option = {
        color: ["#00BAFE"],
        legend: {
          bottom: "0%",
          center: "50%",
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
              "毫米</span>" +
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
            name: "毫米",
            nameLocation: "end",
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.14)",
              },
            },
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
            name: "降水量",
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
          },
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
._center3 {
  width: 100%;
  height: vh(286);
  ._chart {
    width: 100%;
    ._chart-chart {
      width: 96%;
      height: vh(240);
      margin-left: vw(32);
      margin-top: vh(10);
    }
  }
}
</style>
