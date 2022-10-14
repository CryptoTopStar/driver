<template>
  <el-image
      class="image-cell"
      :src="value"
      :preview-src-list="[value]"
      @click="onPreviewOpen"
      @close="onPreviewClose"
      hide-on-click-modal
      :z-index="1000"
      preview-teleported
      fit="cover"
  >
    <template #error>
      <img @click="onFallbackImageClick" class="fallback-image" :src="require('@/assets/images/default-image.svg')" />
    </template>
  </el-image>
</template>

<script setup>
import {onMounted} from 'vue'

const props = defineProps({
  value: {
    validator(value) {
      return true; // accept any
    }
  },
  interrupt: Function,
  resume: Function,
})
const interruptKey = 'test-image-comp'
const onPreviewOpen = ()=> {
  props.interrupt?.(interruptKey)
  // clearInterval(updateClock.value);
}
const onPreviewClose = () => {
  props.resume?.(interruptKey)
  // updateClock.value = setInterval(() => {
  //   updateDisplay();
  // }, props.updateInterval);
}
const onFallbackImageClick = (e) => {
  e.stopPropagation();
}

onMounted(()=>{
})
</script>

<style scoped lang="scss">
.container {
  color: white;
}

.image-cell {
  width: vw(60);
  height: vh(50);
  object-fit: cover;
  padding: vw(2);
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
}
.fallback-image {
  width: vw(60);
  height: vh(50);
  object-fit: cover;
  &:hover {
    cursor: auto;
  }
}
.test-desc {
  font-size: vw(20);
  color: #26daf8;
}
</style>
