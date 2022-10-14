<template>
  <div class="_left1">
    <title-bar title="大陈乡今日数据" />
    <!-- 总用户数据等 -->
    <div class="_top">
      <left-1-top
        title="总用户"
        :value="data?.totalMember"
        unit="户"
      ></left-1-top>
      <left-1-top
        title="常住用户"
        :value="data?.residentMember"
        unit="户"
      ></left-1-top>
      <left-1-top
        title="参与用户"
        :value="data?.participationMember"
        unit="户"
      ></left-1-top>
    </div>

    <!-- 投放总量等 -->
    <div class="_center">
      <left-1-center
        title="投放总重量"
        :value="data?.totalWeight || '更新中'"
        :unit="data?.totalWeight ? 'kg' : ''"
      ></left-1-center>
      <left-1-center
        title="易腐垃圾"
        :value="data?.perishableWeight || '更新中'"
        :unit="data?.perishableWeight ? 'kg' : ''"
      ></left-1-center>
      <left-1-center
        title="其他垃圾"
        :value="data?.otherWeight || '更新中'"
        :unit="data?.otherWeight ? 'kg' : ''"
      ></left-1-center>
    </div>

    <!-- 参与率等 -->
    <div class="_bottom">
      <left-1-bottom
        ref="left1Bottom1"
        title="参与率"
        :value="data?.participationRate || '更新中'"
        :unit="data?.participationRate ? '%' : ''"
        :data="list"
        @close="close"
      ></left-1-bottom>

      <left-1-bottom
        ref="left1Bottom2"
        title="准确率"
        :value="data?.correctRate || '更新中'"
        :unit="data?.correctRate ? '%' : ''"
        :data="list"
        @close="close"
      ></left-1-bottom>

      <left-1-bottom
        ref="left1Bottom3"
        title="空桶率"
        :value="data?.emptyBucketRate || '更新中'"
        :unit="data?.emptyBucketRate ? '%' : ''"
        :data="list"
        @close="close"
      ></left-1-bottom>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/titleBar.vue";
import { ref, onMounted } from "vue";
import {
  classificationModuletData,
  rubbishgetDbRubbishCollectSevenDaysBasicData,
} from "@/api/garbage/api";
import Left1Top from "./left1Top.vue";
import Left1Center from "./left1Center.vue";
import Left1Bottom from "./left1Bottom.vue";

export default {
  components: { TitleBar, Left1Top, Left1Center, Left1Bottom },
  setup() {
    const data = ref({});
    const list = ref([]); // 当前近7日数据
    const left1Bottom1 = ref(null);
    const left1Bottom2 = ref(null);
    const left1Bottom3 = ref(null);
    const close = (title) => {
      // console.log(title)
      if (title == "参与率") {
        left1Bottom2.value.close();
        left1Bottom3.value.close();
      } else if (title == "准确率") {
        left1Bottom1.value.close();
        left1Bottom3.value.close();
      } else if (title == "空桶率") {
        left1Bottom1.value.close();
        left1Bottom2.value.close();
      }
    };

    // 重新初始化当前chart
    const reload = () => {
      classificationModuletData({
        street: "大陈乡",
        dsCode: "A000013",
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
          data.value = res.data;
        }
      });

      rubbishgetDbRubbishCollectSevenDaysBasicData({ dsCode: "A000013" }).then(
        (res) => {
          console.log(res);
          if (res.code == 0) {
            list.value = res.data;
          }
        }
      );
    };

    onMounted(() => {
      reload();
    });
    return { data, list, left1Bottom1, left1Bottom2, left1Bottom3, close };
  },
};
</script>

<style scoped lang="scss">
._left1 {
  width: 100%;
  ._top {
    width: 100%;
    margin-top: vh(25);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  ._center {
    width: 100%;
    margin-top: vh(12);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  ._bottom {
    width: 100%;
    margin-top: vh(12);
    padding: 0 vw(30);
    box-sizing: border-box;
  }
}
</style>

<style lang="scss">
@keyframes garbage_left1_center {
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
