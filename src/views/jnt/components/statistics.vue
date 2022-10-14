<template>
  <div class="statistics">
    <div class="item">
      <div class="title">
        <!-- <div>
          <span>{{ mainInfo?.understand_paper?.understand_paper_num || 0 }}</span>篇
        </div> -->
        <div>
          <span>{{ 70 }}</span
          >篇
        </div>
        <p>明白纸总数</p>
      </div>
      <div class="types">
        <div>
          <p>类型</p>
        </div>
        <div>
          <p>
            <span>{{ mainInfo?.understand_paper?.understand_category_num || 0 }}</span
            >类
          </p>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">
        <div class="count">
          <span>{{ mainInfo?.project?.project_sum || 0 }}</span
          >项
        </div>
        <p>项目申报总数</p>
      </div>
      <div class="types">
        <div>
          <p>
            <span>{{ mainInfo?.project?.project_jz_sum || 0 }}</span
            >项
          </p>
          <p>竞争性项目数</p>
        </div>
        <div>
          <p>
            <span>{{ mainInfo?.project?.project_ph_sum || 0 }}</span
            >项
          </p>
          <p>普惠项目数</p>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">
        <div class="count">
          <span>{{ mainInfo?.project_capital_source?.project_fund_source_all_amount || 0 }}</span
          >万元
        </div>
        <p>资金来源总额</p>
      </div>
      <div class="types">
        <div>
          <p>
            <span>{{ mainInfo?.project_capital_source?.already_order_amount || 0 }}</span
            >万元
          </p>
          <p>已下达金额</p>
        </div>
        <div>
          <p>
            <span>{{ mainInfo?.project_capital_source?.already_fund_amount || 0 }}</span
            >万元
          </p>
          <p>已兑现金额</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { jntIndexInfo } from '@/api/jnt'

const mainInfo = ref({})

const getInfo = async () => {
  const result = await jntIndexInfo()
  mainInfo.value = result?.business_sum
}

onMounted(() => {
  getInfo()
})
</script>

<style scoped lang="scss">
.statistics {
  display: flex;
  justify-content: space-between;
  .item {
    box-sizing: border-box;
    width: 228px;
    height: 120px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    background: url('./../images/statistics_bg.png') no-repeat;
    background-size: 100% 100%;
    .title {
      text-align: center;
      div {
        height: 20px;
        line-height: 20px;
        span {
          font-family: PangMenZhengDao;
          font-size: 20px;
          color: #fec340;
          padding-right: 4px;
        }
      }
      p {
        height: 20px;
        line-height: 20px;
        color: #fff;
      }
    }
    .types {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 12px;
      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          height: 20px;
          line-height: 20px;
          &:nth-of-type(1) {
            span {
              font-family: PangMenZhengDao;
              font-size: 20px;
              color: #fff;
            }
          }
        }
      }
    }
    &:nth-of-type(1) {
      .types {
        height: 40px;
        align-items: center;
        div {
          flex: none;
          text-align: center;
        }
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      margin-right: 12px;
    }
  }
}
</style>
