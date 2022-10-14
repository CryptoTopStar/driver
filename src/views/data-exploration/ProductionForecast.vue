<template>
  <div class="content-layout">
    <section class="left-top">
      <SectionHeader title="历史产量数据" class="label-container"/>
      <ProductionHistory />
    </section>
    <section class="left-bottom">
      <SectionHeader title="产量预测" class="label-container">
        <template #after>
          <AlgoDetailsPopover
            desc="采用多元线性回归方法结合历史数据计算出公式中偏回归系数，当知道未来Xn的值时，即可推断出未来y的值。依据往年投料重量、栽培面积、培养基含水量、培养基PH值、温度、二氧化碳浓度、菌丝生长温度和光线情况回归出对应产量值，计算得出每个因子的权重值，将现在或未来的这几项因子输入公式，即可预测未来的产量。"
            formula="y=b0+b1X1+b2X2+…+bnXn,其中b0为常数项,b1,b2,b3,…bn称为y对应于x1,x2,x3,…xn的偏回归系数"
          />
        </template>
      </SectionHeader>
      <PredictionModel />
    </section>
    <section class="right-top">
      <SectionHeader title="影响因子权重分析" class="label-container">
        <template #after>
          <AlgoDetailsPopover
            desc="采用多元线性回归方法结合历史数据计算出公式中偏回归系数，当知道未来Xn的值时，即可推断出未来y的值。采用往年历史数据中的投料重量、栽培面积、培养基含水量、培养基PH值、温度、二氧化碳浓度、菌丝生长温度和光线情况回归对应产量，进而计算出每个因子的权重，进而明确起关键作用的因子，后续重点保证这些因子的要求，最终达到提高产量目的。"
            formula="y=b0+b1X1+b2X2+…+bnXn,其中b0为常数项,b1,b2,b3,…bn称为y对应于x1,x2,x3,…xn的偏回归系数。"
          />
        </template>
      </SectionHeader>
      <FactorPieChart />
    </section>
    <section class="right-bottom">
      <SectionHeader title="产量估算" class="label-container" >
        <template #after>
          <AlgoDetailsPopover
            desc="采用基于深度学习的图像目标检测技术，首先对金针菇区域进行标注，然后将标注后的数据送入目标检测网络进行特征提取并学习不同生长期的金针菇特征，后续在检测视频图像中，直接识别金针菇区域和对应重量，依据随机采样的金针菇所处生长期及对应重量，计算每瓶/袋金针菇平均重量，最后结合金针菇栽种总袋数，预估总产量。"
          />
        </template>
      </SectionHeader>
      <YieldForecast />
    </section>


  </div>
</template>

<script setup>
import SectionHeader from '@/components/data-exploration/SectionHeader.vue';
import AlgoDetailsPopover from '@/components/data-exploration/AlgoDetailsPopover.vue';
import ProductionHistory from '@/components/data-exploration/mushroom/forecast/ProductionHistory.vue'
import FactorPieChart from '@/components/data-exploration/mushroom/forecast/FactorPieChart.vue'
import YieldForecast from '@/components/data-exploration/mushroom/forecast/YieldForecast.vue'
import PredictionModel from '@/components/data-exploration/mushroom/forecast/PredictionModel.vue'
import UnderConstruction from '@/components/UnderConstruction'

</script>

<style scoped lang="scss">
.label-container {
  //width: vw(500);
}
.content-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: grid;
  padding: vh(8) vw(24);
  gap: vh(20) vw(20);
  grid-template: "left-1 right-1" minmax(0, 1fr)
                 "left-2 right-2" minmax(0, 1fr) / (vw(1240) 1fr);
  %_base-pane {
    border: vw(1) solid rgb(36, 60, 132);
    background: rgba(8, 26, 72, 0.5);
    overflow: hidden;
  }
  .left-top {
    @extend %_base-pane;
    grid-area: left-1;
  }
  .left-bottom {
    @extend %_base-pane;
    grid-area: left-2;
  }
  .right-top {
    @extend %_base-pane;
    grid-area: right-1;
    display: flex;
    flex-flow: column;
  }
  .right-bottom {
    @extend %_base-pane;
    grid-area: right-2;
  }
}
</style>
