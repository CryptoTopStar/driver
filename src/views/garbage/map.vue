<template>
  <el-dialog
    v-model="showS"
    title="垃圾车轨迹图"
    custom-class="scs-bus-route-modal"
    append-to-body
    :show-close="false"
  >
    <template #header>
      <div class="header-container">
        <header class="header">垃圾车轨迹图</header>
        <button class="close-btn" @click="showS = false">x</button>
      </div>
    </template>

    <iframe
      class="map"
      frameborder="0"
      align="center"
      src="https://service.zjinsl.com/noLogin/equpipLocation?encInfo=2mM0rlM5mmhNqX5JOWV6vu%2F5FBqErBkCUrU4BhpvXujPcv9tQyOXIday4JrB%2B4fh"
    />
  </el-dialog>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";

export default {
  setup() {
    const showClass = ref("map-main-disappear");
    const showS = ref(false);
    const test = () => {
      console.log("test");
    };
    const show = () => {
      if (showS.value) {
        showClass.value = "map-main-disappear";
        setTimeout(() => {
          showS.value = false;
        }, 500);
      } else {
        showClass.value = "map-main";
        showS.value = true;
      }
    };
    onMounted(() => {});
    return { show, showS, showClass, test };
  },
};
</script>

<style scoped lang="scss">
.map {
  width: vw(1530);
  height: vh(800);
  margin-left: vw(40);
}

.close-btn {
  color: #a7eff6;
  font-size: vw(38);
  background: none;
  border: none;
  cursor: pointer;
}
.modal-body {
  padding: vw(12);
  display: flex;
  flex-flow: column;
  row-gap: vh(40);
}
.header {
  font-size: vw(24);
  line-height: vw(38);
  width: vw(195);
  height: vw(38);
  box-sizing: border-box;
  padding-inline-start: vw(20);
  background: no-repeat center/100% 100%
    url("~@/assets/images/smart-communities/tourism/title-border.png");
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #ffffff;
  text-shadow: vw(0) vw(6) vw(6) #002160;
}
.header-container {
  margin-inline-start: vw(36);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>


<style lang="scss" >
.scs-bus-route-modal {
  &.el-dialog {
    width: vw(1662);
    height: vh(1000);
    margin-top: vh(40) !important;
    background: no-repeat center/100% 100%
      url("~@/assets/images/smart-communities/tourism/bus-route-modal-bg.png");
    .el-dialog__header {
      padding: vh(12) vw(12);
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #a7eff6;
      font-size: vw(38);
    }
  }
}
</style>
