<template>
  <div class="_list">
    <div class="_top">
      <div class="town ml-12 text-over1">乡镇</div>
      <div class="set">机种/亩</div>
      <div class="deal">机耕/亩</div>
      <div class="get">机收/亩</div>
    </div>

    <div
      v-if="list.length > 0 && isLoad"
      class="_item-main"
      :style="
        '--scroll: ' +
        (total - 2 > 0 ? total - 2 : 0) +
        ';--time: ' +
        (total - 2 > 0 ? total - 2 : 0)
      "
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index % 2 == 0 ? '_item _item-select ' : '_item'"
      >
        <div class="town ml-12">{{ item.village }}</div>
        <div class="set">{{ item.machine_plant_area }}</div>
        <div class="deal">{{ item.machine_arable_area }}</div>
        <div class="get">{{ item.harvest_area }}</div>
      </div>
    </div>
    <list-empty v-else></list-empty>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { tourismHotSort } from "@/api/tour/api";
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

    onMounted(() => {
      total.value = props.data.length;
      isLoad.value = true;
      setTimeout(() => {
        list.value = props.data;
      }, 0);
    });

    return {
      list,
      isLoad,
      total,
    };
  },
};
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: vh(16);
  .ml-12 {
    margin-left: vw(12);
  }

  ._top {
    width: 100%;
    padding: 0 vw(20);
    font-size: vw(14);
    color: #a1ceef;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }

  .town {
    width: vw(96);
    height: vh(35);
    line-height: vh(35);
  }
  .set {
    width: vw(110);
    height: vh(35);
    line-height: vh(35);
  }
  .deal {
    width: vw(110);
    height: vh(35);
    line-height: vh(35);
  }
  .get {
    width: 0;
    flex: 1;
    height: vh(35);
    line-height: vh(35);
  }

  ._item-main {
    width: 100%;
    height: vh(152);
    margin-top: vh(10);
    padding: 0 vw(20);
    box-sizing: border-box;
    overflow: hidden;

    ._item {
      width: 100%;
      height: vh(35);
      margin-bottom: vh(2);
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-size: vw(14);
      color: #fff;

      animation: tour_left3_list calc(var(--time) * 4s) linear infinite normal;
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
@keyframes tour_left3_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-35)));
  }
}
</style>
