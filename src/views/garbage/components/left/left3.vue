<template>
  <div class="_left3">
    <title-bar title="大陈乡分时投放情况" />
    <div class="_chart">
      <div id="left3-chart" class="_chart-chart"></div>
      <video src="@/assets/ani.mp4" autoplay loop muted />
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { classificationSituationList } from "@/api/garbage/api";

export default {
  components: { TitleBar },
  setup() {
    let chartInstance;
    // 重新初始化当前chart
    const reload = () => {
      classificationSituationList({
        street: "大陈乡",
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
          initChart(res.data);
          // initChart(res.data.splice(res.data.length - 6, res.data.length));
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataY1 = [];

      for (let index in list) {
        dataX.push(list[index].collectTime.substring(5, 10));
        dataY1.push({
          value: list[index].weight,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color:
                    index % 2 == 0
                      ? "rgba(16, 237, 255, 1)"
                      : "rgba(132, 194, 255, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color:
                    index % 2 == 0
                      ? "rgba(52, 154, 255, 1)"
                      : "rgba(111, 116, 240, 1)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        });
      }
      let chart = echarts.init(document.getElementById("left3-chart"));

      let option = {
        legend: {
          show: false,
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
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>投放情况：" +
              "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params[0].value +
              "kg</span>" +
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
            name: "kg",
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
            name: "投放量",
            data: dataY1,
            type: "bar",
            barWidth: "30px",
            label: {
              show: true,
              position: "top",
              formatter: "{c}kg",
              textStyle: {
                color: "#fff",
              },
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
      reload();
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
._left3 {
  width: 100%;

  ._chart {
    position: relative;
    width: 100%;
    ._chart-chart {
      position: absolute;
      z-index: 1;
      left: 3%;
      width: 96%;
      height: vh(200);
    }

    video {
      position: absolute;
      z-index: 0;
      top: vw(0);
      left: 3%;
      width: 96%;
      height: vh(160);
      mix-blend-mode: screen;
    }
  }
}
</style>
