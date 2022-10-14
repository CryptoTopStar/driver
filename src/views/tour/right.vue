<template>
  <div class="right">
    <right-1 v-if="data.management_type" :data="data.management_type" />
    <right-2 v-if="data.evaluation" :data="data.evaluation" />
    <right-3 v-if="data.revenue_sort" :data="data.revenue_sort" />
  </div>
</template>

<script>
import Right1 from "./components/right/right1.vue";
import Right2 from "./components/right/right2.vue";
import Right3 from "./components/right/right3.vue";
import { tourismModuleData } from "@/api/tour/api";
import { ref, onMounted } from "vue";
export default {
  components: { Right1, Right2, Right3 },
  setup() {
    const data = ref({}); // 当前右侧所有数据
    const init = () => {
      tourismModuleData().then((res) => {
        console.log(res);
        if (res.code == 0) {
          data.value = res.data;
        }
      });
    };
    onMounted(() => {
      init();
    });
    return { data };
  },
};
</script>

<style scoped lang="scss">
.right {
  // width: vw(497);
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
