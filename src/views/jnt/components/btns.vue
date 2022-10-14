<template>
  <div class="btns">
    <div @click="onReset">
      重 置
    </div>
    <div @click="onSearch">
      搜 索
    </div>
    <div @click="onExport">
      <img :src="require('./../images/export_icon.png')" alt="" />
      导 出
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['onReset', 'onSearch', 'onExport'])

const onReset = () => {
  emit('onReset')
}
const onSearch = () => {
  emit('onSearch')
}
const onExport = () => {
  emit('onExport')
}
</script>

<style scoped lang="scss">
.btns {
  display: flex;
  justify-content: flex-end;
  div {
    cursor: pointer;
    width: 80px;
    height: 40px;
    background-size: 100% 100%;
    line-height: 40px;
    text-align: center;
    &:nth-of-type(1) {
      background-image: url("../images/btn_bg_cancel.png");
    }
    &:nth-of-type(2) {
      background-image: url("../images/btn_bg_confirm.png");
    }
    &:nth-of-type(3) {
      width: 92px;
      align-items: center;
      margin-left: 30px;
      img {
        width: 12px;
        height: 12px;
      }
      background-image: url("../images/export_bg.png");
    }
  }
}
</style>
