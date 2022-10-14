<template>
  <SCSubpageLayout
      headerTitle="重点人员"
      iframeBackgroundSrc="/iframe/smart-communities/DCX_ZDRY.html"
  >
    <template #left-column>
      <div class="column">
        <GroupPieChart />
        <PopDistribution />
        <MovementTrends />
      </div>
    </template>
    <template #center-top>
      <TopSection v-model:showDetailTable="currentlyDisplayedTable" />
    </template>
    <template #center-mid>
      <div class="map-legend">
        <img :src="require('@/assets/images/smart-communities/fire-stats/mark-icon.png')" />
        物联网设备（2）
      </div>
    </template>
    <template #center-bottom>
        <BottomTableContainer @close="currentlyDisplayedTable = undefined" id="scs-bottom-container" class="bottom-container" v-show="!!currentlyDisplayedTable" :tableKey="currentlyDisplayedTable" :title="sectionTitle">
          <template #content="slotProps">
            <transition name="search-input">
              <el-input v-show="slotProps.isExpanded" v-model="currentSearch" placeholder="请输入人员名搜索">
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
                :visible-count="currentDefaultViewSize"
            />
          </template>
        </BottomTableContainer>
    </template>
    <template #right-column>
      <div class="column">
        <PopNumberLineChart />
        <CensusCoverage />
        <AlarmReports />
      </div>
    </template>
    <template #additionals>
    </template>
  </SCSubpageLayout>
</template>

<script setup>
import SCSubpageLayout from '@/layout/smart-community-subpage.vue';
import GroupPieChart from '@/components/smart-communities/census-data/GroupPieChart.vue';
import PopDistribution from '@/components/smart-communities/census-data/PopDistribution.vue';
import MovementTrends from '@/components/smart-communities/census-data/MovementTrends.vue';
import PopNumberLineChart from '@/components/smart-communities/census-data/PopNumberLineChart.vue';
import CensusCoverage from '@/components/smart-communities/census-data/CensusCoverage.vue';
import AlarmReports from '@/components/smart-communities/census-data/AlarmReports.vue';
import TopSection from '@/components/smart-communities/census-data/TopSection.vue';
import BottomTableContainer from '@/components/smart-communities/BottomTableContainer.vue';
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import ScrollingBoardImageCell from '@/components/shared/scrolling-table/test-image-comp.vue'
import {ref, computed, reactive, watchEffect, markRaw} from 'vue';
import request from "@/util/http";
import {compareDateString, sanitizeInvalidDate} from "@/util/util";

const currentlyDisplayedTable = ref(null);
const sectionTitle = ref('')

const dataSources = reactive({
  dailyNumber: [],
  totalNumber: [],
  censusVisits: [],
})
const columnSources = reactive({
  dailyNumber: [
    {field: '_idx', name: '序号', width: '5%'},
    {field: 'camera_location', name: '摄像头点位', width: '15%'},
    {field: 'special_personnel', name: '重点人员', width: '12.5%'},
    {field: 'location_area', name: '所属辖区', width: '20%'},
    {field: 'management', name: '管理人员', width: '12.5%'},
    {field: 'picture', name: '图片', width: '15%', customComponent: markRaw(ScrollingBoardImageCell)},
    {field: 'time', name: '时间', width: '20%'},
  ],
  totalNumber: [
    {field: '_idx', name: '序号', width: '8%'},
    {field: 'name', name: '姓名', width: '14%'},
    {field: 'sex', name: '性别', width: '6%'},
    {field: 'politics_status', name: '政治面貌', width: '10%'},
    {field: 'location', name: '所在地', width: '25%'},
    {field: 'family_population', name: '家庭人口数', width: '10%'},
    {field: 'relocation_within', name: '是否异地搬迁', width: '16%'},
    {field: 'help_cadres_name', name: '管理人员', width: '11%'},
  ],
  censusVisits: [
    {field: '_idx', name: '序号', width: '8%'},
    {field: 'name', name: '重点人员', width: '12.5%'},
    {field: 'region', name: '所属辖区', width: '17%'},
    {field: 'manager', name: '管理人员', width: '12.5%'},
    {field: 'pict_url', name: '最近走访照片', width: '15%', customComponent: markRaw(ScrollingBoardImageCell)},
    {field: 'visit_time', name: '最近走访时间', width: '20%'},
    {field: 'times', name: '累计走访次数', width: '15%'},
  ],
})
request
    .get('/api/Person/getTodaySpecialPerson', {pageSize: 100000})
    .then((result)=>{
      dataSources.dailyNumber = result.data.data.sort((a,b)=>compareDateString(a.time, b.time)).map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx+1,
        time: sanitizeInvalidDate(e.time),
      }));
    })
request
    .get('/api/Person/getPersonnelDetail')
    .then((result)=>{
      dataSources.totalNumber = result.data.map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx + 1
      }))
    })
request
    .get('/api/Person/getPersonnelDetailList', {pageSize: 100000})
    .then((result)=>{
      dataSources.censusVisits = result.data.data.sort((a,b)=>compareDateString(a.visit_time, b.visit_time)).map((e, idx)=>({
        ...e,
        _tid: `${Date.now()}-${idx}`,
        _idx: idx+1,
        visit_time: sanitizeInvalidDate(e.visit_time),
      }))
    })
const currentSearch = ref(undefined)
const currentSearchedColumn = ref(undefined)
const currentDataSource = ref([])
const currentDataColumn = ref([])
const currentDefaultViewSize = ref(4)




const expandedTableData = ref([])
const expandedTablePagination = reactive({
  page: 1,
  pageSize: 10,
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
// TODO: 优化成可以不依赖固定值计算
const getAvailableRowSpace = (type) => {
  const unitVh = window.innerHeight / 1080;
  const unitVw = window.innerWidth / 1920;
  // base - (padding + border) * 2 - title - th - pagination
  const estimatedAvailableSpace = ((660 - 12*2 - 46 - 12) * unitVh - (10 * 2  + 24 + 19) * unitVw);
  const rowHeight = (type === 'image' ? 50*unitVh : 17*unitVw + 16*unitVh) + 1
  const result = Math.max(Math.floor((estimatedAvailableSpace) / rowHeight), 1)
  return result
}

watchEffect(()=>{
  currentSearch.value = undefined
  expandedTablePagination.total = 0
  expandedTablePagination.page = 1
  console.log(currentlyDisplayedTable.value)
  switch (currentlyDisplayedTable.value) {
    case 'dailyNumber': {
      sectionTitle.value = '今日重点人员数'
      currentDataSource.value = dataSources.dailyNumber
      currentDataColumn.value = columnSources.dailyNumber
      currentSearchedColumn.value = 'special_personnel'
      expandedTablePagination.pageSize = getAvailableRowSpace('image')
      currentDefaultViewSize.value = 4
      break;
    }
    case 'totalNumber': {
      sectionTitle.value  = '重点人员总数'
      currentDataSource.value = dataSources.totalNumber
      currentDataColumn.value = columnSources.totalNumber
      currentSearchedColumn.value = 'name'
      expandedTablePagination.pageSize = getAvailableRowSpace('text')
      currentDefaultViewSize.value = 6
      break;
    }
    case 'censusVisits': {
      sectionTitle.value  = '累计走访详情'
      currentDataSource.value = dataSources.censusVisits
      currentDataColumn.value = columnSources.censusVisits
      currentSearchedColumn.value = 'name'
      expandedTablePagination.pageSize = getAvailableRowSpace('image')
      currentDefaultViewSize.value = 4
      break;
    }
    default: {
      expandedTablePagination.pageSize = getAvailableRowSpace('text')
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
    .el-input__inner {
      line-height: vh(14);
      font-size: vh(14);
      height: vh(14);
    }
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
