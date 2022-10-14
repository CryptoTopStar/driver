<template>
  <div class="_right2">
    <title-bar title="评价监管" />
    <div class="_main">
      <div class="_left">
        <div></div>
        好评量
      </div>
      <div class="_right">
        <div></div>
        投诉量
      </div>
    </div>

    <list-2 ref="list2Ref" :data="data"></list-2>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List2 from "./list2.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  components: { TitleBar, List2 },
  props: {
    data: {
      type: Array
    }
  },
  setup() {
    const list2Ref = ref(null);
    onMounted(() => {
      list2Ref.value.reload();
    });
    return { list2Ref };
  },
};
</script>

<style scoped lang="scss">
._right2 {
  width: 100%;

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
