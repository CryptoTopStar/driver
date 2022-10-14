<template>
  <div class="app-header">
    <div class="title">
      <img v-if="getImage" :src="getImage" alt="" />
      <span>{{ getTitle }} </span>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  computed: {
    getImage: function () {
      let src = "";
      if (this.Route.path.indexOf("fungi") > -1) {
        src = require("../../assets/images/icon/yijipinlei-shiyongjun@2x.png");
      } else if (this.Route.path.indexOf("kiwi") > -1) {
        src = require("../../assets/images/icon/mihoutao.png");
      } else if (this.Route.path.indexOf("weather") > -1) {
        src = "";
      }
      return src;
    },
    getTitle: function () {
      let title = "";
      if (this.Route.path.indexOf("fungi") > -1) {
        title = "食用菌产业信息图";
      } else if (this.Route.path.indexOf("kiwi") > -1) {
        title = "猕猴桃产业信息图";
      } else if (this.Route.path.indexOf("weather") > -1) {
        title = "气象资源分布";
      }
      return title;
    },
  },
  setup() {
    const {
      proxy: {
        $tools: { sendMessage },
      },
    } = getCurrentInstance();
    const Route = useRoute();
    const state = reactive({
      isFinished: ref(false),
    });

    onMounted(() => {});

    return {
      ...toRefs(state),
      Route,
    };
  },
});
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";

.app-header {
  @include ac-flex;
  @include flex-row-between;
  @include flex-column-start;
  width: 100%;
  height: vw(117);
  background-color: aliceblue;
  color: #fff;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 9;
  background: url("~@/assets/images/header_bg.png") no-repeat;
  background-size: 100%;
  float: left;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: vw(14);
    img {
      width: vw(50);
      float: left;
      margin-top: vw(6);
      display: block;
    }
    span {
      font-family: HuXiaoBoNanShenTi;
      font-size: vw(32);
      display: block;
      float: left;
      margin-top: vw(8);
    }
    letter-spacing: vw(10);
  }
}
</style>
