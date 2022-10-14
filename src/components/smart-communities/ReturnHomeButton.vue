<template>
  <router-link
      to="/smart-communities/home"
      class="nav-link">
    <img class="arrow" :src="require('@/assets/images/icon/return-arrow.svg')" />
      返回上一级
  </router-link>
</template>

<script setup>
</script>

<style scoped lang="scss">
.nav-link {
  position: fixed;
  display: block;
  right: vw(44);
  top: vh(6);
  z-index: 800;

  font-size: vw(16);
  font-weight: bold;
  color: #FFFFFF;
}
.arrow {
  width: 1em;
  height: 1em;
  vertical-align: bottom;
}
</style>
