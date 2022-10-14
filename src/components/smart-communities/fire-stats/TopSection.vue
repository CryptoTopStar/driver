<template>
  <div class="container">
      <TopStatItem
          label="今日报警"
          :value="data.calls"
          unit="次"
          :icon="require('@/assets/images/smart-communities/fire-stats/icon_1-1.svg')"
          :style="{cursor: 'pointer'}"
          @click="()=>toggleDetailTable('calls')"
          interactive
      />
      <TopStatItem
          label="未处理报警"
          :value="data.missedCalls"
          unit="次"
          :icon="require('@/assets/images/smart-communities/fire-stats/icon_2-2.svg')"
          :style="{cursor: 'pointer'}"
          @click="()=>toggleDetailTable('missedCalls')"
          interactive
      />
      <TopStatItem
          label="今日隐患"
          :value="data.hazards"
          unit="次"
          :icon="require('@/assets/images/smart-communities/fire-stats/icon_1-3.svg')"
          :style="{cursor: 'pointer'}"
          @click="()=>toggleDetailTable('hazards')"
          interactive
      />
      <TopStatItem
          label="未处理隐患"
          :value="data.unresolved"
          unit="次"
          :icon="require('@/assets/images/smart-communities/fire-stats/icon_1-4.svg')"
          :style="{cursor: 'pointer'}"
          @click="()=>toggleDetailTable('unresolved')"
          interactive
      />
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, onBeforeUnmount, defineProps, defineEmits} from "vue";
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
    calls: '-',
    missedCalls: '-',
    hazards: '-',
    unresolved: '-',
})
const isLoading = ref(false);
request.get('/api/fireSupe/getFireIndex').then((result)=>{
    data.calls = result.data.find(e=>e.index_name === '今日报警')?.index_value ?? '-';
    data.missedCalls = result.data.find(e=>e.index_name === '未处理报警')?.index_value ?? '-';
    data.hazards = result.data.find(e=>e.index_name === '今日隐患')?.index_value ?? '-';
    data.unresolved = result.data.find(e=>e.index_name === '未处理隐患')?.index_value ?? '-';

}).finally(()=>{
  isLoading.value = false;
});

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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-inline: vw(120);
  column-gap: vw(8);
}
</style>
