<template>
  <Header title="未来乡村" />
  <div class="sc-layout">
    <!-- 左侧 -->
    <section class="sc-section">
      <Label label="未来邻里" />
      <div class="flex-content-container">
        <StatItemAnimatedVariantB :value="data.neighborhood?.media" unit="次" label="新媒体宣传" />
        <StatItemAnimatedVariantB :value="data.neighborhood?.activity" unit="次" label="社区活动" />
        <StatItemAnimatedVariantB :value="data.neighborhood?.help" unit="次" label="互帮互助" />
      </div>
      <Label label="未来教育" />
      <div class="grid-content-container">
        <stat-item-plain :value="data.education?.school" unit="间" label="学校">
          <template #icon>
            <img class="icon-variant-horizontal-1 sc-icon-hover"
                 :style="{animationDelay: '-0.3s'}" :src="require('@/assets/images/smart-communities/icon_school.png')" />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.education?.school_rate" unit="%" label="儿童入学率">
          <template #icon>
            <img class="icon-variant-horizontal-1 sc-icon-hover"
                 :style="{animationDelay: '-2.2s'}" :src="require('@/assets/images/smart-communities/icon_reading.png')" />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.education?.class" unit="间" label="幸福学堂">
          <template #icon>
            <img class="icon-variant-horizontal-1 sc-icon-hover"
                 :style="{animationDelay: '-1.6s'}" :src="require('@/assets/images/smart-communities/icon_heart-in-house.png')" />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.education?.online_education" unit="%" label="线上教育">
          <template #icon>
            <img class="icon-variant-horizontal-1 sc-icon-hover"
                 :style="{animationDelay: '-0.9s'}" :src="require('@/assets/images/smart-communities/icon_monitor.png')" />
          </template>
        </stat-item-plain>
      </div>
      <Label label="未来健康" redirectUrl="/villageHospital" />
      <div class="grid-content-container">
        <stat-item-box :value="data.health?.electronic_file_rate" unit="%" label="电子档案覆盖率"
                     :background="require('@/assets/images/smart-communities/box-1-1.png')" />
        <stat-item-box :value="data.health?.house" unit="个" label="健康小屋"
                     :background="require('@/assets/images/smart-communities/box-1-2.png')" />
        <stat-item-box :value="data.health?.old_age_rate" unit="%" label="智慧养老覆盖率"
                     :background="require('@/assets/images/smart-communities/box-1-3.png')" />
        <stat-item-box :value="data.health?.online_diagnosis" unit="次" label="线上诊疗"
                     :background="require('@/assets/images/smart-communities/box-1-4.png')" />
      </div>
      <Label label="未来创业" />
      <div class="flex-content-container">
        <stat-item-plain :value="data.business?.enterprise" unit="家" label="众创空间入驻企业" variant="vertical" />
        <stat-item-plain :value="data.business?.back_youth" unit="人" label="青年回乡人数" variant="vertical" />
        <stat-item-plain :value="data.business?.back_talent" unit="人" label="乡贤回乡人数" variant="vertical" />
      </div>
      <Label label="未来交通" />
      <div class="flex-content-container">
        <stat-item-plain :value="data.transportation?.parking_space" value-color="#EACA60" unit="个" label="智能停车位" variant="vertical">
          <template #icon>
            <item-icon
                preset="static"
                :icon="require('@/assets/images/smart-communities/icon_parking.png')"
            />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.transportation?.bus_routes " value-color="#EACA60" unit="条" label="公交路线" variant="vertical">
          <template #icon>
            <item-icon
                preset="static"
                :icon="require('@/assets/images/smart-communities/icon_bus.png')"
            />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.transportation?.bus_rate" value-color="#EACA60" unit="%" label="公交覆盖率" variant="vertical">
          <template #icon>
            <item-icon
                preset="static"
                :icon="require('@/assets/images/smart-communities/icon_pie-chart.png')"
            />
          </template>
        </stat-item-plain>

      </div>
    </section>
    <!-- 中间 -->
    <section class="sc-section">
      <region-image class="center"/>
      <router-link to="/villageTour" class="portal">
        乡镇一张图<img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />
      </router-link>
    </section>
    <!-- 右侧 -->
    <section class="sc-section">
      <Label label="未来服务" />
      <div class="flex-content-container" :style="{paddingBlock: 0}">
        <StatItemAnimated :value="data.service?.enterprise" unit="家" label="社区商户" />
        <StatItemAnimated :value="data.service?.garbage_classification_rate " unit="%" label="垃圾分类正确率" scale="1.25" redirect-url="/villageGarbage" />
        <StatItemAnimated :value="data.service?.help" unit="次" label="应急救援" />
      </div>
      <Label label="未来监管" />
      <div class="flex-content-container">
        <stat-item-plain :value="data.supervision?.tourists" unit="人" label="累计景区游客量"
                         value-color="#EACA60" variant="vertical" redirect-url="/villageTour" />
        <stat-item-plain :value="data.supervision?.key_personnel" unit="人" label="重点人员"
                         value-color="#EACA60" variant="vertical" redirect-url="/smart-communities/census-data" />
        <stat-item-plain :value="data.supervision?.equipment" unit="台" label="监控设备"
                         value-color="#EACA60" variant="vertical" redirect-url="/smart-communities/fire-stats" />
      </div>
      <ScrollingBoard
          class="right-table"
            :data="supervisors"
            :columns="columns"
            :composite-key="getRowId"
      />
      <Label label="未来法治" />
      <div class="flex-content-container">
        <stat-item-plain :value="data.rule_law?.case" unit="件" label="矛盾调解案件" variant="vertical">
          <template #icon>
            <item-icon
                preset="animated"
                :icon="require('@/assets/images/smart-communities/icon_book.png')"
            />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.rule_law?.lawyer" unit="人" label="公益律师" variant="vertical" >
          <template #icon>
            <item-icon
                preset="animated"
                :icon="require('@/assets/images/smart-communities/icon_lawyer.png')"
            />
          </template>
        </stat-item-plain>
        <stat-item-plain :value="data.rule_law?.help" unit="次" label="线上法律援助" variant="vertical" >
          <template #icon>
            <item-icon
                preset="animated"
                :icon="require('@/assets/images/smart-communities/icon_court.png')"
            />
          </template>
        </stat-item-plain>
      </div>
      <Label label="未来文化" />
      <div class="grid-content-container">
        <stat-item-box :value="data.culture?.user" unit="册" label="智慧图书馆总藏书量"
                     :background="require('@/assets/images/smart-communities/box-2-1.png')" />

        <el-popover
          popper-class="sc-box-popover"
          placement="left"
          :show-arrow="false"
          :teleported="false"
          trigger="click"
        >
          <template #reference>
            <stat-item-box :value="data.culture?.borrowing_amount" unit="册" label="图书借阅量"
                           :background="require('@/assets/images/smart-communities/box-2-2.png')" />
          </template>
          <div ref="chart" class="sc-box-popover__chart">

          </div>
        </el-popover>
        <stat-item-box :value="data.culture?.online_activity" unit="次" label="线上文娱活动"
                     :background="require('@/assets/images/smart-communities/box-2-3.png')" />
        <stat-item-box :value="data.culture?.offline_activity" unit="次" label="线下文娱活动"
                     :background="require('@/assets/images/smart-communities/box-2-4.png')" />
      </div>
    </section>
  </div>

</template>

<script setup>
import Label from '@/components/Label.vue'
import Header from '@/components/smart-communities/Header.vue'
import StatItemAnimatedVariantB from '@/components/smart-communities/home/sub-components/StatItemAnimatedVariantB.vue'
import StatItemAnimated from '@/components/smart-communities/home/sub-components/StatItemAnimated.vue'
import StatItemPlain from '@/components/smart-communities/home/sub-components/StatItemPlain.vue'
import StatItemBox from '@/components/smart-communities/home/sub-components/StatItemBox.vue'
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import ItemIcon from '@/components/smart-communities/home/sub-components/ItemIcon.vue'
import RegionImage from '@/components/smart-communities/home/RegionImage.vue'
import {getHomePageData, useHomePageData} from "@/api/smart-communities/home";
import {watch, ref} from 'vue'
import request from "@/util/http";
import {format} from 'date-fns'
import useResponsiveChart from "@/composables/useResponsiveChart";

const {isLoading, data, supervisors, hasRetrievedToken} = useHomePageData();
const columns = [
  {field: 'key_personnel', name: '重点人员', width: '20%'},
  {field: 'politics_status', name: '政治面貌', width: '20%'},
  {field: 'village', name: '所在地', width: '40%'},
  {field: 'gridman', name: '管理人员', width: '20%'}
]
const getRowId = (row) => {
  return `${row.key_personnel}::${row.mobile}`
}

const chart = ref(null)
const {instance: chartInstance} = useResponsiveChart(chart);
// 请求借阅量数据, 因为需要token所以依赖hasRetrievedToken。只获取一次
let getLibDataOnce = false;
watch(hasRetrievedToken, ()=>{
  if (hasRetrievedToken.value && !getLibDataOnce) {
    getLibDataOnce = true;
    request.get('/jiangshan-api/data-bridge/library/getDbLibraryDayListByPage?pageSize=7').then((r)=>{
      const data = r.data.list.reverse();
      const xAxisValue =data.map(e=> {
        const date = new Date(e.formatStatDate);
        return format(date, 'MM-dd')
      });
      const yAxisValues = data.map(e=>e.borrowNum);
      const trail = xAxisValue.map((x, idx)=>[x, yAxisValues[idx]])
      const option = {
        title: {
          text: '近七日借书量变化趋势',
          // textAlign: 'center',
          left: 'center',
          textStyle: {
            color: 'white',
            fontSize: '1em'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 30,
          bottom: 30,
          right: 30
        },
        legend: {
          show: false
        },
        yAxis: {
          type: 'value',
          name: '册',
          nameTextStyle: {
            color: '#90B6D2',
            align: 'right',
          },
          axisLabel: {
            color: '#90B6D2',
            fontSize: `${14/16}em`
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.14)',
              type: 'dashed'
            }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: xAxisValue,
          axisLabel: {
            fontSize: `${14/16}em`,
            color: '#90B6D2',
            overflow: 'breakAll',
            interval: 0, // show all
          },
        },
        series: [
          {
            name: '册数',
            type: 'line',
            data: yAxisValues,
            smooth: true,
            color: '#0093FF',
            label: {
              show: false,
              position: 'top',
            },
            symbol: 'none',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#0093FF' // color at 0%
                }, {
                  offset: 1, color: 'transparent' // color at 100%
                }],
                global: false // default is false
              }
            }
          },
        ],
      }
      chartInstance.value.setOption(option)
    })
  }
}, {immediate: true})

</script>

<style scoped lang="scss">
.sc-layout {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  background: url("~@/assets/images/bg.png") 100% 100%;
  padding: vh(56) vw(24) vh(40);
  grid-template-columns: vw(460) 1fr vw(460);
  gap: vw(40);
  overflow: hidden;
  ::v-deep(.sc-box-popover) {
    height: vh(224);
    width: vw(446) !important;
    border: none;
    background: no-repeat center / 100% 100% url("~@/assets/images/smart-communities/shared/popover-bg.svg");
  }
}
.sc-box-popover__chart {
  height: vh(224);
  width: vw(446);
  font-size: vw(16);
}
.sc-header {
  position: fixed;
  width: 100%;
  z-index: 1;
  img {
    width: 100%;
    pointer-events: none;
  }
}
.sc-section {
  //min-width: 0;
  position: relative;
}
.center {
  //width: 100%;
  margin-block-start: vh(130);
}
.right-table {
  margin-block-end: vh(10);
}
.flex-content-container {
  display: flex;
  justify-content: space-around;
  padding: vh(20) vw(20);
}
.grid-content-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: vh(20) vw(20);
  gap: vh(20) vw(20);
}
// 处理普通非全屏展示过长的情况
@media (min-aspect-ratio: 1920/1050) {
  .flex-content-container {
    padding: vh(8) vw(20);
  }
  .grid-content-container {
    padding: vh(10) vw(20);
    gap: vh(10) vw(20);
  }
}
.icon-variant-horizontal-1 {
  width: vw(60);
}
.sc-icon-bounce {
  animation: sc-icon-bounce-anim;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}
.sc-icon-hover {
  animation: sc-icon-hover-anim;
  animation-timing-function: linear;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
}
.portal {
  position: absolute;
  top: vh(110);
  right: 0;
  padding: vh(8) vw(8) vh(8) vw(16);
  font-size: vw(14);
  line-height: vw(31);
  font-weight: normal;
  color: #FFFFFF;
  background: url('~@/assets/images/smart-communities/center-link-bg.svg');
  background-size:  100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  & > img {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -20%;
  }
}
</style>

<style lang="scss">

@keyframes sc-icon-bounce-anim {
  from,
  44%,
  48%,
  51%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  46%,
  50% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30%, 0) scaleY(1.1);
    transform: translate3d(0, -30%, 0) scaleY(1.1);
  }

  52% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15%, 0) scaleY(1.05);
    transform: translate3d(0, -15%, 0) scaleY(1.05);
  }

  53% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  54% {
    -webkit-transform: translate3d(0, -8%, 0) scaleY(1.02);
    transform: translate3d(0, -8%, 0) scaleY(1.02);
  }

  55% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  56% {
    -webkit-transform: translate3d(0, -4%, 0) scaleY(1.02);
    transform: translate3d(0, -4%, 0) scaleY(1.02);
  }

  57% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }
}
</style>
