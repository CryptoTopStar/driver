<template>
  <div class="_right1">
    <title-bar title="大陈乡当日预警" :showMore="true" @show="show" />
    <list-1 ref="list1Ref" :data="data"></list-1>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List1 from "./list1.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List1 },
  props: {
    data: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const list1Ref = ref(null);
    const show = () => {
      emit("show");
    };

    onMounted(() => {
      // list1Ref.value.reload();
    });
    return { list1Ref, show };
  },
};
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
}
</style>
