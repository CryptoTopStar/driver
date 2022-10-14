<template>
  <div class="_left1-center-item" :style="customStyle">
    <div class="_center-item-top">
      <img src="@/assets/images/garbage/left1-center-icon.png" />
      <div class="blank"></div>
      {{ title }}
    </div>
    <div
      :class="
        value == '更新中' ? '_center-item-bottom-s' : '_center-item-bottom'
      "
    >
      {{ value }}<span>{{ unit }}</span>
    </div>
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
._left1-center-item {
  width: vw(140);
  display: flex;
  flex-direction: column;
  align-items: center;

  ._center-item-top {
    font-size: vw(16);
    color: #cceaff;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: vw(6);
      height: vh(10);
      // box-shadow: vw(0) vw(0) vw(10) vw(1) #e0c260;
      background-color: transparent;
      animation: garbage_left1_center 2s linear infinite normal;
    }
    .blank {
      width: vw(0);
      height: vh(10);
      margin-left: vw(-4);
      margin-right: vw(12);
      box-shadow: vw(0) vw(0) vw(12) vw(4) #e0c260;
      animation: garbage_left1_center 2s linear infinite normal;
    }
  }
  ._center-item-bottom {
    margin-top: vh(4);
    font-size: vw(24);
    // font-weight: bold;
    color: #27e0fd;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    span {
      margin-left: vw(4);
      font-size: vw(14);
      font-weight: normal;
      color: #90b6d2;
    }
  }
  ._center-item-bottom-s {
    margin-top: vh(12);
    font-size: vw(16); 
    color: #27e0fd;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  }
}
</style>
