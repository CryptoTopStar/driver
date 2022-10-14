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
import * as echarts from "echarts";
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

    let myChartInstance = shallowRef(null);

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
        textStyle: {
          color: "rgba(255, 255, 255, .8)",
        },
        borderWidth: "0",
        borderColor:'rgba(7,38,108, 1)',
        backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        formatter: "{b}: {c}" + props.toolTipTail,
      },
      grid: {
        left: fitChartSize(15),
        right: fitChartSize(25),
        top: fitChartSize(25),
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
            color: "rgba(204, 204, 204, .3)",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 6,
          fontSize: fitChartSize(12),
          color: "rgba(144, 182, 210, 1)",
        },
      },
      yAxis: {
        type: "value",
        name: props.yAxisTitle,
        nameGap: fitChartSize(-10),
        nameTextStyle: {
          color: "rgba(144, 182, 210, 1)",
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
          color: "rgba(144, 182, 210, 1)",
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
          label: {
            show: false,
            color: "rgba(144, 182, 210, 1)",
            fontFamily: "YouSheBiaoTiHei",
            fontSize: fitChartSize(14),
          },
          lineStyle: {
            color: "#E5A037",
          },
          itemStyle: {
            color: "#E5A037",
            borderWidth: fitChartSize(10),
            borderType: "solid",
            // borderColor: "#0E9CFF",
          },
          emphasis: {
            focus: "series",
          },
          areaStyle: {
            normal: { ////颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(229, 160, 55, .3)' //229, 160, 55, 0.3
              }, {
                offset: 1,
                color: 'rgba(229, 160, 55, 0)'
              }])
            },
          },
          // animation: false,
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
      myChartInstance.value = obj;
    };

    watch(()=>[props.chartData,props.xData], (newProps) => {
      // 转换光点数据
      let coords = [];
      newProps[0].forEach((item, index) => {
        coords.push([`${newProps[1][index]}`, item]);
      });
      console.log('---',newProps)
      myChartInstance.value?.setOption({
        xAxis: {
          data: newProps[1].length && newProps[1].length > 0?newProps[1]:['暂无数据'],
        },
        series: [
          {
            type: "line",
            data: newProps[0].length && newProps[0].length > 0?newProps[0]:['0'],
          },
          {
            type: "lines",
            data: coords.length > 0? [{ coords }]:[],
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
