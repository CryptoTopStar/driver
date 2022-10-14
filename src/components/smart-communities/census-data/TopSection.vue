<template>
  <div class="container">
    <TopStatItem
        label="今日重点人员数"
        :value="data.dailyNumber"
        unit="人"
        :icon="require('@/assets/images/smart-communities/census-data/icon_1-1.svg')"
        :style="{cursor: 'pointer'}"
        @click="()=>toggleDetailTable('dailyNumber')"
        interactive
    />
    <TopStatItem
        label="重点人员总数"
        :value="data.totalNumber"
        unit="人"
        :icon="require('@/assets/images/smart-communities/census-data/icon_1-1.svg')"
        :style="{cursor: 'pointer'}"
        @click="()=>toggleDetailTable('totalNumber')"
        interactive
    />
    <TopStatItem
        label="走访次数"
        :value="data.censusVisits"
        unit="次"
        :icon="require('@/assets/images/smart-communities/census-data/icon_1-3.svg')"
        :style="{cursor: 'pointer'}"
        @click="()=>toggleDetailTable('censusVisits')"
        interactive
    />
  </div>
</template>

<script setup>
import {defineProps, defineEmits, reactive, ref, onMounted, onBeforeUnmount} from "vue";
import TopStatItem from '@/components/smart-communities/fire-stats/sub-components/TopStatItem.vue'
import request from '@/util/http.js';

const props = defineProps({
  showDetailTable: [String, null]
})
const emits = defineEmits(['update:showDetailTable'])
const toggleDetailTable = (key)=>{
  emits('update:showDetailTable', props.showDetailTable === key ? null : key)
}

// chart
const chartColors = ['#EF9E4E','#3ED2FF']

// data
const data = reactive({
  dailyNumber: '-',
  totalNumber: '-',
  censusVisits: '-',
})
const isLoading = ref(false);
request.get('/api/Person/getPersonType').then((result)=>{
  data.dailyNumber = result.data.find((e)=>(e.type_title === '今日重点人员'))?.number ?? '-';
  data.totalNumber = result.data.find((e)=>(e.type_title === '重点人员总数'))?.number ?? '-';
  data.censusVisits = result.data.find((e)=>(e.type_title === '走访次数'))?.number ?? '-';
})

onMounted(()=>{
})
onBeforeUnmount(()=>{
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-inline: vw(120);
  column-gap: vw(24);
}
</style>
