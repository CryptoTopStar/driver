<template>
  <div
      ref="containerRef"
      class="stat-container"
      :style="{backgroundImage: `url(${background})`}"
  >
    <div class="content">
      <div class="label">{{label ?? '-'}}</div>
      <div class="value" :style="{color: valueColor}">{{value ?? '-'}}<span class="unit">{{unit}}</span></div>
    </div>
<!--    <router-link :to="redirectUrl" v-if="redirectUrl" class="redirect-arrow">-->
<!--      <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />-->
<!--    </router-link>-->
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onBeforeUnmount, watchEffect } from 'vue';

const props = defineProps({
  value: [String, Number],
  unit: String,
  label: String,
  valueColor: String,
  background: String,
  // redirectUrl: {
  //   type: String,
  //   default: undefined,
  //   required: false
  // },
  // 'horizontal' / 'vertical'
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
  width: 100%;
}
.stat-container {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: vw(200);
  height: vh(95);
  padding: vh(16) vw(24);
  background-size: 108% 108%;
  background-position: center;
  background-repeat: no-repeat;
  .icon {
    width: vw(40);
  }
}
.value {
  font-size: vw(24);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
}
.unit {
  font-size: vw(14);
  font-weight: normal;
  color: #90B6D2;
}
.label {
  font-size: vw(16);
  font-weight: normal;
  color: #CCEAFF;
  line-height: vw(19);
  word-break: break-all;
}
.redirect-arrow {
  width: vw(20);
  height: vh(20);
  &:hover {
  }
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
