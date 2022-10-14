<template>
  <div class="outer">
    <div ref="liveableRef" class="tour">
      <div class="header">
        <img src="@/assets/images/hospital/top-bg.png" />
        <router-link to="/smart-communities/home" class="back">
          <img src="@/assets/images/garbage/top-back.png" />
          返回上一级
        </router-link>
      </div>
      <left ref="leftRef" />
      <right ref="rightRef" @show="show" />
      <center ref="centerRef" />
      <bottom ref="bottomRef"></bottom>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";
import _ from "lodash";
import { useRoute } from "vue-router";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import Bottom from "./bottom.vue";
import BottomNav from "@/components/smart-communities/BottomNav";
export default {
  components: {
    Left,
    Right,
    Center,
    Bottom,
    BottomNav,
  },
  setup() {
    const route = useRoute();
    const leftRef = ref(null);
    const centerRef = ref(null);
    const rightRef = ref(null);
    const liveableRef = ref(null);
    const bottomRef = ref(null);

    const show = () => {
      bottomRef.value.show();
    };

    onMounted(() => {});
    onUnmounted(() => {});

    return {
      leftRef,
      centerRef,
      rightRef,
      liveableRef,
      bottomRef,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
.outer {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.tour {
  transform-origin: 0 0;
  width: vw(1920);
  height: vh(1080);
  .header {
    position: relative;
    z-index: 3;
    width: vw(1920);
    height: vh(103);

    img:nth-of-type(1) {
      width: 100%;
      height: vh(103);
    }
    .back {
      position: absolute;
     top: vh(10);
      right: vw(43);
      font-size: vw(16);
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: vw(20);
        height: vh(20);
        margin-right: vw(7);
      }
    }
  }
}
</style>
