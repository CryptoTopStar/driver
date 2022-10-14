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
import {useRoute} from "vue-router";
import * as echarts from "echarts";
export default defineComponent({
  name: "BarLineChart",
  props: {
    xAxisData: Array,
    barYAxisData: Array, // 柱状图
    barYAxisName: String,
    lineYAxisData: Array, // 折线图
    lineYAxisName: String,
    chartId: String,
    name:{
      type: String,
      default:[]
    }
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance();
    const Route = useRoute();
    const state = reactive({
      option: shallowRef({}),
      legendList: ref([]),
      myChartInstance: shallowRef({}),
      isLoaded: ref(false), // 图表是否已经加载完毕
      timer: ref(null), // 图表轮播timer
      showIndex: ref(-1), // 当前显示的图表项索引
      isFinished: ref(false), // 图表第一次加载完成
    });


    onMounted(() => {
      state.option = {
        tooltip: {
          show: true,
          trigger: "axis",
          formatter: "{a1}: {c1}吨",
          textStyle:{
            color:'rgba(255, 255, 255, .8)',
          },
          borderWidth:'0',
          borderColor:'rgba(7,38,108, 1)',
          backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        },
        legend: {
          show: true,
          top: fitChartSize(-5),
          itemGap: fitChartSize(40),
          itemWidth: fitChartSize(16), // 宽
          itemHeight: fitChartSize(16), // 高
          selectedMode: false,
          data: [
            {
              name: props?.name?.length>0?props.name[0]:"",
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
              name:  props?.name?.length>0?props.name[1]:"",
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
          top: fitChartSize(20),
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
            min: Route.path.indexOf('kiwi') > -1 ?1900:0,
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
        ],
        series: [
          {
            name: "",
            type: "bar",
            yAxisIndex: 0,
            data: props.barYAxisData, // 柱状图
            barWidth: fitChartSize(40),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 255, 255, .16)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 255, 255, .16)",
                },
              ]),
            },
          },
          {
            name: "加工量（吨）",
            type: "line",
            yAxisIndex: 0,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.26)",
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
            data: props.lineYAxisData, // 折线图
          },
        ],
      };

    });
    // 取消计时器
    const cancelTimer = () => {
      if (state.timer) {
        window.clearInterval(state.timer)
        state.timer = null
      }
    }
    // 切换图形高亮
    const slideChart = (chartData) => {
      // console.log(state.showIndex)
      // 取消之前高亮的图形
      state.myChartInstance.dispatchAction({
        type: 'downplay',
        // seriesIndex: 0,
        dataIndex: state.showIndex,
      })
      state.showIndex = (state.showIndex + 1) % chartData.length
      // 高亮当前图形
      state.myChartInstance.dispatchAction({
        type: 'highlight',
        // seriesIndex: 0,
        dataIndex: state.showIndex,
      })
    }
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
        const chartData = newVal;
        !state.isFinished && slideChart(chartData)
        state.isFinished = true
        cancelTimer()
        state.timer = setInterval(slideChart, 1000, chartData)
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
