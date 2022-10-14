<template>
  <div class="_bottom1">
    <list ref="list1Ref"></list>
  </div>
</template>

<script>
import List from "./list.vue";
import { ref, getCurrentInstance, onMounted } from "vue";
export default {
  components: { List },
  setup() {
    const list1Ref = ref(null);

    onMounted(() => {
      list1Ref.value.reload();
    });
    return { list1Ref };
  },
};
</script>

<style scoped lang="scss">
._bottom1 {
  width: 100%;
}
</style>
