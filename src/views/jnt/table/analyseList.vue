<template>
  <div class="reserve-list">
    <div class="search">
      <div class="item" v-if="active === 1">
        <p>选择日期</p>
        <component :is="dateSelect" showBg v-model="formData.date"/>
      </div>
      <div class="item">
        <p>排序</p>
        <component :is="cSelect" v-model="formData.sort" :columns="active === 1 ? formData.sortEnum : formData.sortEnum2" />
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
        <p v-for="(item, index) in +active === 1 ? title1 : title2" :key="index">{{ item }}</p>
      </div>
      <div
        v-if="!isInit"
        class="item-wrap"
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="state.finish || state.loading"
      >
        <div class="item" v-for="(item, index) in state.list" :key="item.id">
          <p>{{ index + 1 }}</p>
          <p v-if="active === 1">{{ item.question_user_info?.real_name }}</p>
          <p v-if="active === 1">{{ item.title }}</p>
          <p v-if="active === 1">{{ item.created_at }}</p>
          <p v-if="active === 1">{{ item.answer_count }}</p>
          <p v-if="active === 1">{{ item.like_count }}</p>
          <p v-if="active === 1" @click="onClick(item.id)">查看</p>
          <p v-if="active === 2">{{ item.name }}</p>
          <p v-if="active === 2">{{ item.search_count }}</p>
        </div>
      </div>
    </div>

    <el-dialog v-model="questionInfo.visible" custom-class="c-dialog-mini" destroy-on-close append-to-body>
      <div class="dialog-title">
        <h4>详情</h4>
        <img @click="questionInfo.visible = false" :src="require('@/assets/images/dialog_close_btn.png')" alt="" />
      </div>
      <div class="container">
        <div class="quesion-wrap">
          <img class="icon" :src="require('./../images/question_icon.png')" alt="" />
          <div class="quesion">
            <h3>{{ questionInfo.info.title }}</h3>
            <p>{{ questionInfo.info.desc }}</p>
            <div>
              <img :src="require('./../images/like_icon.png')" alt="" />
              {{ questionInfo.info.like_count || 0 }}
              <img :src="require('./../images/count_icon.png')" alt="" />
              {{ questionInfo.info.answer_count || 0 }}
              <span>{{ questionInfo.info.created_at }}</span>
            </div>
          </div>
        </div>
        <div class="answer-wrap" v-for="item in questionInfo.list" :key="item.id">
          <img class="icon" :src="require('./../images/answer_icon.png')" alt="" />
          <div class="answer">
            <h3>{{ item.answer }}</h3>
            <p>{{ item.created_at }}</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, nextTick } from 'vue'
import cSelect from './../components/cSelect'
import dateSelect from './../components/dateSelect'
import btns from './../components/btns'
import { getQuestionList, getSearchList, getQuestionInfo, getAnswerInfo } from '@/api/jnt'
import { downloadAs } from '@/util/tools'

const props = defineProps({
  active: {
    type: Number,
    default: 1
  }
})

const formData = reactive({
  date: '',
  sort: null,
  sortEnum: {
    'answer_count asc': '评论数正序',
    'answer_count desc': '评论数倒序',
    'like_count asc': '点赞数正序',
    'like_count desc': '点赞数倒序',
  },
  sortEnum2: {
    'search_count asc': '搜索次数正序',
    'search_count desc': '搜索次数倒序',
  }
})

const isInit = ref(false)
const title1 = ref(['序号', '用户', '标题', '提问时间', '评论数', '点赞数', '操作'])
const title2 = ref(['序号', '搜索关键词', '搜索次数'])
const state = reactive({
  list: [],
  finish: false,
  loading: false,
  page: 1,
  pageSize: 10,
})

const questionInfo = reactive({
  visible: false,
  info: {},
  list: {},
  id: null
})
const getList = async () => {
  state.loading = true
  const result = props.active === 1 ?  await getQuestionList({
    page: state.page,
    pagesize: state.pageSize,
    search_order: formData.sort,
    search_ats: formData.date
  }) : await getSearchList({
    page: state.page,
    pagesize: state.pageSize,
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
const questionDetail = async () => {
  const result = await getQuestionInfo({
    id: questionInfo.id
  })
  questionInfo.info = result.info
  const answerR = await getAnswerInfo({
    id: questionInfo.id,
    page: 1,
    pagesize: 999
  })
  questionInfo.list = answerR.data
}
const onExport = async () => {
  const result = props.active === 1 ? await getQuestionList({
    page: state.page,
    pagesize: state.pageSize,
    search_order: formData.sort,
    search_ats: formData.date,
    is_export: 1
  }) : await getSearchList({
    page: state.page,
    pagesize: state.pageSize,
    search_ats: formData.date,
    is_export: 1
  })
  downloadAs(result, `${new Date().toLocaleString()}${props.active === 1 ? '在线咨询详情' : '搜索关键词详情'}.xls`, 'application/vnd.ms-excel');
}
const onReset = () => {
  formData.date = ''
  formData.sort = null
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
const onClick = (id) => {
  questionInfo.id = id
  questionInfo.list = []
  questionInfo.info = {}
  questionInfo.visible = true
  questionDetail()
}
watch(() => props.active, () => {
  onReset()
})
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
        p:nth-of-type(7) {
          cursor: pointer;
          color: #22C4FF;
        }
      }
    }
  }
}
.dialog-title {
  display: flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  h4 {
    flex: 1;
    width: 400px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    font-weight: 500;
  }
  img {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
}

.container {
  overflow: scroll !important;
  padding: 24px 0 12px !important;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.quesion-wrap {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .quesion {
    width: 0;
    flex: 1;
    h3 {
      color: #fff;
      line-height: 22px;
      margin-bottom: 8px;
      font-size: 16px;
    }
    p {
      line-height: 20px;
      min-height: 20px;
      color: #A1CEEF;
      font-size: 14px;
    }
    div {
      display: flex;
      align-items: center;
      height: 16px;
      line-height: 16px;
      color: #A1CEEF;
      font-size: 14px;
      padding: 16px 0;
      img {
        width: 16px;
        height: 16px;
        padding: 0 16px;
        &:nth-of-type(1) {
          padding-left: 0;
        }
      }
      span {
        margin-left: 60px;
      }
    }
  }
}
.answer-wrap {
  display: flex;
  padding-top: 20px;
  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .answer {
    width: 0;
    flex: 1;
    h3 {
      color: #fff;
      line-height: 22px;
      margin-bottom: 8px;
      font-size: 16px;
    }
    p {
      line-height: 20px;
      min-height: 20px;
      color: #A1CEEF;
      font-size: 14px;
    }
  }
}
</style>
