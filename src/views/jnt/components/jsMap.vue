<template>
  <div class="js-map">
    <div class="chart" ref="myRef"></div>
    <div class="legend">
      <div class="item" v-for="item in active === 0 ? legend : legend2" :key="item.name">
        <span v-if="item.color" :style="{ background: item.color }"></span>
        <img v-if="item.icon" :src="item.icon" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, defineProps, watch, defineEmits } from 'vue'
import * as echarts from 'echarts'
import JIANGSHAN from '@/assets/json/jiangshan.json'

const props = defineProps({
  mapData: {
    type: Array,
    default: () => {
      return []
    }
  },
  active: {
    type: Number,
     default: 0
  }
})
const emit = defineEmits(['mapClick'])


const myRef = ref(null)
let myChart = null
const mapData = ref([])
const flagData = ref([])
const iconData = ref([])

const legend = [
  { name: '正常', color: '#03D174' },
  { name: '逾期半年', color: '#EFD360' },
  { name: '逾期一年以上', color: '#FF5E57' }
]
const legend2 = [
  { name: '有机肥补贴', icon: 'https://img.hzanchu.com/acimg/600cc1e462132851e5ad5fc3df10daed.png' },
  { name: '秸秆综合利用审核', icon: 'https://img.hzanchu.com/acimg/49baaa61b7f73975d47e66daa0fde469.png' },
  { name: '湖羊补助', icon: 'https://img.hzanchu.com/acimg/fc3f7dee7c5eff46324946912d946b68.png' },
  { name: '病死动物无害化处理', icon: 'https://img.hzanchu.com/acimg/53af5bab849dc1162e8ada32c74a5f72.png' },
  { name: '粮油适度规模经营补贴', icon: 'https://img.hzanchu.com/acimg/f2be29801bf0711c3ea89f18f0cfcc3f.png' }
]

const initEcharts = () => {
  myChart = echarts.init(myRef.value)
  echarts.registerMap('JIANGSHAN', JIANGSHAN)
  myChart.setOption({
    visualMap: {
      min: 0,
      show: false,
      range: [1, 9999999999],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['rgba(34, 162, 255, .5)'],
      },
      outOfRange: {
        color: ['rgba(34, 162, 255, 0)'],
      },
    },
    geo: [
      {
        map: 'JIANGSHAN',
        roam: false,
        aspectScale: 1,
        selectedMode: 'single',
        itemStyle: {
          normal: {
            areaColor: 'rgba(255, 255, 255, 0)', // rgba设置透明度0
            borderColor: 'rgba(255, 255, 255, 0)',// 省份边框颜色
            borderWidth: 1.5,//省份边框
          },
          emphasis: {
            areaColor: 'rgba(34, 162, 255, 0)',
          }
        },
        emphasis: {
          label: {
            show: false,
          },
        },
      },
    ],
    series: [
      {
        name: '江山',
        type: 'map',
        roam: false, // 可拖动
        aspectScale: 1,
        map: 'JIANGSHAN',
        itemStyle: {
          normal: {
            areaColor: 'rgba(255, 255, 255, 0)', //rgba设置透明度0
            borderColor: 'rgba(255, 255, 255, 0)',//省份边框颜色
            borderWidth: 1.5,//省份边框
          },
          emphasis: {
            areaColor: 'rgba(34, 162, 255, .5)',
            label: {
              color: '#fff'
            }
          },
        },
        label: {
          show: true,
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          formatter: (params) => {
            let name = params.name.replace('浙江省衢州市江山市', '')
            let match = props.mapData.find(ele => {
              return name === ele.town_name;
            });
            if (match) {
              return [
                '{name|' + name + '}',
                match?.project_overview?.project_count ? '{value|' + match?.project_overview?.project_count + '}' : '',
              ].join('\n')
            }
          },
          rich: {
            name: {
              padding: [0, 10, 10, 0],
              fontSize: 16,
            },
            value: {
              fontSize: 16,
              fontFamily: 'PangMenZhengDao',
              width: 42,
              height: 22,
              backgroundColor: {
                image: 'https://img.hzanchu.com/acimg/e2a0f5dcf7caa508f1a665246aa5b964.png'
              }
            }
          }
        },
        select: {
          label: {
            color: '#fff',
          },
          itemStyle: {
            areaColor: 'rgba(34, 162, 255, 0)',
            borderColor: 'rgba(34, 162, 255, 0)',
          },
        },
        data: mapData.value,
        nameMap: {
          浙江省衢州市江山市上余镇: '上余镇',
          浙江省衢州市江山市双塔街道: '双塔街道',
          浙江省衢州市江山市虎山街道: '虎山街道',
          浙江省衢州市江山市四都镇: '四都镇',
          浙江省衢州市江山市大陈乡: '大陈乡',
          浙江省衢州市江山市碗窑乡: '碗窑乡',
          浙江省衢州市江山市贺村镇: '贺村镇',
          浙江省衢州市江山市清湖街道: '清湖街道',
          浙江省衢州市江山市新塘边镇: '新塘边镇',
          浙江省衢州市江山市坛石镇: '坛石镇',
          浙江省衢州市江山市大桥镇: '大桥镇',
          浙江省衢州市江山市凤林镇: '凤林镇',
          浙江省衢州市江山市峡口镇: '峡口镇',
          浙江省衢州市江山市保安乡: '保安乡',
          浙江省衢州市江山市廿八都镇: '廿八都镇',
          浙江省衢州市江山市长台镇: '长台镇',
          浙江省衢州市江山市石门镇: '石门镇',
          浙江省衢州市江山市张村乡: '张村乡',
          浙江省衢州市江山市塘源口乡: '塘源口乡',
        },
      },
      {
        name: '0',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/b020c1235eb4ca4c7993e8724eafef84.png',
        symbolSize: [16, 24],
        hoverSymbolSize: 10,
        data: flagData.value
          .filter(ele => {
            return ele.overdue_year === 0
          }) || []
      },
      {
        name: '0.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/f661a2d6f921c57acd5869d8984ed1c4.png',
        symbolSize: [16, 24],
        hoverSymbolSize: 10,
        data: flagData.value
          .filter(ele => {
          return ele.overdue_year === .5;
        }) || []
      },
      {
        name: '2',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/5a1a57fe0fec62bacf34e8ce32ff6b9f.png',
        symbolSize: [16, 24],
        hoverSymbolSize: 10,
        data: flagData.value
          .filter(ele => {
            return ele.overdue_year >= 1;
          }) || []
      },
      {
        name: '有机肥使用补贴',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/ae6e68ff5fc6823053ba079c1140aaed.png',
        symbolSize: [30, 35],
        hoverSymbolSize: 10,
        data: iconData.value
          .filter(ele => {
            return ele.category_name === '有机肥使用补贴'
          }) || []
      },
      {
        name: '秸秆综合利用补贴',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/1840aa7b1fecfc6563485f53ea598163.png',
        symbolSize: [30, 35],
        hoverSymbolSize: 10,
        data: iconData.value
          .filter(ele => {
            return ele.category_name === '秸秆综合利用补贴'
          }) || []
      },
      {
        name: '湖羊产业补贴',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/ccfab9518350e9e4cc8749bcd3f76b4d.png',
        symbolSize: [30, 35],
        hoverSymbolSize: 10,
        data: iconData.value
          .filter(ele => {
            return ele.category_name === '湖羊产业补贴'
          }) || []
      },
      {
        name: '病死动物无害化处理补贴',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/2cc6d957bd8a80e661233fe5f1e961e9.png',
        symbolSize: [30, 35],
        hoverSymbolSize: 10,
        data: iconData.value
          .filter(ele => {
            return ele.category_name === '病死动物无害化处理补贴'
          }) || []
      },
      {
        name: '粮油适度规模经营补贴',
        type: 'scatter',
        coordinateSystem: 'geo',
        scatter: {
          coordinateSystem: 'geo',
        },
        symbol: 'image://https://img.hzanchu.com/acimg/ae39086f2bee0f431412bc7882651754.png',
        symbolSize: [30, 35],
        hoverSymbolSize: 10,
        data: iconData.value
          .filter(ele => {
            return ele.category_name === '粮油适度规模经营补贴'
          }) || []
      },
    ],
    graphic: [
      {
        z: 0,
        type: 'image',
        left: 21,
        top: 50,
        scaleX: .91,
        scaleY: .932,
        style: {
          image: require('./../images/map_bg.png'),
          opacity: 1,
          width: 438,
          height: 637
        },
      },
    ],
  })
  myChart.on('click', ($event) => {
    emit('mapClick', $event.name)
  })
}

watch(() => props.mapData, val => {
  mapData.value = val.map(ele => {
    return {
      groupId: ele.id,
      value: ele.is_hign ? 1 : 0,
      normalValue: ele.project_overview.project_count,
      name: ele.town_name,
      label:
        ele.town_name === '大陈乡'
          ? { offset: [10, 10] }
          : ele.town_name === '凤林镇'
            ? { offset: [20, -40] }
            : ele.town_name === '廿八都镇'
              ? { offset: [40, -50] }
              : ele.town_name === '新塘边镇'
                ? { offset: [10, 0] }
                : {offset: [0, 0] }
    }
  })
  flagData.value = []
  iconData.value = []
  val.map(item => {
    item.project_overview?.list.map(list => {
      list.town_name = item.town_name
      list.groupId = item.id
      list.value = list.WGS84
      list.category_name = list?.policy_document_info?.get_category?.category_name
      if (props.active === 0) {
        flagData.value.push(list)
      } else {
        iconData.value.push(list)
      }
    })
  })


  nextTick(() => {
    initEcharts()
  })
})
</script>

<style scoped lang="scss">
.js-map {
  position: relative;
  width: 100%;
  height: 637px;
  .chart {
    margin: auto;
    width: 438px;
    height: 637px;
  }
  .legend {
    position: absolute;
    bottom: 0;
    right: 0;
    .item {
      display: flex;
      align-items: center;
      height: 20px;
      line-height: 20px;
      margin-top: 8px;
      span {
        width: 10px;
        height: 10px;
      }
      img {
        width: 14px;
        height: 14px;
      }
      p {
        font-size: 16px;
        padding-left: 6px;
      }
    }
  }
}
</style>
