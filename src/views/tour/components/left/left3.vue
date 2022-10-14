<template>
  <div class="_left3">
    <title-bar title="景点热度排行" />
    <list ref="listRef" />
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import List from "./list.vue"; 
export default {
  components: { TitleBar, List },
  setup() {
    const listRef = ref(null);

    onMounted(() => {
      listRef.value.reload();
    });
    return { listRef };
  },
};
</script>

<style scoped lang="scss">
._left3 {
  width: 100%; 
}
</style>
