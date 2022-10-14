<template>
  <div class="container">
    <img class="comp-shine" ref="shine" :src="require('@/assets/images/smart-communities/shine.png')" alt="shine"/>
    <div class="comp-core">
      <img class="comp-ring" ref="ring" :src="require('@/assets/images/smart-communities/static-ring.png')" alt="halo" />
      <img class="comp-proj" ref="proj" :src="require('@/assets/images/smart-communities/projection.webp')" alt="projection"/>
      <img class="comp-region" :src="require('@/assets/images/smart-communities/region.webp')" alt="region shape" />
      <span class="comp-region-label">大陈乡</span>
      <button class="comp-external-link" @click="isPopupVisible = true">
        <img :src="require('@/assets/images/icon/tab_icon1.png')" />
        <div>大陈村试点</div>
      </button>
    </div>
    <el-dialog
      v-model="isPopupVisible"
      custom-class="sc-confirm-popup"
      :show-close="false"
    >
      <div class="sc-confirm-popup__text">是否跳转至第三方平台？</div>
      <div class="sc-confirm-popup__action-row">
        <button @click="isPopupVisible = false">取 消</button>
        <button @click="openExternalLink">确 认</button>
      </div>
      <button></button>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const ring = ref(null);
const shine = ref(null);
const proj = ref(null);

const isPopupVisible = ref(false)
const openExternalLink = () => {
  window.open('https://dachen.souyisi.com:8200/#/', 'external_site');
  isPopupVisible.value = false
}

onMounted(()=>{
  ring.value.animate([
    { transform: 'rotate(0)'},
    { transform: 'rotate(360deg)'}
  ], {
    duration: 7000,
    iterations: Infinity
  });
  shine.value.animate([
    { opacity: 0, transform: 'scale(0)'},
    { opacity: 1, transform: 'scale(1)'},
    { opacity: 0, transform: 'scale(0)'},
    { opacity: 0, transform: 'scale(0)'},
  ], {
    duration: 8000,
    iterations: Infinity,
    fill: 'both',
    easing: 'cubic-bezier(0.55, 1.37, 0.5,-0.2)'
  });

  proj.value.animate([
    { opacity: 1},
    { opacity: 0.8},
    { opacity: 1},
    { opacity: 1},
  ], {
    duration: 4000,
    iterations: Infinity,
    fill: 'both',
    easing: 'cubic-bezier(0.55, 1.37, 0.5,-0.2)'
  });
})

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: vh(800);
  position: relative;
  //pointer-events: none;
  ::v-deep(.sc-confirm-popup) {
    --el-dialog-width: fit-content;
    background-color: transparent;
    --el-dialog-margin-top: 34vh;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      box-sizing: border-box;
      min-height: vw(332);
      width: vw(609);
      padding: vw(100) vw(120);
      display: flex;
      flex-flow: column;
      align-items: center;
      background: no-repeat center / 100% 100% url("~@/assets/images/popup_confirm_bg.svg");
    }
  }
  .sc-confirm-popup__text {
    font-size: vw(28);
    font-weight: 600;
    color: #FFFFFF;
    line-height: vw(36);
  }
  .sc-confirm-popup__action-row {
    display: flex;
    column-gap: vw(40);
    font-weight: normal;
    margin-block-start: auto;
    > button {
      cursor: pointer;
      font-size: vw(16);
      color: #FFFFFF;
      line-height: 1.5;
      padding: vw(8) vw(24);
      background: no-repeat center / 100% 100% url('~@/assets/images/smart-communities/shared/popup-button-bg.svg');
    }
  }
}
.comp-external-link {
  z-index: 100;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: none;
  top: vw(250);
  left: 38%;
  position: absolute;
  font-size: vw(14);
  color: white;
  > img {
    width: vw(30);
  }
}
.comp-core {
  height: 100%;
  overflow: hidden;
  position: relative;
}
%component {
  position: absolute;
  pointer-events: none;
}
.comp-region {
  @extend %component;
  width: 100%;
}
.comp-region-label {
  @extend %component;
  top: vw(310);
  left: 50%;
  transform: translateX(-50%);
  font-size: vw(32);
  color: white;
  font-family: PangMenZhengDao;
}
.comp-ring {
  @extend %component;
  width: 70%;
  left: 15%;
}
.comp-proj {
  @extend %component;
  width: 90%;
  left: 5%;
  margin-block-start: vh(120);
}
.comp-shine {
  @extend %component;
  width: vw(440);
  right: 7%;
  margin-block-start: vw(-80);
}
// 处理普通非全屏展示过长的情况
@media (min-aspect-ratio: 1920/1050) {
  .container {
    width: vh(870) !important;
    margin-inline: auto;
  }
  .link {
    left: vh(340);
    width: vh(160);
  }
  .comp-shine {
    width: vh(440);
    margin-block-start: vh(-80);
  }
}


</style>
