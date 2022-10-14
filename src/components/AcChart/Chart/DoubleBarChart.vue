<template>
  <!-- 柱状折线复合材料图 -->
  <div class="chart-container doublebar-chart" :id="chartId">
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
  watch,
  reactive,
  ref,
  toRefs,
  onMounted,
} from "vue";
import ChartComponent from "@/components/AcChart/index";
import * as echarts from "echarts";
export default defineComponent({
  name: "DoubleBarChart",
  props: {
    xAxisData: Array,
    barDataLeft: Array,
    barNameLeft: String,
    barDataRight: Array,
    barNameRight: String,
    chartId: String,
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance();
    let myChartInstance = shallowRef({});

    const state = reactive({
      option: shallowRef({}),
      legendList: ref([]),
    });

    onMounted(() => {
      state.option = {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (params, index) {
            return `${props.xAxisData[params.dataIndex]}<br />
            ${params.seriesName}:${params.value}`;
          },
          axisPointer: {
            type: "shadow",
          },
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
          iitemWidth: fitChartSize(16), // 宽
          itemHeight: fitChartSize(16), // 高
          selectedMode: false,
          data: [
            {
              name: "企业家数(家)",
              icon: "square",
              itemStyle: {
                color: "#35FDDC",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
            {
              name: "产值(万元)",
              icon: "square",
              itemStyle: {
                color: "#2587F8",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
          ],
        },
        grid: [
          {
            show: false,
            top: fitChartSize(40),
            bottom: fitChartSize(10),
            left: fitChartSize(20),
            width: fitChartSize(10),
          },
          {
            show: false,
            top: fitChartSize(40),
            bottom: fitChartSize(10),
            left: fitChartSize(240),
            containLabel: true,
            width: fitChartSize(160),
          },
          {
            show: false,
            top: fitChartSize(40),
            bottom: fitChartSize(10),
            left: fitChartSize(70),
            containLabel: true,
            width: fitChartSize(160),
          },
        ],
        xAxis: [
          {
            type: "category",
            show: false,
          },
          {
            gridIndex: 1,
            type: "value",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            type: "value",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#fff",
              fontSize: fitChartSize(14),
            },
            data: props.xAxisData.map(function (value) {
              return {
                value: value,
                textStyle: {
                  align: "left",
                },
              };
            }),
          },
          {
            gridIndex: 1,
            type: "category",
            position: "left",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: props.xAxisData,
          },
          {
            gridIndex: 2,
            type: "category",
            position: "left",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: props.xAxisData,
          },
        ],
        series: [
          {
            name: props.barNameLeft,
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            barWidth: fitChartSize(6),
            showBackground: true,
            backgroundStyle: {
              color: "rgba(51, 143, 249, .28)",
              borderRadius: 10,
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                {
                  offset: 0,
                  color: "#35FDDC",
                },
                {
                  offset: 0.8,
                  color: "#4ADFFA",
                },
                {
                  offset: 1,
                  color: "#00BAFE",
                },
              ]),
              borderRadius: 10,
            },
            label: {
              show: false,
            },

            data: props.barDataLeft,
          },
          {
            name: props.barNameRight,
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            barWidth: fitChartSize(6),
            showBackground: true,
            backgroundStyle: {
              color: "rgba(51, 143, 249, .28)",
              borderRadius: 10,
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                {
                  offset: 0,
                  color: "#35FDDC",
                },
                {
                  offset: 0.2,
                  color: "#4ADFFA",
                },
                {
                  offset: 1,
                  color: "#2689FA",
                },
              ]),
              borderRadius: 10,
            },
            label: {
              show: false,
            },
            data: props.barDataRight,
          },
        ],
      };
    });

    const getInstance = (obj) => {
      myChartInstance = obj;
    };

    watch(
      () => props.xAxisData,
      (newVal, old) => {
        myChartInstance.setOption({
          yAxis: [
            {
              data: newVal.map(function (value) {
                return {
                  value: value,
                  textStyle: {
                    align: "left",
                  },
                };
              }),
            },
            {},
            {},
          ],
        });
      }
    );

    watch(
      () => props.barDataLeft,
      (newVal, old) => {
        myChartInstance.setOption({
          series: [{ data: newVal }, {}],
        });
      }
    );

    watch(
      () => props.barDataRight,
      (newVal, old) => {
        myChartInstance.setOption({
          series: [{}, { data: newVal }],
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
.doublebar-chart {
  width: vw(404);
  height: vh(476);
  margin: vh(30) auto vh(16);
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
