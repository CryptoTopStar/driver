<template>
  <div class="outer">
    <div ref="liveableRef" class="diseases">
      <common-header title="茶叶病虫害预警"></common-header>

      <left ref="leftRef" />
      <right ref="rightRef" @show="show" @showMap="showMap" />
      <center ref="centerRef" />
    </div>

    <div class="_bottom-nav">
      <BottomNav />
    </div>
  </div>
</template>

<script>
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";
import _ from "lodash";
import { useRoute } from "vue-router";
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";

import BottomNav from "@/components/data-exploration/BottomNav";
// import Map from "../garbage/map.vue"
import { getGarbageToken } from "@/api/garbage/api";
import CommonHeader from "@/components/commonHeader.vue";
export default {
  components: {
    Left,
    Right,
    Center,
    BottomNav,
    CommonHeader,
  },
  setup() {
    const route = useRoute();
    const leftRef = ref(null);
    const centerRef = ref(null);
    const rightRef = ref(null);
    const liveableRef = ref(null);

    onMounted(() => {});

    return {
      leftRef,
      centerRef,
      rightRef,
      liveableRef,
    };
  },
};
</script>

<style scoped lang="scss">
.outer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("https://img.hzanchu.com/acimg/f3fd23adc9a092e8dd926e3723b2eadb.png")
    no-repeat;
  background-size: 100% 100%;
}
.diseases {
  transform-origin: 0 0;
  width: vw(1920);
  height: vh(1080);
}
._bottom-nav {
  position: fixed;
  bottom: vh(10);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
