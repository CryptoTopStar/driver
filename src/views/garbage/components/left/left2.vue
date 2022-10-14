<template>
  <div class="_left2">
    <title-bar title="大陈乡准确率" />
    <div v-if="list.length > 0" class="_chart">
      <div id="left2-chart" class="_chart-chart"></div>
    </div>
    <list-empty v-else title="数据正在更新中..."></list-empty>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { classificationAccuracyList } from "@/api/garbage/api";
import ListEmpty from "@/components/listEmpty.vue";

export default {
  components: { TitleBar, ListEmpty },
  setup() {
    let chartInstance;
    const start = ref(0); //
    const end = ref(4); // 结束，目前默认为5条，这里也暂时不做请求之后的初始化，默认为4，表示0、1、2、3、4
    const roomTimers = ref(null);
    const list = ref([]);
    const isLoad = ref(false); // 是否加载过数据
    // 重新初始化当前chart
    const reload = () => {
      classificationAccuracyList({
        street: "大陈乡",
      }).then((res) => {
        if (res.code == 0) {
          list.value = res.data;
          setTimeout(() => {
            initChart(res.data);
          }, 0);
          // list.value = [{ correctRate: 100, village: "早田坂村" }];
          // setTimeout(() => {
          //   initChart([{ correctRate: 100, village: "早田坂村" }]);
          // }, 0);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      if (list.length == 0) {
        return;
      }
      let dataX = [],
        dataLines = [],
        dataY1 = [];

      for (let item of list) {
        // console.log(item);
        dataLines.push([item.village, item.correctRate + ""]);
        dataX.push(item.village);
        dataY1.push({
          value: item.correctRate,
        });
      }
      console.log(dataLines);
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
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>准确率：" +
              "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params[0].value +
              "%</span>" +
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
        dataZoom: {
          type: "inside",
          startValue: start.value,
          endValue: end.value,
        },
        series: [
          {
            name: "游客量",
            data: dataY1,
            type: "bar",
            itemStyle: {
              color: "#7981FF",
            },
            barWidth: "20",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(121, 129, 255, 0.35)" },
                { offset: 1, color: "rgba(121, 129, 255, 0)" },
              ]),
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
          // {
          //   name: "滑行的光点",
          //   type: "lines",
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

        if (start.value > list.value.length - 4) {
          start.value = 0;
          end.value = 4;
        }
        setTimeout(() => {
          chartInstance.setOption({
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
      chartInstance?.dispose();
      clearInterval(roomTimers.value);
      window.removeEventListener("resize", resizeHandler);
    });
    return { list };
  },
};
</script>

<style scoped lang="scss">
._left2 {
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
