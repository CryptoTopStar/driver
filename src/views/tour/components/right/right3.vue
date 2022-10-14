<template>
  <div class="_right3">
    <title-bar title="月营收排行榜" /> 
    <list-3 ref="listRef3" :data="data"/>
  </div>
</template>

<script> 
import TitleBar from "@/components/titleBar.vue";
import List3 from "./list3.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  components: { TitleBar, List3 }, 
   props: {
    data: {
      type: Array
    }
  },
  setup() {
    const listRef3 = ref(null);
    onMounted(() => {
      listRef3.value.reload();
    });
    return { listRef3 };
  },
};
</script>

<style scoped lang="scss">
._right3 {
  width: 100%;
  ._total {
    width: 100%;
    height: vh(76);
    padding: 0 vw(30);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    ._total-item {
      width: vw(200);
      height: vh(76);
      padding: 0 vw(24);
      box-sizing: border-box;
      background: url(https://img.hzanchu.com/acimg/374cdc394db6ee361f9cd9b99970714a.png)
        no-repeat;
      background-size: 100%;
      background-size: cover;
    }
  }

  ._sub {
    width: 100%;
    padding-left: vw(12);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ._left-sub {
      width: vw(210);
      margin-top: vh(24);
      margin-left: vw(24);
    }
  }
}
</style>
