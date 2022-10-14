<template>
  <transition name="container">
    <div :id="id" :class="{
      'container': true,
      'is-expanded': isExpanded
    }" :style="customStyle">
      <button class="expand-btn" @click="isExpanded = !isExpanded" :title="expandBtnTitle">
        <img :src="require('@/assets/images/smart-communities/shared/icon_expand.svg')" alt="expand"/>
      </button>
      <button class="close-btn" @click="closeContainer" title="关闭">
        <img :src="require('@/assets/images/icon/close.svg')" alt="close"/>
      </button>
      <Label :label="title" class="section-header" />
        <slot name="content" :is-expanded="isExpanded"></slot>
    </div>
  </transition>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount, computed, defineEmits} from "vue";

defineProps({
  id: String,
  tableKey: String,
  title: String,
  customStyle: String
})
const isExpanded = ref(false)
const expandBtnTitle = computed(()=>{
  return isExpanded.value ? '收缩' : '展开'
})

const emits = defineEmits(['close'])
const closeContainer = ()=>{
  emits('close')
}

</script>

<style scoped lang="scss">
.section-header {
  max-width: vw(450);
}
.container {
  transition: all 0.5s ease;
  pointer-events: auto;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  overflow: hidden;
  padding: vh(12) vw(24);
  min-height: vh(310);
  height: vh(310);
  margin-inline: vw(50);
  border: vw(10) solid transparent;
  border-image: url("~@/assets/images/smart-communities/fire-stats/center-bottom-bg.png");
  border-image-slice: 39 24 24 34 fill;
  border-image-width: vh(40) vw(40);
  border-image-outset: 0;
  border-image-repeat: repeat;
  //background: #011e5f;
  //background: url("~@/assets/images/smart-communities/fire-stats/center-bottom-bg.png");
  //background-size: 100% 100%;
  //background-repeat: no-repeat;
  .detail-table {
    margin-block-start: vh(12);
  }
}
.is-expanded {
  //min-height: vh(500);
  height: vh(660);
}
.expand-btn {
  position: absolute;
  cursor: pointer;
  background: none;
  top: vh(16);
  right: vw(48);
  > img {
    width: vw(16);
  }
  z-index: 100;
}
.close-btn {
  position: absolute;
  cursor: pointer;
  background: none;
  top: vh(16);
  right: vw(16);
  z-index: 100;
  > img {
    width: vw(16);
  }
}



.container-move,
.container-enter-active,
.container-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.container-enter-from {
  opacity: 0;
  height: 0;
  min-height: 0;
  padding-block: 0;
  margin-block: 0;
  border-block-width: 0;
}
.container-leave-to {
  opacity: 0;
  height: 0;
  min-height: 0;
  padding-block: 0;
  margin-block: 0;
  border-block-width: 0;
}

.container-leave-active {
}
</style>
