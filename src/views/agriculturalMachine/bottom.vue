<template>
  <div class="bottom">
    <title-bar
      title="需调整资源数量"
      customStyle="margin-left: 0px;margin-top: 0px"
      :showMore="true"
      :moreType="1"
      tipTitle="算法说明"
      :tips="tips"
    />
    <div class="tab">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="item.select ? '_select' : '_unselect'"
        @click="changeTab(index)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="_chart">
      <div id="bottom-chart" class="_chart-chart"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getResourceOutputQuantity } from "@/api/hospital/api";

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { TitleBar },
  setup(props) {
    let chartInstance;
    const start = ref(0); //
    const end = ref(8); // 结束，目前默认为9条，这里也暂时不做请求之后的初始化，默认为8，表示0、1、2、3、4...
    const roomTimers = ref(null);

    const tips = [
      {
        title: "算法公式：",
        sub: "计算某乡镇使用某种农机具数量，其公式为 (a+b+c+d)/(A+B+C+D)*n",
      },
      {
        title: "算法简介：",
        sub: "其中a为某乡镇早稻播种面积，b为某乡镇单季稻播种面积，c为某乡镇连作晚稻播种面积，d为某乡镇油菜播种面积；A为江山市早稻播种面积，B为江山市单季稻播种面积，C为江山市连作晚稻播种面积，D为江山市油菜播种面积；n为江山市某种农机具总数或机手总数，依据农作物对应使用的农机情况，增删公式中元素。",
      },
    ];

    const curPos = ref(0); // 当前选中位置
    const tabList = ref([
      { text: "机手", select: true, id: 1 },
      { text: "拖拉机", select: false, id: 2 },
      { text: "联合收割机", select: false, id: 3 },
      { text: "烘干机", select: false, id: 4 },
      { text: "插秧机", select: false, id: 5 },
      { text: "无人机", select: false, id: 6 },
    ]);
    // 点击切换当前tab
    const changeTab = (pos) => {
      // 如果位置相同，则不刷新
      if (curPos.value == pos) {
        return;
      }
      for (let index in tabList.value) {
        if (index == pos) {
          curPos.value = pos;
          tabList.value[index].select = true;
        } else {
          tabList.value[index].select = false;
        }
      }
      chartInstance.dispose();
      start.value = 0;
      end.value = 8;
      initChart(props.data);
    };

    // 初始化当前chart表单
    const initChart = (list) => {
      let dataX = [],
        dataY1 = [];
      let unit = "",
        title = "";

      for (let item of list) {
        dataX.push(item.village);
        switch (curPos.value) {
          case 0:
            dataY1.push({
              value: item.need_operator,
              itemStyle: {
                color:
                  item.need_operator > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_operator > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "机手";
            unit = "人";
            break;
          case 1:
            dataY1.push({
              value: item.need_tractor,
              itemStyle: {
                color:
                  item.need_tractor > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_tractor > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "拖拉机";
            unit = "辆";
            break;
          case 2:
            dataY1.push({
              value: item.need_precipitation,
              itemStyle: {
                color:
                  item.need_precipitation > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_precipitation > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "联合收割机";
            unit = "辆";
            break;
          case 3:
            dataY1.push({
              value: item.need_dryer,
              itemStyle: {
                color:
                  item.need_dryer > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_dryer > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "烘干机";
            unit = "台";
            break;
          case 4:
            dataY1.push({
              value: item.need_planter,
              itemStyle: {
                color:
                  item.need_planter > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_planter > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "插秧机";
            unit = "辆";
            break;
          case 5:
            dataY1.push({
              value: item.need_drone,
              itemStyle: {
                color:
                  item.need_drone > 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#35FDDC" },
                        { offset: 1, color: "rgba(53, 253, 220, 0.3)" },
                      ]),
                borderRadius:
                  item.need_drone > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], //（顺时针左上，右上，右下，左下）
              },
            });
            title = "无人机";
            unit = "架";
            break;
          default:
            break;
        }
      }
      let chart = echarts.init(document.getElementById("bottom-chart"));

      let option = {
        color: ["#00BAFE"],
        legend: {
          show: false,
          top: "5%",
          right: "5%",
          // icon: "rect",
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
              (params[0].value >= 0 ? "需补充" : "") +
              params[0].seriesName +
              (params[0].value < 0 ? "过剩" : "") +
              "：<span style='margin-left: 8px;font-size: 14px;color: #FFFFFF;'> " +
              Math.abs(params[0].value) +
              unit +
              "</span>" +
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
            name: unit,
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
        dataZoom: {
          type: "inside",
          startValue: start.value,
          endValue: end.value,
           zoomOnMouseWheel: false
        },
        series: [
          {
            name: title,
            data: dataY1,
            barWidth: "20px",
            type: "bar",
          },
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

        if (start.value > props.data.length - 8) {
          start.value = 0;
          end.value = 8;
        }
        setTimeout(() => {
          chartInstance.setOption({
            dataZoom: {
              type: "inside",
              startValue: start.value,
              endValue: end.value,
               zoomOnMouseWheel: false
            },
          });
        }, 0);
      }, 3000);
    };

    const resizeHandler = () => {
      chartInstance?.resize();
    };
    onMounted(() => {
      initChart(props.data);
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      chartInstance.dispose();
      window.removeEventListener("resize", resizeHandler);
      clearInterval(roomTimers.value);
    });
    return { tabList, changeTab, tips };
  },
};
</script>

<style scoped lang="scss">
.bottom {
  position: absolute;
  z-index: 2;
  top: vh(722);
  left: vw(507);
  width: vw(908);
  height: vh(286);

  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);

  .tab {
    width: vw(360);
    height: vh(27);
    margin-left: vw(114);
    margin-top: vh(15);
    padding: 0 vw(16) 0 0;
    box-sizing: border-box;
    background: url("https://img.hzanchu.com/acimg/4ff96bc86cae76be7e2a6192091a3f99.png")
      no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    ._select {
      margin-left: vw(16);
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
    }
    ._unselect {
      margin-left: vw(16);
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      opacity: 0.5;
      cursor: pointer;
    }
  }

  ._chart {
    width: 100%;
    ._chart-chart {
      width: 90%;
      height: vh(200);
      margin-left: 5%;
    }
  }
}
</style>
 