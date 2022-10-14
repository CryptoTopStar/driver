<template>
  <div class="content-layout">
    <div class="main">
      <section>
        <SectionHeader title="室内温度" />
        <TempChart :dataSrc="chartData" />
      </section>
      <section>
        <SectionHeader title="培养料水分含量" />
        <WaterPercentageChart :dataSrc="chartData" />
      </section>
      <section>
        <SectionHeader title="空气湿度" />
        <HumidityChart :dataSrc="chartData" />
      </section>
      <section>
        <SectionHeader title="培养料酸碱度" />
        <PhLevelChart :dataSrc="chartData" />
      </section>
      <section>
        <SectionHeader title="CO₂浓度" />
        <CO2ConcentrationChart :dataSrc="chartData" />
      </section>
      <section>
        <SectionHeader title="环境监测报警信息" />
        <AlertTable />
      </section>
    </div>
    <div class="right-top">
      <SectionHeader title="病虫害监测">
        <template #after>
          <AlgoDetailsPopover
            desc="采用基于深度学习的图像目标检测技术，首先对病虫害区域进行标注，然后将标注后的数据送入目标检测网络进行特征提取并学习病虫害特征，后续在检测视频图像中，直接识别病虫害区域和类别，及时报警并依据病虫害类别给出防治措施。"
          />
        </template>
      </SectionHeader>
      <PestDetection />
    </div>
    <div class="right-bottom">
      <SectionHeader title="生长情况监测">
        <template #after>
          <AlgoDetailsPopover
            desc="采用基于深度学习的图像目标检测技术，首先对金针菇区域进行标注，然后将标注后的数据送入目标检测网络进行特征提取并学习不同生长期的金针菇特征，后续在检测视频图像中，直接识别金针菇区域和生长期类别，依据金针菇所处生长期给出生长正常与否判断并给出栽培建议。"
          />
        </template>
      </SectionHeader>
      <GrowthMonitoring />
    </div>
  </div>
</template>

<script setup>
import SectionHeader from "@/components/data-exploration/SectionHeader.vue";
import AlgoDetailsPopover from "@/components/data-exploration/AlgoDetailsPopover.vue";
import TempChart from "@/components/data-exploration/mushroom/monitoring/TempChart.vue";
import WaterPercentageChart from "@/components/data-exploration/mushroom/monitoring/WaterPercentageChart.vue";
import HumidityChart from "@/components/data-exploration/mushroom/monitoring/HumidityChart.vue";
import PhLevelChart from "@/components/data-exploration/mushroom/monitoring/PhLevelChart.vue";
import CO2ConcentrationChart from "@/components/data-exploration/mushroom/monitoring/CO2ConcentrationChart.vue";
import AlertTable from "@/components/data-exploration/mushroom/monitoring/AlertTable.vue";
import PestDetection from "@/components/data-exploration/mushroom/monitoring/PestDetection.vue";
import GrowthMonitoring from "@/components/data-exploration/mushroom/monitoring/GrowthMonitoring.vue";
import request from "@/util/http.js";
import { ref } from "vue";

import UnderConstruction from "@/components/UnderConstruction";

const chartData = ref([]);
request.get("/api/fungus/growth-list").then((result) => {
  chartData.value = result.data;
});
</script>

<style scoped lang="scss">
.content-layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  padding: vh(8) vw(24);
  gap: vh(20) vw(20);
  grid-template:
    "left right-1" minmax(0, 1fr)
    "left right-2" minmax(0, 1fr) / (vw(1240) 1fr);
  %_base-pane {
    border: vw(1) solid rgb(36, 60, 132);
    background: rgba(8, 26, 72, 0.5);
    overflow: hidden;
  }
  .main {
    @extend %_base-pane;
    grid-area: left;
    display: grid;
    gap: vh(20) vw(40);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    section {
      display: flex;
      flex-flow: column;
    }
  }
  .right-top {
    @extend %_base-pane;
    grid-area: right-1;
  }
  .right-bottom {
    @extend %_base-pane;
    grid-area: right-2;
  }
}
</style>
