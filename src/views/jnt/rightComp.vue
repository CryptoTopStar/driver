<template>
  <div class="right-comp">
    <component
      :is="navTitle"
      title="竞争性财政支农项目"
      @click="visible.agriculture = true"
    />
    <component
      :is="tableChart"
      :height="170"
      :list="jzxProject"
      :title="['项目阶段', '项目数', '审核通过率']"
    />
    <component
      :is="cTable"
      class="marginB20"
      :list="jzxList.list"
      :title="jzxList.title"
    />
    <component
      :is="navTitle"
      title="惠农补贴"
      @click="visible.subsidy = true"
    />
    <component
      :is="tableChart"
      :height="200"
      :list="hnbtProject"
      :title="['名称', '项目数', '审核通过率']"
    />
    <component
      :is="cTable"
      class="marginB20"
      :list="htntList.list"
      :title="htntList.title"
    />

    <component
      :is="navTitle"
      title="意见反馈"
      @click="visible.complaint = true"
    />

    <div class="report">
      <div class="item">
        <p>反馈总量</p>
        <p>{{ feedback.total || 0 }}</p>
        <p>项</p>
      </div>
      <div class="item">
        <p>处理率</p>
        <p>{{ feedback.total ? (feedback.isCheck / feedback.total * 100).toFixed(1) : 0 }}</p>
        <p>%</p>
      </div>
    </div>
    <component
      :is="cTable"
      :list="feedback.list"
      :title="feedback.title"
    />
    <component :is="complaint" />

    <!--  竞争性财政支农项目  -->
    <component :is="cDialog" title="竞争性财政支农项目" v-model="visible.agriculture">
      <template #table>
        <component :is="agricultureList" />
      </template>
    </component>
    <!--  惠农补贴  -->
    <component :is="cDialog" title="惠农补贴" v-model="visible.subsidy">
      <template #table>
        <component :is="subsidyList" />
      </template>
    </component>
    <!--  意见反馈  -->
    <component :is="cDialog" title="意见反馈" v-model="visible.complaint">
      <template #table>
        <component :is="complaintList" />
      </template>
    </component>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import navTitle from './components/navTitle'
import tableChart from './components/tableChart'
import complaint from './components/complaint'
import cTable from './components/cTable'
import cDialog from './components/cDialog'
import complaintList from './table/complaintList'
import subsidyList from './table/subsidyList'
import agricultureList from './table/agricultureList'
import { getFeedbackList, getJzxProjectOverview, getJzxProjectList, getHnOverview, getHnList } from '@/api/jnt'

const visible = reactive({
  complaint: false,
  subsidy: false,
  agriculture: false
})

const feedback = reactive({
  list: [],
  total: 0,
  isCheck: 0,
  title: [
    { name: '反馈内容', key: 'content', width: '40%' },
    { name: '反馈时间', key: 'created_at', width: '30%' },
    { name: '状态', key: 'is_check' },
  ]
})
const jzxList = reactive({
  list: [],
  title: [
    { name: '名称', key: 'project_name', width: '30%' },
    { name: '项目阶段', key: 'show_stage_txt' },
    { name: '项目状态', key: 'show_status_txt' },
    // { name: '办理实效', key: 'show_bl_aging_txt', width: '20%' },
  ]
})

const htntList = reactive({
  list: [],
  title: [
    { name: '创建人', key: 'real_name' },
    { name: '创建时间', key: 'submit_at' },
    { name: '状态', key: 'show_status_txt' },
    // { name: '办理时效', key: 'show_bl_aging_txt' }
  ]
})

const jzxProject = ref([
  { name: '申报中', value: 0, pass: 0 },
  { name: '实施中', value: 0, pass: 0 },
  { name: '验收中', value: 0, pass: 0 },
  { name: '资金拨付中', value: 0, pass: 0 }
])

const hnbtProject = ref([
  {  name: '有机肥补贴', value: 0, pass: 0, name1: '有机肥使用补贴' },
  { name: '秸秆综合利用', value: 0, pass: 0, name1: '秸秆综合利用补贴' },
  { name: '湖羊产业扶持', value: 0, pass: 0, name1: '湖羊产业补贴' },
  { name: '病死动物无害处理', value: 0, pass: 0, name1: '病死动物无害化处理补贴' },
  { name: '粮油适度规模经营补贴', value: 0, pass: 0, name1: '粮油适度规模经营补贴' }
])

// 反馈列表
const getFeedback = async () => {
  const result = await getFeedbackList({
    page: 1,
    pagesize: 10,
  })
  feedback.list = result.data
  feedback.total = result.total
  feedback.isCheck = result.is_check_num
}

// 竞争性财政支农项目总览
const getJzxProject = async () => {
  const result = await getJzxProjectOverview()
  jzxProject.value = [
    { ...jzxProject.value[0], ...result.xmsb },
    { ...jzxProject.value[1], ...result.xmss },
    { ...jzxProject.value[2], ...result.xmys },
    { ...jzxProject.value[3], ...result.zjbb }
  ]
  jzxProject.value.map(item => {
    item.value = item.project_num
    item.pass = item.pass_num
  })
}
// 竞争性财政支农项目列表
const getZjxList = async () => {
  const result = await getJzxProjectList({
    page: 1,
    pagesize: 10
  })
  result.data.map(item => {
    item.show_stage_txt = item?.project_status_show_txt?.show_stage_txt
    item.show_status_txt = item?.project_status_show_txt?.show_status_txt
    item.show_bl_aging_txt = item?.project_status_show_txt?.show_bl_aging_txt
  })
  jzxList.list = result.data
}
// 惠农补贴总览
const getHnbtInfo = async () => {
  const result = await getHnOverview()
  hnbtProject.value.map(item => {
    result.list.map(key => {
      if (key.name === item.name1) {
        item.value = key.project_num
        item.pass = key.pass_num
      }
    })
  })
}

// 惠农补贴列表
const getHnbtList = async () => {
  const result = await getHnList({
    page: 1,
    pagesize: 10
  })
  result.data.map(item => {
    item.real_name = item?.submit_userinfo?.real_name
    item.show_status_txt = item?.project_status_show_txt?.show_status_txt
    item.show_bl_aging_txt = item?.project_status_show_txt?.show_bl_aging_txt
    item.submit_at = item?.submit_at?.substr(0, 10)
  })
  htntList.list = result.data
}

onMounted(() => {
  getFeedback()
  getJzxProject()
  getZjxList()
  getHnbtInfo()
  getHnbtList()
})
</script>

<style scoped lang="scss">
.right-comp {
  width: 528px;
  .marginB20 {
    margin-bottom: 18px;
  }
  .report {
    display: flex;
    justify-content: center;
    padding: 14px 0 0;
    height: 22px;
    line-height: 22px;
    .item {
      display: flex;
      font-size: 16px;
      &:nth-of-type(2) {
         margin-left: 60px;
      }
      p:nth-of-type(2) {
        margin: 0 4px 0 16px;
        font-size: 20px;
        font-family: PangMenZhengDao;
        color: #27E0FD;
      }
    }
  }
}
</style>
