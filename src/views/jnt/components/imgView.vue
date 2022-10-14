<template>
  <div class="img-view">
    <el-image
      v-show="images?.length"
      :src="images?.[0]"
      :preview-src-list="images"
      fit="cover"
      alt=""
    />
    <p>{{ images?.length ? `共${images?.length}张` : '暂无图片' }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => {
      return []
    }
  }
})

</script>

<style scoped lang="scss">
  .img-view {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-items: center;
    :deep(.el-image) {
      width: 70px;
      height: 50px;
    }
    p {
      white-space: nowrap;
      margin-left: 6px;
    }
  }
</style>
