<template>
  <div ref="containerRef" class="stat-container" :style="{'--scale': scale}">
    <div class="value" :style="{color: valueColor}">{{value ?? '-'}}<span class="unit">{{unit}}</span></div>
    <div class="label">{{label ?? '-'}}</div>
    <router-link :to="redirectUrl" v-if="redirectUrl" class="redirect-arrow"><img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" /></router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onBeforeUnmount } from 'vue';

const props = defineProps({
  value: [String, Number],
  valueColor: String,
  unit: String,
  label: String,
  // size: [String, Number],
  scale: {
    type: [String, Number],
    default: 1
  },
  redirectUrl: {
    type: String,
    default: undefined,
    required: false
  }
})
// reactive state
const containerRef = ref(null)




onMounted(() => {
})
onBeforeUnmount(()=>{
})
</script>

<style scoped lang="scss">
.stat-container {
  --scale: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
  width: calc(vw(130) * var(--scale));
  height: calc(vw(130) * var(--scale));
  padding: vw(5);
  //padding: calc(vh(10) * var(--scale));
  background-image: url("~@/assets/images/smart-communities/ring.png");
  background-size: 130%;
  background-position: center;
  background-repeat: no-repeat;
}
.value {
  margin-block-start: 10%;
  font-size: vw(24);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #27E0FD;
  line-height: vw(38);

}
.unit {
  font-size: vw(14);
  font-weight: normal;
  color: #90B6D2;
  line-height: vw(38);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
}
.label {
  font-size: vw(16);
  font-weight: normal;
  color: #CCEAFF;
  line-height: vw(19);
  max-width: 4em;
  word-break: break-all;
  text-align: center;
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
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
}
</style>
