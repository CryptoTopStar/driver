<template>
  <div class="center">
    <iframe
      id="gisIframe"
      class="iframe"
      src="/iframe/smart-communities/DCX_LJFL.html"
    >
    </iframe>
  </div>
</template>

<script>
import { classificationAccuracyList } from "@/api/garbage/api";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";

export default {
  setup(props, { emit }) {
    const {
      proxy: {
        $tools: { sendMessage },
      },
    } = getCurrentInstance();
    const initData = () => {
      classificationAccuracyList().then((res) => {
        if (res.code == 0) {
          initMap(res.data);
        }
      });
    };
    // 初始化当前map地图
    const initMap = (list) => {
      let option = {
        早田坂村: null,
        大唐村: null,
        夏家村: null,
        大陈村: null,
        红星村: null,
        乌龙村: null,
      };
      Object.keys(option).forEach((key, value) => {
        for (let index in list) {
          // console.log(option[index], option["大陈村"], list[index].village);
          if (key == list[index].village) {
            option[key] = parseInt(list[index].correctRate) / 100;
          }
        }
      });
      let message = { key: "changeAreaByOption", value: { option: option } };
      sendMessage("gisLayerMessage", message);
    };

    //监听函数，接收一个参数--Event事件对象
    function receiveMsg(e) {
      let obj = e.data;
      // 地图交互消息监听
      if (obj.type == "gisMapMessage") {
        if (obj.data.key == "initInfo" && obj.data.value) {
          // initType为true时，map初始化成功
          console.log("initInfo交互---地图加载完成", obj.data.value.initType);

          // ！！！执行后续逻辑
          // 根据参数信息修改区划面样式
          // randomNum();
        } else if (obj.data.key == "areaInfo" && obj.data.value) {
          // 有值 / 无值 --> "大陈村" / ""
          console.log("areaInfo---行政区划名称", obj.data.value.areaName);
          emit("update", obj.data.value.areaName);
        }
      }
    }

    onMounted(() => {
      if (window.addEventListener) {
        //为window注册message事件并绑定监听函数
        window.addEventListener("message", receiveMsg, false);
      } else {
        window.attachEvent("message", receiveMsg);
      }
      setTimeout(() => {
        initData();
      }, 500);
    });
    return {};
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
}
</style>
