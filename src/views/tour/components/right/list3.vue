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
          <div class="_item-left-title">NO.{{ index + 1 }} {{ item.type }}</div>
          <div class="_item-left-bg"></div>
          <div
            :class="
              '_item-left-current ' +
              (index % 3 == 0 ? 'bg1' : index % 3 == 1 ? 'bg2' : 'bg3')
            "
            :style="'width: calc(' + item.revenue / max + '*100%)'"
          ></div>
          <img
            :src="
              index % 3 == 0
                ? 'https://img.hzanchu.com/acimg/0a8cb01a22ecf6d9d68ee921303fcb02.png'
                : index % 3 == 1
                ? 'https://img.hzanchu.com/acimg/b30088f5a56f24dc5fbd50dd583fc175.png'
                : 'https://img.hzanchu.com/acimg/b3699647c1da46eccad47ba8337ecd52.png'
            "
            :style="'left: calc(' + item.revenue / max + '*100% - 13px)'"
          />
        </div>
        <div class="_item-right text-over1">
          {{ item.price }}<span>万元</span>
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
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  props: {
    data: {
      type: Array,
    },
  },
  setup(props) {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);
    const max = ref(1); // 默认最大为1

    // 重新加载数据
    const reload = () => {
      // console.log(props.data);
      let newList = props.data;
      total.value = props.data.length;
      for (let item of newList) {
        if (max.value < item.revenue) {
          max.value = item.revenue;
        }
        item.price = parseFloat(item.revenue / 10000).toFixed(1);
      }
      setTimeout(() => {
        list.value = newList;
      }, 0);
      isLoad.value = true;
    };

    return {
      reload,
      list,
      isLoad,
      total,
      max,
    };
  },
};
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: vh(24);
  ._item {
    width: 100%;
    height: vh(40);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    ._item-left {
      position: relative;
      width: 80%;
      height: vh(40);

      ._item-left-title {
        position: absolute;
        z-index: 2;
        top: vw(0);
        left: 0;
        font-size: vw(14);
        color: #cceaff;
      }
      ._item-left-current {
        position: absolute;
        z-index: 2;
        top: vh(18);
        left: 0;
        height: vh(4);
        // border-radius: vw(16);
      }
      img {
        position: absolute;
        z-index: 2;
        top: vh(7);
        width: vw(26);
        height: vh(26);
      }
      .bg1 {
        background-color: #65e3ac;
        // background: linear-gradient(90deg, #27e0fd 0%, #071a63 100%);
      }
      .bg2 {
        background-color: #26daf8;
      }
      .bg3 {
        background-color: #e0c260;
      }
      ._item-left-bg {
        position: absolute;
        top: vh(14);
        width: 100%;
        height: vh(12);
        background-color: rgba($color: #fff, $alpha: 0.1);
      }
    }
    ._item-right {
      width: 20%;
      height: vh(40);
      font-size: vw(20);
      text-align: right;
      color: #27e0fd;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      span {
        font-size: vw(14);
        color: #90b6d2;
      }
    }
  }

  .flex-ajc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: vh(200);
    margin-top: vh(10);
    padding: 0 vw(30);
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
      height: vh(30);
      margin-top: vh(10);
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-size: vw(14);
      color: #fff;

      animation: tour_right3_list calc(var(--time) * 4s) linear infinite normal;
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
@keyframes tour_right3_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-40)));
  }
}
</style>
