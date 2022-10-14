<template>
  <div class="_list">
    <div class="_top">
      <div class="_left">排名</div>
      <div class="_center">户主</div>
      <div class="_right">所属地区</div>
      <div class="_center">{{ type == 1 ? "" : "不" }}合格次数</div>
    </div>

    <template v-if="!loading">
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
          <div v-if="index < 3" class="_left rank1">
            <img
              src="https://img.hzanchu.com/acimg/f055289d1d353315d2d201fdad49a63d.png"
            />
            <div>{{ index + 1 }}</div>
          </div>
          <div v-else class="_left rank2">
            <img
              src="https://img.hzanchu.com/acimg/c339468ca520649ab555c6de0c7c3c60.png"
            />

            <div>{{ index + 1 }}</div>
          </div>
          <div class="_center">{{ item.memberName }}</div>
          <div class="_right">{{ item.village }}</div>
          <div class="_center">
            {{
              item.blackNumber || item.redNumber
                ? item.blackNumber || item.redNumber
                : 0
            }}次
          </div>
        </div>
      </div>

      <div v-else class="_item-main flex-ajc">
        <img
          src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png"
          class="_empty"
        />
        <div class="_empty-title">暂无数据</div>
      </div>
    </template>

    <div v-else class="_item-main flex-ajc">
      <div class="_empty-title">数据加载中...</div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { rubbishgetDbRealTimeRubbishCollectRedBlackList } from "@/api/garbage/api";
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);
    const loading = ref(false);

    // 重新加载数据
    const reload = () => {
      list.value = [];
      isLoad.value = false;
      loading.value = true;
      rubbishgetDbRealTimeRubbishCollectRedBlackList({}).then((res) => {
        if (res.code == 0) {
          setTimeout(() => {
            if (props.type == 1) {
              list.value = res.data.redList;
              total.value = res.data.redList.length;
            } else if (props.type == 2) {
              list.value = res.data.blackList;
              total.value = res.data.blackList.length;
            }
          }, 0);
        }
        loading.value = false;
        isLoad.value = true;
      });
    };

    return {
      reload,
      list,
      isLoad,
      loading,
      total,
    };
  },
};
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: vh(16);
  .rank1 {
    position: relative;
    img {
      position: absolute;
      z-index: 1;
      left: vw(13);
      top: vh(5);
      width: vw(26);
      height: vh(27);
    }
    div {
      position: absolute;
      z-index: 2;
      left: vw(13);
      top: vh(2);
      width: vw(26);
      height: vh(27);
      line-height: vh(27) !important;
      text-align: center;
      font-size: vw(12);
      color: #fff;
    }
  }
  .rank2 {
    position: relative;
    img {
      position: absolute;
      z-index: 1;
      left: vw(13);
      top: vh(5);
      width: vw(26);
      height: vh(27);
    }
    div {
      position: absolute;
      z-index: 2;
      left: vw(13);
      top: vh(5);
      width: vw(26);
      height: vh(27);
      line-height: vh(27) !important;
      text-align: center;
      font-size: vw(12);
      color: #fff;
    }
  }
  ._left {
    width: vw(50);
    height: vh(35);
    line-height: vh(35);
    text-align: center;
  }
  ._center {
    width: vw(110);
    height: vh(35);
    line-height: vh(35);
    margin-left: vw(15);
    margin-right: vw(15);
    text-align: center;
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
    text-align: center;
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
