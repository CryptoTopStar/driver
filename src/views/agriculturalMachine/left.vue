<template>
  <div class="left">
    <left-1 v-bind="$attrs" />
    <left-2 v-bind="$attrs" />
    <left-3 v-bind="$attrs" />
  </div>
</template>

<script>
import Left1 from "./components/left/left1.vue";
import Left2 from "./components/left/left2.vue";
import Left3 from "./components/left/left3.vue";
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
  position: absolute;
  z-index: 3;
  top: vh(110);
  left: vw(25);
  width: vw(460);
  height: vh(936);
}
</style>
