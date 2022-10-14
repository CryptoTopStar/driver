<template>
  <div class="content-layout">
    <div class="main">
      <section>
        <title-bar :showLongTitleMore="true" customStyle="margin-left: 0px;margin-top: 0px" title="近6个月生猪市场概况" />
        <DoubleColumnarChart :data="pigMarketData"  />
      </section>
      <section class="pig-market-box" >
        <title-bar
            title="近6个月生猪市场数据分析图"
            customStyle="margin-left: 0px;margin-top: 0px"
            :showLongTitleMore="true"
            :showMore="true"
            :moreType="1"
            tipTitle="算法说明"
            :tips="pigMarkeTips"
          />
        <div class="charts-title">
          <div class="icon_box">
            <img class="icon-wrap" :src="require('@/assets/images/data-exploration/shared/statistics_cycle.png')" alt="" />
            <img class="icon" :src="require('@/assets/images/data-exploration/shared/statistics_icon_2.png')" alt="" />
          </div>
          <div class="text_box">
          <div>预测销量</div>
          <div><b>8.1-10.96</b>万头</div>
          </div>
        </div>
         <PigMarketSplashesCharts :type="'pigMarketSale'" />
      </section>
      <section>
        <title-bar :showLongTitleMore="true" customStyle="margin-left: 0px;margin-top: 0px" title="能繁殖母猪存量" />
        <PigColumnarChart :data="pigMarketData" />
      </section>
        <section class="sale-box">
          <title-bar
            title="近6个月销售价格正态分析图"
            :showLongTitleMore="true"
            customStyle="margin-left: 0px;margin-top: 0px"
            :showMore="true"
            :moreType="1"
            tipTitle="算法说明"
            :tips="pigMarkeSaleTips"
          />
        <div class="charts-title">
          <div class="icon_box">
            <img class="icon-wrap" :src="require('@/assets/images/data-exploration/shared/statistics_cycle.png')" alt="" />
            <img class="icon" :src="require('@/assets/images/data-exploration/shared/statistics_icon_2.png')" alt="" />
          </div>
          <div class="text_box">
            <div>销量正常波动区间</div>
            <div><b>6.05-14.45</b>万头</div>
          </div>
        </div>
        <NormalDistributionCharts :type="'pigMarketSale'" />
      </section>
      <section>
        <title-bar :showLongTitleMore="true" customStyle="margin-left: 0px;margin-top: 0px" title="猪仔价格" />
        <PigColumnarChart :data="pigMarketData" :type="'piglet'"/>
      </section>
    </div>
    <div class="right">
     <section>
        <title-bar :showLongTitleMore="true" customStyle="margin-left: 0px;margin-top: 0px" title="近7日销售量" />
        <PigColumnarChart :data="pigMarketSaleData" :type="'pigMarketSale'"/>
      </section>
      <section>
        <title-bar :showLongTitleMore="true" customStyle="margin-left: 0px;margin-top: 0px" title="今日销量分析" />
        <CrosswiseCharts :type="'todaySale'" :data="pigMarketSaleData" />
      </section>
        <section>
          <title-bar
            title="价格预警"
            :showLongTitleMore="true"
            customStyle="margin-left: 0px;margin-top: 0px"
            :showMore="true"
            :moreType="1"
            tipTitle="算法说明"
            :tips="pigMarkeSaleWarningTips"
          />
        <PigMarketAlertTable :type="'pigSaleMarketWarning'" />
      </section>
    </div>
  </div>
</template>

<script >
import {ref, onMounted} from 'vue';
import { getPigMarketList ,getPigMarketSaleList} from "@/api/dataExploration/api";
import TitleBar from "@/components/titleBar.vue";
import PigColumnarChart from '@/components/data-exploration/mushroom/monitoring/PigColumnarChart.vue'
import DoubleColumnarChart from '@/components/data-exploration/mushroom/monitoring/doubleColumnarChart.vue'
import PigMarketSplashesCharts from '@/components/data-exploration/mushroom/monitoring/pigMarketSplashesCharts.vue'
import CrosswiseCharts from '@/components/data-exploration/mushroom/monitoring/crosswiseCharts.vue'
import PigMarketAlertTable from '@/components/data-exploration/mushroom/monitoring/pigMarketAlertTable.vue'
import NormalDistributionCharts from '@/components/data-exploration/mushroom/monitoring/NormalDistributionCharts.vue'

export default {
  components: { NormalDistributionCharts,TitleBar,DoubleColumnarChart,PigColumnarChart,PigMarketAlertTable,PigMarketSplashesCharts,CrosswiseCharts },
  setup(props, { emit }) {
    const pigMarketData = ref([]);
    const pigMarketSaleData  = ref([]);
    const pigMarkeTips = [
      {
        title: "算法公式：",
        sub: "y=0.1735x^4-2.455x^3+11.72x^2-21.53x+21.76",
      },
      {
        title: "算法简介：",
        sub: "依据历史生猪销量、生猪价格、仔猪价格、能繁殖母猪数量、生猪存栏及出栏数量，拟合出生猪销量曲线方程，当时间发生变化时，直接根据方程推算出未来生猪销量情况。",
      },
    ];
    const pigMarkeSaleTips = [
      {
        title: "算法公式：",
        sub: "一维正态分布公式：=2πexp (x−2μ)，其中μ为均值，为标准差",
      },
      {
        title: "算法简介：",
        sub: "测量或监测数据一般服从正态分布，数据围绕着一个中心分布，不偏左、不偏右、不高、不低，呈现一种中间高、两边低的趋势。依据正态分布的中心，依次往左右各取三个范围为正常区间，其余部分为异常区间。通过历史生猪销量数据统计，计算其均值c与标准差d，则生猪合理销量区间为[c-3d,c+3d]。",
      },
    ];
    const pigMarkeSaleWarningTips = [
      {
        title: "算法公式：",
        sub: "一维正态分布公式：=2πexp (x−2μ)，其中μ为均值，为标准差",
      },
      {
        title: "算法简介：",
        sub: "分别将生猪存栏、出栏、能繁殖母猪存栏、生猪价格进行正态分布运算，计算出每个条件的正常区间范围，当生猪销量有异常时候，分别分析异常价格对应的各个条件，给出原因分析结果。",
      },
    ];
    const reload = () => {
      getPigMarketList({}).then((res) => {
        if (res.code == 0) {
          pigMarketData.value = res.data;
        }
      });
      getPigMarketSaleList({}).then((res) => {
        if (res.code == 0) {
            pigMarketSaleData.value = Array.isArray(res.data)?res.data:[res.data];
        }
    });
    };
    onMounted(() => {
      reload();
    });
    return { pigMarketData ,pigMarkeTips,pigMarkeSaleTips,pigMarkeSaleWarningTips,pigMarketSaleData};
  },
};

</script>

<style scoped lang="scss">
.content-layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  padding: vh(8) vw(24);
  gap: vh(20) vw(20);
  grid-template: "left right" minmax(0, 1fr)
                 "left right" minmax(0, 1fr) / (vw(1240) 1fr);
  %_base-pane {
    border: vw(1) solid rgb(36, 60, 132);
    background: rgba(8, 26, 72, 0.5);
  }
  .main {
    @extend %_base-pane;
    grid-area: left;
    display: grid;
    gap: vh(20) vw(40);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    section {
      display: flex;
      flex-flow: column;
    };
    .sale-box{
      margin-top:vh(150);
      height: vh(430);
    }
    .pig-market-box{
      height: vh(430);
    }
    .charts-title{
      color:#CCEAFF;
      display: flex;
      margin:10px 0 5px 13px;
      line-height: 16px;
      .text_box{
        margin-top: 5px;
        margin-left: 7px;
      }
      b{
        color:#27E0FD ;
      }
            .icon_box {
      position: relative;
      width: 38px;
      height: 38px;

      img {
        position: absolute;
        &:nth-of-type(1) {
          width: 38px;
          height: 38px;
          animation: an1 4s linear infinite; // 旋转动画
          @keyframes an1 {
            to {
                /*变换 transform;旋转 rotate */
                transform: rotate(360deg);
            }
        }
        }

        &:nth-of-type(2) {
          width: 16px;
          height: 16px;
          top: 11px;
          left: 11px;
        }
      }
    }
    }
  }
  .right {
    @extend %_base-pane;
    grid-area: right;

    height: 100%;
      section {
      display: flex;
      flex-flow: column;
    }
  }
}
</style>
