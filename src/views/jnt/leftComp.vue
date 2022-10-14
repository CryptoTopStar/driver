<template>
  <div class="left-comp">
    <component :is="navTitle" title="明白纸数据分析" @click="visible.analyse = true">
      <component :is="dateSelect" :width="225" :height="28" :show-bg="false" v-model="mbzDate" @click.stop />
    </component>

    <div class="times">
      <div class="item">
        <img class="icon" :src="require('./images/times_icon_1.png')" alt="" />
        <img class="icon-bg" :src="require('./images/times_wrap.png')" alt="" />
        <div>
          <p>在线咨询数</p>
          <p>
            <span>{{ mbzData.questionCount }}</span
            >次
          </p>
        </div>
      </div>
      <img class="times_border" :src="require('./images/times_border.png')" alt="" />
      <div class="item">
        <img class="icon" :src="require('./images/times_icon_2.png')" alt="" />
        <img class="icon-bg" :src="require('./images/times_wrap.png')" alt="" />
        <div>
          <p>搜索关键词</p>
          <p>
            <span>{{ mbzData.searchCount }}</span
            >次
          </p>
        </div>
      </div>
    </div>
    <component :is="timesChart" :list="mbzData.data" />

    <component :is="navTitle" title="明白纸用户画像" hideIncn />
    <Understand />
    <!-- <component :is="radioTab" :list="radio.list" v-model:active-index="radio.active" /> -->
    <!-- <component :is="userChart" :list="userData[radio.active]" :active="radio.active" /> -->
    <component :is="navTitle" title="项目储备" @click="visible.reserve = true" />
    <component :is="projectReserve" />

    <!-- 明白纸数据分析 -->
    <component :is="cDialog" title="明白纸数据分析" v-model="visible.analyse">
      <template #content>
        <div class="dialog-tab">
          <div class="item" :class="{ active: activeTab === 1 }" @click="activeTab = 1">在线咨询详情</div>
          <div class="item" :class="{ active: activeTab === 2 }" @click="activeTab = 2">搜索关键词详情</div>
        </div>
      </template>
      <template #table>
        <component :is="analyseList" :active="+activeTab" />
      </template>
    </component>

    <!-- 项目储备 -->
    <component :is="cDialog" title="项目储备" v-model="visible.reserve">
      <template #table>
        <component :is="reserveList" />
      </template>
    </component>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import navTitle from './components/navTitle'
import timesChart from './components/timesChart'
import radioTab from './components/radioTab'
import userChart from './components/userChart'
import dateSelect from './components/dateSelect'
import projectReserve from './components/projectReserve'
import cDialog from './components/cDialog'
import reserveList from './table/reserveList'
import analyseList from './table/analyseList'
import Understand from './components/understand.vue'
import { getMbzInfo } from '@/api/jnt'

const radio = reactive({
  list: ['性别分布', '年龄分布', '明白纸点击量', '项目申报种类分布'],
  active: 0
})
const mbzData = reactive({
  questionCount: 0,
  searchCount: 0,
  data: []
})
const userData = reactive([
  [
    { name: '男', value: 300 },
    { name: '女', value: 200 }
  ],
  [
    { name: '30岁以下', value: 100 },
    { name: '31岁-40岁', value: 260 },
    { name: '41岁-50岁', value: 100 },
    { name: '51岁以上', value: 40 }
  ],
  [
    { name: '5次以下', value: 200 },
    { name: '6-20次', value: 230 },
    { name: '21次以上', value: 70 }
  ],
  [
    { name: '竞争性财政支农项目', value: 22 },
    { name: '惠农补贴', value: 5 },
    { name: '暂未申请', value: 473 }
  ]
])
const activeTab = ref(1)
const mbzDate = ref('')
const visible = reactive({
  reserve: false,
  analyse: false
})

const getMzb = async () => {
  const result = await getMbzInfo({
    search_ats: mbzDate.value
  })
  mbzData.questionCount = result.section_question_count
  mbzData.searchCount = result.search_count
  mbzData.data = result.search_top_list
}
watch(
  () => mbzDate.value,
  () => {
    getMzb()
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.left-comp {
  width: 518px;
  .times {
    margin: 20px 0;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    .times_border {
      width: 1px;
      height: 40px;
    }
    .item {
      flex: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 16px;
        height: 16px;
        position: relative;
        left: 26px;
      }
      .icon-bg {
        width: 38px;
        height: 38px;
        animation: recycle 3s linear infinite;
      }
      div {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 16px;
          line-height: 22px;
          &:nth-of-type(2) {
            font-size: 14px;
            color: #90b6d2;
            span {
              color: #27e0fd;
              font-size: 22px;
              font-family: PangMenZhengDao;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }

  .radio-tab {
    margin-top: 26px;
  }

  @keyframes recycle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.dialog-tab {
  display: flex;
  color: #fff;
  .item {
    width: 144px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background-image: url('images/dialog_tab_bg.png');
    background-size: 100% 100%;
    margin-right: 20px;
    cursor: pointer;
  }
  .active {
    background-image: url('images/dialog_tab_active.png');
  }
}
</style>
