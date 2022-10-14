<template>
  <div class="center">
    <title-bar
      title="未来15日气象数据"
      customStyle="margin-left: 0px;margin-top: 0px"
    />
    <center-1 v-if="isLoad" :data="list"/>
    <center-2 v-if="isLoad" :data="list"/>
    <center-3 v-if="isLoad" :data="list"/>
  </div>
</template>

<script>
import Center1 from "./components/center/center1.vue";
import Center2 from "./components/center/center2.vue";
import Center3 from "./components/center/center3.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
import TitleBar from "@/components/titleBar.vue";
import { pestsMeteorologicalList } from "@/api/teadiseases/api";
export default {
  components: { Center1, Center2, Center3, TitleBar },
  setup() {
    const isLoad = ref(false);
    const list = ref([]);
    const init = () => {
      pestsMeteorologicalList({}).then((res) => {
        if (res.code == 0) {
          list.value = res.data;
        }
        setTimeout(() => {
          isLoad.value = true;
        }, 250);
      });
    };

    onMounted(() => {
      init();
    });
    return { isLoad, list };
  },
};
</script>

<style scoped lang="scss">
.center {
  position: absolute;
  z-index: 3;
  top: vh(110);
  left: vw(655);
  width: vw(610);
  height: vh(898);
  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
