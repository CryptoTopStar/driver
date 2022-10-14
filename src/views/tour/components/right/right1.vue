<template>
  <div class="_right1">
    <title-bar title="经营类型" />
    <div class="_top">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index == 0 ? '_top-item' : '_top-item _top-ml'"
      >
        <div
          :style="
            'background-color: ' +
            (index == 0 ? '#7C61FF' : index == 1 ? '#04D6BA' : '#00BAFE')
          "
        ></div>
        {{ item.type }}
      </div>
    </div>

    <div class="_main">
      <div class="_left">
        <div class="_title">{{ list[2]?.type }}：{{ list[2]?.count }}家</div>
        <div class="_percent">{{ list[2]?.rate }}%</div>
        <div class="_dash"></div>
        <img src="@/assets/images/tour/right1-2.png" />
      </div>

      <div class="_center">
        <div class="_title">{{ list[0]?.type }}：{{ list[0]?.count }}家</div>
        <div class="_percent">{{ list[0]?.rate }}%</div>
        <div class="_dash"></div>
        <img src="@/assets/images/tour/right1-1.png" />
      </div>
      <div class="_right">
        <div class="_title">{{ list[1]?.type }}：{{ list[1]?.count }}家</div>
        <div class="_percent">{{ list[1]?.rate }}%</div>
        <div class="_dash"></div>
        <img src="@/assets/images/tour/right1-3.png" />
        <!-- <div class="triangle">&#9650</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
export default {
  components: { TitleBar },
  props: {
    data: {
      type: Array,
    },
  },

  setup(props) {
    const list = ref([]);
    onMounted(() => {
      console.log(props.data);
      let newList = JSON.parse(JSON.stringify(props.data));
      let length = newList.length,
        pos;
      while (length > 0) {
        for (pos = 0; pos < length - 1; pos++) {
          if (newList[pos].rate < newList[pos + 1].rate) {
            let tempExchangVal = newList[pos];
            newList[pos] = newList[pos + 1];
            newList[pos + 1] = tempExchangVal;
          }
        }
        length--;
      }
      setTimeout(() => {
        list.value = newList;
      }, 0);
      console.log(newList);
    });
    return { list };
  },
};
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
  ._top {
    width: 100%;
    margin-top: vh(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ._top-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: vw(12);
      color: #cceaff;
      line-height: vh(20);
      div {
        width: vw(10);
        height: vh(10);
        margin-right: vw(8);
      }
    }

    ._top-ml {
      margin-left: vw(36);
    }
  }

  ._main {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  }

  ._left {
    position: relative;
    z-index: 1;
    width: vw(86);
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ._title {
      position: absolute;
      top: vh(-20);
      right: vw(43);
      font-size: vw(12);
      color: #00bafe;
      white-space: nowrap;
    }
    ._percent {
      width: vw(43);
      text-align: right;
      font-size: vw(16);
      color: #ffffff;
    }
    ._dash {
      width: vw(43);
      height: vw(0);
      margin-top: vh(4);
      border-bottom: vw(1) dashed #3995ff;
    }
    img {
      width: vw(86);
      height: vh(80);
    }
  }
  ._center {
    position: relative;
    z-index: 2;
    width: vw(136);
    margin-top: vh(20);
    margin-left: vw(-12);
    display: flex;
    flex-direction: column;
    align-items: center;
    ._title {
      font-size: vw(12);
      color: #00bafe;
    }
    ._percent {
      margin-top: vh(6);
      font-size: vw(16);
      color: #ffffff;
    }
    ._dash {
      width: vw(60);
      height: vw(0);
      margin-top: vh(4);
      border-bottom: vw(1) dashed #3995ff;
    }
    img {
      width: vw(136);
      height: vh(127);
    }
  }
  ._right {
    position: relative;
    z-index: 1;
    width: vw(105);
    margin-left: vw(-12);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    ._title {
      position: absolute;
      top: vh(-20);
      left: vw(53);
      font-size: vw(12);
      color: #00bafe;
      white-space: nowrap;
    }
    ._percent {
      width: vw(53);
      font-size: vw(16);
      text-align: left;
      color: #ffffff;
    }
    ._dash {
      width: vw(53);
      height: vw(0);
      margin-top: vh(4);
      border-bottom: vw(1) dashed #3995ff;
    }

    img {
      width: vw(105);
      height: vh(98);
    }
  }
}
</style>
