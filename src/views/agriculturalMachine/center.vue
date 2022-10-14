<template>
  <div class="center">
    <div class="contain">
      <iframe
        class="map"
        frameborder="0"
        align="center"
        src="https://jiangshan-jsc-jsc.zjsszxc.com/JSEASYV/EASYV_NJNZ_NJ_Final.html"
      ></iframe>

      <img :src="require('@/assets/images/machine/bg1.png')" class="bg1" />
      <img :src="require('@/assets/images/machine/bg2.png')" class="bg2" />

      <div class="legend">
        <img src="@/assets/images/machine/car.png" />
        农机资源
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {},
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.center {
  position: absolute;
  z-index: 2;
  top: vh(110);
  left: vw(507);
  width: vw(908);
  height: vh(594);
  // box-sizing: border-box;
  // background-color: rgba(8, 26, 72, 0.5);
  // border: 2px solid rgba(36, 60, 132, 0.5);

  .contain {
    position: relative;
    width: vw(908);
    height: vh(594);
    .map {
      position: relative;
      z-index: 2;
      width: vw(908);
      height: vh(594);
    }

    .bg1 {
      position: absolute;
      z-index: 1;
      top: vh(63);
      left: vw(220);
      width: vw(468);
      height: vh(468);
      animation: _bg1 20s linear infinite normal;
      animation-fill-mode: forwards;
    }

    .bg2 {
      position: absolute;
      z-index: 0;
      top: vh(215);
      left: vw(116);
      width: vw(676);
      height: vh(165);
      animation: _bg2 6s linear infinite normal;
      animation-fill-mode: forwards;
    }

    .legend {
      position: absolute;
      z-index: 0;
      bottom: vh(20);
      right: vw(0);
      width: vw(125);
      height: vh(43);
      background: url("~@/assets/images/machine/legend-bg.png") no-repeat;
      background-size: 100% 100%;
      font-size: 16px;
      color: #ffffff;
      opacity: 0.8;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: vw(16);
        height: vh(16);
        margin-right: vw(8);
      }
    }
  }
}
</style>


<style lang="scss">
@keyframes _bg1 {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes _bg2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
