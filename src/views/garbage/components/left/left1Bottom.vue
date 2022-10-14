<template>
  <div class="_left1-bottom-item" :style="customStyle">
    <div class="_title">{{ title }}</div>
    <img
      class="_more"
      src="@/assets/images/garbage/show-bottom.png"
      @click="change"
    />
    <div class="_line">
      <div></div>
      <div
        :style="'width: ' + (value == '更新中' ? 0 : value) + '%'"
        class="bg1"
      ></div>
      <img
        src="https://img.hzanchu.com/acimg/0a8cb01a22ecf6d9d68ee921303fcb02.png"
        :style="'left: calc(' + (value == '更新中' ? 0 : value) + '% - 13px )'"
      />
    </div>
    <div :class="value == '更新中' ? '_percent-s' : '_percent'">
      {{ value }}<span>{{ unit }}</span>
    </div>

    <div v-if="showMore" class="chart-more">
      <div class="chart-title">近7日{{ title }}变化趋势</div>
      <div :id="'chart-more' + title" class="charts"></div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  onBeforeUnmount,
} from "vue";
import * as echarts from "echarts";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
    customStyle: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let chartInstance;
    const showMore = ref(false);
    const change = () => {
      showMore.value = !showMore.value;
      setTimeout(() => {
        if (showMore.value) {
          // 展示
          initChart(props.data.reverse());
        } else {
          // 关闭
          chartInstance.dispose();
        }
      }, 0);
      emit("close", props.title);
    };

    const close = () => {
      showMore.value = false;
      chartInstance.dispose();
    };

    const resizeHandler = () => {
      chartInstance?.resize();
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      console.log(props.data);
      let dataX = [],
        dataLines = [],
        dataY1 = [];

      for (let item of list) {
        // console.log(item);
        if (props.title == "参与率") {
          dataLines.push([
            item.collectTime.substring(6, 10),
            item.participationRate + "",
          ]);
          dataX.push(item.collectTime.substring(6, 10));
          dataY1.push({
            value: item.participationRate,
          });
        } else if (props.title == "准确率") {
          dataLines.push([
            item.collectTime.substring(6, 10),
            item.correctRate + "",
          ]);
          dataX.push(item.collectTime.substring(6, 10));
          dataY1.push({
            value: item.correctRate,
          });
        } else if (props.title == "空桶率") {
          dataLines.push([
            item.collectTime.substring(6, 10),
            item.emptyBucketRate + "",
          ]);
          dataX.push(item.collectTime.substring(6, 10));
          dataY1.push({
            value: item.emptyBucketRate,
          });
        }
      }
      console.log(dataLines);
      let chart = echarts.init(
        document.getElementById("chart-more" + props.title)
      );

      let option = {
        color: ["#00BAFE"],
        legend: {
          show: false,
        },
        // title: {
        //   text: "近7日" + props.title + "变化趋势",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 12,
        //   },
        //   left: "50%",
        //   textAlign: "center",
        // },
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
            name: props.title,
            data: dataY1,
            type: "line",
            itemStyle: {
              color: "#0093FF",
            },
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(48, 136, 255, 0.35)" },
                { offset: 1, color: "rgba(48, 136, 255, 0)" },
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
          //   name: "",
          //   type: "lines",
          //   yAxisIndex: 0,
          //   coordinateSystem: "cartesian2d",
          //   polyline: true,
          //   // smooth: true,
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
          //     curveness: 1
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
    };

    onMounted(() => {
      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return { showMore, change, close };
  },
};
</script>

<style scoped lang="scss">
._left1-bottom-item {
  position: relative;
  width: 100%;
  height: vh(40);
  display: flex;
  flex-direction: row;
  align-items: center;
  ._title {
    // width: vw(60);
    font-size: vw(16);
    color: #cceaff;
    cursor: pointer;
  }

  ._more {
    width: vw(19);
    height: vh(19);
    cursor: pointer;
  }

  ._line {
    position: relative;
    flex: 1;
    height: vh(40);
    margin-left: vw(12);
    margin-right: vw(12);

    div:nth-of-type(1) {
      position: absolute;
      top: vw(15);
      width: 100%;
      height: vh(10);
      background-color: rgba($color: #fff, $alpha: 0.1);
    }

    div:nth-of-type(2) {
      position: absolute;
      z-index: 2;
      top: vh(18);
      left: 0;
      height: vh(4);
    }

    img {
      position: absolute;
      z-index: 2;
      top: vh(7);
      width: vw(26);
      height: vh(26);
    }

    .bg1 {
      background-color: #65e3ac;
    }
    .bg2 {
      background-color: #26daf8;
    }
    .bg3 {
      background-color: #e0c260;
    }
  }
  ._percent {
    width: vw(60);
    font-size: vw(22);
    text-align: right;
    font-weight: bold;
    color: #27e0fd;
    span {
      margin-left: vw(4);
      font-size: vw(14);
      color: #90b6d2;
    }
  }
  ._percent-s {
    width: vw(60);
    font-size: vw(16);
    text-align: right;
    font-weight: bold;
    color: #27e0fd;
    white-space: nowrap;
  }

  .chart-more {
    position: absolute;
    z-index: 99;
    right: vw(-436);
    bottom: vh(-90);
    width: vw(426);
    height: vh(224);
    background: url("~@/assets/images/garbage/left1-bottom-chart-bg.png")
      no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .chart-title {
      width: 100%;
      margin-top: vh(12);
      font-size: vw(14);
      text-align: center;
      color: #fff;
    }
    .charts {
      width: vw(400);
      height: vh(200);
      margin-left: vw(20);
    }
  }
}
</style>
