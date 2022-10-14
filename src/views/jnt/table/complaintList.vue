<template>
  <div class="complaint-list">
    <div class="search">
      <div class="item">
        <p>日期</p>
        <component
          :is="dateSelect"
          showBg
          v-model="formData.date"
        />
      </div>
      <div class="item">
        <p>状态</p>
        <component
          :is="cSelect"
          v-model="formData.status"
          :columns="formData.statusEnum"
        />
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
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="state.finish || state.loading"
      >
        <div class="item" v-for="(item, index) in state.list" :key="index">
          <p>{{ index + 1 }}</p>
          <p>{{ item.name }}</p>
          <p>{{ item.mobile }}</p>
          <p>{{ item.title }}</p>
          <el-tooltip
            popper-class="custom-tooltip"
            :content="item.content"
            placement="top-start"
          >
            <p>{{ item.content }}</p>
          </el-tooltip>
          <component :is="imgView" :images="item.img" />
          <p>{{ item.created_at }}</p>
          <p>{{ item.is_check_txt }}</p>
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
import imgView from './../components/imgView'
import { getFeedbackList } from '@/api/jnt'
import { downloadAs } from '@/util/tools'

const formData = reactive({
  status: null,
  statusEnum: {
    1: '未处理',
    2: '已处理'
  },
  date: ''
})
const state = reactive({
  list: [],
  finish: false,
  loading: false,
  page: 1,
  pageSize: 10,
})

const isInit = ref(false)
const title = ref(['序号', '姓名', '联系方式', '反馈标题', '反馈内容', '图片', '反馈时间', '状态'])
const getList = async () => {
  state.loading = true
  const result = await getFeedbackList({
    page: state.page,
    pagesize: state.pageSize,
    // search_created_ats: formData.date ?  [formData.date[0], formData.date[1] ? (formData.date[1] + ' 23:59:59') : ''] : '',
    search_created_ats: formData.date,
    search_is_check: formData.status
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
  const result = await getFeedbackList({
    page: state.page,
    pagesize: state.pageSize,
    // search_created_ats: formData.date ?  [formData.date[0], formData.date[1] ? (formData.date[1] + ' 23:59:59') : ''] : '',
    search_created_ats: formData.date,
    search_is_check: formData.status,
    is_export: 1
  })
  downloadAs(result, `${new Date().toLocaleString()}意见反馈详情.xls`, 'application/vnd.ms-excel');
}

const onReset = () => {
  formData.status = null
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
</script>

<style scoped lang="scss">
.complaint-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  .search {
    display: flex;
    .item {
      width: 33.3%;
      display: flex;
      align-items: center;
      &:nth-of-type(3) {
        width: 50%;
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
      height: 80px;
      p, .img-view {
        flex: 1;
        margin: 0 6px;
      }
      p {
        min-height: 22px;
        line-height: 22px;
        max-height: 44px;
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &:nth-of-type(1) {
          flex: none;
          width: 30px;
        }
        &:nth-of-type(2) {
          flex: none;
          width: 60px;
        }
        &:nth-of-type(3) {
          flex: none;
          width: 100px;
        }
        &:nth-last-of-type(1), &:nth-last-of-type(2) {
          flex: none;
          width: 90px;
        }
      }
      .img-view {
        flex: none;
        width: 150px;
      }
    }
    .title {
      border-bottom: 1px solid rgba(255, 255, 255, .15);
      margin-bottom: 12px;
      height: 20px;
      line-height: 20px;
      p:nth-of-type(6) {
        flex: none;
        width: 150px;
      }
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
