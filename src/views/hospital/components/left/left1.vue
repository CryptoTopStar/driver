<template>
  <div class="_left1">
    <title-bar title="历年资源投入量" />
    <div class="_chart">
      <div id="left1-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getResourceInputQuantity } from "@/api/hospital/api";

export default {
  components: { TitleBar },
  setup() {
    let chartInstance;
    // 重新初始化当前chart
    const reload = () => {
      getResourceInputQuantity().then((res) => {
        if (res.code == 0) {
          initChart(res.data);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataY1 = [],
        dataY2 = [],
        dataY3 = [];

      for (let item of list) {
        dataX.push(item.year);
        dataY1.push({
          value: item.org_num,
        });
        dataY2.push({
          value: item.people_num,
        });
        dataY3.push({
          value: item.bed_num,
        });
      }
      let chart = echarts.init(document.getElementById("left1-chart"));

      let option = {
        color: ["#00BAFE"],
        legend: {
          top: "top",
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
              "个</span>" +
              "</div>" +
              (params[1]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[1].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[1].value +
                  "人</span>" +
                  "</div>"
                : "") +
              (params[2]?.value
                ? "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>" +
                  params[2].seriesName +
                  "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
                  params[2].value +
                  "张</span>" +
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
            data: ["2019", "2020", "2021", "2022"],
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
            name: "机构数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
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
            name: "卫生人员数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
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
            name: "床位数",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
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
._left1 {
  width: 100%;

  ._chart {
    width: 100%;
    margin-top: vh(12);
    ._chart-chart {
      height: vh(200);
    }
  }
}
</style>
