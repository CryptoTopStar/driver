<template>
  <div class="nav-title">
    <div class="nav-info">
      <h4>{{ title }}</h4>
      <img v-if="!hideIncn" class="icon" :src="require('./../images/nav_icon.png')" alt="" />
      <div class="slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  hideIncn: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped lang="scss">
.nav-title {
  width: 518px;
  cursor: pointer;
  background: url("./../images/title_bg.png") no-repeat;
  background-size: 100% 100%;
  padding-bottom: 6px;
  .nav-info {
    position: relative;
    height: 34px;
    line-height: 34px;
  }
  h4 {
    font-family: PangMenZhengDao;
    font-size: 24px;
    padding-left: 34px;
    color: #fff;
  }
  .icon {
    position: absolute;
    left: 273px;
    top: 50%;
    transform: translateY(-50%);
  }
  .slot {
    position: absolute;
    left: 303px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
