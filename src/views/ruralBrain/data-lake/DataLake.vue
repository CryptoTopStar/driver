<template>
  <div class="dl-layout">
    <!-- 左侧 -->
    <section class="dl-section">
      <ComputingPower :data="data">
        <template #header>
          <Title text="数据资产" />
        </template>
      </ComputingPower>
      <StorageCapacity :data="data">
        <template #header>
          <Title text="存储能力" />
        </template>
      </StorageCapacity>
      <ResourceUtilization :data="data">
        <template #header>
          <Title text="资源使用" />
        </template>
      </ResourceUtilization>
    </section>
    <!-- 中间 -->
    <section class="dl-mid-section">
      <DataGatheringOverview :data="data">
        <template #header>
          <Title text="采集汇总" />
        </template>
      </DataGatheringOverview>
      <DataSources :data="data">
        <template #header>
          <Title text="数据来源"/>
        </template>
      </DataSources>
      <DataCategoryChart :data="data">
        <template #header>
          <Title text="数据主题分布" />
        </template>
      </DataCategoryChart>
    </section>
    <!-- 右侧 -->
    <section class="dl-section">
      <ApiOverview :data="data">
        <template #header>
          <Title text="数据服务" />
        </template>
      </ApiOverview>
      <ApiUsageChart />
      <MostUsedApiTable />
    </section>
  </div>

</template>

<script setup>
import {onMounted, watch, ref} from 'vue'
import Title from '../modules/Title.vue'
import ComputingPower from './components/ComputingPower.vue'
import StorageCapacity from './components/StorageCapacity.vue'
import ResourceUtilization from './components/ResourceUtilization.vue'
import ApiOverview from './components/ApiOverview.vue'
import ApiUsageChart from './components/ApiUsageChart.vue'
import MostUsedApiTable from './components/MostUsedApiTable.vue'
import DataSources from './components/DataSources.vue'
import DataCategoryChart from './components/DataCategoryChart.vue'
import DataGatheringOverview from './components/DataGatheringOverview.vue'
import {fetchDtapi} from "@/views/ruralBrain/data-lake/api-tokens";

const data = ref({});
fetchDtapi('jsc_sjzc_zb').then(result=>{
  const obj = {}
  data.value = result.data.reduce((prev, curr)=>{
    switch (curr.zbmk) {
      case '数据主体分布': {
        if (prev[`${curr.zbmk}`]) {
          prev[`${curr.zbmk}`].push(curr);
        } else {
          prev[`${curr.zbmk}`] = [curr];
        }
        break;
      }
      default: {
        prev[`${curr.zbmk}::${curr.zbnr}`] = curr;
      }
    }
    return prev;
  }, obj)
})

</script>

<style scoped lang="scss">
.dl-layout {
  box-sizing: border-box;
  height: 100%;
  display: grid;
  padding: 72px 24px 72px;
  grid-template-columns: 608px 1fr 608px;
  gap: 20px;
  overflow: hidden;
  ::v-deep(li) {
    appearance: none;
  }

  ::v-deep(.scrolling-table) {
    .cell,
    .default-text-cell {
      font-size: 16px;
      line-height: 20px;
    }
  }
  ::v-deep(.jscm-radio-group) {
    column-gap: 4px;
    .el-radio-button__inner {
      padding: 4px;
      font-size: 14px;
      line-height: 18px;
    }
  }
}
.dl-section {
  padding: 20px;
  border: 10px solid green;
  // svg图在chrome下用好像有渲染问题, 边上可能会空, 而且svg比webp大了一点
  border-image-source: url("~@/assets/rural-brain/section-border.webp");
  //border-image-slice: calc(30 / 846 * 100%) calc(30 / 282 * 100%) fill;
  border-image-slice:30 30 fill;
  border-image-width: 30px;
  border-image-repeat: repeat;
  overflow: hidden;
}
.dl-mid-section {
  @extend .dl-section;
  margin-block: 31px 13px; // 顶端和主题库对齐
}
</style>
