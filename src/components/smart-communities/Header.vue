<template>
  <header class="scs-header">
    {{title}}
  </header>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="scss">
.scs-header {
  position: fixed;

  text-align: center;
  font-size: vw(42);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
  text-shadow: vw(0) vw(6) vw(6) #002160;

  width: vw(1920);
  height: vh(103);
  line-height: vh(70);
  z-index: 100;
  background: url('~@/assets/images/smart-communities/shared/header.webp');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
