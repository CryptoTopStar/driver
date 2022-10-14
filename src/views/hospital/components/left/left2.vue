<template>
  <div class="_left2">
    <title-bar title="历年资源产出量" />
    <div class="_chart">
      <div id="left2-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getResourceOutputQuantity } from "@/api/hospital/api";

export default {
  components: { TitleBar },
  setup() {
    let chartInstance;
    // 重新初始化当前chart
    const reload = () => {
      getResourceOutputQuantity().then((res) => {
        console.log(res);
        if (res.code == 0) {
          initChart(res.data);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataLines = [],
        dataY1 = [],
        dataY2 = [],
        dataY3 = [];

      for (let item of list) {
        // console.log(item);
        item.bed_ratio = parseInt(
          item.bed_ratio.substr(0, item.bed_ratio.length - 1)
        );
        dataLines.push([item.year, item.bed_ratio]);
        dataX.push(item.year);
        dataY1.push({
          value: item.patient_num,
        });
        dataY2.push({
          value: item.inpatient_num,
        });
        dataY3.push({
          value: item.bed_ratio,
        });
      }
      console.log(dataLines);
      let chart = echarts.init(document.getElementById("left2-chart"));

      let option = {
        color: ["#00BAFE"],
        legend: {
          top: "-1%",
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
              "人</span>" +
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
                  "%</span>" +
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
            name: "人数",
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
          {
            type: "value",
            name: "%",
            nameLocation: "end",
            max: 100,
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
            name: "诊疗人次数",
            data: dataY1,
            barWidth: "20px",
            type: "bar",
            itemStyle: {
              color: "#26B4FC",
            },
          },
          {
            name: "住院人次数",
            data: dataY2,
            barWidth: "20px",
            type: "bar",
            itemStyle: {
              color: "#EF9E4E",
            },
          },
          {
            name: "病床利用率",
            data: dataY3,
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: "#7981FF",
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}%",
              textStyle: {
                color: "#fff",
              },
            },
          },

          {
            name: "",
            type: "lines",
            yAxisIndex: 1,
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
      chartInstance.dispose();
      window.removeEventListener("resize", resizeHandler);
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
._left2 {
  width: 100%;

  ._chart {
    width: 100%;
    margin-top: vh(12);
    ._chart-chart {
      width: 96%;
      margin-left: 3%;
      height: vh(200);
    }
  }
}
</style>
