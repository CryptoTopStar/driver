<template>
  <div class="right">
    <right-1 v-bind="$attrs"/>
    <right-2 v-bind="$attrs"/>
    <right-3 v-bind="$attrs"/>
  </div>
</template>

<script>
import Right1 from "./components/right/right1.vue";
import Right2 from "./components/right/right2.vue";
import Right3 from "./components/right/right3.vue";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
export default {
  components: { Right1, Right2, Right3 },
  setup(props, { emit }) {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.right {
  position: absolute;
  z-index: 1;
  top: vh(110);
  right: vw(25);
  width: vw(460);
  height: vh(936);
}
</style>
