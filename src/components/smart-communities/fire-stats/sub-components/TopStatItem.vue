<template>
  <div
      ref="containerRef"
      class="stat-container"
  >
    <ItemIcon preset="animated" :icon="icon" />
    <div class="content">
      <div class="label">{{label ?? '-'}}<img v-if="interactive" class="arrow" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" /></div>
      <div class="value" :style="{color: valueColor}">{{value ?? '-'}}<span class="unit">{{unit}}</span></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onBeforeUnmount, watchEffect } from 'vue';
import ItemIcon from "@/components/smart-communities/home/sub-components/ItemIcon"

const props = defineProps({
  value: [String, Number],
  unit: String,
  label: String,
  valueColor: String,
  icon: String,
  interactive: Boolean
})
const containerRef = ref(null)



onMounted(() => {
})
onBeforeUnmount(()=>{
})
</script>


<style scoped lang="scss">
.content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  row-gap: vh(4);
  height: 100%;
  margin-inline-start: vw(4);
  pointer-events: auto;
}
.stat-container {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  color: #FFFFFF;
  padding: vh(16) vw(20);
  background: url('~@/assets/images/smart-communities/fire-stats/center-top-box.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.value {
  font-size: vw(28);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
}
.unit {
  margin-inline-start: vw(4);
  font-size: vw(14);
  font-weight: normal;
}
.label {
  font-size: vw(16);
  font-weight: normal;
  line-height: vw(19);
  white-space: nowrap;
}
.arrow {
  vertical-align: baseline;
  width: 1em;
  height: 1em;
}
</style>
