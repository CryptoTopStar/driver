<template>
  <div class="text-container">
    <span class="text-name">{{name}}</span>
    <span class="text-desc">{{desc}}</span>
    <div class="container-decor"/>
  </div>
</template>

<script setup>
defineProps({
  name: [String, Number],
  desc: [String, Number],
})
</script>

<style scoped lang="scss">
.text-container {
  padding: vh(15) vw(40);
  line-height: vh(24);
  border-image: linear-gradient(to right, #51C2FE, #50C3F800) 1;
  border-width: vw(1);
  border-style: solid;
  background: linear-gradient(to right, #2354a280, #2354A200);
  position: relative;
}
.container-decor {
  position: absolute;
  left: 0;
  bottom: 0;
  width: vw(8);
  height: vh(25);
  background: #51C2FE;
  clip-path: polygon(0% 0, 100% 20%, 100% 100%, 0% 100%);
}
.text-name {
  display: inline-block;
  font-size: vh(16);
  min-width: vw(112);
  font-weight: 400;
  color: #51C2FE;
}
.text-desc {
  font-size: vw(18);
  font-weight: 400;
  color: #FFFFFF;
}
</style>
