<template>
  <div class="reserve-list">
    <div class="search">
      <div class="item">
        <p>申报时间</p>
        <component :is="dateSelect" showBg v-model="formData.date"/>
      </div>
      <div class="item">
        <p>排序</p>
        <component :is="cSelect" v-model="formData.sort" :columns="formData.sortEnum" />
      </div>
<!--      <div class="item">-->
<!--        <p>状态</p>-->
<!--        <component :is="cSelect" v-model="formData.status" :columns="formData.statusEnum" />-->
<!--      </div>-->
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
        <div class="item" v-for="(item, index) in state.list" :key="item.id">
          <p>{{ index + 1 }}</p>
          <p>{{ item.project_name }}</p>
          <p>{{ item.declare_unit }}</p>
          <p>{{ item.project_type_txt }}</p>
          <p>{{ item.area_detail }}</p>
          <p>{{ item.declare_at }}</p>
          <el-tooltip
            popper-class="custom-tooltip"
            :content="item.build_contents?.[0]?.content"
            placement="top-start"
          >
            <p>{{ item.build_contents?.[0]?.content }}</p>
          </el-tooltip>
          <el-tooltip
            popper-class="custom-tooltip"
            :content="item.build_start_at?.substr(0, 10) + '至' + item.build_end_at?.substr(0, 10)"
            placement="top-start"
          >
            <p>{{ item.build_start_at?.substr(0, 10) + '至' + item.build_end_at?.substr(0, 10) }}</p>
          </el-tooltip>
          <p>{{ item.build_contents?.[0]?.invest_money }}</p>
<!--          <p>{{ item.status_txt }}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import cSelect from './../components/cSelect'
import dateSelect from './../components/dateSelect'
import btns from './../components/btns'
import { getReserveList } from '@/api/jnt'
import { downloadAs } from '@/util/tools'

const formData = reactive({
  date: '',
  sort: null,
  sortEnum: {
    'all_invest_money asc': '投资额正序',
    'all_invest_money desc': '投资额倒序',
  },
  statusEnum: {
    1: '审核中',
    2: '已通过',
    9: '已驳回'
  },
})

const isInit = ref(false)
const title = ref(['序号', '名称', '申报单位', '项目类型', '项目地址', '申报时间', '建设内容', '建设期限', '投资额'])
const state = reactive({
  list: [],
  finish: false,
  loading: false,
  page: 1,
  pageSize: 10,
})

const getData = async () => {
  state.loading = true
  const result = await getReserveList({
    page: state.page,
    pagesize: state.pageSize,
    search_declare_ats: formData.date ? formData.date : '',
    search_status: 2,
    search_order: formData.sort
  })
  state.loading = false
  if (result.total <= state.page * state.pageSize) {
    state.finish = true
  } else {
    state.page += 1
  }
  state.list = [...state.list, ...result.data]
}

const onExport = async () => {
  const result = await getReserveList({
    page: state.page,
    pagesize: state.pageSize,
    search_declare_ats: formData.date ? formData.date : '',
    search_status: 2,
    search_order: formData.sort,
    is_export: 1
  })
  downloadAs(result, `${new Date().toLocaleString()}项目储备详情.xls`, 'application/vnd.ms-excel');
}

const onReset = () => {
  formData.date = ''
  // formData.status = null
  formData.sort = ''
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
</script>

<style scoped lang="scss">
.reserve-list {
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
