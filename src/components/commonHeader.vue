<template>
  <div class="_common-header">
    <img :src="bgUrl || require('@/assets/images/teaDiseases/top-bg.png')" />
    <div class="_common-header-title">{{ title }}</div>
    <router-link to="/home" class="back">
      <img src="@/assets/images/garbage/top-back.png" />
      返回首页
    </router-link>
    <!--
      <div class="_download" @click="download">
      <img src="@/assets/images/garbage/header-download-icon.png" />
      下载报告
    </div>
    -->
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
    bgUrl: {
      type: String,
      default: "",
    }, //当前 header 顶部背景
    showBack: {
      type: Boolean,
      default: false,
    }, // 是否展示回退
    router: {
      type: String,
      default: "",
    }, // 如果展示回退那么则需要传入当前路由（当然上面的 showBack 可以考虑跟当前参数合归为一类）
    customStyle: {
      type: String,
      default: "",
    },
    // 其他参数可配字大小、样式等
  },
  setup(props, { emit }) {
    // 下载当前模板
    const download = () => {};
    return { download };
  },
};
</script>

<style scoped lang="scss">
._common-header {
  position: absolute;
  top: 0;
  z-index: 3;
  width: vw(1920);
  height: vh(110);

  img:nth-of-type(1) {
    width: 100%;
    height: vh(110);
  }
  ._common-header-title {
    position: absolute;
    z-index: 20;
    top: vh(20);
    left: 0;
    width: 100%;
    height: vh(50);
    line-height: vh(50);
    font-family: PangMenZhengDao;
    font-size: vw(60);
    text-align: center;
    color: #ffffff;
    letter-spacing: 6px;
  }
  .back {
    position: absolute;
    z-index: 30;
    top: vh(20);
    right: vw(40);
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

  ._download {
    position: absolute;
    z-index: 30;
    top: vh(68);
    right: vw(40);
    width: vw(106);
    height: vh(31);
    background: url("~@/assets/images/garbage/header-download-bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: vw(14);
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: vw(20);
      height: vh(20);
      margin-right: vw(4);
    }
  }
}
</style>
