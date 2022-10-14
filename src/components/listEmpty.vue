<template>
  <div class="_list-empty flex-ajc" :style="customStyle">
    <img :src="icon" class="_empty-icon" />
    <div class="_empty-title">{{ title }}</div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "暂无数据",
    },
    icon: {
      type: String,
      default:
        "https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png",
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
.flex-ajc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
._list-empty {
  width: 100%;
  height: vh(152);
  margin-top: vh(10);
  padding: 0 vw(20);
  box-sizing: border-box;
  overflow: hidden;

  ._empty-icon {
    width: vw(130);
    height: vh(140);
  }

  ._empty-title {
    margin-top: vh(-20);
    font-size: vw(18);
    color: #bbd7fa;
  }
}
</style>
