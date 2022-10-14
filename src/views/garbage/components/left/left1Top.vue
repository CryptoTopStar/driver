<template>
  <div class="_left1-top-item" :style="customStyle">
    <div>{{ title }}</div>
    <div>{{ value }}<span>户</span></div>
    <video src="@/assets/images/garbage/left1-top.mp4" autoplay loop muted />
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    customStyle: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped lang="scss">
._left1-top-item {
  position: relative;
  width: vw(140);
  height: vh(100);
  div:nth-of-type(1) {
    position: absolute;
    top: vh(8);
    width: vw(140);
    text-align: center;
    font-size: vw(16);
    color: #cceaff;
  }
  div:nth-of-type(2) {
    position: absolute;
    top: vh(35);
    width: vw(140);
    text-align: center;
    font-size: vw(24);
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    // font-weight: bold;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    color: #27e0fd;
    span {
      margin-left: vw(4);
      font-weight: normal;
      font-size: vw(14);
      color: #90b6d2;
    }
  }

  video {
    position: absolute;
    bottom: vw(0);
    width: vw(140);
    height: vh(76);
    mix-blend-mode: screen;
  }
}
</style>
