<template>
  <!-- 折线图组件 -->
  <ChartComponent
    :chartId="chartId"
    :option="lineOption"
    v-on:getInstance="getInstance"
  />
</template>

<script>
import {
  defineComponent,
  shallowRef,
  getCurrentInstance,
  watch,
  onMounted,
} from "vue";
import ChartComponent from "@/components/AcChart/index";

export default defineComponent({
  name: "LineChart",
  props: {
    chartData: Array,
    xData: Array,
    yAxisTitle: String,
    chartId: String,
    toolTipTail: {
      type: String,
      default: "",
    },
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance();

    let myChartInstance = shallowRef({});

    const lineOption = shallowRef({
      tooltip: {
        show: true,
        trigger: "axis",
        padding: [
          fitChartSize(5),
          fitChartSize(10),
          fitChartSize(5),
          fitChartSize(10),
        ],
        formatter: "{b}: {c}" + props.toolTipTail,
        textStyle:{
          color:'rgba(255, 255, 255, .8)',
        },
        borderWidth:'0',
        borderColor:'rgba(7,38,108, 1)',
        backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
      },
      grid: {
        left: fitChartSize(15),
        right: fitChartSize(10),
        top: fitChartSize(20),
        bottom: fitChartSize(0),
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: ["10%", "10%"],
        data: props.xData,
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
          margin: 6,
          fontSize: fitChartSize(12),
          color: "#ffffff",
        },
      },
      yAxis: {
        type: "value",
        name: props.yAxisTitle,
        nameGap: fitChartSize(-10),
        nameTextStyle: {
          color: "#fff",
          fontSize: fitChartSize(14),
          align: "right",
          padding: [0, fitChartSize(10), fitChartSize(0), fitChartSize(0)],
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
          show: true,
          showMaxLine: false,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, .14)",
          },
        },
      },
      series: [
        {
          data: props.chartData,
          coordinateSystem: "cartesian2d",
          type: "line",
          symbolSize: 8,//拐点大小
          label: {
            show: true,
            color: "rgba(235, 239, 60, 1)",
            fontFamily: "YouSheBiaoTiHei",
            fontSize: fitChartSize(14),
          },
          lineStyle: {
            color: "rgba(255, 255, 255, 0.26)",
          },
          itemStyle: {
            color: "rgba(51, 52, 0, 1)",
            borderWidth: fitChartSize(10),
            borderType: "solid",
          },
          emphasis: {
            focus: "series",
          },
          markArea: {
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.16)'
            },
            data: [
              [
                {
                  xAxis: '2021'
                },
                {
                  xAxis: '2020'
                }
              ],
              [
                {
                  xAxis: '2019'
                },
                {
                  xAxis: '2018'
                }
              ],
            ]
          }
        },
        {
          name: "滑行的光点",
          type: "lines",
          coordinateSystem: "cartesian2d",
          polyline: true,
          effect: {
            show: true,
            trailLength: 0.3,
            symbolSize: fitChartSize(8),
            symbol: "circle",
            color: "#fff",
          },
          zlevel: 100,
          lineStyle: {
            color: "rgba(14, 156, 255, 0)",
            width: 0,
            opacity: 0,
          },
          areaStyle: {
            color: "rgba(14, 156, 255, 0)",
          },
          label: {
            show: false,
          },
          data: [],
        },
      ],
    });

    const getInstance = (obj) => {
      myChartInstance = obj;
    };

    watch(props, (newProps) => {
      // 转换光点数据
      let coords = [];
      newProps.chartData.forEach((item, index) => {
        coords.push([`${newProps.xData[index]}`, item]);
      });
      myChartInstance.setOption({
        xAxis: {
          data: newProps.xData,
        },
        series: [
          {
            type: "line",
            data: newProps.chartData,
          },
          {
            type: "lines",
            data: [{ coords }],
          },
        ],
      });
    });

    onMounted(() => {});

    return {
      lineOption,
      getInstance,
    };
  },
});
</script>
<style scoped lang="scss"></style>
