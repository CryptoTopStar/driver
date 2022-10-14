<template>
  <div class="_right1">
    <title-bar
      title="农机服务点"
      customStyle="margin-left: 0px;margin-top: 0px"
    />
    <div class="_main">
      <div class="_left">
        <div></div>
        农机合作社
      </div>
      <div class="_right">
        <div></div>
        农机维修网点
      </div>
    </div>
    <list-1 v-bind="$attrs"></list-1>
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

  ._main {
    width: 100%;
    margin-top: vh(20);
    display: flex;
    flex-direction: row;
    align-items: center;

    ._left {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: vw(12);
      color: #cceaff;
      div {
        width: vw(16);
        height: vh(2);
        margin-right: vw(8);
        background-color: #27e0fd;
      }
    }

    ._right {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: vw(12);
      color: #cceaff;
      div {
        width: vw(16);
        height: vh(2);
        margin-right: vw(8);
        background-color: #e6c760;
      }
    }
  }
}
</style>
