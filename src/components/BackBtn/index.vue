<template>
  <img class="goBack" src="../../assets/images/back.png" alt="" @click="goBack">
</template>

<script setup>
import { useRouter } from 'vue-router';
const Router = useRouter();

const goBack = () => {
  Router.go(-1);
}
</script>

<style scoped lang="scss">
  .goBack {
    width: 71px;
    position: absolute;
    right: 0;
    top: 24px;
    cursor: pointer;
    z-index: 9999;
  }
</style>