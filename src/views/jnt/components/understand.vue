<template>
  <div class="con understandCon1">
    <div class="topCon">
      <div class="selectArea">
        <template v-for="(item, index) in state.selectArray" :key="index">
          <div class="commonSelect notActive" :class="[state.current == index ? 'active' : '']" @click="changeCurrent(index)">{{ item.name }}</div>
        </template>
      </div>
      <div class="searchMasterCon">
        <div class="fakeInput">
          <img src="https://img.hzanchu.com/acimg/7717e7e8bff18f7e3db10ef7ec0589aa.png" />
          <input placeholder="请输入名称搜索" v-model.trim="state.search_name" />
        </div>
        <div class="search" @click="searchAction">搜 索</div>
        <div class="reset" @click="resetAction">重 置</div>
      </div>
    </div>
    <div class="bottomCon">
      <div class="chart-box">
        <div class="chart" ref="myRef"></div>
        <img class="chart_bg" :src="require('./../images/chart_cycle.png')" alt="" />
      </div>
      <div class="rightTableCon">
        <el-row class="scrollHeader">
          <el-col :span="10">名称</el-col>
          <el-col :span="6">占比</el-col>
          <el-col :span="8">用户主体数</el-col>
        </el-row>
        <div v-if="state.simpleArray && state.simpleArray.length" class="simpOuter">
          <el-row v-for="(item, index) in state.simpleArray" :key="index" :class="['normalScrollItemHeight']" @click="checkCurrent(item)">
            <el-col :span="10" class="ellipsis">{{ item.name }}</el-col>
            <el-col :span="6">{{ rateFormat((item.user_list_count / state.currentAllCount) * 100) }}%</el-col>
            <el-col :span="8">
              <div class="arrowCon">
                <div class="arrowNumber">{{ item.user_list_count }}</div>
                <img src="https://img.hzanchu.com/acimg/74c04e2540abc94a5312f007f2548b9b.png" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="nothingAlert" v-else>
          <div class="describe">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="pagCon">
      <el-pagination :current-page.sync="state.currentPage" small :page-size="state.pageSize" layout="total,prev, pager, next" :total="state.total" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script setup>
import { getFirstCategoryList, getSecondCategoryList } from '@/api/jnt'
import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
const store = useStore()
const state = reactive({
  selectArray: [],
  current: 0,
  simpleArray: [],
  currentPage: 1,
  pageSize: 4,
  total: 0,
  currentAllCount: 0,
  search_name: '',
  showModal: false
})
let myEcharts = null
const totalNumber = ref(0)
const myRef = ref(null)
const colors = ['#35F292', '#3AA0FF', '#00D9D6', '#FF6759','#FFC539', ]
const handleCurrentChange = (e) => {
  state.currentPage = e
  fetchSecond()
}
const rateFormat = (value) => {
  if (value || value == 0) {
    let fix = (Math.round(+value + 'e' + 2) / Math.pow(10, 2)).toFixed(2)
    return fix
  }
}
const checkCurrent = (item) => {
  state.showModal = true
  store.commit('setShowUnderModal', true)
  store.commit('setUnderModalData', item)
}
const searchAction = () => {
  state.currentPage = 1
  fetchSecond()
}
const resetAction = () => {
  state.currentPage = 1
  state.search_name = ''
  fetchSecond()
}
const fetchSecond = () => {
  let selectId = state.selectArray && state.selectArray.length && state.selectArray[state.current].id
  if (selectId) {
    getSecondCategoryList({
      pid: selectId,
      search_name: state.search_name,
      page: state.currentPage,
      pagesize: 4
    })
      .then((res) => {
        if (res) {
          state.currentAllCount = res.all_count
          state.simpleArray = res.data
          state.total = res.total
          state.all_count = res.all_count
          initEcharts([{ name: '男', value: 300 }])
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}
watch(
  () => state.current,
  (nval) => {
    state.currentPage = 1
    fetchSecond()
  },
  {
    immediate: true
  }
)

const initEcharts = (data) => {
  myEcharts = echarts.init(myRef.value)
  let total = 0
  //   data.map((item) => {
  //     total += item.value
  //   })
  //   totalNumber.value = total
  total = state.all_count
  myEcharts.setOption({
    tooltip: {
      show: false,
      trigger: 'item'
    },
    legend: {
      show: false
    },
    color: colors,
    title: {
      show: true,
      //   text: `{a|${'总数'}}{b|${total}}{a|人}`,
      text: `{a|${'用户主体数'}}\n{b|${total}}{a|个}`,
      left: '50%',
      top: '25%',
      textAlign: 'center',
      textStyle: {
        color: '#A1CEEF',
        rich: {
          a: {
            align: 'center',
            lineHeight: 24
          },
          b: {
            align: 'center',
            lineHeight: 24,
            fontSize: 24,
            padding: [0, 4, 0, 0],
            color: '#34E4FF',
            fontFamily: 'PangMenZhengDao'
          }
        }
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0%',
      containLabel: true
    },
    series: [
      {
        type: 'pie',
        silent: true,
        center: ['50%', '45%'],
        radius: ['60%', '70%'],
        emphasis: {
          label: {
            show: true,
            fontSize: 20
          }
        },
        label: {
          show: false,
          position: 'center',
          lineHeight: 28,
          formatter: (params) => {
            return [
              '{title|' + params.data.name + '}',
              // '{bule|' + (+params.data.value).toFixed(1) + '}{default|亩}',
              '{bule|' + ((+params.data.value / total) * 100).toFixed(1) + '}{default|%}'
            ].join('\n')
          },
          rich: {
            title: {
              color: '#A1CEEF',
              fontSize: 14
            },
            bule: {
              color: '#26E3FF',
              fontSize: 20,
              fontFamily: 'PangMenZhengDao',
              padding: [0, 4, 0, 0],
              textShadowBlur: 8,
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              textShadowColor: 'rgba(43, 228, 255, 0.3)'
            },
            default: {
              fontSize: 14,
              color: '#A1CEEF'
            }
          }
        },
        data: data
      },
      {
        type: 'pie',
        center: ['50%', '45%'],
        radius: ['53%', '60%'],
        itemStyle: {
          opacity: 0.2,
          borderWidth: 2,
          borderColor: 'transparent'
        },
        label: {
          show: false
        },
        data: data
      }
    ]
  })
}

onMounted(() => {
  getFirstCategoryList()
    .then((res) => {
      state.selectArray = res.list
      fetchSecond()
    })
    .catch((err) => {
      console.log('err', err)
    })
})

const changeCurrent = (index) => {
  state.current = index
}
</script>

<style scoped lang="scss">
@keyframes recycle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.hugeModal {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto !important;
  width: 751px;
  height: 674px;
  z-index: 999999999;
  background-image: url(https://img.hzanchu.com/acimg/5224f1bc0085eaf6852be6bcb6ef0111.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.shutModal {
  position: absolute;
  right: 33px;
  top: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.nothingAlert {
  //   box-sizing: border-box;
  //   font-size: 16px;
  //     padding-top: 10px;
  //   text-align: center;
  //   //   width: 190px;
  //   //   height: 200px;
  //   width: 114px;
  //   height: 120px;
  //   margin: 0 auto;
  //   margin-top: 10px;
  //   background-image: url(https://img.hzanchu.com/acimg/ab22c36ffb394acc13280737238e498b.png);
  //   background-size: 100% 100%;
  //   background-size: cover;
  //   background-position: center center;
  //   background-repeat: no-repeat;
  .describe {
    text-align: center;
    color: #bbd7fa;
    text-align: center;
    margin-top: 50px;
    font-size: 14px;
    margin-bottom: 70px;
  }
}
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
.arrowCon {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  img {
    width: 16px;
    height: 16px;
  }
}
.arrowNumber {
}
.pagCon {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-top: -20px;
}
.scrollHeader {
  text-align: center;
  height: 30px;
  font-size: 14px;
  color: #76b9fc;
  line-height: 30px;
  box-sizing: border-box;
  & {
    :first-child {
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
}

.normalScrollItemHeight {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0, 154, 255, 0.1);
  margin-bottom: 4px;
  &:nth-child(1) {
    border-left: 2px solid #00d9d6;
    .el-col {
      &:nth-child(2) {
        color: #00d9d6;
      }
      &:nth-child(3) {
        color: #00d9d6;
      }
    }
  }
  &:nth-child(2) {
    border-left: 2px solid #3aa0ff;
    .el-col {
      &:nth-child(2) {
        color: #3aa0ff;
      }
      &:nth-child(3) {
        color: #3aa0ff;
      }
    }
  }
  &:nth-child(3) {
    border-left: 2px solid #35f292;
    .el-col {
      &:nth-child(2) {
        color: #35f292;
      }
      &:nth-child(3) {
        color: #35f292;
      }
    }
  }
  &:nth-child(4) {
    border-left: 2px solid #ffc539;
    .el-col {
      &:nth-child(2) {
        color: #ffc539;
      }
      &:nth-child(3) {
        color: #ffc539;
      }
    }
  }
  & {
    :nth-child(1) {
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }
    :nth-child(2) {
      text-align: center;
    }
    :nth-child(3) {
      text-align: center;
    }
  }
}
// .simpOuter {
//   & {
//     .normalScrollItemHeight {
//       :nth-child(odd) {
//         border-left: 1px solid #000;
//       }
//     }
//   }
// }
.con {
  height: 330px;
  width: 510px;
  box-sizing: border-box;
  padding-right: 40px;
  padding-top: 15px;
}
.chart-box {
  position: relative;
  margin-top: 32px;
  width: 180px;
  height: 180px;
}
.chart {
  width: 180px;
  height: 180px;
}
.chart_bg {
  position: absolute;
  top: 16%;
  left: 21%;
  width: 105px;
  height: 105px;
  animation: recycle 3s linear infinite;
}
.bottomCon {
  display: flex;
  justify-content: flex-start;
}
.rightTableCon {
  width: 290px;
  //   padding-left: 30px;
  //   width: 100%;
  padding-top: 20px;
  box-sizing: border-box;
}
.topCon {
  padding-left: 30px;
  box-sizing: border-box;
}
.selectArea {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}
.searchMasterCon {
  display: flex;
  justify-content: center;
  .fakeInput {
    width: 226px;
    height: 29px;
    border-radius: 4px;
    border: 1px solid #2ca2fc;
    margin-right: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding-left: 7px;
    box-sizing: border-box;
    img {
      width: 16px;
      height: 16px;
    }
    input {
      margin-left: 8px;
      width: 180px;
      background-color: transparent !important;
      border: none !important;
      color: #fff !important;
      /* Chrome/Opera/Safari */
      &::-webkit-input-placeholder {
        color: #fff;
      }
      /* Firefox 19+ */
      &::-moz-placeholder {
        color: #fff;
      }
      /* IE 10+ */
      &:-ms-input-placeholder {
        color: #fff;
      }
      /* Firefox 18- */
      &:-moz-placeholder {
        color: #fff;
      }
    }
  }
  .search {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(https://img.hzanchu.com/acimg/6c693755d5148ca1a6df01f70b9489b6.png);
    width: 61px;
    height: 26px;
    margin-right: 8px;
    text-align: center;
    font-size: 14px;
    line-height: 26px;
    cursor: pointer;
  }
  .reset {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(https://img.hzanchu.com/acimg/1b2d5937839fbf8e4079c946d8b259ae.png);
    width: 61px;
    height: 26px;
    font-size: 14px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
  }
}
.notActive {
  font-size: 16px;
  color: #8fc4ff;
  line-height: 24px;
  text-shadow: 1px 2px 10px rgba(17, 64, 126, 0.48);
  margin-right: 20px;
  background-image: url(https://img.hzanchu.com/acimg/dca94369408424cf5ecc44ed7028fc30.png);

  &:last-child {
    margin-right: 0;
  }
}
.active {
  background-image: url(https://img.hzanchu.com/acimg/88a85650a46f7e1f5f3934e1eba9e8ca.png);
  color: #fff;
}
.commonSelect {
  cursor: pointer;
  width: 79px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
<style lang="scss">
.understandCon1 {
  .el-pagination__total {
    color: #a6a7a9 !important;
  }
  .el-pagination__jump {
    color: #a6a7a9 !important;
  }
  .el-pagination button:disabled {
    background-color: transparent !important;
  }
  .el-pagination__editor.el-input .el-input__inner {
    background-color: transparent !important;
    color: #fff;
  }
  .el-pager li {
    background-color: transparent !important;
  }
  .el-pagination .btn-next {
    background-color: transparent !important;
    color: #fff !important;
  }
  .el-pagination .btn-prev {
    background-color: transparent !important;
    color: #fff !important;
  }
  .el-pager li.btn-quickprev {
    color: #fff !important;
  }
  .el-pager li.btn-quicknext {
    color: #fff !important;
  }
  .number {
    &.is-active {
      color: #fff !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      background-size: cover !important;
      background-image: url(https://img.hzanchu.com/acimg/eefadcc9288fc0801386043536eec8ce.png) !important;
    }
    color: #a6a7a9 !important;
  }
}
</style>
