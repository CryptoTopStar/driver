<template>
  <div class="_list">
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
      <div v-for="(item, index) in list" :key="index" class="_item">
        <div class="_item-left">
          <img
            :src="
              index % 3 == 0
                ? 'https://img.hzanchu.com/acimg/900da2368f381ec1477fa8a737f0778c.png'
                : index % 3 == 1
                ? 'https://img.hzanchu.com/acimg/42ddebcd57c8ec042878eba23bf02bec.png'
                : 'https://img.hzanchu.com/acimg/5428497d8e913bb845f048c81d0c47ab.png'
            "
          />
          <div
            :class="
              index % 3 == 0 ? 'blank1' : index % 3 == 1 ? 'blank2' : 'blank3'
            "
          ></div>
          {{ item.village }}
        </div>
        <div class="_item-center">
          <div class="_item-center-bg"></div>
          <div
            :class="
              '_item-center-current ' +
              (index % 3 == 0 ? 'bg1' : index % 3 == 1 ? 'bg2' : 'bg3')
            "
            :style="'width: calc(' + item.operator / max + '*100%)'"
          ></div>
          <img
            :src="
              index % 3 == 0
                ? 'https://img.hzanchu.com/acimg/0a8cb01a22ecf6d9d68ee921303fcb02.png'
                : index % 3 == 1
                ? 'https://img.hzanchu.com/acimg/b30088f5a56f24dc5fbd50dd583fc175.png'
                : 'https://img.hzanchu.com/acimg/b3699647c1da46eccad47ba8337ecd52.png'
            "
            :style="'left: calc(' + item.operator / max + '*100% - 13px)'"
          />
        </div>
        <div class="_item-right text-over1">
          {{ item.operator }}<span>人</span>
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
    const total = ref(10);
    const isLoad = ref(false);
    const max = ref(1); // 默认最大为1

    // 重新加载数据
    const reload = () => {
      total.value = props.data.length;
      for (let item of props.data) {
        if (parseInt(item.operator) > max.value) {
          max.value = parseInt(item.operator);
        }
      }
      isLoad.value = true;
      setTimeout(() => {
        list.value = props.data;
      }, 0);
    };

    onMounted(() => {
      reload();
    });

    return {
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

    ._item-left {
      width: vw(80);
      font-size: vw(14);
      color: #cceaff;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: vw(6);
        height: vh(10);
        animation: hospital_right2_left 2s linear infinite normal;
      }

      .blank1 {
        width: vw(0);
        height: vh(10);
        margin-left: vw(-4);
        margin-right: vw(16);
        box-shadow: vw(0) vw(0) vw(12) vw(4) #65e3ac;
        animation: hospital_right2_left 2s linear infinite normal;
      }
      .blank2 {
        width: vw(0);
        height: vh(10);
        margin-left: vw(-4);
        margin-right: vw(16);
        box-shadow: vw(0) vw(0) vw(12) vw(4) #26daf8;
        animation: hospital_right2_left 2s linear infinite normal;
      }
      .blank3 {
        width: vw(0);
        height: vh(10);
        margin-left: vw(-4);
        margin-right: vw(16);
        box-shadow: vw(0) vw(0) vw(12) vw(4) #e0c260;
        animation: hospital_right2_left 2s linear infinite normal;
      }
    }

    ._item-center {
      position: relative;
      flex: 1;
      height: vh(40);
      ._item-center-current {
        position: absolute;
        z-index: 2;
        top: vh(18);
        left: 0;
        height: vh(4);
        // border-radius: vw(16);
      }
      ._item-center-bg {
        position: absolute;
        top: vh(14);
        width: 100%;
        height: vh(12);
        background-color: rgba($color: #fff, $alpha: 0.1);
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
    }
    ._item-right {
      width: vw(70);
      height: vh(40);
      line-height: vh(40);
      font-size: vw(20);
      text-align: right;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      color: #27e0fd;
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
@keyframes hospital_right2_left {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
