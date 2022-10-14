<template>
  <div class="right">
    <right-1 />
    <right-2 />
  </div>
</template>

<script>
import Right1 from "./components/right/right1.vue";
import Right2 from "./components/right/right2.vue";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
export default {
  components: { Right1, Right2 },
  setup(props, { emit }) {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.right {
  position: absolute;
  z-index: 3;
  top: vh(110);
  right: vw(25);
  width: vw(610);
  height: vh(936);
}
</style>
