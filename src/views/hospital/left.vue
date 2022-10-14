<template>
  <div class="left">
    <left-1 />
    <left-2 />
    <left-3 />
  </div>
</template>

<script>
import Left1 from "./components/left/left1.vue";
import Left2 from "./components/left/left2.vue";
import Left3 from "./components/left/left3.vue";
import _ from "lodash";
import { onMounted } from "@vue/runtime-core";
export default {
  components: { Left1, Left2, Left3 },
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.left {
  // width: vw(497);
  position: absolute;
  z-index: 3;
  top: vh(70);
  left: vw(25);
  width: vw(460);
  height: vh(936);
  box-sizing: border-box;
  background: url(https://img.hzanchu.com/acimg/1bae5fb537ddce1fdffb29cecb7c5893.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>
