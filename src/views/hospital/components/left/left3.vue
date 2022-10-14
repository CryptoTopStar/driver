<template>
  <div class="_left3">
    <title-bar title="资源配置" />

    <div class="_main">
      <div class="_main1">
        <img src="@/assets/images/hospital/left3.png" />
        <div class="_main1-item">
          <div>{{ data.bedAge }} <span>张</span></div>
          <div>医院每千人床位数量</div>
        </div>
      </div>
      <div class="_main2">
        <img src="@/assets/images/hospital/left3.png" />
        <div class="_main2-item">
          <div>{{ data.day }} <span>天</span></div>
          <div>医院平均住院日</div>
        </div>
      </div>
      <div class="_main3">
        <img src="@/assets/images/hospital/left3.png" />
        <div class="_main3-item">
          <div>{{ data.bed }}</div>
          <div>医院床护比</div>
        </div>
      </div>
      <div class="_main4">
        <img src="@/assets/images/hospital/left3.png" />
        <div class="_main4-item">
          <div>{{ data.people }}</div>
          <div>医院每千人床位数量</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { getResourceAllocation } from "@/api/hospital/api";

export default {
  components: { TitleBar },
  setup() {
    const data = ref({
      bedAge: "",
      day: "",
      bed: "",
      people: "",
    }); // 当前data对象
    // 重新初始化当前chart
    const reload = () => {
      getResourceAllocation().then((res) => {
        if (res.code == 0) {
          data.value = res.data;
          for (let item of res.data) {
            if (item.index_name == "医院每千人床位数") {
              data.value.bedAge = item.value;
            }
            if (item.index_name == "医院平均住院日") {
              data.value.day = item.value;
            }
            if (item.index_name == "医院床护比") {
              data.value.bed = item.value;
            }
            if (item.index_name == "医院医护比") {
              data.value.people = item.value;
            }
          }
        }
      });
    };

    onMounted(() => {
      reload();
    });
    return { data };
  },
};
</script>

<style scoped lang="scss">
._left3 {
  width: 100%;

  ._main {
    position: relative;
    width: 100%;
    height: vh(200);


    ._main1 {
      position: absolute;
      top: vh(58);
      width: vw(220);
      height: vh(220);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: vw(220);
        height: vh(220);
      }

      ._main1-item {
        width: vw(220);
        height: vh(220);
        margin-left: vw(-220);
        margin-top: vh(-20);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div:nth-of-type(1) {
          margin-bottom: vh(12);
          font-size: vw(24);
          font-weight: bold;
          color: #eaca60;
          span {
            margin-left: vw(2);
            font-weight: normal;
            font-size: vw(14);
            color: #ffffff;
          }
        }
        div:nth-of-type(2) {
          width: vw(80);
          text-align: center;
          font-size: vw(16);
          color: #ffffff;
          line-height: vh(19);
        }
      }
    }
    ._main2 {
      position: absolute;
      left: vw(150);
      width: vw(160);
      height: vh(160);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: vw(160);
        height: vh(160);
      }
      ._main2-item {
        width: vw(160);
        height: vh(160);
        margin-left: vw(-160);
        margin-top: vh(-10);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div:nth-of-type(1) {
          margin-bottom: vh(12);
          font-size: vw(24);
          font-weight: bold;
          color: #eaca60;
          span {
            margin-left: vw(2);
            font-weight: normal;
            font-size: vw(14);
            color: #ffffff;
          }
        }
        div:nth-of-type(2) {
          width: vw(80);
          text-align: center;
          font-size: vw(16);
          color: #ffffff;
          line-height: vh(19);
        }
      }
    }
    ._main3 {
      position: absolute;
      top: vh(34);
      left: vw(287);
      width: vw(186);
      height: vh(186);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
      ._main3-item {
        width: vw(186);
        height: vh(186);
        margin-left: vw(-186);
        margin-top: vh(-10);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div:nth-of-type(1) {
          margin-bottom: vh(12);
          font-size: vw(24);
          font-weight: bold;
          color: #eaca60;
          span {
            margin-left: vw(2);
            font-weight: normal;
            font-size: vw(14);
            color: #ffffff;
          }
        }
        div:nth-of-type(2) {
          width: vw(80);
          text-align: center;
          font-size: vw(16);
          color: #ffffff;
          line-height: vh(19);
        }
      }
    }
    ._main4 {
      position: absolute;
      top: vh(130);
      left: vw(173);
      width: vw(186);
      height: vh(186);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
      ._main4-item {
        width: vw(186);
        height: vh(186);
        margin-left: vw(-186);
        margin-top: vh(-10);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div:nth-of-type(1) {
          margin-bottom: vh(12);
          font-size: vw(24);
          font-weight: bold;
          color: #eaca60;
          span {
            margin-left: vw(2);
            font-weight: normal;
            font-size: vw(14);
            color: #ffffff;
          }
        }
        div:nth-of-type(2) {
          width: vw(80);
          text-align: center;
          font-size: vw(16);
          color: #ffffff;
          line-height: vh(19);
        }
      }
    }
  }
}
</style>
