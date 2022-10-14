<template>
  <div class="model-mark" v-if="visible">
    <div class="model">
      <div class="model-head">
        <div class="model-head-left">{{ title ?? '-' }}</div>
        <div class="model-head-content">
          <div :class="state.tabActive === 0 && 'active'" @click="tab(0)">今日数据</div>
          <div :class="state.tabActive === 1 && 'active'" @click="tab(1)">日均值</div>
        </div>
        <img @click="close" class="model-head-right"
             src="https://img.hzanchu.com/acimg/eb2a19519cff17ed2641cb74aa61d00d.png?" alt="">
      </div>
      <div class="model-content">
        <div class="model-content-info" v-for="(item,index) in state.list" :key="index">
          <div class="chart-title">
            <img :src="item.icon" alt="">
            <span>{{ item.title }}</span>
          </div>
          <div :class="['line-chart', (`chart${index}`)]" :id="`chart${index}`">
            <LineChartModel
                :chartId="`chart${index}`"
                :xData="item.xData"
                :chartData="item.yData"
                :yAxisTitle="item.unit"
                :toolTipTail="item.unit"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {watch, reactive} from "vue";
import LineChartModel from '@/components/AcChart/Chart/LineChartModel.vue'

export default {
  name: "index",
  components: {LineChartModel},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: []
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      tabActive: 0,
      list: [
        {
          icon: 'https://img.hzanchu.com/acimg/814b418c86d95daa8aaac527d029112a.png',
          title: '土壤温度',
          xData: [],
          yData: [],
          unit: '℃',
        },
        {
          icon: 'https://img.hzanchu.com/acimg/9040924c1475e058eee91a888e21dbe4.png',
          title: '土壤湿度',
          xData: [],
          yData: [],
          unit: '%',
        },
        {
          icon: 'https://img.hzanchu.com/acimg/6b2ab7ce466f482d3b927e3611fb94fc.png',
          title: '空气温度',
          xData: [],
          yData: [],
          unit: '℃',
        },
        {
          icon: 'https://img.hzanchu.com/acimg/27f4789818f673489bd5128e102b505b.png',
          title: '空气湿度',
          xData: [],
          yData: [],
          unit: '%RH',
        },
      ]
    })
    const close = () => {
      state.tabActive = 0
      emit("onClose");
    }
    const tab = (val) => {
      emit("tabChange", val);
      state.tabActive = val
    }
    const formatData = (base) => {
      // A_Temp (空气温度) A_Hum (空气湿度)
      // S_Temp (土壤温度) S_Hum (土壤湿度)
      state.list[3].xData = [];
      state.list[3].yData = [];
      base.A_Hum && base.A_Hum?.length > 0 && base.A_Hum.map(item => { // list[3]
        state.list[3].xData.push(item.date || item.hour)
        state.list[3].yData.push(item.data)
      })
      state.list[2].xData = [];
      state.list[2].yData = [];
      base.A_Temp && base.A_Temp?.length > 0 && base.A_Temp.map(item => { // list[2]
        state.list[2].xData.push(item.date || item.hour)
        state.list[2].yData.push(item.data)
      })
      state.list[1].xData = [];
      state.list[1].yData = [];
      base.S_Hum && base.S_Hum?.length > 0 && base.S_Hum.map(item => { // list[1]
        state.list[1].xData.push(item.date || item.hour)
        state.list[1].yData.push(item.data)
      })
      state.list[0].xData = [];
      state.list[0].yData = [];
      base.S_Temp && base.S_Temp?.length > 0 && base.S_Temp.map(item => { // list[0]
        state.list[0].xData.push(item.date || item.hour)
        state.list[0].yData.push(item.data)
      })
    }
    watch(() => props.data, (newVal) => {
      // console.log('s--')
      // console.log(newVal)
      newVal && props.visible && formatData(newVal)
    })
    return {
      state,
      close,
      tab,
      formatData
    }
  }
}
</script>

<style scoped lang="scss">
.model-mark {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 9999;

  .model {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 775px;
    height: 802px;
    background: url("https://img.hzanchu.com/acimg/34ffd65eb85d921a85fb06ec3d81fda5.png") no-repeat;
    background-size: contain;
    z-index: 9999;

    .model-head {
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 12px 0 32px;
      position: relative;

      .model-head-content {
        position: absolute;
        height: 100%;
        width: 300px;
        left: 0;
        top: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;

        div {
          cursor: pointer;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;

        }

        .active {
          background-image: url("https://img.hzanchu.com/acimg/766015d8915d2bd6479bf0929a5e28c3.png");
          background-size: 100% 100%;
        }
      }

      .model-head-left {
        font-size: 22px;
        color: #fff;
        padding-top: 4px;
      }

      .model-head-right {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }

    .model-content {
      width: 100%;
      height: 725px;
      box-sizing: border-box;
      padding: 27px 50px 0;
      overflow-y: auto;
      /* 修改滚动条样式 */
      &::-webkit-scrollbar {
        width: 0;
        /*设置滚动条的宽度*/
      }

      /* 滚动区域的样式 */
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        /*设置滚动条的圆角*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        /*设置内阴影*/
        background: rgb(81, 193, 238, 0.2);
        /*设置滚动条的颜色*/
      }

      /* 滚动条的背景样式 */
      &::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
        border-radius: 0;
      }

      .model-content-info {
        margin-bottom: 20px;
      }

      .line-chart {
        height: vh(150);
        margin: vh(10) auto;

      }

      .chart-title {
        width: 157px;
        height: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: linear-gradient(271deg, rgba(27, 87, 193, 0) 0%, rgba(27, 87, 193, 0.5019607843137255) 23%, #1B57C1 66%, rgba(27, 87, 193, 0) 100%);

        img {
          width: 24px;
          height: 24px;
          margin: 0 8px 0 12px;
        }

        span {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
