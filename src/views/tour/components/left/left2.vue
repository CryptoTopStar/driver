<template>
  <div class="_left1">
    <title-bar title="景点游客量" />
    <div class="_chart">
      <div id="left2-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { tourismFlowList } from "@/api/tour/api";

export default {
  components: { TitleBar },
  setup() {
    let chartInstance;
    const timers = ref(null);
    const roomTimers = ref(null);
    const charts = ref(null);
    const pos = ref(0);
    const list = ref([]);
    const start = ref(0); //
    const end = ref(4); // 结束，目前默认为5条，这里也暂时不做请求之后的初始化，默认为4，表示0、1、2、3、4
    // 重新初始化当前chart
    const reload = () => {
      tourismFlowList().then((res) => {
        console.log(res);
        if (res.code == 0) {
          let max = 0;
          list.value = res.data;
          for (let item of res.data) {
            if (max < item.count) {
              max = item.count;
            }
          }
          setTimeout(() => {
            initChart(res.data);
          }, 0);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list, max) => {
      let dataX = [],
        dataBar = [],
        dataY1 = [];

      for (let item of list) {
        dataX.push(item.attractions);
        dataY1.push({
          value: item.count,
          symbol:
            item.count > 20
              ? "image://" + require("@/assets/images/icon/line_icon_red.png")
              : "image://" + require("@/assets/images/icon/line_icon.png"),
          symbolSize: 20,
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 14,
              color: item.count > 20 ? "#FC2E2E" : "#EACA60",
            },
          },
        });
        dataBar.push(0);
      }
      let chart = echarts.init(document.getElementById("left2-chart"));

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
          // formatter: function (params) {
          //   return (
          //     "<div style='width: 100%;text-align:center;font-size: 14px;color: #687C99'>" +
          //     params[0].name +
          //     "</div>" +
          //     "<div style='width: 100%;margin-top: vh(6);text-align:center;font-size: 14px;color: #2B333F'>游客量：" +
          //     params[0].value +
          //     "人</div>"
          //   );
          // },
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
            max: max,
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
        },
        series: [
          {
            name: "游客量",
            data: dataY1,
            type: "line",
            lineStyle: {
              width: 4,
              color: "rgba(255,255,255,0.3)",
            },

            itemStyle: {
              color: "#EACA60",
              borderType: "solid",
              borderWidth: 20,
              borderColor: "rgba(255,255,255,0.3)",
            },
            markLine: {
              lineStyle: {
                color: "#FF2E2E",
              },
              label: {
                color: "FF2E2E",
                fontWeight: "normal",
                formatter: "红线\n预警",
              },
              data: [{ yAxis: 20, name: "红线预警" }],
            },
          },
          {
            name: "游客量1",
            data: dataBar,
            type: "bar",
            barWidth: "44px",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],
      };
      chart.setOption(option);
      charts.value = chart;
      chartInstance = chart; // 跟上面一样
      // initTimer();
      // initZoomTimer();
    };

    // 自动滚动
    const initTimer = () => {
      timers.value = setInterval(() => {
        charts.value.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: pos.value,
        });
        charts.value.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: pos.value,
        });
        // tooltip 跟随显示
        charts.value.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: pos.value,
        });
        pos.value++;
        if (pos.value > list.value.length - 1) {
          pos.value = 0;
        }
      }, 2000);
    };

    //  开启柱状图滚动展示
    const initZoomTimer = () => {
      if (roomTimers.value) {
        clearInterval(roomTimers.value);
      }

      roomTimers.value = setInterval(() => {
        ++start.value;
        ++end.value;

        if (start.value > list.value.length - 4) {
          start.value = 0;
          end.value = 4;
        }
        setTimeout(() => {
          charts.value.setOption({
            dataZoom: {
              type: "inside",
              startValue: start.value,
              endValue: end.value,
            },
          });
        }, 0);
      }, 2000);
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
      // 清除定时器
      clearInterval(timers.value);
    });
    return { timers };
  },
};
</script>

<style scoped lang="scss">
._left1 {
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
