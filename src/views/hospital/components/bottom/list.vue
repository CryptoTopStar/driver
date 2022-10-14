<template>
  <div class="_list1">
    <div class="_list1-top">
      <div class="name">疾病名称</div>
      <div class="season">高发季节</div>
      <div class="people">高发人群</div>
      <div class="result">预防措施</div>
      <div class="name">预警时间</div>
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
        <div class="name">{{ item.disease_name }}</div>
        <div class="season">{{ item.season }}</div>
        <div class="people">{{ item.crowd }}</div>
        <div class="result text-over1">
          {{ item.measures }}
        </div>
        <div class="name">{{ item.warn_time }}</div>
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
import { getCountDiseEarlyWarn } from "@/api/hospital/api";

export default {
  setup() {
    const list = ref([]);
    const total = ref(1);
    const isLoad = ref(false);

    // 重新加载数据
    const reload = () => {
      getCountDiseEarlyWarn().then((res) => {
        if (res.code == 0) {
          total.value = res.data.length;
          list.value = res.data;
          isLoad.value = true;
        }
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

  .result {
    flex: 1;
    line-height: vh(19);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .name {
    width: vw(108);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    line-height: vh(19);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .season {
    width: vw(80);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    line-height: vh(19);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .people {
    width: vw(122);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    line-height: vh(19);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .flex-ajc {
    display: flex;
    flex-direction: column;
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

    ._empty {
      width: vw(130);
      height: vh(180);
    }

    ._empty-title {
      margin-top: vh(-20);
      font-size: vw(18);
      color: #bbd7fa;
    }
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
