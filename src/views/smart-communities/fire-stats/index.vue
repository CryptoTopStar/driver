<template>
  <SCSubpageLayout
    headerTitle="消防监管"
    iframeBackgroundSrc="/iframe/smart-communities/DCX_XFJG.html"
  >
    <template #left-column>
      <div class="column">
        <EquipmentPieChart />
        <StatusBarChart />
        <AlarmReportBarChart />
      </div>
    </template>
    <template #center-top>
      <TopSection v-model:showDetailTable="currentlyDisplayedTable" />
    </template>
    <template #center-mid>
      <div class="map-legend">
        <img :src="require('@/assets/images/smart-communities/fire-stats/mark-icon.png')" />
        物联网设备（10）
      </div>
    </template>
    <template #center-bottom>
      <BottomTableContainer @close="currentlyDisplayedTable = undefined"  class="bottom-container" v-show="!!currentlyDisplayedTable" :tableKey="currentlyDisplayedTable" :title="sectionTitle">
        <template #content="slotProps">
          <transition name="search-input">
            <el-input v-show="slotProps.isExpanded" v-model="currentSearch" placeholder="请输入地区名搜索">
              <template #suffix>
                <img :src="require('@/assets/images/smart-communities/shared/icon_search.svg')" alt="search"/>
              </template>
            </el-input>
          </transition>
          <template v-if="slotProps.isExpanded">
            <!--              <el-table :data="expandedTableDataView" stripe class="scs-detail-table" max-height="499">-->
            <!--                <el-table-column v-for="col in currentDataColumn" :key="col.field" :width="Number(col.width)" :prop="col.field" :label="col.name" />-->
            <!--              </el-table>-->
            <ScrollingBoard
                :data="expandedTableDataView"
                :columns="currentDataColumn"
                id-field="_tid"
                class="scrolling-detail-table"
                :visible-count="expandedTablePagination.pageSize"
                static
            />
            <div class="pagination-row">
              <span class="summary">共{{expandedTablePagination.total}}条记录</span>
              <el-pagination
                  class="scs-detail-table__pagination"
                  :hide-on-single-page="false"
                  layout="prev, pager, next"
                  v-model:current-page="expandedTablePagination.page"
                  :page-size="expandedTablePagination.pageSize"
                  :total="expandedTablePagination.total"
              />
            </div>
          </template>
          <ScrollingBoard
              v-else
              :data="currentDataSource"
              :columns="currentDataColumn"
              id-field="_tid"
              class="scrolling-detail-table"
              :visible-count="6"
          />
        </template>
      </BottomTableContainer>
    </template>
    <template #right-column>
      <div class="column">
        <FireInspections />
        <RepairReport />
        <IncidentReport />
      </div>
    </template>
    <template #additionals>
    </template>
  </SCSubpageLayout>
</template>

<script setup>
import SCSubpageLayout from '@/layout/smart-community-subpage.vue';
import EquipmentPieChart from '@/components/smart-communities/fire-stats/EquipmentPieChart.vue';
import StatusBarChart from '@/components/smart-communities/fire-stats/StatusBarChart.vue';
import AlarmReportBarChart from '@/components/smart-communities/fire-stats/AlarmReportBarChart.vue';
import HazardDetails from '@/components/smart-communities/fire-stats/HazardDetails.vue';
import FireInspections from '@/components/smart-communities/fire-stats/FireInspections.vue';
import RepairReport from '@/components/smart-communities/fire-stats/RepairReport.vue';
import IncidentReport from '@/components/smart-communities/fire-stats/IncidentReport.vue';
import TopSection from '@/components/smart-communities/fire-stats/TopSection.vue';
import BottomTableContainer from '@/components/smart-communities/BottomTableContainer.vue';
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import ScrollingBoardImageCell from '@/components/shared/scrolling-table/test-image-comp.vue'
import {ref, computed, reactive, watchEffect, markRaw} from 'vue';
import request from "@/util/http";
import {compareDateString, sanitizeInvalidDate} from "@/util/util";
import {isToday} from 'date-fns'

const currentlyDisplayedTable = ref(null);
const sectionTitle = ref('')

const dataSources = reactive({
  calls: [],
  missedCalls: [],
  hazards: [],
  unresolved: [],
})
const columnSources = reactive({
  calls: [
    {field: '_idx', name: '序号', width: '5%'},
    {field: 'sblx', name: '设备类型', width: '15%'},
    {field: 'bjsj', name: '报警时间', width: '20%'},
    {field: 'ssqy', name: '所属区域', width: '17.5%'},
    {field: 'bjlx', name: '报警类型', width: '12.5%'},
    {field: 'clzt', name: '处理状态', width: '10%'},
    {field: 'clsj', name: '处理时间', width: '20%'},
  ],
  missedCalls: [
    {field: '_idx', name: '序号', width: '5%'},
    {field: 'sblx', name: '设备类型', width: '15%'},
    {field: 'bjsj', name: '报警时间', width: '20%'},
    {field: 'ssqy', name: '所属区域', width: '17.5%'},
    {field: 'bjlx', name: '报警类型', width: '12.5%'},
    {field: 'clzt', name: '处理状态', width: '10%'},
    {field: 'clsj', name: '处理时间', width: '20%'},
  ],
  hazards: [
    {field: '_idx', name: '序号', width: '5%'},
    {field: 'name', name: '隐患名称', width: '12%'},
    {field: 'region', name: '所在地区', width: '12.5%'},
    {field: 'report_time', name: '上报时间', width: '20%'},
    {field: 'fault_type', name: '故障类型', width: '10%'},
    {field: 'system', name: '所属系统', width: '12.5%'},
    {field: 'status_name', name: '修复状态', width: '8%'},
    {field: 'repair_time', name: '修复时间', width: '20%'}
  ],
  unresolved: [
    {field: '_idx', name: '序号', width: '5%'},
    {field: 'name', name: '隐患名称', width: '12%'},
    {field: 'region', name: '所在地区', width: '12.5%'},
    {field: 'report_time', name: '上报时间', width: '20%'},
    {field: 'fault_type', name: '故障类型', width: '10%'},
    {field: 'system', name: '所属系统', width: '12.5%'},
    {field: 'status_name', name: '修复状态', width: '8%'},
    {field: 'repair_time', name: '修复时间', width: '20%'}
  ],
})
request
    .get('/api/fireSupe/getAlarmDetailList', {pageSize: 100000})
    .then((result)=>{
      const sourceData = result.data.data.sort((a,b)=>compareDateString(a.bjsj, b.bjsj));
      dataSources.calls = sourceData.filter(e=>e.clzt !== '未处理').map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx + 1,
        bjsj: sanitizeInvalidDate(e.bjsj),
        clsj: sanitizeInvalidDate(e.clsj),
      }))
      dataSources.missedCalls = sourceData.filter(e=>e.clzt === '未处理').map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx + 1,
        bjsj: sanitizeInvalidDate(e.bjsj),
        clsj: sanitizeInvalidDate(e.clsj),
      }))
    })
request
    .get('/api/fireSupe/getHiddenDangerDetail')
    .then((result)=>{
      const sourceData = result.data.sort((a,b)=>compareDateString(a.report_time, b.report_time));
      dataSources.hazards = sourceData.filter(e=>e.status_name !== '未修复' && isToday(new Date(e.report_time))).map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx + 1,
        report_time: sanitizeInvalidDate(e.report_time),
        repair_time: sanitizeInvalidDate(e.repair_time),
      }))
      dataSources.unresolved = sourceData.filter(e=>e.status_name === '未修复').map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx + 1,
        report_time: sanitizeInvalidDate(e.report_time),
        repair_time: sanitizeInvalidDate(e.repair_time),
      }))
    })
const currentSearch = ref(undefined)
const currentSearchedColumn = ref(undefined)
const currentDataSource = ref([])
const currentDataColumn = ref([])

const expandedTableData = ref([])
const expandedTablePagination = reactive({
  page: 1,
  pageSize: 15,
  total: 0
})
watchEffect(()=>{
  let source = currentDataSource.value;
  if (!!currentSearch.value) {
    source = source.filter(e=>e[currentSearchedColumn.value]?.includes?.(currentSearch.value)).map((e,idx)=>({
      ...e,
      _idx: idx + 1
    }))
  }
  expandedTablePagination.page = 1;
  expandedTablePagination.total = source.length
  expandedTableData.value = source
})

const expandedTableDataView = computed(()=>{
  const start = (expandedTablePagination.page - 1) * expandedTablePagination.pageSize
  return expandedTableData.value.slice(start, start + expandedTablePagination.pageSize)
})

watchEffect(()=>{
  currentSearch.value = undefined
  expandedTablePagination.total = 0
  expandedTablePagination.page = 1
  switch (currentlyDisplayedTable.value) {
    case 'calls': {
      sectionTitle.value = '今日报警详情'
      currentDataSource.value = dataSources.calls
      currentDataColumn.value = columnSources.calls
      currentSearchedColumn.value = 'ssqy'
      break;
    }
    case 'missedCalls': {
      sectionTitle.value  = '未处理报警详情'
      currentDataSource.value = dataSources.missedCalls
      currentDataColumn.value = columnSources.missedCalls
      currentSearchedColumn.value = 'ssqy'
      break;
    }
    case 'hazards': {
      sectionTitle.value  = '隐患详情'
      currentDataSource.value = dataSources.hazards
      currentDataColumn.value = columnSources.hazards
      currentSearchedColumn.value = 'region'
      break;
    }
    case 'unresolved': {
      sectionTitle.value  = '未处理隐患详情'
      currentDataSource.value = dataSources.unresolved
      currentDataColumn.value = columnSources.unresolved
      currentSearchedColumn.value = 'region'
      break;
    }
    default: {
    }
  }
})
</script>

<style scoped lang="scss">
.column {
  padding: vh(24) vw(24);
  display: flex;
  flex-flow: column;
  height: 100%;
}
.map-legend {
  position: absolute;
  bottom: vh(12);
  right: vw(50);
  //transform: translateY(-100%);
  background: url("~@/assets/images/smart-communities/shared/legend-box-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
  display: flex;
  padding: vh(12) vw(16);
  align-items: center;
  font-size: vw(14);
  font-weight: 400;
  color: #FFFFFF;
  img {
    width: vw(16);
    height: vw(16);
    margin-inline: vw(4);
  }
}
// ========== table css ================
.scrolling-detail-table {
  margin-block-start: vh(12);
}
.bottom-container {
  ::v-deep(.el-input) {
    position: absolute;
    right: vw(147);
    top: vh(20);
    width: vw(170);
    height: vh(30);
    --el-input-text-color: #9AC6E6;
    --el-input-border-color: #2CA2FC;
    --el-input-bg-color: rgba(38, 128, 235, 0.14901960784313725);
    --el-input-placeholder-color: #9AC6E6;
    --el-input-hover-border-color: #2CA2FC;
    --el-input-clear-hover-color: #2CA2FC;
    --el-input-focus-border-color: #2CA2FC;
  }
  .el-input__inner {
    line-height: vh(14);
    font-size: vh(14);
    height: vh(14);
  }
}
.pagination-row {
  margin-block: auto vh(-12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #89B0CC;
  line-height: vw(22);
  .summary {
    font-size: vw(12)
  }
  ::v-deep(.el-pagination) {
    --el-pagination-button-bg-color: transparent !important;
    --el-disabled-bg-color: transparent !important;
    --el-pagination-button-disabled-bg-color: transparent !important;
    --el-pagination-bg-color: transparent !important;
    --el-pagination-text-color: #89B0CC;
    --el-pagination-button-color: #89B0CC;
    .el-pager {
      li {
        width: vw(24);
        border-radius: vw(4);
        min-width: vw(24);
        height: vw(24);
        padding: 0 vw(4);
        &.is-active {
          background-color: #45A2FF;
          color: #00488E;
        }
      }
    }
  }
}
// anim

.search-input-move,
.search-input-enter-active,
.search-input-leave-active {
  transition: all 0.5s ease;
}

.search-input-enter-from {
  opacity: 0;
}
.search-input-leave-to {
  opacity: 0;
}
</style>
