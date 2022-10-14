<template>
  <div class="right">
    <right-1 />
    <right-2 />
    <right-3 @show="show" />
  </div>
</template>

<script>
import Right1 from "./components/right/right1.vue";
import Right2 from "./components/right/right2.vue";
import Right3 from "./components/right/right3.vue";
import _ from "lodash";
import { onMounted } from "@vue/runtime-core";
export default {
  components: { Right1, Right2, Right3 },
  setup(props, { emit }) {
    const show = () => {
      emit("show");
    };

    onMounted(() => {});
    return { show };
  },
};
</script>

<style scoped lang="scss">
.right {
  position: absolute;
  z-index: 3;
  top: vh(70);
  right: vw(25);
  width: vw(460);
  height: vh(936);
  box-sizing: border-box;
  background: url(https://img.hzanchu.com/acimg/837b10e544dbf969874349af760d9c49.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>
