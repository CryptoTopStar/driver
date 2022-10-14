<template>
  <div class="_right3">
    <title-bar title="垃圾车辆轨迹" />
    <div class="_main">
      <img src="@/assets/images/garbage/line-bg.png" />
      <img src="@/assets/images/garbage/line-mask.png" @click="showMap" />
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  components: { TitleBar },
  setup(props, { emit }) {
    const init = () => {
      AMapLoader.load({
        key: "6a3c4a688ab41d79e1629f094389905d",
        plugins: [
          "AMap.Geolocation",
          "AMap.Marker",
          "AMap.Autocomplete",
          "AMap.PlaceSearch",
          "AMap.Geocoder",
        ],
        AMapUI: {
          version: "1.1",
          plugins: ["misc/PositionPicker", "control/BasicControl"],
        },
      })
        .then((AMap) => {
          // 初始化当前地图
          new AMap.Map("container", {
            zoom: 16,
            resizeEnable: true,
            animateEnable: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    // 点击展示当前垃圾车轨迹图地址
    const showMap = () => {
      emit("showMap");
    };
    onMounted(() => {
      // init(); // 这里进行初始化
    });
    return { showMap };
  },
};
</script>

<style scoped lang="scss">
._right3 {
  width: 100%;

  ._main {
    position: relative;
    width: vw(395);
    height: vh(231);
    margin-left: vw(32);
    margin-top: vh(20);
    img:nth-of-type(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: vw(395);
      height: vh(231);
    }
    img:nth-of-type(2) {
      position: absolute;
      z-index: 1;
      top: vh(4);
      left: vw(4);
      width: vw(387);
      height: vh(223);
      cursor: pointer;
    }
  }
}
</style>
