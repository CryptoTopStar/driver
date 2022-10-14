<template>
  <div class="right">
    <right-1 :data="list" @show="show" />
    <right-2 :data="list" />
    <right-3 @showMap="showMap" />
  </div>
</template>

<script>
import Right1 from "./components/right/right1.vue";
import Right2 from "./components/right/right2.vue";
import Right3 from "./components/right/right3.vue";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { rubbishGetRealTimeRubbishCollectByPage } from "@/api/garbage/api";
export default {
  components: { Right1, Right2, Right3 },
  props: {
    data: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const list = ref([]);
    // 重新加载数据
    const reload = () => {
      rubbishGetRealTimeRubbishCollectByPage({
        street: "大陈乡",
      }).then((res) => {
        list.value = res.data.list;
      });
    };

    const show = () => {
      emit("show");
    };
    const showMap = () => {
      emit("showMap");
    };

    onMounted(() => {
      reload();
    });
    return { list, show, showMap };
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
