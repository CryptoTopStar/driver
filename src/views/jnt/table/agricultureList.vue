<template>
  <div class="agriculture-list">
    <div class="search">
      <div class="item">
        <p>申报时间</p>
        <component :is="dateSelect" showBg v-model="formData.date"/>
      </div>
      <div class="item">
        <p>项目阶段</p>
        <component :is="cSelect" v-model="formData.step" :columns="formData.stepEnum" />
      </div>
      <div class="item">
        <p>项目状态</p>
        <component :is="cSelect" v-model="formData.status" :columns="formData.statusEnum" />
      </div>
      <div class="item">
        <p>办理实效</p>
        <component :is="cSelect" v-model="formData.deal" :columns="formData.dealEnum" />
      </div>
      <component
        class="item"
        :is="btns"
        @onReset="onReset"
        @onSearch="onSearch"
        @onExport="onExport"
      />
    </div>

    <div class="table-list">
      <div class="item title">
        <p v-for="(item, index) in title" :key="index">{{ item }}</p>
      </div>
      <div
        v-if="!isInit"
        class="item-wrap"
        v-infinite-scroll="getData"
        :infinite-scroll-disabled="state.finish || state.loading"
      >
        <div class="item" v-for="(item, index) in state.list" :key="index">
          <p>{{ index + 1 }}</p>
          <p>{{ item.project_name }}</p>
          <p>{{ item.project_status_show_txt?.show_stage_txt }}</p>
          <p>{{ item.project_status_show_txt?.show_status_txt }}</p>
          <p :style="{ color: timeColor[item.project_status_show_txt?.show_bl_aging_txt] }">{{ item.project_status_show_txt?.show_bl_aging_txt }}</p>
          <p>{{ item.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import cSelect from './../components/cSelect'
import dateSelect from './../components/dateSelect'
import btns from './../components/btns'
import { getJzxProjectList } from '@/api/jnt'
import { downloadAs } from '@/util/tools'

const formData = reactive({
  date: '',
  status: null,
  statusEnum: {
    1: '审核中',
    2: '已通过',
    9: '已驳回'
  },
  step: null,
  stepEnum: {
    1: '申报',
    2: '实施',
    3: '验收',
    4: '资金拨付'
  },
  deal: null,
  dealEnum: {
    '-1': '全部',
    1: '正常时效中',
    2: '停留超过24小时',
    3: '停留超过48小时',
    4: '停留超过72小时'
  },
})
const timeColor = {
  '停留超过24小时': '#24D9D6',
  '停留超过48小时': '#FF9500',
  '停留超过72小时': '#FF3B30'
}
const isInit = ref(false)
const title = ref(['序号', '名称', '项目阶段', '项目状态', '办理时效', '申报时间'])
const state = reactive({
  list: [],
  finish: false,
  loading: false,
  page: 1,
  pageSize: 10,
})

const onReset = () => {
  formData.status = null
  formData.step = null
  formData.deal = null
  formData.date = ''
  onSearch()
}
const onSearch = () => {
  state.list = []
  state.page = 1
  state.loading = false
  state.finish = false
  isInit.value = true
  nextTick(() => {
    isInit.value = false
  })
}
const onExport = async () => {
  const result = await getJzxProjectList({
    page: state.page,
    pagesize: state.pageSize,
    search_show_stage: formData.step,
    search_bl_aging: formData.deal,
    search_status: +formData.status,
    search_start_declare_at_min_at: formData.date[0],
    // search_start_declare_at_max_at: formData.date?.[1] ? (formData.date[1] + ' 23:59:59') : '',
    search_start_declare_at_max_at: formData.date?.[1],
    is_export: 1
  })
  downloadAs(result, `${new Date().toLocaleString()}竞争性财政支农项目详情.xls`, 'application/vnd.ms-excel');
}

const getData = async () => {
  state.loading = true
  const result = await getJzxProjectList({
    page: state.page,
    pagesize: state.pageSize,
    search_show_stage: formData.step,
    search_bl_aging: formData.deal,
    search_status: +formData.status,
    search_start_declare_at_min_at: formData.date[0],
    // search_start_declare_at_max_at: formData.date?.[1] ? (formData.date[1] + ' 23:59:59') : '',
    search_start_declare_at_max_at: formData.date?.[1],
  })
  state.loading = false
  if (result.total <= state.page * state.pageSize) {
    state.finish = true
  } else {
    state.page += 1
  }
  state.list = [...state.list, ...result.data]
}
</script>

<style scoped lang="scss">
.agriculture-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  .search {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.3%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &:nth-last-of-type(1) {
        flex: 1;
      }
      p {
        margin-right: 8px;
        white-space: nowrap;
      }
    }
  }
  .table-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    overflow: hidden;
    .item {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      p {
        flex: 1;
        margin: 0 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-of-type(1) {
          flex: none;
          width: 40px;
          text-align: center;
        }
      }
    }
    .title {
      border-bottom: 1px solid rgba(255, 255, 255, .15);
      margin-bottom: 12px;
      height: 20px;
      line-height: 20px;
    }
    .item-wrap {
      flex: 1;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .item {
        &:nth-of-type(2n-1) {
          background: #03274D;
        }
        p:nth-of-type(1) {
          flex: none;
          height: 22px;
          line-height: 22px;
          text-align: center;
          margin-left: 9px;
          background: url('../images/index_bg.png') no-repeat center;
          background-size: auto 100%;
        }
      }
    }
  }
}
</style>
