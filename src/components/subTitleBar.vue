<template>
  <div
    class="_sub-title-bar"
    :style="customStyle"
    @click="goto"
  >
    <img :src="icon" class="_icon" />
    <div class="_title">
      {{ title }}
      <div></div>
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
    icon: {
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
._sub-title-bar {
  position: relative;
  width: 100%;
  height: vh(30);
  margin-top: vh(24);
  margin-left: vw(32);
  display: flex;
  flex-direction: row;
  align-items: center;

  ._icon {
    width: vw(26);
    height: vh(26);
  }

  ._title {
    height: vh(26);
    margin-left: vw(7);
    line-height: vh(26);
    font-size: vh(18);
    font-weight: 600;
    color: #fff;
    div {
      width: vw(217);
      height: vh(2);
      background: linear-gradient(
        90deg,
        #7bc3fa 0%,
        rgba(123, 195, 250, 0) 100%
      );
    }
  }
}
</style>
