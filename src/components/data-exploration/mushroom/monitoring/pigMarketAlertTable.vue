<template>
  <ScrollingBoard
    :data="data"
    :columns="columns"
    id-field="_tid"
    class="data-table"
    :visible-count="5"
  />
</template>

<script setup>
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import {compareDateString, sanitizeInvalidDate} from "@/util/util";
const pirceTableData=[{price: "5.9万头", priceChange: "销量突降", reasonAnalysis: "生猪价格突增",visit_time: "2022/01/17"},
{price: "5.75万头", priceChange: "销量突降", reasonAnalysis: "生猪价格突降",  visit_time: "2022/03/15"},
{price: "14.9万头", priceChange: "销量突增", reasonAnalysis: "生猪价格突降",  visit_time: "2022/05/08"},
]
const saleTableData=[{price: "10元/kg", priceChange: "价格突增", reasonAnalysis: "生猪出栏数量少",visit_time: "2022/01/02"},
{price: "12元/kg", priceChange: "价格突降", reasonAnalysis: "猪仔价格低",  visit_time: "2022/05/03"}]
// data
const isLoading = ref(false);
const data = ref([])
const columns = ref([])
const props = defineProps({
  data: {
    type:Array,
    default:[]
  },
  type:{
      type:String
  }
})
request
  .get('/api/Person/getPersonnelDetailList')
  .then((result)=>{
    data.value = (props?.type=='pigSaleMarketWarning'?pirceTableData:saleTableData).sort((a,b)=>compareDateString(a.visit_time, b.visit_time)).map((e, idx)=>({
      ...e,
      _tid: `${Date.now()}-${idx}`,
      _idx: idx+1,
      visit_time: sanitizeInvalidDate(e.visit_time),
    }))
  })
  .finally(()=>{
    isLoading.value = false
  })
  const changeTableHeader=()=>{
  columns.value=[ //根据表格类型改变表头名称
    {field: 'price', name: props?.type=='pigSaleMarketWarning'?'销量':'价格', width: '20%'},
    {field: 'priceChange', name: props?.type=='pigSaleMarketWarning'?'销量变化':'价格变化', width: '35%'},
    {field: 'reasonAnalysis', name: '原因分析', width: '15%'},
    {field: 'visit_time', name: '预警时间', width: '30%'},
  ]
  }
onMounted(()=>{
changeTableHeader()
})
</script>

<style scoped lang="scss">
.data-table {
  margin-block: vh(20);
}
</style>
