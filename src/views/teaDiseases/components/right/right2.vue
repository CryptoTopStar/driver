<template>
  <div class="_right1">
    <title-bar
      title="病害监测"
      customStyle="margin-top: 0px"
      :showMore="true"
      :moreType="1"
      tipTitle="算法说明"
      :tips="tips"
    />
    <!-- <list-2 ref="list2Ref"></list-2> -->

    <list-3></list-3>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import List2 from "./list2.vue";
import List3 from "./list3.vue";
import { ref, onMounted } from "vue";
export default {
  components: { TitleBar, List2, List3 },
  setup(props, { emit }) {
    const list2Ref = ref(null);
    const tips = [
      {
        title: "算法简介：",
        sub: "采用基于深度学习的图像目标检测技术，首先对茶叶病虫害区域进行标注，然后将标注后的数据送入目标检测网络进行特征提取并学习病虫害特征，后续在检测视频图像中，直接识别茶叶病虫害区域和类别，及时报警并依据病虫害类别给出防治措施。",
      },
    ];
    onMounted(() => {
      // list2Ref.value.reload();
    });
    return { list2Ref, tips };
  },
};
</script>

<style scoped lang="scss">
._right1 {
  width: 100%;
  height: vh(592);
  margin-top: vh(20);
  box-sizing: border-box;
  background-color: rgba(8, 26, 72, 0.5);
  border: 2px solid rgba(36, 60, 132, 0.5);
}
</style>
