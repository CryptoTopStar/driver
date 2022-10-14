<template>
  <div class="project-reserve">
    <div class="total">
      项目储备总数
      <span>{{ total }}</span>
    </div>
    <div class="table-wrap">
      <div class="item">
        <div v-for="item in title" :key="item">{{ item }}</div>
      </div>
      <div class="item-wrap">
        <div class="item" v-for="(item, index) in list" :key="item.id">
          <div>{{ item.project_name }}</div>
          <div>{{ item.declare_unit }}</div>
          <div>{{ item.project_type_txt }}</div>
          <div>{{ item.declare_at?.substr(0, 10) }}</div>
<!--          <div>{{ item.status_txt }}</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReserveList } from '@/api/jnt'

const title = ['名称', '申报单位', '项目类型', '申报时间']
const list = ref([])
const total = ref(0)

const getList = async () => {
  const result = await getReserveList({
    page: 1,
    pagesize: 10
  })
  list.value = result.data
  total.value = result.total
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.project-reserve {
  .total {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding: 20px 0 14px;
    span {
      color: #27E0FD;
      font-family: PangMenZhengDao;
      padding: 0 4px 0 28px;
      font-size: 22px;
    }
  }
  .table-wrap {
    .item {
      font-size: 14px;
      display: flex;
      align-items: center;
      height: 34px;
      div {
        flex: 1;
        padding: 0 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-of-type(3), &:nth-of-type(4) {
          flex: none;
          width: 18%;
        }
      }
    }
    .item-wrap {
      height: calc(34px * 5);
      overflow-y: scroll;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: hidden;
      &::-webkit-scrollbar{
        display: none; /* ChromeSafari */
      }
      .item {
        color: #fff;
        &:nth-of-type(2n-1) {
          background: url("~@/assets/rural-brain/dl/table-row-bg-long.svg") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
