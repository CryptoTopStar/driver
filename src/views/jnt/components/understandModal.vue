<template>
  <div class="hugeModal understandModal1">
    <div class="shutModal" @click="shutModAction"></div>
    <div class="title">用户主体</div>
    <div class="searchMasterCon">
      <div class="fakeInput">
        <img src="https://img.hzanchu.com/acimg/7717e7e8bff18f7e3db10ef7ec0589aa.png" />
        <input placeholder="请输入名称搜索" v-model.trim="state.search_name" />
      </div>
      <div class="search" @click="searchAction">搜 索</div>
      <div class="reset" @click="resetAction">重 置</div>
    </div>
    <div class="rightTableCon">
      <el-row class="scrollHeader">
        <el-col :span="3">序号</el-col>
        <el-col :span="13">主体名称</el-col>
        <el-col :span="4">用地规模</el-col>
        <el-col :span="4">生产规模</el-col>
      </el-row>
      <div class="scrollCon" v-infinite-scroll="fetchSecond" :infinite-scroll-disabled="state.finish || state.loading">
        <el-row
          v-for="(item, index) in state.simpleArray"
          @click="clickCurrent(item, index)"
          :key="index"
          :class="['normalScrollItemHeight', state.clicked && state.activeIndex == index ? 'itemActive' : '']"
        >
          <el-col :span="3">
            <div class="centerCon">
              <div class="indexBg">{{ index + 1 }}</div>
            </div>
          </el-col>
          <el-col :span="13" class="ellipsis" :title="item.ztmc">{{ item.ztmc || '-' }}</el-col>
          <el-col :span="4">{{ item.ydgm || '-' }}</el-col>
          <el-col :span="4">{{ item.scgm || '-' }}</el-col>
        </el-row>
        <div class="nothingAlert" v-show="state.simpleArray && !state.simpleArray.length">
          <div class="describe">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { mbzYhhxUserList } from '@/api/jnt'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const state = reactive({
  selectArray: [],
  current: 0,
  simpleArray: [],
  currentPage: 1,
  pageSize: 10,
  finish: false,
  loading: false,
  showModal: true,
  clicked: false,
  activeIndex: 0
})
const choosenOne = computed(() => store.state.JiangShan.underModalData)
const shutModAction = () => {
  store.commit('setShowUnderModal', false)
}
const searchAction = () => {
  state.clicked = false
  state.activeIndex = 0
  state.simpleArray = []
  state.currentPage = 1
  state.loading = false
  state.finish = false
  fetchSecond()
}
const clickCurrent = (item, index) => {
  state.clicked = true
  state.activeIndex = index
  store.commit('setShowUnderDetailModal', true)
  store.commit('setUnderModalDetailData', item)
}
const resetAction = () => {
  state.search_name = ''
  state.simpleArray = []
  searchAction()
}
const fetchSecond = async () => {
  if (choosenOne && choosenOne.value.id) {
    state.loading = true
    const result = await mbzYhhxUserList({
      page: state.currentPage,
      pagesize: state.pageSize,
      category_id: choosenOne.value.id,
      search_name: state.search_name
    })
    state.loading = false
    if (result.total <= state.currentPage * state.pageSize) {
      state.finish = true
    } else {
      state.currentPage += 1
    }
    state.simpleArray = [...state.simpleArray, ...result.data]
  }
}
watch(
  () => choosenOne,
  (nval) => {
    searchAction()
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(() => {})
</script>

<style scoped lang="scss">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
::-webkit-scrollbar {
  display: none;
}
@keyframes recycle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.centerCon {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: 2px;
  box-sizing: border-box;
}
.indexBg {
  width: 34px;
  height: 34px;
  line-height: 34px;
  background-image: url(https://img.hzanchu.com/acimg/d5d8555caf6287e83ce6d5fa50069368.png);
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.rightTableCon {
  width: 596px;
  box-sizing: border-box;
  margin: 0 auto;
}
.scrollHeader {
  text-align: center;
  margin-bottom: 8px;
  height: 38px;
  font-size: 16px;
  color: #51ebff;
  line-height: 38px;
  box-sizing: border-box;
  background: rgba(0, 154, 255, 0.2);
  border: 1px solid;
  border-image: linear-gradient(180deg, rgba(143, 253, 255, 1), rgba(86, 250, 255, 0.05)) 1 1;
  & {
    :first-child {
    }
  }
}
.normalScrollItemHeight {
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-bottom: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  //   &:nth-child(odd) {
  //   }
  //   & {
  //     :nth-child(2) {
  //       text-align: center;
  //     }
  //     :nth-child(3) {
  //       text-align: center;
  //     }
  //   }
}
.normalScrollItemHeight:nth-child(odd) {
  background-color: rgba(0, 154, 255, 0.1);
}
.normalScrollItemHeight:hover {
  background: rgba(86, 250, 255, 0.14);
  border: 1px solid #56faff;
}
.itemActive {
  background: rgba(86, 250, 255, 0.14);
  border: 1px solid #56faff;
}
.scrollCon {
  height: 458px;
  overflow-y: auto;
  overflow-x: hidden;
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
  z-index: 99999;
  background-image: url(https://img.hzanchu.com/acimg/5224f1bc0085eaf6852be6bcb6ef0111.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding-top: 13px;
  box-sizing: border-box;
}
.shutModal {
  position: absolute;
  right: 3px;
  top: 0;
  background-image: url(https://img.hzanchu.com/acimg/0d65b20a49e068a94293f42e736259a4.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  //   color: #fff;
  //   font-size: 20px;
  //   font-weight: 500;
  cursor: pointer;
}
.title {
  text-align: center;
  margin: 0 auto;
  width: 120px;
  height: 26px;
  font-size: 26px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  line-height: 26px;
  letter-spacing: 3px;
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
    color: #bbd7fa;
    font-size: 16px;
    text-align: center;
    margin-top: 170px;
  }
}
.pagCon {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-top: -20px;
}
.searchMasterCon {
  display: flex;
  justify-content: center;
  margin-top: 53px;
  margin-bottom: 24px;
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
</style>
<style lang="scss">
.understandModal1 {
  .el-pagination__total {
    color: #fff !important;
  }
  .el-pagination__jump {
    color: #fff !important;
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
