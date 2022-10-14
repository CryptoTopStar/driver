<template>
  <div class="_bottom1">
    <div class="legend">
      <div v-for="(item, index) in legendList" :key="index" class="legend-item">
        <div :style="'background-color: ' + item.color"></div>
        {{ item.text }}
      </div>
    </div>

    <BottomTableContainer
      customStyle="margin-inline: 0"
      id="scs-bottom-container"
      class="bottom-container"
      v-show="!!currentlyDisplayedTable"
      :tableKey="currentlyDisplayedTable"
      :title="sectionTitle"
      @close="currentlyDisplayedTable = undefined"
    >
      <template #content="slotProps">
        <transition name="search-input">
          <el-input
            v-show="slotProps.isExpanded"
            v-model="currentSearch"
            placeholder="请输入地区搜索"
          >
            <template #suffix>
              <img
                :src="
                  require('@/assets/images/smart-communities/shared/icon_search.svg')
                "
                alt="search"
              />
            </template>
          </el-input>
        </transition>
        <template v-if="currentDataSource?.length > 0">
          <template v-if="slotProps.isExpanded">
            <ScrollingBoard
              :data="expandedTableDataView"
              :columns="currentDataColumn"
              id-field="_tid"
              class="scrolling-detail-table"
              :visible-count="expandedTablePagination.pageSize"
              static
            />
            <div class="pagination-row">
              <span class="summary"
                >共{{ expandedTablePagination.total }}条记录</span
              >
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
        <template v-else>
          <list-empty title="数据正在更新中..."></list-empty>
        </template>
      </template>
    </BottomTableContainer>
  </div>
</template>

<script setup>
import BottomTableContainer from "@/components/smart-communities/BottomTableContainer.vue";
import ScrollingBoard from "@/components/shared/scrolling-table/index.vue";
import ScrollingBoardImageCell from "@/components/shared/scrolling-table/test-image-comp.vue";
import listEmpty from "@/components/listEmpty.vue";
import {
  ref,
  computed,
  reactive,
  watchEffect,
  markRaw,
  inject,
  watch,
  defineProps,
} from "vue";
import request from "@/util/http";
import { compareDateString, sanitizeInvalidDate } from "@/util/util";
const props = defineProps({
  village: String,
});

const legendList = ref([
  { color: "#38D672", text: "准确率≥85%" },
  { color: "#26B4FF", text: "准确率≥80%" },
  { color: "#EF9E4E", text: "准确率<80%" },
  { color: "#9389FF", text: "无数据" },
]);

const currentlyDisplayedTable = ref(null);
const sectionTitle = ref("");

const dataSources = reactive({
  dailyNumber: [],
});
const columnSources = reactive({
  dailyNumber: [
    { field: "_idx", name: "序号", width: "5%" },
    { field: "village", name: "地区", width: "15%" },
    { field: "memberName", name: "姓名", width: "12.5%" },
    { field: "wasteType", name: "垃圾类型", width: "20%" },
    { field: "result", name: "分类结果", width: "12.5%" },
    { field: "weight", name: "重量", width: "12.5%" },
    {
      field: "imagePath",
      name: "图片",
      width: "15%",
      customComponent: markRaw(ScrollingBoardImageCell),
    },
    { field: "time", name: "时间", width: "20%" },
  ],
});
const reload = () => {
  request
    .get(
      "/jiangshan-api/data-bridge/rubbish/getCurrentDayRubbishCollectByPage",
      {
        pageSize: 10000,
        street: "大陈乡",
        village: props.village == "大陈乡" ? "" : props.village,
      }
    )
    .then((result) => {
      dataSources.dailyNumber = result.data.list
        .sort((a, b) => compareDateString(a.time, b.time))
        .map((e, idx) => ({
          ...e,
          _tid: `${Date.now()}-${idx}`,
          _idx: idx + 1,
          time: sanitizeInvalidDate(e.collectTime),
          wasteType: e.wasteType == 0 ? "其他垃圾" : "易腐垃圾",
          result: dealResult(e.result),
        }));
      currentSearch.value = undefined;
      expandedTablePagination.total = 0;
      expandedTablePagination.page = 1;
      sectionTitle.value = !props.village
        ? "大陈乡实时垃圾分类情况"
        : props.village + "实时垃圾分类情况";
      currentDataSource.value = dataSources.dailyNumber;
      currentDataColumn.value = columnSources.dailyNumber;
      currentSearchedColumn.value = "village";
      expandedTablePagination.pageSize = getAvailableRowSpace("image");
      currentDefaultViewSize.value = 4;
    });
};

reload();

const dealResult = (result) => {
  let title = "";
  if (result == 0) {
    title = "空桶";
  } else if (result == 1) {
    title = "不合格";
  } else if (result == 2) {
    title = "合格";
  } else if (result == 3) {
    title = "良好";
  } else if (result == 4) {
    title = "优秀";
  }
  return title;
};

const currentSearch = ref(undefined);
const currentSearchedColumn = ref(undefined);
const currentDataSource = ref([]);
const currentDataColumn = ref([]);
const currentDefaultViewSize = ref(4);

const expandedTableData = ref([]);
const expandedTablePagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});
watchEffect(() => {
  let source = currentDataSource.value;
  if (!!currentSearch.value) {
    source = source
      .filter((e) =>
        e[currentSearchedColumn.value]?.includes?.(currentSearch.value)
      )
      .map((e, idx) => ({
        ...e,
        _idx: idx + 1,
      }));
  }
  expandedTablePagination.page = 1;
  expandedTablePagination.total = source.length;
  expandedTableData.value = source;
});

const expandedTableDataView = computed(() => {
  const start =
    (expandedTablePagination.page - 1) * expandedTablePagination.pageSize;
  return expandedTableData.value.slice(
    start,
    start + expandedTablePagination.pageSize
  );
});
// TODO: 优化成可以不依赖固定值计算
const getAvailableRowSpace = (type) => {
  const unitVh = window.innerHeight / 1080;
  const unitVw = window.innerWidth / 1920;
  // base - (padding + border) * 2 - title - th - pagination
  const estimatedAvailableSpace =
    (660 - 12 * 2 - 46 - 12) * unitVh - (10 * 2 + 24 + 19) * unitVw;
  const rowHeight =
    (type === "image" ? 50 * unitVh : 17 * unitVw + 16 * unitVh) + 1;
  const result = Math.max(Math.floor(estimatedAvailableSpace / rowHeight), 1);
  return result;
};

const bottomShow = inject("bottomShow");
watch(bottomShow, (newV) => {
  console.log(newV);
  if (newV) {
    reload();
    currentlyDisplayedTable.value = "dailyNumber";
  } else {
    currentlyDisplayedTable.value = "";
  }
});
</script>

<style scoped lang="scss">
._bottom1 {
  position: absolute;
  z-index: 3;
  bottom: vh(140);
  right: vw(536);
  width: vw(850);
  // height: vh(305);
}

.legend {
  position: absolute;
  z-index: 3;
  top: vh(-160);
  right: 0;
  width: vw(140);
  height: vh(144);
  padding: vw(20) 0;
  box-sizing: border-box;
  background: url(https://img.hzanchu.com/acimg/21dbd68b0b642bd60deb99635311995a.png)
    no-repeat;
  background-size: vw(140) vh(144);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .legend-item {
    width: 100%;
    font-size: vw(14);
    color: #94c9e8;
    display: flex;
    flex-direction: row;

    div:nth-of-type(1) {
      width: vw(12);
      height: vh(12);
      margin-right: vw(8);
      margin-left: vw(14);
    }
  }
}
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
  color: #ffffff;
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
    --el-input-text-color: #9ac6e6;
    --el-input-border-color: #2ca2fc;
    --el-input-bg-color: rgba(38, 128, 235, 0.14901960784313725);
    --el-input-placeholder-color: #9ac6e6;
    --el-input-hover-border-color: #2ca2fc;
    --el-input-clear-hover-color: #2ca2fc;
    --el-input-focus-border-color: #2ca2fc;
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
  color: #89b0cc;
  line-height: vw(22);
  .summary {
    font-size: vw(12);
  }
  ::v-deep(.el-pagination) {
    --el-pagination-button-bg-color: transparent !important;
    --el-disabled-bg-color: transparent !important;
    --el-pagination-button-disabled-bg-color: transparent !important;
    --el-pagination-bg-color: transparent !important;
    --el-pagination-text-color: #89b0cc;
    --el-pagination-button-color: #89b0cc;
    .el-pager {
      li {
        width: vw(24);
        border-radius: vw(4);
        min-width: vw(24);
        height: vw(24);
        padding: 0 vw(4);
        &.is-active {
          background-color: #45a2ff;
          color: #00488e;
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
