<template>
  <div class="center">
    <iframe
      id="gisIframe"
      class="iframe"
      src="/iframe/smart-communities/DCX_XCLY.html"
    />

    <div class="nav">
      <div v-for="(item, index) in list" :key="index" class="nav-item">
        <div class="nav-left">
          <img :src="item.icon" />
          {{ item.text }}（{{item.num}}）
        </div>

        <img
          :src="
            item.select
              ? require('@/assets/images/tour/select.png')
              : require('@/assets/images/tour/unselect.png')
          "
          class="nav-right"
          @click="selectIcon(index)"
        />
      </div>
    </div>
    <BusRouteButton class="route-modal-toggle" />
  </div>
</template>

<script>
import BusRouteButton from "@/components/smart-communities/tourism/BusRouteButton";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  components: { BusRouteButton },
  setup() {
    const {
      proxy: {
        $tools: { sendMessage },
      },
    } = getCurrentInstance();
    const lastPos = ref(0); // 第一次的pos选中位置
    const selectArray = ref([]);
    const isLoading = ref(false);
    const list = ref([
      {
        text: "景点",
        num: 19,
        select: false,
        icon: require("@/assets/images/tour/icon1.png"),
      },
      {
        text: "民宿",
        num: 1,
        select: false,
        icon: require("@/assets/images/tour/icon2.png"),
      },
      {
        text: "农家乐",
        num: 5,
        select: false,
        icon: require("@/assets/images/tour/icon3.png"),
      },
      // { text: "酒店", select: false, icon: require('@/assets/images/tour/icon4.png')"  },
      {
        text: "公共设施",
        num: 3,
        select: false,
        icon: require("@/assets/images/tour/icon5.png"),
      },
      {
        text: "小吃购物",
        num: 7,
        select: false,
        icon: require("@/assets/images/tour/icon6.png"),
      },
      {
        text: "停车场",
        num: 1,
        select: false,
        icon: require("@/assets/images/tour/icon7.png"),
      },
      {
        text: "推荐路线",
        num: 1,
        select: false,
        icon: require("@/assets/images/tour/icon8.png"),
      },
    ]);


    const selectIcon = (pos) => {
      if(!isLoading.value) {
        isLoading.value = true;
        if(selectArray.value.indexOf(list.value[pos].text) === -1) {
          selectArray.value.push(list.value[pos].text)
          list.value[pos].select = true;
        } else {
          let index = selectArray.value.indexOf(list.value[pos].text);
          console.log(index, 'index')
          selectArray.value.splice(+index, 1);
          list.value[pos].select = false;
        }
        reload(selectArray.value);
      }
    };

    const reload = (pos) => {
      let message = {
        key: "changeLayerByType",
        value: { type: JSON.stringify(pos) },
      };
      sendMessage("gisLayerMessage", message);
      isLoading.value = false;
    };

    onMounted(() => {
      selectArray.value.push('景点');
      list.value[0].select = true;
      setTimeout(() => {
        reload(selectArray.value);
      }, 500);
    });
    return { list, selectIcon };
  },
};
</script>

<style scoped lang="scss">
.center {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .iframe {
    width: 100%;
    height: 100%;
  }

  .nav {
    position: absolute;
    bottom: vh(240);
    right: vw(520);
    // width: vw(155);
    // height: vh(210);
    padding: 0 vw(12) vh(12) vw(12);
    // box-sizing: border-box;
    background: url(https://img.hzanchu.com/acimg/f32ce35b13acf9e477376e307cc51d17.png)
      no-repeat;
    background-size: 100%;
    background-size: cover;

    .nav-item {
      width: 100%;
      margin-top: vh(16);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .nav-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: vw(14);
        color: #94c9e8;
        img {
          width: vw(14);
          height: vw(14);
          margin-right: vw(4);
        }
      }
      .nav-right {
        width: vw(14);
        height: vw(14);
        margin-left: vw(40);
        cursor: pointer;
      }
    }
  }
  .route-modal-toggle {
    position: absolute;
    bottom: vh(195);
    right: vw(553);
  }
}
</style>
