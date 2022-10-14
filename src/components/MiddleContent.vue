<template>
  <div class="main">
    <div class="nav">
      <div :class="state.avtiveIndex === 0 ? 'active':''" @click="change(0)">产业资源</div>
      <div v-show="type === 'kiwi'" :class="state.avtiveIndex === 1 ? 'active':''" @click="change(1)">适应性评价</div>
      <div :class="state.avtiveIndex === 2 ? 'active':''" @click="change(2)">风险性评价</div>
    </div>
    <div class="content">
      <div v-show="state.avtiveIndex === 0">
        <div class="top">
          <iframe
              id="gisIframe"
              title="产业资源"
              width="100%"
              height="80%"
              ref="gisIframe"
              :src="type === 'fungi'?'/iframe/JS_SYJ_CYZY.html':'/iframe/JS_MHT_CYZY1.html'"
          >
          </iframe>
          <div :class="['tabList',(type === 'kiwi' && 'tabListNew')]">
            <div class="tabItem" v-for="(item,index) in state.middleIcon" :key="index">
              <div class="left">
                <img :src="item.leftImg" alt="">
                <span>{{ item.name }}({{ item.count[props.type] }})</span>
              </div>
              <div class="right" @click="changeSelected(item.name)">
                <img v-if="state.iconSelected.indexOf(item.name) === -1" :src="item.icon" alt="">
                <img v-else :src="item.iconActive" alt="">
              </div>
            </div>
          </div>
          <div class="tabListNewSecond" v-if="type === 'kiwi'">
            <div class="tabItem" v-for="(item,index) in state.middleIconSecond" :key="index">
              <div class="left">
                <img :src="item.leftImg" alt="">
                <span>{{ item.name }}({{state.WLWData?.length ?? 0}})</span>
              </div>
              <div class="right" @click="changeSelectedSecond(item.name)">
                <img v-if="state.iconSelectedSecond.indexOf(item.name) === -1" :src="item.icon" alt="">
                <img v-else :src="item.iconActive" alt="">
              </div>
            </div>
          </div>
          <div class="nav">
            <div class="navTab" v-for="(item,index) in state.navTab" :key="index">
              <div>{{ item.title }}</div>
              <div>
                <span>{{ item.value }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <Label label="产业资源分布" :isLang="true"></Label>
          <div class="chart-container money-spy-chart" id="money-spy-chart">
            <BarChart
                chartId="money-spy-chart"
                :option="state.spyMoneyChartOption"
                :zoom="true"
            ></BarChart>
          </div>
        </div>
      </div>
      <div v-if="state.avtiveIndex === 1">
        <div class="top">
          <iframe
              id="gisIframeMiddle"
              title="适应性评价"
              width="100%"
              height="80%"
              ref="gisIframe"
              :src="type === 'fungi'?'':'/iframe/JS_MHT_SYXPJ.html'"
          >
          </iframe>
          <div class="tabListMiddle">
            <div class="tabItem" v-for="(item,index) in state.middleIconMiddle" :key="index">
              <div class="left">
                <div class="stone" :style="'background:'+ item.leftImg"></div>
                <span>{{ item.name }}</span>
              </div>
              <div class="right">
                <!--                <img v-if="state.iconSelectedMiddle.indexOf(item.name) === -1" :src="item.icon" alt="">-->
                <!--                <img v-else :src="item.iconActive" alt="">-->
              </div>
            </div>
          </div>
          <div class="nav">
            <div class="navTab" v-for="(item,index) in state.navTabMiddle" :key="index">
              <div>{{ item.title }}</div>
              <div>
                <span>{{ item.value }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <Label label="生态适宜性因子评价" :isLang="true"></Label>
          <div class="echartsBox">
            <div class="legend">
              <span>适宜临界值</span>
              <span>实际数值</span>
            </div>
            <div class="leftChart" id="RadarChart1">
              <RadarChart
                  chartId="RadarChart1"
                  :option="state.soilChartOption"
              ></RadarChart>
            </div>
            <div class="middleChart" id="RadarChart2">
              <RadarChart
                  chartId="RadarChart2"
                  :option="state.terrainChartOption"
              ></RadarChart>
            </div>
            <div class="rightChart" id="RadarChart3">
              <RadarChart
                  chartId="RadarChart3"
                  :option="state.climateChartOption"
              ></RadarChart>
            </div>
          </div>
        </div>
      </div>
      <div v-if="state.avtiveIndex === 2">
        <div class="top">
          <iframe
              id="gisIframeRight"
              title="风险性评估"
              width="100%"
              height="100%"
              ref="gisIframeRight"
              :src="type === 'fungi'?'/iframe/JS_SYJ_FXXPJ.html':'/iframe/JS_MHT_FXXPJ.html'"
          >
          </iframe>
          <div class="riskTab">
            <div class="stack">极低（0-20）</div>
            <div class="stack">较低（20-40）</div>
            <div class="stack">中等（40-60）</div>
            <div class="stack">较高（60-80）</div>
            <div class="stack">极高（80-100）</div>
          </div>
        </div>
        <div class="bottom">
          <Label label="风险性因子评价" :isLang="true"></Label>
          <div class="risk">
            <div class="riskInfo">
              <div class="top">
                <div class="img">
                  <img class="imgBg" :src="require('@/assets/images/risk/img_bg.png')" alt="">
                  <img :src="require('@/assets/images/risk/one.png')" alt="">
                </div>
                <span>致灾因子危害性</span>
              </div>
              <p>致灾因子危害性程度主要由江山市历年自然灾害的强度、频率决定</p>
            </div>
            <div class="riskInfo">
              <div class="top">
                <div class="img">
                  <img class="imgBg" :src="require('@/assets/images/risk/img_bg.png')" alt="">
                  <img :src="require('@/assets/images/risk/two.png')" alt="">
                </div>
                <span>孕灾环境敏感性</span>
              </div>
              <p>孕灾环境敏感性程度主要由研究地形高程和地形标准差决定</p>
            </div>
            <div class="riskInfo">
              <div class="top">
                <div class="img">
                  <img class="imgBg" :src="require('@/assets/images/risk/img_bg.png')" alt="">
                  <img :src="require('@/assets/images/risk/three.png')" alt="">
                </div>
                <span>承灾体易损性</span>
              </div>
              <p>承灾体易损性程度主要由灾害损失的自然及社会属性等指标决定</p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Model
        :visible="state.visible"
        :title='state.WLWName'
        :data="state.modelData"
        @onClose="modelClose"
        @tabChange="tabChange"
    />
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, shallowRef,} from "vue";
import BarChart from '@/components/AcChart/Chart/BarChart.vue'
import RadarChart from "@/components/AcChart/Chart/RadarChart";
import Label from "./Label";
import {
  getLandDayList,
  getLandList,
  getLandTimeList,
  getResourceDistribution,
  getResourceDistributionDashboard
} from "../api/api";
import Model from '@/components/model/index.vue'
import * as echarts from 'echarts'
import {useRoute} from "vue-router";
import {IFRAME_DATA} from "../util/data.d";

import {format,subMonths} from 'date-fns'
const IFRAME_METHODS = ["gisMapMessage", "gisLayerMessage", "gisSreachMessage"];
export default {
  name: "middleContent",
  components: {Label, BarChart, RadarChart, Model},
  props: {
    type: {
      type: String,
      default: 'fungi'
    }
  },
  setup(props) {
    const {
      proxy: {
        $tools: {fitChartSize, sendMessage},
      },
    } = getCurrentInstance()
    const Route = useRoute();
    const state = reactive({
      visible: false,
      WLWID:'', // 物联网设备ID
      WLWName:'', // 物联网设备 name
      WLWData:[], // 物联网设备
      modelData:[], // 物联网设备 日监测数据
      avtiveIndex: 0,
      navTab: [
        {title: '总面积', value: '0', unit: '亩'},
        {title: '总产量', value: '0', unit: '吨'},
        {title: '总加工量', value: '0', unit: '吨'},
        {title: '总产值', value: '0', unit: '万元'},
      ],
      navTabMiddle: [
        {title: '最适宜种植面积', value: '25247', unit: '亩'},
        {title: '禁种区种植面积', value: '31314', unit: '亩'},
        {title: '适宜种植区面积', value: '32936', unit: '亩'},
        {title: '不适宜种植区面积', value: '19075', unit: '亩'},
      ],
      spyMoneyChartOption: shallowRef({}), // 资源产业分布
      iconSelected: ['家庭农场', '合作社', '企业'],
      iconSelectedMiddle: ['很适宜种植区', '适宜种植区', '不适宜种植区', '禁种区'],
      iconSelectedSecond: ['物联网设备'],
      middleIcon: [
        {
          name: '家庭农场',
          leftImg: require('@/assets/images/icon/tab_icon1.png'),
          iconActive: require('@/assets/images/icon/tab_icon1_active.png'),
          icon: require('@/assets/images/icon/tab_icon1_no_active.png'),
          count: {
            fungi: 10, // 食用菌
            kiwi: 26 // 猕猴桃
          }
        },
        {
          name: '合作社',
          leftImg: require('@/assets/images/icon/tab_icon2.png'),
          iconActive: require('@/assets/images/icon/tab_icon2_active.png'),
          icon: require('@/assets/images/icon/tab_icon2_no_active.png'),
          count: {
            fungi: 6, // 食用菌
            kiwi: 1 // 猕猴桃
          }
        },
        {
          name: '企业',
          leftImg: require('@/assets/images/icon/tab_icon3.png'),
          iconActive: require('@/assets/images/icon/tab_icon3_active.png'),
          icon: require('@/assets/images/icon/tab_icon3_no_active.png'),
          count: {
            fungi: 8, // 食用菌
            kiwi: 4 // 猕猴桃
          }
        }
      ],
      middleIconSecond: [
        {
          name: '物联网设备',
          leftImg: require('@/assets/images/icon/tab_icon4.png'),
          iconActive: require('@/assets/images/icon/tab_icon4_active.png'),
          icon: require('@/assets/images/icon/tab_icon4_no_active.png'),
          count: {
            fungi: 10, // 食用菌
            kiwi: 26 // 猕猴桃
          }
        },
      ],
      middleIconMiddle: [
        {
          name: '很适宜种植区',
          leftImg: 'rgba(56, 214, 114, 1)',
          iconActive: require('@/assets/images/icon/syxpj/icon1_active.png'),
          icon: require('@/assets/images/icon/syxpj/icon1.png')
        },
        {
          name: '适宜种植区',
          leftImg: 'rgba(36, 209, 253, 1)',
          iconActive: require('@/assets/images/icon/syxpj/icon2_active.png'),
          icon: require('@/assets/images/icon/syxpj/icon2.png')
        },
        {
          name: '不适宜种植区',
          leftImg: 'rgba(234, 221, 64, 1)',
          iconActive: require('@/assets/images/icon/syxpj/icon3_active.png'),
          icon: require('@/assets/images/icon/syxpj/icon3.png')
        },
        {
          name: '禁种区',
          leftImg: 'rgba(255, 91, 43, 1)',
          iconActive: require('@/assets/images/icon/syxpj/icon4_active.png'),
          icon: require('@/assets/images/icon/syxpj/icon4.png')
        },
      ],
      climateChartOption: {}, // 气候
      terrainChartOption: {}, // 地形
      soilChartOption: {}, // 土壤
    })
    const change = (val) => {
      state.avtiveIndex = val
    }
    const modelClose = () => {
      state.visible = false
    }
    const changeSelected = (name) => {
      let newArr = state.iconSelected;
      if (newArr.indexOf(name) > -1) {
        newArr.splice(newArr.findIndex(item => item === name), 1)
      } else {
        newArr.push(name)
      }
      if (props.type === 'kiwi') {
        mapIconHandle()
      } else {
        // 触发地图事件
        let arr = [...state.iconSelected]
        let message = {"key": "addMarkerByNames", "value": {"names": arr}};
        sendMessage("gisLayerMessage", message);
      }
    }
    const mapIconHandle = () => {
      // 触发地图事件
      const selected = [...state.iconSelected, ...state.iconSelectedSecond];
      // 消息交互
      let message = {
        "key": "addMarkerByOption", "value": {
          "option": {
            data: null,
            names: selected
          }
        }
      };
      sendMessage('gisLayerMessage', message);
    }
    const changeSelectedSecond = (name) => {
      let newArr = state.iconSelectedSecond;
      if (newArr.indexOf(name) > -1) {
        newArr.splice(newArr.findIndex(item => item === name), 1)
      } else {
        newArr.push(name)
      }
      mapIconHandle()
    }
    const changeSelectedMiddle = (name) => {
      let newArr = state.iconSelectedMiddle;
      if (newArr.indexOf(name) > -1) {
        newArr.splice(newArr.findIndex(item => item === name), 1)
      } else {
        newArr.push(name)
      }
      // 触发地图事件
      let arr = [...state.iconSelectedMiddle]
      let message = {"key": "addMarkerByNames", "value": {"names": arr}};
      sendMessage("gisLayerMessage", message);
    }
    // 处理产业资源分布
    const handleSpyData = (data) => {
      let spyXAxisData = []
      let obj = {};
      let y1Data = []
      let y2Data = []
      let y3Data = []
      data.forEach((item) => {
        obj[item.xzjd] = {
          name: item.xzjd,
          familyCount: 0,
          coopreateCount: 0,
          companyCount: 0,
        }
      })
      data.forEach(item => {
        if (item.type == '家庭农场') {
          obj[item.xzjd].familyCount = item.count || 0
        } else if (item.type == '合作社') {
          obj[item.xzjd].coopreateCount = item.count || 0
        } else {
          obj[item.xzjd].companyCount = item.count || 0
        }
      })
      for (let i in obj) {
        spyXAxisData.push(i);
        y1Data.push(Number(obj[i].familyCount)) // 家庭农场
        y2Data.push(Number(obj[i].coopreateCount)) // 合作社
        y3Data.push(Number(obj[i].companyCount)) // 企业
      }
      // console.log(y1Data)
      // console.log(y2Data)
      // console.log(y3Data)
      state.spyMoneyChartOption = {
        dataZoom: [
          {
            xAxisIndex: 0, // 这里是从X轴的0刻度开始
            show: false, // 是否显示滑动条，不影响使用
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
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
          formatter: '{b0}<br />{a0}: {c0}家<br />{a1}: {c1}家<br />{a2}: {c2}家',
          textStyle: {
            color: 'rgba(255, 255, 255, .8)',
          },
          borderWidth: '0',
          borderColor: 'rgba(7,38,108, 1)',
          backgroundColor: 'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
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
              name: '家庭农场',
              icon: 'square',
              itemStyle: {
                color: '#24D1FD',
              },
              textStyle: {
                color: '#fff',
                fontSize: fitChartSize(16),
              },
            },
            {
              name: '合作社',
              icon: 'square',
              itemStyle: {
                color: '#B88BFC',
              },
              textStyle: {
                color: '#fff',
                fontSize: fitChartSize(16),
              },
            },
            {
              name: '企业',
              icon: 'square',
              itemStyle: {
                color: '#EADD40',
              },
              textStyle: {
                color: '#fff',
                fontSize: fitChartSize(16),
              },
            },
          ],
        },
        xAxis: {
          type: 'category',
          data: spyXAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204, 204, 204, .5)',
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
            color: '#ffffff',
          },
        },
        yAxis: {
          type: 'value',
          name: '家',
          min: 0,
          axisLine: {
            show: false,
          },

          axisLabel: {
            interval: 0,
            show: true,
            fontSize: fitChartSize(12),
            showMaxLabel: false,
            color: '#ffffff',
          },
          splitLine: {
            show: true,
            showMaxLine: false,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255,255,255,.14)',
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'transparent'],
            },
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          boundaryGap: ['20%', '20%'],
        },
        series: [
          {
            name: '家庭农场',
            type: 'bar',
            stack: 'Ad',
            barWidth: fitChartSize(8),
            label: {},
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#24D1FD',
                },
                {
                  offset: 1,
                  color: '#24D1FD',
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y1Data,
          },
          {
            name: '合作社',
            type: 'bar',
            stack: 'Ad',
            label: {},
            barWidth: fitChartSize(8),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#B88BFC',
                },
                {
                  offset: 1,
                  color: '#B88BFC',
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y2Data,
          },
          {
            name: '企业',
            type: 'bar',
            stack: 'Ad',
            label: {},
            barWidth: fitChartSize(8),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#EADD40',
                },
                {
                  offset: 1,
                  color: '#EADD40',
                },
              ]),
            },
            barMinWidth: fitChartSize(20),
            animation: true,
            data: y3Data,
          },
        ],
      }
    }
    // 监听函数，接收一个参数--Event事件对象
    const receiveMsg = (e) => {
      const type = e.data.type;
      if (!IFRAME_METHODS.includes(e.data.type)) return;
      const {key, value} = e.data.data;
      // 地图交互消息监听
      if (type == "gisMapMessage") {
        if (key == "initInfo" && value) { // initType为true时，map初始化成功
          if (props.type === 'kiwi') {
            // 获取监测点列表
            getJCDData()
          } else {
            let arr = [...state.iconSelected]
            let message = {"key": "addMarkerByNames", "value": {"names": arr}};
            sendMessage("gisLayerMessage", message);
          }

        } else if (key == "markerInfo" && value) {
          console.log("markerInfo交互---物联网设备---像后端查询数据", value.markerInfo);
          state.visible = true;
          state.WLWID = value.markerInfo.id;
          state.WLWName = value.markerInfo?.name;
          getTimeList()
        }
      }
    };
    // 获取七日监测数据
    const getDayList = () => {
      // TODO 向后端查数据查询30天
      const params = {
        type:'kiwi',
        id: state.WLWID,
        start_date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
        end_date: format(new Date(), 'yyyy-MM-dd'),
      }
      // console.log(format(subMonths(new Date(), 1), 'yyyy-MM-dd'))
      // console.log(format(new Date(), 'yyyy-MM-dd'))
      state.WLWID && getLandDayList(params).then((e)=>{
        if(e.code === 0){
          state.modelData = e.data ?? []
        }
      })
    }
    // 获取 24h 监测数据
    const getTimeList = () => {
      // TODO 向后端查数据
      state.WLWID && getLandTimeList({type:'kiwi',id: state.WLWID}).then((e)=>{
        if(e.code === 0){
          state.modelData = e.data ?? []
        }
      })
    }
    const getSYXData = () => {
      state.soilChartOption = {
        title: {
          text: '土壤'
        },
        tooltip: {
          show: true,
          trigger: "item",
          textStyle: {
            color: '#fff',
          },
          borderWidth: '0',
          borderColor: 'rgba(7,38,108, 1)',
          backgroundColor: 'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        },
        radar: {
          center: ['50%', '55%'],
          nameGap: fitChartSize(8), // 指示器名称和指示器轴的距离。[ default: 15 ]
          name: {
            textStyle: {
              padding: [fitChartSize(-5), fitChartSize(-5)]  // 控制文字padding
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 204, 255, 1)'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(0, 112, 209, 1)', 'rgba(0, 112, 209, .5)', 'rgba(0, 112, 209, .4)', 'rgba(0, 112, 209, .3)', 'rgba(0, 112, 209, .2)']
            }
          },
          axisName: {
            color: "rgba(161, 206, 239, 1)"
          },
          splitLine: {
            show: false
          },
          indicator: [
            {name: 'PH值', max: 11},
            {name: '有机质', max: 40},
            {name: '有效磷', max: 45},
            {name: '速效钾', max: 150},
            {name: '全氮', max: 2.5}
          ]
        },
        series: [
          {
            name: '土壤',
            itemStyle: { // 折线拐点标志的样式。
              normal: { // 普通状态时的样式
                lineStyle: {
                  width: 1
                },
                opacity: 0
              },
              emphasis: { // 高亮时的样式
                lineStyle: {
                  width: 3,
                },
                opacity: 0
              }
            },
            type: 'radar',
            data: [
              {
                value: [5.5, 30, 17.6, 75, 1.5],
                name: '适宜值',
                lineStyle: {
                  color: "rgba(0, 255, 204, 1)"
                }
              },
              {
                value: [6.23, 31.8, 38.2, 133, 1.92],
                name: '实际值',
                lineStyle: {
                  color: "rgba(254, 213, 47, 1)"
                }
              }
            ]
          }
        ]
      }
      state.climateChartOption = {
        title: {
          text: '气候'
        },

        tooltip: {
          show: true,
          trigger: "item",
          textStyle: {
            color: '#fff',
          },
          borderWidth: '0',
          borderColor: 'rgba(7,38,108, 1)',
          backgroundColor: 'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        },
        radar: {
          center: ['50%', '51%'],
          nameGap: fitChartSize(6), // 指示器名称和指示器轴的距离。[ default: 15 ]
          name: {
            textStyle: {
              padding: [fitChartSize(-5), fitChartSize(-5)]  // 控制文字padding
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 204, 255, 1)'
            }
          },
          axisName: {
            color: "rgba(161, 206, 239, 1)"
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(0, 112, 209, 1)', 'rgba(0, 112, 209, .5)', 'rgba(0, 112, 209, .4)', 'rgba(0, 112, 209, .3)', 'rgba(0, 112, 209, .2)']
            }
          },
          splitLine: {
            show: false
          },
          indicator: [
            {name: '极端最低温', max: 30},
            {name: '年平均温度', max: 30},
            {name: '年降水量', max: 1300},
            {name: '无霜期', max: 350},
            {name: '活动积温', max: 5500},
            {name: '日照时数', max: 2300}
          ]
        },
        series: [
          {
            name: '气候',
            type: 'radar',
            itemStyle: { // 折线拐点标志的样式。
              normal: { // 普通状态时的样式
                lineStyle: {
                  width: 1
                },
                opacity: 0
              },
              emphasis: { // 高亮时的样式
                lineStyle: {
                  width: 3
                },
                opacity: 0
              }
            },
            data: [
              {
                value: [20.3, 11.3, 800, 230, 4500, 1350],
                name: '适宜值',
                lineStyle: {
                  color: "rgba(0, 255, 204, 1)"
                }
              },
              {
                value: [5, 13.5, 1200, 270, 5000, 1650],
                name: '实际值',
                lineStyle: {
                  color: "rgba(254, 213, 47, 1)"
                }
              }
            ]
          }
        ]
      }
      state.terrainChartOption = {
        title: {
          text: '地形'
        },
        tooltip: {
          show: true,
          trigger: "item",
          textStyle: {
            color: '#fff',
          },
          borderWidth: '0',
          borderColor: 'rgba(7,38,108, 1)',
          backgroundColor: 'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        },
        radar: {
          center: ['50%', '65%'],
          nameGap: fitChartSize(8), // 指示器名称和指示器轴的距离。[ default: 15 ]
          splitArea: {
            areaStyle: {
              color: ['rgba(0, 112, 209, 1)', 'rgba(0, 112, 209, .5)', 'rgba(0, 112, 209, .4)', 'rgba(0, 112, 209, .3)', 'rgba(0, 112, 209, .2)']

            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 204, 255, 1)'
            }
          },
          axisName: {
            color: "rgba(161, 206, 239, 1)"
          },
          splitLine: {
            show: false
          },
          indicator: [
            {name: '坡度', max: 30},
            {name: '坡向', max: 432},
            {name: '海拔', max: 3000},
          ]
        },
        series: [
          {
            name: '地形',
            type: 'radar',
            itemStyle: { // 折线拐点标志的样式。
              normal: { // 普通状态时的样式
                lineStyle: {
                  width: 1
                },
                opacity: 0
              },
              emphasis: { // 高亮时的样式
                lineStyle: {
                  width: 3
                },
                opacity: 0
              }
            },
            data: [
              {
                value: [15, 90, 1000],
                name: '适宜值',
                lineStyle: {
                  color: "rgba(0, 255, 204, 1)"
                }
              },
              {
                value: [13, 145, 400],
                name: '实际值',
                lineStyle: {
                  color: "rgba(254, 213, 47, 1)"
                }
              }
            ]
          }
        ]
      }
    }
    const getJCDData = async () => {
      const {code, data} = await getLandList({});
      if (code === 0) {
        const empty = []
        data.map(item => {
          empty.push({
            "name": item.name,
            "lng": item.longitude,
            "lat": item.latitude,
            "type": "物联网设备",
            "id": item.id
          })
        })
        state.WLWData = empty;
        // 组合数据 把数据 传给gis
        IFRAME_DATA['物联网设备'] = empty ?? []
        const selected = [...state.iconSelected, ...state.iconSelectedSecond];
        // 消息交互
        let message = {
          "key": "addMarkerByOption", "value": {
            "option": {
              data: IFRAME_DATA,
              names: selected
            }
          }
        };
        sendMessage('gisLayerMessage', message);
      }
    }
    const tabChange=(val)=>{
      console.log('tab change',val)
      if(Number(val) === 0){ // 日
        getTimeList()
      }else{ // 24h
        getDayList()
      }
    }
    onMounted(() => {
      getResourceDistributionDashboard({type: props.type}).then(res => {
        if (res.code === 0) {
          state.navTab[0].value = res.data.total_area // 总面积
          state.navTab[1].value = res.data.total_weight // 总产量
          state.navTab[2].value = res.data.total_process // 总加工量
          state.navTab[3].value = res.data.total_value //总产值
        }
      })
      // 获取产业资源分布
      getResourceDistribution({type: props.type}).then(res => {
        if (res.code === 0) {
          handleSpyData(res.data)
        }
      })
      // 适应性评价的雷达图
      getSYXData()
      if (window.addEventListener) {
        //为window注册message事件并绑定监听函数
        window.addEventListener("message", receiveMsg, false);
      } else {
        window.attachEvent("message", receiveMsg);
      }
    })
    return {
      props,
      state,
      modelClose,
      tabChange,
      change,
      changeSelected,
      changeSelectedSecond,
      changeSelectedMiddle
    }
  }
}
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

      .tabList, .tabListMiddle, .tabListNewSecond {
        position: absolute;
        right: vw(30);
        bottom: vw(40);
        height: vh(110);
        width: vw(140);
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
              color: #A1CEEF;
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

      .tabListMiddle {
        height: vh(130);
        width: vw(135);
      }

      .tabListNew {
        bottom: vw(110);
      }

      .tabListNewSecond {
        height: vh(18);
        background: url("~@/assets/images/second_bg.png") no-repeat;
        background-size: 100% 100%;
      }

      #gisIframe, #gisIframeRight, #gisIframeMiddle {
        outline: none;
        border: none;
        margin-top: vh(140);
      }

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
                color: #28E8FE;
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
        height: vh(150);
        padding: vh(20);
        width: vw(140);
        background: url("~@/assets/images/risk/risk_bg.png") no-repeat;
        background-size: 100% 100%;

        .stack {
          width: 100%;
          color: #fff;
          font-size: vh(16);
          display: flex;
          justify-content: flex-start;
          margin-bottom: vh(16);

          &:before {
            content: ' ';
            margin-right: vw(15);
            width: vw(16);
            height: vw(16);
            background: red;
            border-radius: vw(2);

          }

          &:nth-of-type(1) {
            &:before {
              background: #38D672;
            }
          }

          &:nth-of-type(2) {
            &:before {
              background: #24D1FD;
            }
          }

          &:nth-of-type(3) {
            &:before {
              background: #B88BFC;
            }
          }

          &:nth-of-type(4) {
            &:before {
              background: #EADD40;
            }
          }

          &:last-of-type {
            margin-bottom: 0;

            &:before {
              background: #FF5B2B;
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
              content: ' ';
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

        .leftChart, .rightChart, .middleChart {
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
</style>
