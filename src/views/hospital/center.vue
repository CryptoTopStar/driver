<template>
  <div class="center">
    <iframe class="iframe" src="/iframe/smart-communities/DCX_XCYY.html" />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style scoped lang="scss">
.center {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
