<template>
  <div class="_right1">
    <title-bar
      title="虫情监测"
      customStyle="margin-left: 0px;margin-top: 0px"
    />
    <list-1></list-1>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List1 from "./list1.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List1 },
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
  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
