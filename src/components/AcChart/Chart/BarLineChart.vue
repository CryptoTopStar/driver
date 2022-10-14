<template>
  <!-- 柱状折线复合材料图 -->
  <div class="chart-container barline-chart" :id="chartId">
    <ChartComponent
      :chartId="chartId"
      :option="option"
      v-on:getInstance="getInstance"
    ></ChartComponent>
  </div>

  <!-- 图例 -->
  <!-- <div class="legend-list">
    <div class="legend-item" v-for="(item, index) in legendList" :key="index">
      <div class="icon" :style="{ backgroundColor: item.color }"></div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div> -->
</template>

<script>
import {
  defineComponent,
  shallowRef,
  getCurrentInstance,
  watchEffect,
  watch,
  reactive,
  ref,
  toRefs,
  onMounted,
} from "vue";
import ChartComponent from "@/components/AcChart/index";

import * as echarts from "echarts";
export default defineComponent({
  name: "BarLineChart",
  props: {
    xAxisData: Array,
    barYAxisData: Array,
    barYAxisName: String,
    barYAxisDataName: String,
    lineYAxisData: Array,
    lineYAxisName: String,
    lineYAxisDataName: String,
    chartId: String,
    yAxisIndex: {
      type: Number,
      default: 1,
    },
    tooltip: Object,
    name: {
      type: String,
      default: [],
    },
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance();
    const state = reactive({
      option: shallowRef({}),
      legendList: ref([]),
      myChartInstance: shallowRef({}),
      isLoaded: ref(false), // 图表是否已经加载完毕
    });

    onMounted(() => {
      state.option = {
        tooltip: props.tooltip
          ? props.tooltip
          : {
              show: true,
              trigger: "axis",
            },
        legend: {
          show: true,
          top: fitChartSize(-5),
          itemGap: fitChartSize(40),
          itemWidth: fitChartSize(16), // 宽
          itemHeight: fitChartSize(16), // 高
          selectedMode: true,
          data: [
            {
              name: props?.name?.length > 0 ? props.name[0] : "",
              icon: "square",
              itemStyle: {
                color: "#00BAFE",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
            {
              name: props?.name?.length > 0 ? props.name[1] : "",
              icon: "square",
              itemStyle: {
                color: "#35FDDC",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
          ],
        },
        grid: {
          left: fitChartSize(10),
          right: fitChartSize(10),
          top: fitChartSize(50),
          bottom: fitChartSize(0),
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: props.xAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(204, 204, 204, .5)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: 0, //倾斜度 -90 至 90 默认为0
            margin: fitChartSize(6),
            fontSize: fitChartSize(10),
            color: "#fff",
          },
        },
        yAxis: [
          {
            type: "value",
            name: props.barYAxisName,
            min: 0,
            nameGap: 0,
            nameTextStyle: {
              color: "#fff",
              fontSize: fitChartSize(12),
              align: "right",
              padding: [0, fitChartSize(14), fitChartSize(0), fitChartSize(0)],
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: fitChartSize(12),
              showMaxLabel: false,
              textStyle: {
                color: "#ffffff",
              },
            },
            splitLine: {
              show: true,
              showMaxLine: false,
              lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,.14)",
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["transparent", "transparent"],
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            show: props.yAxisIndex == 1 ? true : false,
            type: "value",
            name: props.lineYAxisName,
            min: 0,
            nameGap: 0,
            nameTextStyle: {
              color: "#fff",
              fontSize: fitChartSize(12),
              align: "left",
              padding: [0, fitChartSize(0), fitChartSize(0), fitChartSize(14)],
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: fitChartSize(12),
              showMaxLabel: false,
              color: "#ffffff",
            },
            splitLine: {
              show: false,
              showMaxLine: false,
              lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,.14)",
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["transparent", "transparent"],
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: props.barYAxisDataName ? props.barYAxisDataName : "种植面积",
            type: "bar",
            data: props.barYAxisData,
            barWidth: fitChartSize(20),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "#00BAFE",
                },
                {
                  offset: 1,
                  color: "rgba(51, 143, 249, .3)",
                },
              ]),
              borderRadius: [fitChartSize(10), fitChartSize(10), 0, 0],
            },
          },
          {
            name: props.lineYAxisDataName ? props.lineYAxisDataName : "产量",
            type: "line",
            yAxisIndex: props.yAxisIndex,
            lineStyle: {
              color: "#35FDDC",
            },
            itemStyle: {
              color: "#35FDDC",
            },
            label: {
              show: false,
              color: "#fff",
              fontFamily: "YouSheBiaoTiHei",
              fontSize: fitChartSize(14),
            },
            data: props.lineYAxisData,
          },
        ],
      };
    });

    const getInstance = (obj) => {
      state.myChartInstance = obj;
    };

    watch(
      () => props.barYAxisData,
      (newVal, old) => {
        state.myChartInstance.setOption({
          series: [{ data: newVal }, {}],
        });
      }
    );

    watch(
      () => props.lineYAxisData,
      (newVal, old) => {
        state.myChartInstance.setOption({
          series: [{}, { data: newVal }],
        });
      }
    );

    watch(
      () => props.xAxisData,
      (newVal, old) => {
        state.myChartInstance.setOption({
          xAxis: { data: newVal },
        });
      }
    );

    return {
      ...toRefs(state),
      getInstance,
    };
  },
});
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.barline-chart {
  width: vw(444);
  height: vh(264);
}
.legend-list {
  @include ac-flex;
  @include flex-row-center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .legend-item {
    @include ac-flex;
    margin-right: vw(60);

    &:last-child {
      margin-right: 0;
    }
    .icon {
      width: vw(16);
      height: vh(16);
      margin-right: vw(14);
      &:last-child {
        margin-right: 0;
      }
    }

    .name {
      color: #fff;
      font-size: vh(16);
    }
  }
}
</style>
