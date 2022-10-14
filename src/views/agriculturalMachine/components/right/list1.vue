<template>
  <div class="_list">
    <div
      v-if="list.length > 0 && isLoad"
      class="_item-main"
      :style="
        '--scroll: ' +
        (total - 4 > 0 ? total - 4 : 0) +
        ';--time: ' +
        (total - 4 > 0 ? total - 4 : 0)
      "
    >
      <div v-for="(item, index) in list" :key="index" class="_item">
        <div class="_item-left">
          <div class="_item-left-bg"></div>
          <div
            class="_item-left-current"
            :style="'width: calc(' + item.service_center / maxGoods + '*100%)'"
          ></div>
          <div
            class="_item-left-title"
            :style="
              item.service_center / maxGoods < 0.2
                ? 'right: 0px'
                : item.service_center / maxGoods > 0.8
                ? 'right: calc(' +
                  item.service_center / maxGoods +
                  '*100% - 40px)'
                : 'right: calc(' +
                  item.service_center / maxGoods +
                  '*100% - 20px)'
            "
          >
            {{ item.service_center }}个
          </div>
        </div>
        <div class="_item-center text-over1">{{ item.village }}</div>
        <div class="_item-right">
          <div class="_item-left-bg"></div>
          <div
            class="_item-left-current"
            :style="'width: calc(' + item.maintenance_point / maxBad + '*100%)'"
          ></div>
          <!-- 这里做了判断，如果当前 item.maintenance_point / maxBad 小于 0.2 那么直接默认为left: 0px -->
          <!-- 这里的0.1是根据当前总宽度 460px / 2 * 20% = 46px 所以这里就默认为0.2了 -->
          <!-- 这里的0.1是根据当前总宽度 460px / 2 * 20% = 46px 所以这里就默认为0.2了 -->
          <div
            class="_item-left-title"
            :style="
              item.maintenance_point / maxBad < 0.2
                ? 'left: 0px'
                : item.maintenance_point / maxBad > 0.8
                ? 'left: calc(' +
                  item.maintenance_point / maxBad +
                  '*100% - 40px)'
                : 'left: calc(' +
                  item.maintenance_point / maxBad +
                  '*100% - 20px)'
            "
          >
            {{ item.maintenance_point }}个
          </div>
        </div>
      </div>
    </div>

    <list-empty v-else></list-empty>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import listEmpty from "@/components/listEmpty.vue";
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { listEmpty },
  setup(props) {
    const list = ref([]);
    const total = ref(1);
    const isLoad = ref(false);
    const maxGoods = ref(1); // 默认都为1
    const maxBad = ref(1);

    // 重新加载数据
    const reload = () => {
      for (let item of props.data) {
        // 合作社
        if (maxGoods.value < parseInt(item.service_center)) {
          maxGoods.value = parseInt(item.service_center);
        }
        // 维修网点
        if (maxBad.value < parseInt(item.maintenance_point)) {
          maxBad.value = parseInt(item.maintenance_point);
        }
      }
      total.value = props.data.length;
      isLoad.value = true;
      setTimeout(() => {
        list.value = props.data;
      }, 0);
    };

    onMounted(() => {
      reload();
    });

    return {
      reload,
      list,
      isLoad,
      total,
      maxGoods,
      maxBad,
    };
  },
};
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: vh(16);
  ._item-left {
    flex: 1;
    position: relative;
    height: vh(40);

    ._item-left-bg {
      position: absolute;
      z-index: 1;
      top: vh(17);
      left: 0;
      width: 100%;
      height: vh(6);
      background-color: rgba(0, 132, 255, 0.2);
      border-radius: vw(16);
    }
    ._item-left-current {
      position: absolute;
      z-index: 2;
      top: vh(17);
      right: 0;
      height: vh(6);
      background: linear-gradient(90deg, #27e0fd 0%, #071a63 100%);
      border-radius: vw(16);
    }
    ._item-left-title {
      position: absolute;
      z-index: 3;
      top: vw(-1);
      font-size: vw(14);
      color: #25d2f2;
      white-space: nowrap;
    }
  }

  ._item-center {
    width: vw(84);
    height: vh(40);
    line-height: vh(40);
    margin-left: vw(6);
    margin-right: vw(6);
    text-align: center;
    font-size: vw(14);
    color: #cceaff;
    text-overflow: ellipsis;
  }
  ._item-right {
    flex: 1;
    position: relative;
    height: vh(40);

    ._item-left-bg {
      position: absolute;
      z-index: 1;
      top: vh(17);
      left: 0;
      width: 100%;
      height: vh(6);
      background-color: rgba(0, 132, 255, 0.2);
      border-radius: vw(16);
    }
    ._item-left-current {
      position: absolute;
      z-index: 2;
      top: vh(17);
      left: 0;
      height: vh(6);
      background: linear-gradient(270deg, #eaca60 0%, #071a63 100%);
      border-radius: vw(16);
    }
    ._item-left-title {
      position: absolute;
      z-index: 3;
      top: vw(-1);
      font-size: vw(14);
      color: #25d2f2;
      white-space: nowrap;
    }
  }
  ._item-main {
    width: 100%;
    height: vh(180);
    margin-top: vh(10);
    padding: 0 vw(30);
    box-sizing: border-box;
    overflow: hidden;

    ._item {
      width: 100%;
      height: vh(30);
      margin-top: vh(10);
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-size: vw(14);
      color: #fff;

      animation: tour_right2_list calc(var(--time) * 4s) linear infinite normal;
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
@keyframes tour_right2_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-30)));
  }
}
</style>
