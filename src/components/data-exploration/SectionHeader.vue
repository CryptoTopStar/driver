<template>
  <header class="section-header">
    <span class="header-title">{{title}}</span>
    <slot name="after"></slot>
  </header>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="scss">
.section-header {
  width: clamp(0px, vw(590), 100%);
  height: vh(46);
  position: relative;
  background: no-repeat center / 100% url("~@/assets/images/data-exploration/shared/header.svg");
}
.header-title {
  display: inline-block;
  padding: vh(13) 0 vh(13) vw(41);
  font-size: vh(20);
  line-height: vh(20);
  font-family: PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
