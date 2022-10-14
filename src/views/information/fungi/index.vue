<template>
  <!-- 食用菌index -->
  <div class="page-fungi">
    <!--    左侧内容-->
    <LeftContent type="fungi"></LeftContent>
    <!--    中间内容-->
    <MiddleContent type="fungi"></MiddleContent>
    <!--    右侧内容-->
    <RightContent type="fungi"></RightContent>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  getCurrentInstance,
} from "vue";
import LeftContent from "@/components/LeftContent";
import RightContent from "@/components/RightContent";
import MiddleContent from "@/components/MiddleContent";

export default {
  name: "Fungi",
  components: {
    LeftContent,
    RightContent,
    MiddleContent
  },
  setup() {
    const {proxy} = getCurrentInstance();
    const state = reactive({});
    onBeforeMount(() => {
    });
    onMounted(() => {
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang='scss' scoped>
.page-fungi {
  width: 100%;
  // position: fixed;
  // left: 0;
  // top: vw(234);
  box-sizing: border-box;
  padding: 0 0 vw(80);
  display: flex;
  justify-content: space-between;
  margin-top: vw(-40);
}
</style>
