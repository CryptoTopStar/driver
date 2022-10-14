<template>
  <div class="_right1">
    <title-bar title="就诊人数统计" />
    <div class="_chart">
      <div id="right1-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getCountVisitNumber } from "@/api/hospital/api";

export default {
  components: { TitleBar },
  setup() {
    let chartInstance;
    // 重新初始化当前chart
    const reload = () => {
      getCountVisitNumber().then((res) => {
        if (res.code == 0) {
          initChart(res.data);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataLines = [],
        dataY1 = [];

      for (let item of list) {
        // console.log(item);
        dataLines.push([item.month, item.number + ""]);
        dataX.push(item.month);
        dataY1.push({
          value: item.number,
        });
      }
      let chart = echarts.init(document.getElementById("right1-chart"));

      let option = {
        color: ["#00BAFE"],
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
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
              params[0].seriesName +
              "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params[0].value +
              "人</span>" +
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
            name: "人",
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
            name: "游客量",
            data: dataY1,
            type: "line",
            itemStyle: {
              color: "#7981FF",
            },
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(121, 129, 255, 0.35)" },
                { offset: 1, color: "rgba(121, 129, 255, 0)" },
              ]),
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}人",
              textStyle: {
                color: "#fff",
              },
            },
          },
          {
            name: "滑行的光点",
            type: "lines",
            coordinateSystem: "cartesian2d",
            polyline: true,
            effect: {
              show: true,
              trailLength: 0.3,
              symbolSize: 8,
              symbol: "circle",
              color: "#fff",
            },
            zlevel: 100,
            lineStyle: {
              color: "rgba(14, 156, 255, 0)",
              width: 0,
              opacity: 0,
            },
            areaStyle: {
              color: "rgba(14, 156, 255, 0)",
            },
            label: {
              show: false,
            },
            data: [{ coords: dataLines }],
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
      chartInstance.dispose()
      window.removeEventListener("resize", resizeHandler);
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;

  ._chart {
    width: 100%;
    ._chart-chart {
      width: 96%;
      margin-left: 3%;
      height: vh(200);
    }
  }
}
</style>
