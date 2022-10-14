<template>
  <div class="stat-container">
    <div class="value-container">
      <img ref="bgRef" class="background" :src="require('@/assets/images/smart-communities/ring_number-bg.png')" alt="bg" />
      <div class="value" :style="{color: valueColor}">{{value ?? '-'}}<span class="unit">{{unit}}</span></div>
      <router-link :to="redirectUrl" v-if="redirectUrl" class="redirect-arrow"><img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" /></router-link>
    </div>
    <div class="label">{{label ?? '-'}}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onBeforeUnmount } from 'vue';

const props = defineProps({
  value: [String, Number],
  valueColor: String,
  unit: String,
  label: String,
  redirectUrl: {
    type: String,
    default: undefined,
    required: false
  }
})
const bgRef = ref(null)

onMounted(() => {
  bgRef.value.animate([
    { transform: 'rotate(0)'},
    { transform: 'rotate(360deg)'}
  ], {
    duration: 5000,
    iterations: Infinity
  });
})
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.value-container {
  position: relative;
  width: calc(vw(120) * var(--scale));
  height: calc(vw(120) * var(--scale));
  display: flex;
  justify-content: center;
  align-items: center;
}
.stat-container {
  position: relative;
  --scale: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
  row-gap: vh(4);
}
.value {
  margin-block-start: 10%;
  font-size: vw(24);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #EACA60;
  line-height: vw(38);
  z-index: 1;
}
.unit {
  font-size: vw(14);
  font-weight: normal;
  color: #90B6D2;
  line-height: vw(38);
}
.label {
  font-size: vw(16);
  font-weight: normal;
  color: #CCEAFF;
  line-height: vw(19);
  word-break: break-all;
  text-align: center;
}
.redirect-arrow {
  width: vw(20);
  height: vw(20);
  &:hover {
  }
  img {
    width: inherit;
    height: inherit;
  }
  z-index: 1;
}
</style>
