<template>
  <div class="_left1">
    <title-bar title="上年度病虫害记录" customStyle="margin-top: 0px" />
    <list-1 ref="list1Ref"></list-1>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List1 from "./list1.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List1 },
  setup(props, { emit }) {
    const list1Ref = ref(null);

    onMounted(() => {
      list1Ref.value.reload();
    });
    return { list1Ref };
  },
};
</script>

<style scoped lang="scss">
._left1 {
  width: 100%;
  height: vh(286);
   box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
