<template>
  <div class="outer">
    <div ref="liveableRef" class="tour">
      <div class="header">
        <img src="@/assets/images/garbage/top-bg.png" />
        <router-link to="/smart-communities/home" class="back">
          <img src="@/assets/images/garbage/top-back.png" />
          返回上一级
        </router-link>
      </div>
      <left v-if="isload" ref="leftRef" />
      <right v-if="isload" ref="rightRef" @show="show" @showMap="showMap" />
      <center v-if="isload" ref="centerRef" @update="updateArea" />
      <!-- <bottom v-if="isload" ref="bottomRef"></bottom>  -->

      <bottom-1 ref="bottomRef" :village="village"></bottom-1>
      <map-center v-if="isload" ref="mapRef"></map-center>
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
import {
  ref,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  provide,
} from "vue";
import Bottom from "./bottom.vue";
import Bottom1 from "./bottom1.vue";
import BottomNav from "@/components/smart-communities/BottomNav";
import MapCenter from "./map.vue";
// import Map from "../garbage/map.vue"
import { getGarbageToken } from "@/api/garbage/api";
export default {
  components: {
    Left,
    Right,
    Center,
    Bottom,
    BottomNav,
    MapCenter,
    Bottom1,
  },
  setup() {
    const route = useRoute();
    const leftRef = ref(null);
    const centerRef = ref(null);
    const rightRef = ref(null);
    const liveableRef = ref(null);
    const bottomRef = ref(null);
    const mapRef = ref(null);
    const isload = ref(false);
    const bottomShow = ref("");
    const village = ref("大陈乡"); // 当前的村庄

    // 点击展示底部
    const show = () => {
      if (bottomShow.value == "") {
        bottomShow.value = "show";
      } else {
        bottomShow.value = "";
      }
    };

    const updateArea = (area) => {
      console.log(area);
      if (area != village.value) {
        village.value = area ? area : "大陈乡";
        setTimeout(() => {
          bottomShow.value = area ? area : "大陈乡";
        }, 250);
      }
    };
    provide("bottomShow", bottomShow);

    const showMap = () => {
      mapRef.value.show();
    };

    onMounted(() => {
      getGarbageToken({
        grant_type: "client_credentials",
        // client_id: "anchu_js",
        client_id: "anchu_js",
        client_secret: "123456",
      }).then((res) => {
        localStorage.setItem("garbageToken", res.data.access_token);
        isload.value = true;
      });
    });

    return {
      leftRef,
      centerRef,
      rightRef,
      liveableRef,
      bottomRef,
      mapRef,
      showMap,
      isload,
      show,
      updateArea,
      village,
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
