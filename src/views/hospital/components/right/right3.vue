<template>
  <div class="_right3">
    <title-bar title="历年常见病统计" :showMore="true" @show="show" />

    <div class="_chart">
      <div id="right3-chart" class="_chart-chart"></div>

      <div class="pie-decor" ref="pieBubble">
        <img
          :src="
            require('@/assets/images/smart-communities/fire-stats/pie-pt-l.png')
          "
        />
        <img
          :src="
            require('@/assets/images/smart-communities/fire-stats/pie-pt-r.png')
          "
        />
      </div>

      <video
        muted
        autoplay
        loop
        :src="require('@/assets/images/smart-communities/fire-stats/ring.mp4')"
        class="video"
      ></video>

      <div class="legend">
        <div v-for="(item, index) in list" :key="index" class="legend-item">
          <div :style="'background-color: ' + colors[index % 6]"></div>
          <div>{{ item.disease_name }}</div>
          <div :style="'color: ' + colors[index % 6]">{{ item.ratio }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getCountDise } from "@/api/hospital/api";

export default {
  components: { TitleBar },
  setup(props, { emit }) {
    let chartInstance;
    const timers = ref(null);
    const pos = ref(0);
    const list = ref([]);
    const colors = [
      "#FC6759",
      "#3AA0FC",
      "#FEC539",
      "#35F292",
      "#24D9D6",
      "#8277FF",
    ];
    // 重新初始化当前chart
    const reload = () => {
      getCountDise().then((res) => {
        if (res.code == 0) {
          list.value = res.data;
          initChart(res.data);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      const data1 = [];
      const dataX = [];
      let total = list.length > 0 ? 0 : 1;
      for (const index in list) {
        list[index].ratio = parseInt(
          list[index].ratio.substr(0, list[index].ratio.length - 1)
        );
        total += list[index].ratio;
        data1.push({
          name: list[index].disease_name,
          value: list[index].ratio,
          icon: "roundRect",
          itemStyle: {
            color: colors[index % 6],
          },
        }); //
        dataX.push(list[index].disease_name);
      }
      let chart = echarts.init(document.getElementById("right3-chart"));

      const option = {
        legend: {
          show: false,
          bottom: "-5%",
          width: "70%",
          left: "center",
          data: data1,
          textStyle: {
            color: "#fff",
          },
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
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>累积：" +
              "<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params.value +
              "例</span>" +
              "</div>" +
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>占比：" +
              "<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              ((params.value / total) * 100).toFixed(2) +
              "%</span>" +
              "</div>"
            );
          },
        },
        series: [
          {
            name: "业务范围",
            data: data1,
            radius: ["60%", "70%"],
            center: ["50%", "50%"],
            // 饼图位置参数
            type: "pie",
            top: "top",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                color: "#fff",
                show: true,
                fontSize: "14",
                formatter: "{b}\n\n{value|{c}}次",
                rich: {
                  value: {
                    color: "#fff",
                    fontSize: "24",
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

    const show = () => {
      emit("show");
    };
    onMounted(() => {
      reload();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      chartInstance.dispose()
      clearInterval(timers.value);
      window.removeEventListener("resize", resizeHandler);
    });
    return { show, list, colors };
  },
};
</script>

<style scoped lang="scss">
._right3 {
  width: 100%;

  ._chart {
    width: 100%;
    position: relative;

    ._chart-chart {
      width: 100%;
      height: vh(230);
    }

    .pie-decor {
      position: absolute;
      width: 80%;
      left: 10%;
      top: vh(45);
      height: vh(138);
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      z-index: 3;
      animation: hospital_right3_circle 4s linear infinite normal;
      animation-fill-mode: forwards;
    }

    .video {
      position: absolute;
      z-index: 1;
      top: vh(25);
      left: 50%;
      height: vh(200);
      margin-block-start: vh(-10);
      transform: scale(0.8);
      transform: translateX(-50%);
      pointer-events: none;
      mix-blend-mode: screen;
    }

    .legend {
      position: absolute;
      z-index: 1;
      top: vh(210);
      width: 95%;
      height: vh(70);
      margin-left: 5%;
      padding: 0 10%;
      box-sizing: border-box;
      // background-color: rgba($color: #fff, $alpha: 0.2);
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;

      .legend-item {
        width: 45%;
        margin-right: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        div:nth-of-type(1) {
          width: vw(12);
          height: vh(12);
        }
        div:nth-of-type(2) {
          flex: 1;
          margin-left: vw(8);
          margin-right: vw(8);
          font-size: vw(14);
          color: #a1ceef;
        }
        div:nth-of-type(3) {
          font-size: vw(14);
        }
      }
    }
  }
}
</style>

<style lang="scss">
@keyframes hospital_right3_circle {
  0% {
    transform: scaleX(1) scaleY(1);
  }
  50% {
    transform: scaleX(0.8) scaleY(0.8);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
}
</style>
