<template>
  <div class="_list1">
    <div class="_list1-top">
      <div class="address">地区</div>
      <div class="name">姓名</div>
      <div class="result">分类结果</div>
      <div class="image">图片</div>
      <div class="time">时间</div>
    </div>
    <div
      v-if="list.length > 0 && isLoad"
      class="_item-main"
      :style="
        '--scroll: ' +
        (total - 3 > 0 ? total - 3 : 0) +
        ';--time: ' +
        (total - 3 > 0 ? total - 3 : 0)
      "
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index % 2 == 0 ? '_item' : '_item _item-select'"
      >
        <div class="address text-over1">{{ item.village }}</div>
        <div class="name">{{ item.memberName }}</div>
        <div class="result">{{ item.result == 1 ? "不合格" : "" }}</div>
        <div class="image"><img :src="item.imagePath" /></div>
        <div class="time">{{ item.collectTime }}</div>
      </div>
    </div>

    <list-empty v-else title="暂无违规垃圾分类数据"></list-empty>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import listEmpty from "@/components/listEmpty.vue";
export default {
  components: { listEmpty },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);

    watch(
      () => props.data,
      (val) => {
        if (val.length > 0) {
          reload();
        }
      }
    );

    // 重新加载数据
    const reload = () => {
      for (let item of props.data) {
        // 如果是不合格
        if (item.result == 1 || item.result == 0) {
          list.value.push(item);
        }
      }
      // list.value = props.data;
      setTimeout(() => {
        isLoad.value = list.value.length;
      }, 0);
    };

    return {
      reload,
      list,
      isLoad,
      total,
    };
  },
};
</script>

<style scoped lang="scss">
._list1 {
  width: 100%;
  margin-top: vh(16);

  ._list1-top {
    width: 100%;
    height: vh(30);
    padding: 0 vw(30);
    box-sizing: border-box;
    font-size: vw(14);
    color: #a1ceef;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .address {
    flex: 1;
    // height: 100%;
    //line-height: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .name {
    width: vw(80);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .result {
    width: vw(66);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .image {
    width: vw(98);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: vw(74);
      height: vh(52);
    }
  }
  .time {
    width: vw(60);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: vh(180);
    padding: 0 vw(30);
    margin-top: vh(6);
    box-sizing: border-box;
    overflow: hidden;

    ._item {
      width: 100%;
      height: vh(60);
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: vw(14);
      color: #fff;
      animation: garbage_right1_list calc(var(--time) * 4s) linear infinite
        normal;
      animation-fill-mode: forwards;
    }

    ._item-select {
      background-color: rgba(95, 175, 249, 0.16);
    }
    ._item:hover {
      background-color: rgba(95, 175, 249, 0.16);
    }
  }
}
</style>

<style lang="scss">
@keyframes garbage_right1_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-60)));
  }
}
</style>
