<template>
  <div class="_list">
    <div class="_top">
      <div class="tempture ml-12">最高温度</div>
      <div class="tempture">最低温度</div>
      <div class="water">湿度</div>
      <div class="day">降水量</div>
      <div class="type">病虫害类型</div>
      <div class="time">时间</div>
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
        <div class="tempture ml-12">{{ item.high_temperature }}℃</div>
        <div class="tempture">{{ item.low_temperature }}℃</div>
        <div class="water">{{ item.humidity }}%</div>
        <div class="day">{{ item.precipitation }}毫米</div>
        <div class="type">{{ item.type }}</div>
        <div class="time">{{ item.date }}</div>
      </div>
    </div>

    <div v-else class="_item-main flex-ajc">
      <img
        src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png"
        class="_empty"
      />
      <div class="_empty-title">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { pestsHistoryList } from "@/api/teadiseases/api";
export default {
  setup() {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);

    // 重新加载数据
    const reload = () => {
      pestsHistoryList().then((res) => {
        // console.log(res);
        if (res.code == 0) {
          total.value = res.data.length;
          setTimeout(() => {
            list.value = res.data;
          }, 0);
        }
        isLoad.value = true;
      });
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
._list {
  width: 100%;
  margin-top: vh(16);
  .ml-12 {
    margin-left: vw(12);
  }

  .tempture {
    width: vw(80);
    height: vh(35);
    line-height: vh(35);
  }
  .water {
    width: vw(80);
    height: vh(35);
    line-height: vh(35);
  }
  .day {
    width: vw(90);
    height: vh(35);
    line-height: vh(35);
  }
  .type {
    width: vw(116);
    height: vh(35);
    line-height: vh(35);
  }
  .time {
    width: 0;
    flex: 1;
    height: vh(35);
    line-height: vh(35);
  }

  ._left {
    width: vw(50);
    height: vh(35);
    line-height: vh(35);
    // text-align: center;
  }
  ._center {
    width: vw(110);
    height: vh(35);
    line-height: vh(35);
    margin-left: vw(15);
    margin-right: vw(15);
    // text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  ._right {
    flex: 1;
    height: vh(35);
    line-height: vh(35);
    // text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  ._top {
    width: 100%;
    padding: 0 vw(30);
    font-size: vw(14);
    color: #a1ceef;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }

  .flex-ajc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: vh(152);
    margin-top: vh(10);
    padding: 0 vw(30);
    box-sizing: border-box;
    overflow: hidden;

    ._empty {
      width: vw(130);
      height: vh(140);
    }

    ._empty-title {
      margin-top: vh(-20);
      font-size: vw(18);
      color: #bbd7fa;
    }
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
