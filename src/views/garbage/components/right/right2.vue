<template>
  <div class="_right2">
    <title-bar title="垃圾分类红黑榜">
      <div class="change">
        <div class="change-item" @click="changeType(1)">
          <img
            :src="
              type == 1
                ? require('@/assets/images/garbage/red-select.png')
                : require('@/assets/images/garbage/red-unselect.png')
            "
          />
          <div :class="type == 1 ? 'select' : 'unselect'">红榜名单</div>
        </div>
        <div class="change-item" @click="changeType(2)">
          <img
            :src="
              type == 2
                ? require('@/assets/images/garbage/red-select.png')
                : require('@/assets/images/garbage/red-unselect.png')
            "
          />
          <div :class="type == 2 ? 'select' : 'unselect'">黑榜名单</div>
        </div>
      </div>
    </title-bar>
    <list-2 ref="listRef2" :type="type" />
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List2 from "./list2.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  components: { TitleBar, List2 },
  props: {
    data: {
      type: Array,
    },
  },
  setup() {
    const listRef2 = ref(null);
    const type = ref(1); // 当前红黑榜单的type类型

    const changeType = (e) => {
      if (type.value != e) {
        type.value = e;
        setTimeout(() => {
          listRef2.value.reload();
        }, 0);
      }
    };
    onMounted(() => {
      listRef2.value.reload();
    });
    return { listRef2, type, changeType };
  },
};
</script>

<style scoped lang="scss">
._right2 {
  width: 100%;

  .change {
    position: absolute;
    z-index: 2;
    top: vh(10);
    right: vw(66);
    height: vh(26);
    background-color: #fff;
    display: flex;
    flex-direction: row;

    .change-item {
      position: relative;
      width: vw(76);
      height: vh(26);
      cursor: pointer;

      img {
        width: vw(76);
        height: vh(26);
      }

      .select {
        position: absolute;
        z-index: 4;
        top: 0;
        width: vw(76);
        height: vh(26);
        line-height: vh(26);
        text-align: center;
        font-size: 14px;
        color: #fff;
      }

      .unselect {
        position: absolute;
        z-index: 4;
        top: 0;
        width: vw(76);
        height: vh(26);
        line-height: vh(26);
        text-align: center;
        font-size: 14px;
        color: rgba($color: #fff, $alpha: 0.7);
      }
    }
  }
}
</style>
