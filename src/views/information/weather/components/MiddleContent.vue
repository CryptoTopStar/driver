<template>
  <div class="main">
    <div class="nav">
      <div :class="state.avtiveIndex === 0 ? 'active' : ''" @click="change(0)">
        灾害分布图
      </div>
      <div :class="state.avtiveIndex === 1 ? 'active' : ''" @click="change(1)">
        风险等级图
      </div>
    </div>
    <div class="content">
      <div v-if="state.avtiveIndex === 0">
        <div class="top">
          <iframe
            id="gisIframe"
            title="灾害分布图"
            width="100%"
            height="100%"
            ref="gisIframe"
            src="/iframe/JS_WEATHER_CYZY.html"
          >
          </iframe>
          <div class="tabList1">
            <img src="@/assets/images/infomation/weather/disaster.png" alt="" />
            <span>历史受灾情况</span>
          </div>
        </div>
      </div>
      <div v-if="state.avtiveIndex === 1">
        <div class="top">
          <iframe
            id="gisIframeRight"
            title="风险等级图"
            width="100%"
            height="100%"
            ref="gisIframeRight"
            src="/iframe/JS_WEATHER_FXXPJ.html"
          >
          </iframe>
          <div class="riskTab">
            <div class="stack">轻度风险区</div>
            <div class="stack">中度风险区</div>
            <div class="stack">重度风险区</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <Label label="预警信息" :isLang="true"></Label>
        <div class="_list1">
          <div class="_list1-top">
            <div class="name">预警类型</div>
            <div class="level">预警等级</div>
            <div class="info">详情</div>
            <div class="time">预警发布时间</div>
            <div class="name">预警发布单位</div>
          </div>
          <div
            v-if="list.length > 0"
            class="_item-main"
            :style="
              '--scroll: ' +
              (list.length * 1 - 3 > 0 ? list.length * 1 - 3 : 0) +
              ';--time: ' +
              (list.length * 1 - 3 > 0 ? list.length * 1 - 3 : 0)
            "
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              :class="index % 2 == 0 ? '_item' : '_item _item-select'"
              @click="showDetail(item)"
            >
              <div class="name text-over1">{{ item.typeName }}</div>
              <div class="level text-over1">{{ item.severity }}</div>
              <div class="info text-over1">{{ item.text }}</div>
              <div class="time text-over1">
                {{ item.pubTime }}
              </div>
              <div class="name text-over1">{{ item.sender }}</div>
            </div>
          </div>

          <div v-else class="_item-main flex-ajc">
            <img
              src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png"
              class="_empty"
            />
            <div class="_empty-title">暂无数据</div>
          </div>

          <div v-if="listShow" class="list-show">
            <img
              src="@/assets/images/infomation/weather/close.png"
              @click="listShow = false"
            />
            <!--  <img src="@/assets/images/infomation/weather/list-bg.png" />
            
            <img src="@/assets/images/infomation/weather/list-bg.png" /> -->

            <div class="content">{{ listObj.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, shallowRef, ref } from "vue";
import BarChart from "@/components/AcChart/Chart/BarChart.vue";
import RadarChart from "@/components/AcChart/Chart/RadarChart";
import Label from "@/components/Label";
import {
  getResourceDistribution,
  getResourceDistributionDashboard,
} from "@/api/api";

import * as echarts from "echarts";
import { useRoute } from "vue-router";
import axios from "axios";

const IFRAME_METHODS = ["gisMapMessage", "gisLayerMessage", "gisSreachMessage"];
export default {
  name: "middleContent",
  components: { Label, BarChart, RadarChart },
  props: {
    type: {
      type: String,
      default: "fungi",
    },
  },
  setup(props) {
    const {
      proxy: {
        $tools: { fitChartSize, sendMessage },
      },
    } = getCurrentInstance();
    const hfKey = "95faeb082d704c31aced2cab95b65321";
    const location = "101211005";
    const Route = useRoute();
    const list = ref([]);
    const listShow = ref(false);
    const listObj = ref({});

    const state = reactive({
      avtiveIndex: 0,
      navTab: [
        { title: "总面积", value: "0", unit: "亩" },
        { title: "总产量", value: "0", unit: "吨" },
        { title: "总加工量", value: "0", unit: "吨" },
        { title: "总产值", value: "0", unit: "万元" },
      ],
      navTabMiddle: [
        { title: "最适宜种植面积", value: "25247", unit: "亩" },
        { title: "禁种区种植面积", value: "31314", unit: "亩" },
        { title: "适宜种植区面积", value: "32936", unit: "亩" },
        { title: "不适宜种植区面积", value: "19075", unit: "亩" },
      ],
      spyMoneyChartOption: shallowRef({}), // 资源产业分布
      iconSelected: ["家庭农场", "合作社", "企业"],
      iconSelectedMiddle: [
        "很适宜种植区",
        "适宜种植区",
        "不适宜种植区",
        "禁种区",
      ],
      middleIcon: [
        {
          name: "家庭农场",
          leftImg: require("@/assets/images/icon/tab_icon1.png"),
          iconActive: require("@/assets/images/icon/tab_icon1_active.png"),
          icon: require("@/assets/images/icon/tab_icon1_no_active.png"),
          count: {
            fungi: 10, // 食用菌
            kiwi: 26, // 猕猴桃
          },
        },
        {
          name: "合作社",
          leftImg: require("@/assets/images/icon/tab_icon2.png"),
          iconActive: require("@/assets/images/icon/tab_icon2_active.png"),
          icon: require("@/assets/images/icon/tab_icon2_no_active.png"),
          count: {
            fungi: 6, // 食用菌
            kiwi: 1, // 猕猴桃
          },
        },
        {
          name: "企业",
          leftImg: require("@/assets/images/icon/tab_icon3.png"),
          iconActive: require("@/assets/images/icon/tab_icon3_active.png"),
          icon: require("@/assets/images/icon/tab_icon3_no_active.png"),
          count: {
            fungi: 8, // 食用菌
            kiwi: 4, // 猕猴桃
          },
        },
      ],
      middleIconMiddle: [
        {
          name: "很适宜种植区",
          leftImg: "rgba(56, 214, 114, 1)",
          iconActive: require("@/assets/images/icon/syxpj/icon1_active.png"),
          icon: require("@/assets/images/icon/syxpj/icon1.png"),
        },
        {
          name: "适宜种植区",
          leftImg: "rgba(36, 209, 253, 1)",
          iconActive: require("@/assets/images/icon/syxpj/icon2_active.png"),
          icon: require("@/assets/images/icon/syxpj/icon2.png"),
        },
        {
          name: "不适宜种植区",
          leftImg: "rgba(234, 221, 64, 1)",
          iconActive: require("@/assets/images/icon/syxpj/icon3_active.png"),
          icon: require("@/assets/images/icon/syxpj/icon3.png"),
        },
        {
          name: "禁种区",
          leftImg: "rgba(255, 91, 43, 1)",
          iconActive: require("@/assets/images/icon/syxpj/icon4_active.png"),
          icon: require("@/assets/images/icon/syxpj/icon4.png"),
        },
      ],
      climateChartOption: {}, // 气候
      terrainChartOption: {}, // 地形
    });
    const change = (val) => {
      state.avtiveIndex = val;
    };
    const changeSelected = (name) => {
      let newArr = state.iconSelected;
      if (newArr.indexOf(name) > -1) {
        newArr.splice(
          newArr.findIndex((item) => item === name),
          1
        );
      } else {
        newArr.push(name);
      }
      // 触发地图事件
      let arr = [...state.iconSelected];
      let message = { key: "addMarkerByNames", value: { names: arr } };
      sendMessage("gisLayerMessage", message);
    };
    const changeSelectedMiddle = (name) => {
      let newArr = state.iconSelectedMiddle;
      if (newArr.indexOf(name) > -1) {
        newArr.splice(
          newArr.findIndex((item) => item === name),
          1
        );
      } else {
        newArr.push(name);
      }
      // 触发地图事件
      let arr = [...state.iconSelectedMiddle];
      let message = { key: "addMarkerByNames", value: { names: arr } };
      sendMessage("gisLayerMessage", message);
    };
    // 处理产业资源分布
    const handleSpyData = (data) => {
      let spyXAxisData = [];
      let obj = {};
      let y1Data = [];
      let y2Data = [];
      let y3Data = [];
      data.forEach((item) => {
        obj[item.xzjd] = {
          name: item.xzjd,
          familyCount: 0,
          coopreateCount: 0,
          companyCount: 0,
        };
      });
      data.forEach((item) => {
        if (item.type == "家庭农场") {
          obj[item.xzjd].familyCount = item.count || 0;
        } else if (item.type == "合作社") {
          obj[item.xzjd].coopreateCount = item.count || 0;
        } else {
          obj[item.xzjd].companyCount = item.count || 0;
        }
      });
      for (let i in obj) {
        spyXAxisData.push(i);
        y1Data.push(Number(obj[i].familyCount)); // 家庭农场
        y2Data.push(Number(obj[i].coopreateCount)); // 合作社
        y3Data.push(Number(obj[i].companyCount)); // 企业
      }
      // console.log(y1Data)
      // console.log(y2Data)
      // console.log(y3Data)
      state.spyMoneyChartOption = {
        dataZoom: [
          {
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            show: false, // 是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 9, // 一次性展示多少个。
          },
        ],
        grid: {
          x: 70,
          y: 70,
          left: fitChartSize(50),
          right: fitChartSize(20),
          top: fitChartSize(30),
          bottom: 0,
          containLabel: true,
        },
        tooltip: {
          formatter:
            "{b0}<br />{a0}: {c0}家<br />{a1}: {c1}家<br />{a2}: {c2}家",
          textStyle: {
            color: "rgba(255, 255, 255, .8)",
          },
          borderWidth: "0",
          borderColor: "rgba(7,38,108, 1)",
          backgroundColor: "rgba(7,38,108,1)", //通过设置rgba调节背景颜色与透明度
        },
        legend: {
          show: true,
          top: fitChartSize(-5),
          itemGap: fitChartSize(20),
          iitemWidth: fitChartSize(16), // 宽
          itemHeight: fitChartSize(16), // 高
          selectedMode: false,
          data: [
            {
              name: "家庭农场",
              icon: "square",
              itemStyle: {
                color: "#24D1FD",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
            {
              name: "合作社",
              icon: "square",
              itemStyle: {
                color: "#B88BFC",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
            {
              name: "企业",
              icon: "square",
              itemStyle: {
                color: "#EADD40",
              },
              textStyle: {
                color: "#fff",
                fontSize: fitChartSize(16),
              },
            },
          ],
        },
        xAxis: {
          type: "category",
          data: spyXAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(204, 204, 204, .5)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: 0, //倾斜度 -90 至 90 默认为0
            margin: 6,
            fontSize: fitChartSize(12),
            color: "#ffffff",
          },
        },
        yAxis: {
          type: "value",
          name: "家",
          min: 0,
          axisLine: {
            show: false,
          },

          axisLabel: {
            interval: 0,
            show: true,
            fontSize: fitChartSize(12),
            showMaxLabel: false,
            color: "#ffffff",
          },
          splitLine: {
            show: true,
            showMaxLine: false,
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,.3)",
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["transparent", "transparent"],
            },
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          boundaryGap: ["20%", "20%"],
        },
        series: [
          {
            name: "家庭农场",
            type: "bar",
            stack: "Ad",
            barWidth: fitChartSize(8),
            label: {},
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#24D1FD",
                },
                {
                  offset: 1,
                  color: "#24D1FD",
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y1Data,
          },
          {
            name: "合作社",
            type: "bar",
            stack: "Ad",
            label: {},
            barWidth: fitChartSize(8),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#B88BFC",
                },
                {
                  offset: 1,
                  color: "#B88BFC",
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y2Data,
          },
          {
            name: "企业",
            type: "bar",
            stack: "Ad",
            label: {},
            barWidth: fitChartSize(8),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#EADD40",
                },
                {
                  offset: 1,
                  color: "#EADD40",
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y3Data,
          },
        ],
      };
    };
    // 监听函数，接收一个参数--Event事件对象
    const receiveMsg = (e) => {
      const type = e.data.type;
      if (!IFRAME_METHODS.includes(e.data.type)) return;
      // let obj = e.data;
      const { key, value } = e.data.data;
      // 地图交互消息监听
      if (type == "gisMapMessage") {
        if (key == "initInfo" && value) {
          // initType为true时，map初始化成功
          let arr = [...state.iconSelected];
          let message = { key: "addMarkerByNames", value: { names: arr } };
          sendMessage("gisLayerMessage", message);
        }
      }
    };

    // 这里获取到天气类型
    const getWeather = () => {
      // 这里获取近7日最高温度、7日最低温度、7日降雨量
      axios
        .get(
          "https://devapi.qweather.com/v7/warning/now?location=" +
            location +
            "&key=" +
            hfKey
        )
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            let _list = res.data.warning;
            for (let item of _list) {
              item.pubTime = item.pubTime.replace("T", " ").substring(0, 16);
              if (item.severity == "Blue") {
                item.severity = "蓝色";
              } else if (item.severity == "Yellow") {
                item.severity = "黄色";
              } else if (item.severity == "Orange") {
                item.severity = "橙色";
              } else if (item.severity == "Red") {
                item.severity = "红色";
              } else if (item.severity == "Minor") {
                item.severity = "Ⅵ级/一般";
              } else if (item.severity == "Moderate") {
                item.severity = "Ⅲ级/较重";
              } else if (item.severity == "Severe") {
                item.severity = "Ⅱ级/严重";
              } else if (item.severity == "Extreme") {
                item.severity = "Ⅰ级/特别严重";
              } else {
                item.severity = "未知";
              }
            }
            list.value = _list;
          }
        });
    };

    // 点击展示详情页面
    const showDetail = (item) => {
      // console.log(item);
      listShow.value = true;
      listObj.value = item;
    };

    onMounted(() => {
      getResourceDistributionDashboard({ type: props.type }).then((res) => {
        if (res.code === 0) {
          state.navTab[0].value = res.data.total_area; // 总面积
          state.navTab[1].value = res.data.total_weight; // 总产量
          state.navTab[2].value = res.data.total_process; // 总加工量
          state.navTab[3].value = res.data.total_value; //总产值
        }
      });
      // 获取产业资源分布
      getResourceDistribution({ type: props.type }).then((res) => {
        if (res.code === 0) {
          handleSpyData(res.data);
        }
      });
      if (window.addEventListener) {
        //为window注册message事件并绑定监听函数
        window.addEventListener("message", receiveMsg, false);
      } else {
        window.attachEvent("message", receiveMsg);
      }

      getWeather();
    });
    return {
      props,
      state,
      change,
      changeSelected,
      changeSelectedMiddle,
      showDetail,
      listShow,
      listObj,
      list,
    };
  },
};
</script>

<style scoped lang="scss">
@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.main {
  width: vw(872);
  height: 100%;

  .content {
    width: 100%;
    height: calc(100% - vh(200));

    .top {
      height: vh(650);
      width: 100%;
      position: relative;
      //background: url("~@/assets/images/ani.gif") no-repeat;
      //background-size: 100% 100%;

      .tabList,
      .tabListMiddle {
        position: absolute;
        right: vw(30);
        bottom: vw(40);
        height: vh(110);
        width: vw(135);
        padding: vh(20) vh(20);
        background: url("~@/assets/images/tab_bg.png") no-repeat;
        background-size: 100% 100%;

        .tabItem {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: vh(17);

          .left {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
              width: vw(22);
              height: vw(22);
            }

            .stone {
              width: vw(18);
              height: vw(18);
              border-radius: vw(2);
              margin-right: vw(12);
            }

            span {
              display: block;
              color: #a1ceef;
              font-size: vh(16);
            }
          }

          .right {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            img {
              width: vw(15);
              height: vw(15);
              cursor: pointer;
            }
          }
        }
      }

      .tabList1 {
        position: absolute;
        right: vw(30);
        bottom: vw(40);
        height: vh(34);
        // width: vw(135);
        padding: vh(18) vh(32) vh(18) vh(16);
        background: url("~@/assets/images/tab_bg.png") no-repeat;
        background-size: 100% 100%;
        display: block;
        color: #a1ceef;
        font-size: vh(16);
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: vw(22);
          height: vw(22);
          margin-right: vw(12);
        }
      }

      .tabListMiddle {
        height: vh(130);
        width: vw(135);
      }

      #gisIframe,
      #gisIframeRight,
      #gisIframeMiddle {
        outline: none;
        border: none;
        margin-top: vh(140);
      }

      #gisIframe,
      #gisIframeRight {
        margin-top: 0;
      }

      .nav {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: vh(180);
        padding-top: vh(20);
        display: flex;
        justify-content: space-between;

        .navTab {
          width: vw(372);
          height: vh(106);
          background: url("~@/assets/images/nav_bg.png") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: vh(176);

          div:first-of-type {
            width: 100%;
            text-align: center;
            font-size: vh(20);
            color: #fff;
          }

          div:last-of-type {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
              display: block;

              &:first-of-type {
                font-family: HuXiaoBoNanShenTi;
                color: #28e8fe;
                font-size: vh(26);
              }
            }
          }
        }
      }

      .riskTab {
        position: absolute;
        right: vw(30);
        bottom: vh(40);
        width: vw(140);
        height: vh(90);
        padding: vh(20);
        background: url("~@/assets/images/infomation/weather/risk-bg.png")
          no-repeat;
        background-size: 100% 100%;

        .stack {
          width: 100%;
          color: #fff;
          font-size: vh(16);
          display: flex;
          justify-content: flex-start;
          margin-bottom: vh(17);

          &:before {
            content: " ";
            margin-right: vw(15);
            width: vw(16);
            height: vw(16);
            border-radius: vw(2);
          }

          &:nth-of-type(1) {
            &:before {
              background: rgba(254, 250, 141, 1);
            }
          }

          &:nth-of-type(2) {
            &:before {
              background: rgba(255, 245, 0, 1);
            }
          }

          &:nth-of-type(3) {
            &:before {
              background: rgba(179, 158, 0, 1);
            }
          }
        }
      }
    }

    .bottom {
      width: 100%;
      height: vh(250);

      .echartsBox {
        width: 100%;
        height: vh(160);
        padding: vh(10);
        display: flex;
        justify-content: space-between;

        .legend {
          width: vw(80);
          padding-left: vw(20);
          span {
            color: rgba(161, 206, 239, 1);
            font-size: vh(14);
            display: block;
            text-align: center;
            &:before {
              content: " ";
              display: block;
              width: vw(18);
              height: vh(4);
              background: rgba(0, 255, 204, 1);
              margin: vh(8) auto;
            }
            &:first-of-type {
              margin-top: vh(50);
            }
            &:last-of-type {
              &:before {
                background: rgba(254, 213, 47, 1);
              }
            }
          }
        }

        .leftChart,
        .rightChart,
        .middleChart {
          width: 28%;
          height: 100%;
        }
        .rightChart {
          width: 30%;
        }
        .middleChart {
          border-right: vw(1) dashed rgba(31, 74, 134, 1);
        }

        .leftChart {
          border-right: vw(1) dashed rgba(31, 74, 134, 1);
        }
      }

      .risk {
        width: 100%;
        height: vh(160);
        padding: vh(10);
        align-items: center;
        display: flex;
        justify-content: space-between;

        .riskInfo {
          width: vw(250);
          height: vh(150);
          background: url("~@/assets/images/risk/bg.png") no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding: vh(15) vw(30);

          .top {
            width: 100%;
            height: vh(28);
            background: url("~@/assets/images/risk/nav_bg.png") no-repeat;
            background-size: 100% 100%;
            position: relative;

            span {
              display: block;
              color: #fff;
              font-size: vh(17);
              line-height: vh(28);
              font-weight: bold;
              width: 100%;
              text-align: left;
              padding-left: vw(32);
            }

            .img {
              position: absolute;
              left: vw(-10);
              top: vh(-4);
              width: vw(36);
              height: vw(36);
              background-size: 100% 100%;

              .imgBg {
                position: absolute;
                left: 0;
                top: 0;
                width: vw(36);
                height: vw(36);
                animation: rotate360 1.5s linear infinite;
              }

              img:nth-of-type(2) {
                height: vw(13);
                width: vw(13);
                margin: vw(12) auto;
                display: block;
              }
            }
          }

          p {
            margin-top: vh(10);
            font-size: vh(17);
            color: #fff;
            line-height: vh(22);
          }

          &:first-of-type {
            .top {
              .img {
                img:nth-of-type(2) {
                  height: vw(18);
                  width: vw(18);
                  margin: vw(9) auto;
                }
              }
            }
          }
        }
      }

      .money-spy-chart {
        width: 100%;
        height: vh(150);
        margin: vh(20) auto;
      }
    }
  }

  .nav {
    width: 100%;
    overflow: hidden;

    div {
      font-size: vh(20);
      width: vw(110);
      height: vh(30);
      text-align: center;
      line-height: vh(30);
      color: rgba(144, 182, 210, 1);
      float: left;
      padding-top: vh(10);
      padding-bottom: vh(5);
      margin-right: vw(25);
      cursor: pointer;
    }

    .active {
      border-bottom: vh(3) solid rgba(35, 207, 253, 1);
      color: rgba(35, 207, 253, 1);
    }
  }
}

._list1 {
  position: relative;
  width: 100%;
  // margin-top: vh(16);

  ._list1-top {
    width: 100%;
    height: vh(30);
    margin-top: vh(6);
    padding: 0 vw(30);
    box-sizing: border-box;
    font-size: vw(14);
    color: #51c2fe;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .time {
    width: vw(122);
    margin-right: vw(24);
    text-align: center;
    line-height: vh(19);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .name {
    width: vw(108);
    margin-right: vw(24);
    text-align: center;
    line-height: vh(19);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .level {
    width: vw(100);
    text-align: center;
    line-height: vh(19);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .info {
    flex: 1;
    margin-right: vw(24);
    margin-left: vw(24);
    text-align: center;
    line-height: vh(19);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .flex-ajc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: vh(180);
    padding: 0 vw(30);
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;

    ._empty {
      width: vw(130);
      height: vh(180);
    }

    ._empty-title {
      margin-top: vh(-20);
      font-size: vw(18);
      color: #bbd7fa;
    }
    ._item {
      width: 100%;
      height: vh(35);
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: vw(14);
      color: #fff;
      animation: garbage_right1_list calc(var(--time) * 4s) linear infinite
        normal;
      animation-fill-mode: forwards;
    }

    ._item-select {
      background-color: rgba(95, 175, 249, 0.16);
    }
    ._item:hover {
      background-color: rgba(95, 175, 249, 0.16);
    }
  }

  .list-show {
    position: absolute;
    z-index: 1;
    top: 0;
    left: calc(50% - vw(210));
    width: vw(420);
    min-height: vh(140);
    padding: vh(12) vw(30);
    box-sizing: border-box;

    background-color: rgba(2, 30, 95, 0.9);
    border-radius: 12px;
    overflow: hidden;

    // img:nth-of-type(1) {
    //   position: absolute;
    //   z-index: 3;
    //   top: 0;
    //   left: 0;
    //   width: vw(334);
    //   height: vh(60);
    // }
    img:nth-of-type(1) {
      position: absolute;
      z-index: 6;
      top: vh(7);
      right: vw(7);
      width: vw(10);
      width: vh(10);
      cursor: pointer;
    }
    .content {
      width: 100%;
      height: 100%;
      font-size: vh(14);
      color: #ffffff;
      line-height: vh(22);
      overflow: scroll;
    }
    .content::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

<style lang="scss">
@keyframes garbage_right1_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-35)));
  }
}
</style>

