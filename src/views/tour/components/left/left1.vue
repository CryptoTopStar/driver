<template>
  <div class="_left1">
    <title-bar title="游客画像" />

    <div class="_total">
      <img
        class="_icon"
        src="https://img.hzanchu.com/acimg/d4b1486a5e262646413c9eed2a1c3f71.png"
      />
      <div class="_main">
        <div class="_title">
          <span>男性</span>
          <span>{{ portrait.male_rate }}%</span>
        </div>
        <div class="_precent">
          <img
            src="https://img.hzanchu.com/acimg/eeaa111fa80daf7886571cf5afe87386.png"
          />
          <div class="_precent-bg"></div>
          <div
            class="_precent-current"
            :style="
              ' background: linear-gradient( 90deg, rgba(52, 136, 251, 0) 0%, #3488fb 100% );--current: ' +
              portrait.male_rate
            "
          ></div>
        </div>
      </div>
      <img
        class="_icon"
        src="https://img.hzanchu.com/acimg/ed3a0e9b384e0f0cbc0f860760f3aeb5.png"
      />
      <div class="_main">
        <div class="_title">
          <span>女性</span>
          <span>{{ portrait.female_rate }}%</span>
        </div>
        <div class="_precent">
          <img
            src="https://img.hzanchu.com/acimg/ce0d43d2811603bc8412488bad40b4dc.png"
          />
          <div class="_precent-bg"></div>
          <div
            class="_precent-current"
            :style="
              ' background: linear-gradient( 90deg, rgba(247, 93, 134, 0) 0%, #F75D86 100% );--current: ' +
              portrait.female_rate
            "
          ></div>
        </div>
      </div>
    </div>

    <div class="_chart">
      <div class="_chart-change">
        <div
          :class="selectType == 0 ? '_select' : '_unselect'"
          @click="changeType(0)"
        >
          年龄分布
        </div>
        <div
          :class="selectType == 1 ? '_select _ml' : '_unselect _ml'"
          @click="changeType(1)"
        >
          来源地分布
        </div>
      </div>
      <div id="left1-chart" class="_chart-chart"></div>

      <div v-if="selectType == 0" class="age-legend">
        <div
          v-for="(item, index) in ageList"
          :key="index"
          class="age-legend-item"
        >
          <div class="age-legend-left">
            <div :style="'background-color: ' + colors[index]"></div>
            {{ item.age }}岁
          </div>

          <div class="age-legend-right" :style="'color: ' + colors[index]">
            {{ item.rate }}%
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
import { tourismModuleData } from "@/api/tour/api";

export default {
  components: { TitleBar },
  setup() {
    const colors = ["#FC6759", "#FEC539", "#24D9D6", "#3AA0FC"];
    let chartInstance;
    const selectType = ref(0); // 0表示选择年龄分布、1表示来源分析
    const changeType = (e) => {
      if (selectType.value != e) {
        pos.value = 0; // 重置当前滚动的位置
        selectType.value = e;
        initChart(e == 0 ? ageList.value : originRateList.value);
      }
    };

    const timers = ref(null);
    const pos = ref(0);
    const portrait = ref({}); // 游客画像
    const ageList = ref([]); // 年龄列表
    const originRateList = ref([]); //来源比例列表

    // 重新初始化当前chart
    const reload = () => {
      tourismModuleData().then((res) => {
        if (res.code == 0) {
          portrait.value = res.data.portrait;
          ageList.value = res.data.portrait.age_rate;
          originRateList.value = res.data.portrait.origin_rate_list;
          initChart(res.data.portrait.age_rate);
        }
      });
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      const data1 = [];
      const dataX = [];
      for (let index in list) {
        if (list[index].age) {
          data1.push({
            name: list[index].age + "岁",
            value: list[index].rate,
            icon: "roundRect",
            itemStyle: {
              color: colors[index],
            },
          }); //
          dataX.push(list[index].age + "岁");
        } else {
          data1.push({
            name: list[index].area,
            value: list[index].rate,
            icon: "roundRect",
          }); //
          dataX.push(list[index].area);
        }
      }
      let chart = echarts.init(document.getElementById("left1-chart"));

      const option = {
        legend: {
          show: selectType.value == 0 ? false : true,
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
              "<div style='width: 100%;margin-top: vh(6);font-size: 12px;color: #6CD0FF'>游客占比：" +
              "<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              params.value +
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
            emphasis: {
              label: {
                color: "#fff",
                show: true,
                // fontSize: "14",
                formatter: "{b}\n\n{value|{c}}%",
                rich: {
                  value: {
                    color: "#fff",
                    fontSize: "18",
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
            dataIndex:
              selectType.value == 0
                ? ageList.value.length - 1
                : originRateList.value.length - 1,
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
        if (selectType.value == 0 && pos.value > ageList.value.length - 1) {
          pos.value = 0;
        } else if (
          selectType.value == 1 &&
          pos.value > originRateList.value.length - 1
        ) {
          pos.value = 0;
        }
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
    return { selectType, changeType, portrait, colors, ageList };
  },
};
</script>

<style scoped lang="scss">
._left1 {
  width: 100%;
  ._total {
    width: 100%;
    margin-top: vh(25);
    display: flex;
    flex-direction: row;
    align-items: center;
    ._icon {
      width: vw(22);
      height: vh(36);
      margin-left: vw(36);
    }
    ._title {
      width: vw(130);
      margin-left: vw(8);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      div:nth-of-type(1) {
        font-size: vw(14);
      }
      div:nth-of-type(2) {
        font-size: vw(16);
      }
    }

    ._precent {
      position: relative;
      width: vw(130);
      height: vh(16);
      margin-left: vw(8);
      margin-top: vh(8);
      img {
        width: vw(130);
        height: vh(16);
      }
      ._precent-bg {
        position: absolute;
        z-index: 1;
        top: vh(3);
        left: vw(3);
        width: vw(124);
        height: vh(10);
      }
      ._precent-current {
        position: absolute;
        z-index: 2;
        top: vh(3);
        left: vw(3);
        width: calc(vw(124) * var(--current) / 100);
        height: vh(10);
      }
    }
  }

  ._chart {
    width: 100%;
    margin-top: vh(25);
    position: relative;
    ._chart-change {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      ._select {
        width: vw(114);
        height: vh(26);
        background: url(https://img.hzanchu.com/acimg/30ccc78561b42ace1e4e2e7daad6be35.png)
          no-repeat;
        background-size: 100%;
        background-size: cover;
        line-height: vh(26);
        text-align: center;
        font-size: vw(14);
        color: #ffffff;
        cursor: pointer;
      }

      ._unselect {
        width: vw(114);
        height: vh(26);
        background: url(https://img.hzanchu.com/acimg/6e9de8db1f8c93463d6ee6896abd5959.png)
          no-repeat;
        background-size: 100%;
        background-size: cover;
        line-height: vh(26);
        text-align: center;
        font-size: vw(14);
        color: rgba($color: #fff, $alpha: 0.7);
        cursor: pointer;
      }

      ._ml {
        margin-left: vw(16);
      }
    }

    ._chart-chart {
      width: 100%;
      height: vh(180);
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
          font-size: vw(14);
          color: #a1ceef;
          div {
            width: vw(12);
            height: vh(12);
            margin-right: vw(8);
          }
        }

        .age-legend-right {
          font-size: vw(14);

        }
      }
    }
  }
}
</style>
