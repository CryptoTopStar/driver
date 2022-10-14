<template>
  <div class="_left2">
    <title-bar
      title="病虫害诱因分析"
      customStyle="margin-top: 0px"
      :showMore="true"
      :moreType="1"
      tipTitle="算法说明"
      :tips="tips"
    />
    <div class="_chart">
      <div id="left2-chart" class="_chart-chart"></div>
      <div class="age-legend">
        <div v-for="(item, index) in list" :key="index" class="age-legend-item">
          <div class="age-legend-left">
            <div :style="'background-color: ' + colors[index]"></div>
            {{ item.text }}
          </div>

          <div class="age-legend-right" :style="'color: ' + colors[index]">
            {{ item.value }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

export default {
  components: { TitleBar },
  setup() {
    const colors = ["#71D964", "#DED82E", "#17C4EB", "#ED9D1A"];
    let chartInstance;
    const timers = ref(null);
    const pos = ref(0);
    const list = ref([
      { text: "低温", value: 45 },
      { text: "高温", value: 24 },
      { text: "湿度", value: 20 },
      { text: "降水量", value: 11 },
    ]);

    const tips = [
      {
        title: "算法公式：",
        sub: "y=b0+b1X1+b2X2+…+bnXn,其中b0为常数项,b1,b2,b3,…bn称为y对应于x1,x2,x3,…xn的偏回归系数。",
      },
      {
        title: "算法简介：",
        sub: "采用多元线性回归方法结合历史数据计算出公式中偏回归系数，当知道未来Xn的值时，即可推断出未来y的值。对历年每天最高温度、最低温度、湿度和降水量对病虫害种类进行回归，计算得到偏回归系数，进而得到每项因子对于病虫害发生重要性比重，指导科学种茶。",
      },
    ];

    // 初始化当前chart表单
    const initChart = (list) => {
      const data1 = [];
      const dataX = [];
      for (let index in list) {
        data1.push({
          name: list[index].text,
          value: list[index].value,
          icon: "roundRect",
          itemStyle: {
            color: colors[index],
          },
        }); //
        dataX.push(list[index].text);
      }
      let chart = echarts.init(document.getElementById("left2-chart"));

      const option = {
        legend: {
          show: false,
          type: "scroll",
          orient: "vertical",
          left: "56%",
          top: "20%",
          padding: [5, 5, 5, 5],
          data: data1,
          textStyle: {
            color: "#fff",
            // fontSize: 16,
          },
          formatter: " {name} ",
          pageTextStyle: {
            color: "#fff",
          },
          pageIconColor: "#fff",
        },
        tooltip: {
          trigger: "item",
          borderColor: "#278BFF",
          borderWidth: 1,
          backgroundColor: "#07266C",
          formatter: function (params) {
            return (
              "<div style='width: 100%; font-size: 14px;font-weight: bold;color: #fff;'>" +
              params.name +
              "</div>" +
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>占比：" +
              "<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params.value +
              "%</span>" +
              "</div>"
            );
          },
        },
        series: [
          {
            name: "",
            data: data1,
            radius: ["60%", "70%"],
            type: "pie",
            right: "40%",
            itemStyle: {
              // borderRadius: 2,
              // borderColor: "rgba(255,255,255,0.1)",
              // borderWidth: 12,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: true,
            },
            silent: true,
            emphasis: {
              label: {
                color: "#fff",
                show: true,
                fontSize: "14",
                formatter: "{b}\n\n{value|{c}}%",
                rich: {
                  value: {
                    color: "#26E3FF",
                    fontSize: "28",
                    fontWeight: "bold",
                    padding: [0, 8, 0, 0],
                  },
                },
              },
            },
          },
        ],
      };
      chart.setOption(option);
      chartInstance = chart;

      initTimer();
    };

    // 自动滚动
    const initTimer = () => {
      if (timers.value) {
        clearInterval(timers.value);
      }
      timers.value = setInterval(() => {
        if (pos.value > 0) {
          chartInstance.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: pos.value - 1,
          });
        } else {
          chartInstance.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: list.value.length - 1,
          });
        }
        chartInstance.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: pos.value,
        });
        // tooltip 跟随显示
        chartInstance.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: pos.value,
        });
        pos.value++;
        // console.log(pos.value);

        if (pos.value > list.value.length - 1) {
          pos.value = 0;
        }
      }, 2000);
    };
    const resizeHandler = () => {
      chartInstance?.resize();
    };
    onMounted(() => {
      initChart(list.value);
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      chartInstance.dispose();
      window.removeEventListener("resize", resizeHandler);
    });
    return { colors, tips, list };
  },
};
</script>

<style scoped lang="scss">
._left2 {
  width: 100%;
  height: vh(286);
  margin-top: vh(20);
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
  box-sizing: border-box;

  ._chart {
    width: 100%;
    position: relative;
    ._chart-chart {
      width: 100%;
      height: vh(220);
    }

    .age-legend {
      position: absolute;
      right: vw(60);
      top: vh(66);
      width: vw(160);
      height: vh(110);
      // background-color: rgba($color: #fff, $alpha: 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .age-legend-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .age-legend-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: vw(16);
          color: #a1ceef;
          div {
            width: vw(12);
            height: vh(12);
            margin-right: vw(8);
          }
        }

        .age-legend-right {
          font-size: vw(14);
          font-weight: 600;
        }
      }
    }
  }
}
</style>
