<template>
  <el-result title="待开放" class="under-construction">
    <template #icon>
      <el-image
        class="error-image"
        src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png"
      />
    </template>
  </el-result>
</template>

<script setup>
</script>

<style scoped lang="scss">
.under-construction {
  height: vh(250);
  ::v-deep(.el-result__title) {
    margin-top: vh(-30);
    p {
      color: white;
    }
  }
}
.error-image {
  height: vh(200);
}
</style>
