<template>
  <div class="agriculture-list">

    <div class="table-list">
      <div class="item title">
        <p v-for="(item, index) in type === 'project' ? title : title2" :key="index">{{ item }}</p>
      </div>
      <div class="item-wrap" v-if="state.list?.length && type === 'project'">
        <div class="item" v-for="(item, index) in state.list" :key="index">
          <p>{{ index + 1 }}</p>
          <p>{{ item.project_name }}</p>
          <el-tooltip
            popper-class="custom-tooltip"
            :content="item.build_main_content"
            placement="top-start"
          >
            <p>{{ item.build_main_content }}</p>
          </el-tooltip>
          <p>{{ item.build_start_at?.substr(0, 10) + '至' + item.build_end_at?.substr(0, 10) }}</p>
          <p>{{ item.start_declare_at }}</p>
          <p :style="{ color: overColor[item.overdue_year] }">{{ overEnum[item.overdue_year] }}</p>
        </div>
      </div>
      <div class="item-wrap" v-if="state.list?.length && type === 'project_sub'">
        <div class="item" v-for="(item, index) in state.list" :key="index">
          <p>{{ index + 1 }}</p>
          <p>{{ item.policy_document_title }}</p>
          <p>{{ item.category_name }}</p>
          <p>{{ item.all_real_fund_amount }}</p>
          <p>{{ item.issue_at?.substr(0, 10) }}</p>
        </div>
      </div>
      <div class="empty" v-if="!state.list?.length && !state.loading">
        <img src="https://img.hzanchu.com/acimg/304dd17806c83d3bb576b0b374e12d12.png" alt="" />
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, nextTick, onMounted } from 'vue'
import { getTownProject } from '@/api/jnt'

const props = defineProps({
  town: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'project'
  }
})

const overEnum = {
  0: '正常',
  0.5: '逾期半年',
  1: '逾期一年以上',
  2: '逾期一年以上'
}
const overColor = {
  0: '#2AE281',
  0.5: '#EFD360',
  1: '#FF5E57',
  2: '#FF5E57'
}
const isInit = ref(false)
const title = ref(['序号', '项目名称', '计划建设内容', '计划建设时间', '申报时间', '逾期情况'])
const title2 = ref(['序号', '政策文件名', '惠农补贴分类', '已兑现资金（万元）', '发布时间'])
const state = reactive({
  list: [],
  finish: false,
  loading: false,
  page: 1,
  pageSize: 10,
})

const getData = async () => {
  state.loading = true
  const result = await getTownProject({
    page: state.page,
    pagesize: state.pageSize,
    town_id: props.town,
    search_project_type: props.type
  })
  state.loading = false
  if (result.total <= state.page * state.pageSize) {
    state.finish = true
  } else {
    state.page += 1
  }
  state.list = [...state.list, ...result.list]
}

onMounted(() => {
  getData()
})
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
    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 200px;
        height: 180px;
        margin: 200px 0 50px;
      }
    }
  }
}
</style>
