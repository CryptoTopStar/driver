<template>
  <div class="_list">
    <div class="_top">
      <div class="type ml-12">虫害类型</div>
      <div class="time">时间</div>
      <div class="total">数量（只）</div>
      <div class="number">诱虫灯编号</div>
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
        <div class="type ml-12">{{ item.type }}</div>
        <div class="time">{{ item.time }}</div>
        <div class="total">{{ item.count }}只</div>
        <div class="number">{{ item.number }}</div>
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
import { pestsMonitorList } from "@/api/teadiseases/api";
export default {
  setup() {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);

    // 重新加载数据
    const reload = () => {
      pestsMonitorList({}).then((res) => {
        console.log(res);
        if (res.code == 0) {
          total.value = res.data.length;
          setTimeout(() => {
            list.value = res.data;
          }, 0);
        }
      });
      isLoad.value = true;
    };

    onMounted(() => {
      reload();
    });

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

  .type {
    width: vw(120);
    height: vh(35);
    line-height: vh(35);
  }
  .time {
    width: vw(115);
    height: vh(35);
    line-height: vh(35);
  }
  .total {
    width: vw(115);
    height: vh(35);
    line-height: vh(35);
  }
  .number {
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
