<template>
  <div class="outer">
    <div class="diseases">
      <common-header title="农机资源分析"></common-header>
      <left v-if="isLoad" ref="leftRef" :data="list" />
      <right v-if="isLoad" ref="rightRef" :data="list" />
      <center ref="centerRef" :data="list" />
      <bottom v-if="isLoad" ref="bottomRef" :data="list"></bottom>
    </div>
    <div class="_bottom-nav">
      <BottomNav />
    </div>
  </div>
</template>

<script>
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";
import Bottom from "./bottom.vue";
import _ from "lodash";
import { useRoute } from "vue-router";
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
import BottomNav from "@/components/data-exploration/BottomNav";
import { machineresourceList } from "@/api/agriculturalMachine/api";
import CommonHeader from "@/components/commonHeader.vue";
export default {
  components: {
    Left,
    Right,
    Center,
    Bottom,
    BottomNav,
    CommonHeader,
  },
  setup() {
    const leftRef = ref(null);
    const centerRef = ref(null);
    const rightRef = ref(null);
    const bottomRef = ref(null);
    const list = ref([]);

    const isLoad = ref(false); // 是否加载成功

    // 初始化数据
    const initData = () => {
      machineresourceList({}).then((res) => {
        if (res.code == 0) {
          list.value = res.data;
        }
        setTimeout(() => {
          isLoad.value = true;
        }, 250);
      });
    };

    onMounted(() => {
      initData();
    });

    return {
      leftRef,
      centerRef,
      rightRef,
      bottomRef,
      list,
      isLoad,
    };
  },
};
</script>

<style scoped lang="scss">
.outer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("https://img.hzanchu.com/acimg/f3fd23adc9a092e8dd926e3723b2eadb.png")
    no-repeat;
  background-size: 100% 100%;
}
.diseases {
  transform-origin: 0 0;
  width: vw(1920);
  height: vh(1080);
}

._bottom-nav {
  position: fixed;
  bottom: vh(10);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
