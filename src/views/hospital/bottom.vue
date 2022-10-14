<template>
  <div class="bottom">
    <div class="legend">
      <img src="@/assets/images/hospital/hospital-icon.png" />
      医院（3）
    </div>

    <div v-if="showS" :class="showClass">
      <!-- <img
        src="@/assets/images/garbage/bottom-close.png"
        class="bottom-close"
        @click="showS = false"
      /> -->
      <title-bar title="疾病预防预警" />
      <bottom-1></bottom-1>
    </div>
  </div>
</template>

<script>
import Bottom1 from "./components/bottom/bottom.vue";
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted } from "vue";

export default {
  components: { Bottom1, TitleBar },
  setup() {
    const showS = ref(false);
    const showClass = ref("bottom-main-disappear");
    const show = () => {
      if (showS.value) {
        showClass.value = "bottom-main-disappear";
        setTimeout(() => {
          showS.value = false;
        }, 500);
      } else {
        showClass.value = "bottom-main";
        showS.value = true;
      }
    };
    onMounted(() => {});
    return { show, showS, showClass };
  },
};
</script>

<style scoped lang="scss">
.bottom {
  position: absolute;
  z-index: 3;
  bottom: vh(140);
  right: vw(536);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.bottom-main {
  position: relative;
  width: vw(850);
  height: vh(305);
  margin-top: vh(24);
  background: url(https://img.hzanchu.com/acimg/71a66d389aa37695a50206d1b426a105.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  animation: _show 0.6s linear 1;
}

.bottom-main-disappear {
  position: relative;
  width: vw(850);
  height: vh(305);
  margin-top: vh(24);
  background: url(https://img.hzanchu.com/acimg/71a66d389aa37695a50206d1b426a105.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;
  animation: _hide 0.6s linear 1;
}

.bottom-close {
  position: absolute;
  top: vh(12);
  right: vw(12);
  width: vw(22);
  height: vh(22);
  cursor: pointer;
}

.legend {
  width: vw(100);
  height: vh(44);
  background: url(https://img.hzanchu.com/acimg/fc3b725465727c97a363182173e6c34f.png)
    no-repeat;
  background-size: 100%;
  background-size: cover;

  font-size: vw(14);
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: vw(16);
    height: vh(16);
    margin-right: vw(4);
  }
}
</style>

<style lang="scss" >
@keyframes _show {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: vh(305);
    opacity: 1;
  }
}

@keyframes _hide {
  0% {
    height: vh(305);
    opacity: 1;
  }
  100% {
    height: vh(0);
    opacity: 0;
  }
}
</style>
