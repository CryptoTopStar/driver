<template>
  <div class="_right2">
    <title-bar title="本月门诊挂号数" />
    <list-2 ref="listRef2" />
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List2 from "./list2.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue"; 
 
export default {
  components: { TitleBar, List2 },
  setup() {
    const listRef2 = ref(null);
    onMounted(() => {
      listRef2.value.reload();
    });
    return { listRef2 };
  },
};
</script>

<style scoped lang="scss">
._right2 {
  width: 100%;
}
</style>
