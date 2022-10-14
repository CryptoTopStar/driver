<template>
  <div class="outer">
    <div class="viewer" ref="viewer">
      <BackBtn />
      <div class="head">
        {{ pageTitle }}
      </div>
      <!-- 数据资产 -->
      <DataLake v-show="curIndex === 1" />
      <div class="center" v-show="curIndex === 2 || curIndex === 3">
        <div class="left">
          <!-- 数据总计 -->
          <div class="total-asset" v-show="curIndex === 2 || curIndex === 3">
            <img src="./imgs/组7245@2x.png" alt="">
            <div class="info">
              <div>
                {{ curIndex === 2 ? '主题' : '专题'}}类目<span>{{ curIndex === 2 ? main_category_list.length : object_category_list.length }}</span>项
              </div>
              <div>
                总数据条数<span>{{ curIndex === 2 ? assetData.main_category_row : assetData.object_category_row }}</span>条
              </div>
            </div>
          </div>
          <!-- 菜单 -->
          <div class="handle-menu">
            <!-- 菜单 -->
            <div class="menu">
              <div class="list">
                <div
                  v-for="item in curIndex === 2 ? main_category_list : object_category_list"
                  :key="item"
                  @click="selectMenu(item)"
                >
                  <img :style="{opacity: curMenuIndex === item ? 1 : 0}" src="../../assets/rural-brain/sign.png" alt="">
                  <span :class="curMenuIndex === item ? 'is-select' : ''" >{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- 数据库表 -->
            <div class="table">
              <div class="search">
                <input type="text" v-model="searchKey" placeholder="请输入资源目录名称" @input="toSearch">
                <img src="../../assets/rural-brain/search.png" alt="">
              </div>
              <div class="content">
                <div class="total">
                  <p>资源目录 <span>{{ table_list.length }}</span> 个</p>
                  <p>数据条数 <span>{{ categoryData }}</span> 条</p>
                </div>
                <div class="table-list">
                  <template v-for="item in table_list" :key="item.information_name">
                    <div
                      :class="curTableIndex === item.information_name ? 'is-select' : 'item'"
                      v-show="item.information_name.length <= 11"
                      @click="selectTable(item)"
                    >
                      {{ item.information_name }}
                    </div>
                    <el-tooltip
                      effect="customized"
                      :content="item.information_name"
                      placement="right"
                    >
                      <div
                        :class="curTableIndex === item.information_name ? 'is-select' : 'item'"
                        v-show="item.information_name.length > 11"
                        @click="selectTable(item)"
                      >
                        {{ item.information_name }}
                      </div>
                    </el-tooltip>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表信息 -->
        <div class="table-info">
          <Title text="基本信息" />
          <div class="basic-info">
            <div class="left">
              <div class="item">
                <p>数据类型</p>
                <p>{{ basicInfo?.data_type || '--' }}</p>
              </div>
              <div class="item">
                <p>数据所在网络</p>
                <p>{{ basicInfo?.data_network || '--'  }}</p>
              </div>
              <div class="item">
                <p>更新频率</p>
                <p>{{ basicInfo?.update_frequency || '--'}}</p>
              </div>
            </div>
            <img class="bg" src="../../assets/rural-brain/basic-info.png" alt="">
            <div class="right">
              <div class="item">
                <p>开放属性</p>
                <p>{{ basicInfo?.data_public || '--'  }}</p>
              </div>
              <div class="item">
                <p>共享属性</p>
                <p>{{ basicInfo?.data_share || '--'  }}</p>
              </div>
              <div class="item">
                <p>数据表表名</p>
                <p>{{ basicInfo?.table_name || '--'  }}</p>
              </div>
            </div>
          </div>
          <Title text="数据表结构" />
          <div class="cconstruction" v-if="basicInfo?.table_struct && basicInfo?.table_struct?.length">
            <div class="th">
              <span>序号</span>
              <span>数据项名称</span>
              <span>字段名</span>
              <span>字段类型</span>
            </div>
            <div class="list">
              <ul>
                <li v-for="(item, index) in basicInfo.table_struct" :key="item.field">
                  <div>
                    <span>{{ index + 1 }}</span>
                  </div>
                  <div>{{ item.field }}</div>
                  <div>{{ item.field_name }}</div>
                  <div>{{ item.type }}</div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <!-- 计算中心（无权访问） -->
      <div class="limited" v-show="curIndex === 4">
        <p>您当前不在政务内网环境<br />请切换至政务内网再访问计算中心！</p>
      </div>
      <div class="bottom">
        <div
          :class="curIndex === item.id ? 'is-select' : ''"
          v-for="item in NAV_LIST"
          :key="item.id"
          @click="selectNav(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';
import { categoryList, tableList, tableInfo, categoryTableList } from '@/api/ruralBrain'
// import { getIp } from '@/api/api'
import _ from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import { NAV_LIST, ip_white_list } from './consts'
import DataLake from './data-lake/DataLake.vue'
import Title from './modules/Title.vue'
import BackBtn from '@/components/BackBtn'
import axios from 'axios';

const {
  proxy: {
    $tools: {segmentation},
  },
} = getCurrentInstance()
const Router = useRouter();
const route = useRoute();
const searchKey = ref('');
const viewer = ref(null);
const curIndex = ref(Number(route.query.index ?? 1));
const pageTitle = ref(NAV_LIST[curIndex.value - 1].text);
const curMenuIndex = ref('');
const curTableIndex = ref('');
const main_category_list = ref([]);
const assetData = ref('');
const object_category_list = ref([]);
const table_list = ref([]);
const basicInfo = ref({});
const categoryData = ref(0);

const getCagetoryList = async () => {
  const result = await categoryList();
  if(result.code === 0) {
    assetData.value = result.data;
    assetData.value.main_category_row = segmentation(assetData.value.main_category_row);
    assetData.value.object_category_row = segmentation(assetData.value.object_category_row);
    main_category_list.value = result.data.main_category_list;
    object_category_list.value = result.data.object_category_list;
    if(curIndex.value === 2) {
      curMenuIndex.value = result.data.main_category_list[0];
    } else {
      curMenuIndex.value = result.data.object_category_list[0];
    }
    getTableList(curMenuIndex.value);
  }
}

const getTableList = async (ca, ia) => {
  categoryData.value = 0;
  const result = await categoryTableList({
    category_name: ca,
    information_name: ia
  });
  if(result.code === 0) {
    table_list.value = result.data;
    if(result.data.length) {
      curTableIndex.value = result.data[0].information_name;
    }
    table_list.value.map(item => {
      categoryData.value = categoryData.value + item.total_row;
    })
    getTableInfo(curTableIndex.value);
  }
}

const getTableInfo = async (val) => {
  const result = await tableInfo({
    information_name: val
  })
  if(result.code === 0) {
    basicInfo.value = result.data;
  }
}

const toSearch = _.debounce(function() {
  curTableIndex.value = searchKey.value;
  // if(searchKey.value) {
  //   curTableIndex.value = searchKey.value;
  // } else {
  //   curTableIndex.value = table_list.value[0].information_name;
  // }
  getTableList(curMenuIndex.value, curTableIndex.value);
}, 1000, {leading: false, trailing: true})

const resize = _.debounce(function() {
  switch (route.query.mode) {
    case 'vertical':
      viewer.value.style.transform = `scale(${window.innerHeight / 1080})`
      break
    default: viewer.value.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
  }
}, 500, {leading: true, trailing: true})

/** 底部导航切换 */
const selectNav = async (item) => {
  searchKey.value = '';
  if(item.id === 4) {
    if(ip_white_list.includes('returnCitySN.cip')) {
      window.open('http://10.27.169.178');
    } else {
      curIndex.value = item.id;
      pageTitle.value = item.text;
    }
  } else {
    curIndex.value = item.id;
    Router.replace({ path: '/ruralBrain', query: {index: item.id} });
    pageTitle.value = item.text;
    if(curIndex.value !== 1) {
      if(curIndex.value === 2) {
        curMenuIndex.value = main_category_list.value[0];
      } else {
        curMenuIndex.value = object_category_list.value[0];
      }
      getTableList(curMenuIndex.value);
    }
  }
}

/** 主题切换 */
const selectMenu = (item) => {
  curMenuIndex.value = item;
  getTableList(curMenuIndex.value, searchKey.value);
}

/** 资源目录切换 */
const selectTable = (item) => {
  curTableIndex.value = item.information_name;
  getTableInfo(curTableIndex.value);
}

onMounted(() => {
  resize();
  getCagetoryList();
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style scoped lang="scss">
  .outer {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .viewer {
    background: url('../../assets/rural-brain/bg.webp') no-repeat;
    background-size: 100% 100%;
    transform-origin: 0 0;
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    transition: all .3s;
    overflow: hidden;
  }
  .head {
    width: 100%;
    height: 103px;
    background: url('../../assets/rural-brain/top-bg.png') no-repeat;
    background-size: 100% 100%;
    font-size: 42px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 70px;
    letter-spacing: 4px;
    text-align: center;
    position: absolute;
    top: 0;
  }
  .center {
    display: flex;
    align-items: center;
    padding: 0 52px 0 82px;
    margin-top: 73px;
    .left {
      .total-asset {
        height: 132px;
        overflow: hidden;
        background: url('./imgs/组7247@2x.png') no-repeat;
        background-size: 100%;
        display: flex;
        align-items: center;
        img {
          width: 52px;
          margin: 0 0 10px 10px;
        }
        .info {
          margin: 0 0 20px 10px;
          div {
            font-size: 22px;
            color: #fff;
            &:nth-of-type(2) {
              margin-top: 10px;
            }
            span {
              font-size: 36px;
              color: #39D9FF;
              padding: 0 3px;
              font-family: PangMenZhengDao;
            }
          }
        }
      }
      .handle-menu {
        display: flex;
        align-items: center;
        height: 790px;
        margin-top: 20px;
      }
    }
    .menu {
      overflow: hidden;
      height: 790px;
      .list {
        // margin-top: 20px;
        height: 100%;
        overflow-y: scroll;
        /* 去除滚动条 */
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar{
          display:none; /* ChromeSafari */
        }
        div {
          width: 195px;
          height: 46px;
          background: url('../../assets/rural-brain/theme.png') no-repeat;
          background-size: 100%;
          display: flex;
          align-items: center;
          margin-top: 40px;
          cursor: pointer;
          &:nth-of-type(1) {
            margin-top: 0;
          }
          img {
            width: 28px;
            margin-left: 10px;
            transition: all .3s;
          }
          span {
            font-size: 20px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            color: #39D9FF;
            line-height: 40px;
            letter-spacing: 2px;
            opacity: 0.6;
            transition: all .3s;
          }
          .is-select {
            opacity: 1;
            font-family: Microsoft YaHei-Semibold, Microsoft YaHei;
            font-weight: 600;
          }
        }
      }

    }
    .table {
      width: 280px;
      height: 790px;
      overflow: hidden;
      margin-left: 17px;
      .search {
        width: 280px;
        height: 38px;
        background: url('../../assets/rural-brain/search-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        margin: 0 auto;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding: 0 10px 0;
          font-size: 14px;
          line-height: normal;
          color: #A1CEEF;
          ::-webkit-input-placeholder {
            color: #9AC6E6;
          }
        }
        img {
          width: 16px;
          margin-right: 10px;
        }
      }
      .content {
        height: calc(790px - 58px);
        background: url('../../assets/rural-brain/table-list.png') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        margin-top: 20px;
        .total {
          width: 205px;
          height: 72px;
          background: url('../../assets/rural-brain/table-info.png');
          background-size: 100% 100%;
          margin: 26px auto 0;
          padding-top: 10px;
          p {
            font-size: 16px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            color: #CCEAFF;
            line-height: 26px;
            margin-bottom: 6px;
            text-align: center;
            span {
              font-size: 20px;
              color: #39D9FF;
              padding: 0 4px;
              font-weight: bold;
            }
          }
        }

        .table-list {
          width: 200px;
          max-height: calc(790px - 194px);
          margin: 16px auto 0;
          /* 去除滚动条 */
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          &::-webkit-scrollbar{
            display:none; /* ChromeSafari */
          }
          div {
            width: 180px;
            height: 40px;
            text-align: center;
            padding: 0 10px;
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 16px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            color: #A1CEEF;
            line-height: 40px;
            margin-top: 10px;
            cursor: pointer;
          }
          .item {
            &:hover {
              background: url('../../assets/rural-brain/table-name-hover.png') no-repeat;
              background-size: 100%;
            }
          }
          .is-select {
            background: url('../../assets/rural-brain/table-name.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .table-info {
      width: 1073px;
      height: 844px;
      background: url('../../assets/rural-brain/content.png') no-repeat;
      background-size: 100% 100%;
      margin-left: auto;
      padding: 0 56px;
      .title {
        margin-top: 32px;
      }
      .basic-info {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        .item {
          width: 160px;
          padding: 12px 0 12px;
          p:nth-of-type(1) {
            font-size: 16px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            color: #CCEAFF;
            line-height: 18px;
          }
          p:nth-of-type(2) {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #39D9FF;
            margin-top: 8px;
            line-height: 24px;
          }
        }
        .left {
          margin-top: 36px;
          .item {
            background: url('../../assets/rural-brain/left.png') no-repeat;
            background-size: 100% 100%;
            background-position: 0 0;
            text-align: right;
            padding-right: 14px;
            &:nth-of-type(2) {
              margin: 16px 0;
            }
          }
        }
        .bg {
          width: 468px;
        }
        .right {
          margin-top: 36px;
          .item {
            background: url('../../assets/rural-brain/right.png') no-repeat;
            background-size: 100% 100%;
            background-position: 0 0;
            text-align: left;
            padding-left: 14px;
            p:nth-of-type(2) {
              table-layout: fixed;
              word-break: break-all;
              overflow: hidden;
            }
            &:nth-of-type(2) {
              margin: 16px 0;
            }
          }
        }
      }
      .cconstruction {
        margin: 20px auto 0;
        width: 850px;
        .th {
          display: flex;
          align-content: center;
          justify-content: space-between;
          height: 36px;
          span {
            flex: 1;
            text-align: center;
            color: #A1CEEF;
            font-size: 16px;
          }
        }
        .list {
          overflow-y: scroll;
          max-height: 249px;
          /* 去除滚动条 */
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          &::-webkit-scrollbar{
            display:none; /* ChromeSafari */
          }
          ul {
            overflow: hidden;
            li {
              min-height: 15px;
              padding: 10px 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
              &:nth-of-type(odd) {
                background: rgba(25, 152, 248, 0.08);
              }
              div {
                color: #fff;
                font-size: 16px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                  display: block;
                  width: 22px;
                  text-align: center;
                  line-height: 22px;
                  font-size: 12px;
                  background: url('../../assets/rural-brain/circle.png') no-repeat;
                  background-size: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 63px;
    background: url('../../assets/rural-brain/bottom-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    div {
      width: 150px;
      height: 100%;
      font-size: 28px;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      font-weight: 400;
      color: #94C9E8;
      line-height: 63px;
      letter-spacing: 3px;
      text-align: center;
      cursor: pointer;
    }
    .is-select {
      color: #fff;
      background: url('../../assets/rural-brain/select.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .limited {
    width: 572px;
    height: 292px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url('./imgs/组7235@2x.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    p {
      font-size: 28px;
      font-family: Microsoft YaHei-Semibold, Microsoft YaHei;
      font-weight: 600;
      color: #fff;
      line-height: 39px;
    }
  }
</style>

<style lang="scss">
  .el-popper.is-customized {
    /* Set padding to ensure the height is 32px */
    width: 180px;
    padding: 6px 12px;
    border: 1px solid rgba(51, 143, 249, 1);
    color: #fff;
    font-size: 16px;
    background: rgba(7, 38, 108, 1);
  }
  .el-popper.is-customized .el-popper__arrow::before {
    border: 1px solid rgba(51, 143, 249, 1);
    background: rgba(7, 38, 108, 1);
    right: 0;
  }
</style>
