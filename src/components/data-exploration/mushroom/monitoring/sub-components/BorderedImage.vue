<template>
  <div class="image-container">
    <el-image
      class="image"
      :src="src ?? undefined"
      :preview-src-list="[src]"
      @click="onPreviewOpen"
      @close="onPreviewClose"
      hide-on-click-modal
      :z-index="1000"
      preview-teleported
      fit="cover"
    >
      <template #error>
        <img @click="onFallbackImageClick" class="image" :src="require('@/assets/images/default-image.svg')" />
      </template>
    </el-image>
    <div class="image-text">{{label}}</div>
    <div class="top-right-border-decor"/>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  label: String,
  onPreviewOpen: {
    type: Function,
    default: ()=>{}
  },
  onPreviewClose: {
    type: Function,
    default: ()=>{}
  },
  onFallbackImageClick: {
    type: Function,
    default: ()=>{}
  },
})

</script>

<style scoped lang="scss">
.image-text {
  width: vw(91);
  height: vh(26);
  line-height: vh(26);
  background: #51C2FE;
  font-size: vw(16);
  font-weight: 600;
  color: #182A64;
  position: absolute;
  bottom: vw(-2);
  left: vw(-2);
  z-index: 100;
  text-align: center;
  clip-path: polygon(0% 0, 90% 0%, 100% 30%, 100% 100%, 0% 100%);
}
.top-right-border-decor {
  width: vw(27);
  height: vh(8);
  background: #51C2FE;
  position: absolute;
  top: vw(-2);
  right: vw(-2);
  z-index: 100;
  text-align: center;
  clip-path: polygon(0% 0, 100% 0%, 100% 100%, 10% 100%, 0% 70%);
}
.image-container {
  border: vw(2) solid #51C2FE;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
