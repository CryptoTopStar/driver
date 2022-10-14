<template>
  <div class="_left3">
    <title-bar
      title="当年病虫害预警"
      customStyle="margin-top: 0px"
      :showMore="true"
      :moreType="1"
      tipTitle="算法说明"
      :tips="tips"
    />
    <list-3 ref="list1Ref"></list-3>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List3 from "./list3.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List3 },

  setup(props, { emit }) {
    const list1Ref = ref(null);

    const tips = [
      {
        title: "算法公式：",
        sub: "y=0.57X1+0.05X2+0.21X3+0.17X4, X1为当日最低气温，X2为当日最高气温，X3为当日空气湿度，X4为当日降雨量",
      },
      {
        title: "算法简介：",
        sub: "依据2021年全年每日气温、空气湿度、降雨量及对应病虫害情况，回归出每一项的偏回归系数，将当前或未来15天气候情况输入公式，进行病虫害预测，指导科学施肥及农药喷洒。",
      },
    ];

    onMounted(() => {
      list1Ref.value.reload();
    });
    return { list1Ref, tips };
  },
};
</script>

<style scoped lang="scss">
._left3 {
  width: 100%;
  height: vh(286);
  margin-top: vh(20);
   box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
