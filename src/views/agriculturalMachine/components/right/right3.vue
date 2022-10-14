<template>
  <div class="_right1">
    <title-bar
      title="农机驾驶员"
      customStyle="margin-left: 0px;margin-top: 0px"
    />
    <list-3 v-bind="$attrs"></list-3>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List3 from "./list3.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List3 },
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
  height: vh(286);
  margin-top: vh(20);
  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
