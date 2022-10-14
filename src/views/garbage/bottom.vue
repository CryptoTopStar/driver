<template>
  <div class="bottom">
    <div class="legend">
      <div v-for="(item, index) in legendList" :key="index" class="legend-item">
        <div :style="'background-color: ' + item.color"></div>
        {{ item.text }}
      </div>
    </div>

    <div v-if="showS" :class="showClass">
      <!-- <img
        src="@/assets/images/garbage/bottom-close.png"
        class="bottom-close"
        @click="showS = false"
      /> -->
      <title-bar title="大陈乡实时垃圾分类情况" />
      <!--   <bottom-2></bottom-2> -->
      <bottom-1> </bottom-1>
    </div>
  </div>
</template>

<script>
import Bottom1 from "./components/bottom/bottom.vue";
import Bottom2 from "./components/bottom/bottom1.vue";
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted } from "vue";

export default {
  components: { Bottom1, TitleBar, Bottom2 },
  setup() {
    const legendList = ref([
      { color: "#38D672", text: "准确率≥85%" },
      { color: "#26B4FF", text: "准确率≥80%" },
      { color: "#EF9E4E", text: "准确率<80%" },
      { color: "#9389FF", text: "无数据" },
    ]);
    const showClass = ref("bottom-main-disappear");

    const showS = ref(false);
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
    return { legendList, show, showS, showClass };
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

._top {
  display: flex;
  flex-direction: row;
  align-items: center;
  ._all {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
}

.legend {
  // position: absolute;
  // z-index: 3;
  // top: vh(-160);
  // right: 0;
  width: vw(140);
  height: vh(144);
  padding: vw(20) 0;
  box-sizing: border-box;
  background: url(https://img.hzanchu.com/acimg/21dbd68b0b642bd60deb99635311995a.png)
    no-repeat;
  background-size: vw(140) vh(144);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .legend-item {
    width: 100%;
    font-size: vw(14);
    color: #94c9e8;
    display: flex;
    flex-direction: row;

    div:nth-of-type(1) {
      width: vw(12);
      height: vh(12);
      margin-right: vw(8);
      margin-left: vw(14);
    }
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
