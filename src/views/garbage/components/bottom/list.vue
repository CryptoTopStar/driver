<template>
  <div :class="more ? '_list1_more' : '_list1'">
    <div class="_list1-top">
      <div class="address">地区</div>
      <div class="name">姓名</div>
      <div class="name">垃圾类型</div>
      <div class="result">分类结果</div>
      <div class="name">重量</div>
      <div class="image">图片</div>
      <div class="name">时间</div>
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
        <div class="address text-over1">{{ item.village }}</div>
        <div class="name">{{ item.memberName }}</div>
        <div class="name">
          {{ item.wasteType == 0 ? "其他垃圾" : "易腐垃圾" }}
        </div>
        <div class="result">
          {{ item.result == 0 ? "空桶" : ""
          }}{{ item.result == 1 ? "不合格" : ""
          }}{{ item.result == 2 ? "合格" : ""
          }}{{ item.result == 3 ? "良好" : ""
          }}{{ item.result == 4 ? "优秀" : "" }}
        </div>
        <div class="name">{{ item.weight }}kg</div>
        <div class="image"><img :src="item.imagePath" /></div>
        <div class="name">{{ item.collectTime }}</div>
      </div>
    </div>

    <list-empty v-else></list-empty>

    <div class="expend">
      <el-input v-if="more" v-model="village" placeholder="请输入地区搜索">
        <template #suffix>
          <img
            :src="
              require('@/assets/images/smart-communities/shared/icon_search.svg')
            "
            alt="search"
          />
        </template>
      </el-input>

      <el-button>搜索</el-button>
      <el-button>重置</el-button>

      <img
        src="@/assets/images/garbage/expend.png"
        class="expend-icon"
        @click="showMore"
      />
    </div>

    <div v-if="more" class="pagination-row">
      <span class="summary">共{{ total }}条记录</span>
      <el-pagination
        class="scs-detail-table__pagination"
        :hide-on-single-page="false"
        layout="prev, pager, next"
        v-model:current-page="page"
        :page-size="pageSize"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { rubbishGetRealTimeRubbishCollectByPage } from "@/api/garbage/api";
import listEmpty from "@/components/listEmpty.vue";
export default {
  components: { listEmpty },
  setup() {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);

    const page = ref(1);
    const pageSize = ref(10);
    const village = ref(""); // 当前村庄筛选

    const more = ref(false);
    const showMore = () => {
      more.value = !more.value;
      reload();
    };

    watch;

    // 重新加载数据
    const reload = () => {
      rubbishGetRealTimeRubbishCollectByPage({
        street: "大陈乡",
        village: village.value,
        page: more.value ? page.value : 1,
        pageSize: more.value ? pageSize.value : 1000, // 如果不展示就默认给1000条
      }).then((res) => {
        total.value = res.data.list.length;
        list.value = res.data.list;
      });
      isLoad.value = true;
    };

    return {
      reload,
      list,
      isLoad,
      total,
      page,
      pageSize,
      showMore,
      more,
      village,
    };
  },
};
</script>

<style scoped lang="scss">
._list1 {
  position: relative;
  width: 100%;
  margin-top: vh(16);

  .expend {
    position: absolute;
    top: vh(-52);
    right: 0;
    width: vw(100);
    height: vh(30);
    ::v-deep(.el-input) {
      position: absolute;
      right: vw(180);
      top: vh(0);
      width: vw(170);
      height: vh(30);
      --el-input-text-color: #9ac6e6;
      --el-input-border-color: #2ca2fc;
      --el-input-bg-color: rgba(38, 128, 235, 0.14901960784313725);
      --el-input-placeholder-color: #9ac6e6;
      --el-input-hover-border-color: #2ca2fc;
      --el-input-clear-hover-color: #2ca2fc;
      --el-input-focus-border-color: #2ca2fc;
      .el-input__inner {
        line-height: vh(14);
        font-size: vh(14);
        height: vh(14);
      }
    }

    .expend-icon {
      position: absolute;
      top: vh(-10);
      right: vw(30);
      width: vw(16);
      height: vh(16);
      cursor: pointer;
    }
  }

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

  .address {
    flex: 1;
    margin-right: vw(24);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .name {
    width: vw(84);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .result {
    width: vw(74);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .image {
    width: vw(106);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: vw(74);
      height: vh(52);
    }
  }

  ._item-main {
    width: 100%;
    height: vh(180);
    padding: 0 vw(30);
    margin-top: vh(6);
    box-sizing: border-box;
    overflow: hidden;

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

  .pagination-row {
    margin-block: auto vh(-12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #89b0cc;
    line-height: vw(22);
    .summary {
      font-size: vw(12);
    }
    ::v-deep(.el-pagination) {
      --el-pagination-button-bg-color: transparent !important;
      --el-disabled-bg-color: transparent !important;
      --el-pagination-button-disabled-bg-color: transparent !important;
      --el-pagination-bg-color: transparent !important;
      --el-pagination-text-color: #89b0cc;
      --el-pagination-button-color: #89b0cc;
      .el-pager {
        li {
          width: vw(24);
          border-radius: vw(4);
          min-width: vw(24);
          height: vw(24);
          padding: 0 vw(4);
          &.is-active {
            background-color: #45a2ff;
            color: #00488e;
          }
        }
      }
    }
  }
}

._list1_more {
  position: relative;
  width: 100%;
  margin-top: vh(16);

  .expend {
    position: absolute;
    top: vh(-52);
    right: 0;
    width: vw(100);
    height: vh(30);
    ::v-deep(.el-input) {
      position: absolute;
      right: vw(180);
      top: vh(0);
      width: vw(170);
      height: vh(30);
      --el-input-text-color: #9ac6e6;
      --el-input-border-color: #2ca2fc;
      --el-input-bg-color: rgba(38, 128, 235, 0.14901960784313725);
      --el-input-placeholder-color: #9ac6e6;
      --el-input-hover-border-color: #2ca2fc;
      --el-input-clear-hover-color: #2ca2fc;
      --el-input-focus-border-color: #2ca2fc;
      .el-input__inner {
        line-height: vh(14);
        font-size: vh(14);
        height: vh(14);
      }
    }

    ::v-deep(.el-button:nth-of-type(1)){
      position: absolute;
      right: vw(180);
      top: vh(0);
      width: vw(170);
      height: vh(30);
      --el-input-text-color: #9ac6e6;
      --el-input-border-color: #2ca2fc;
      --el-input-bg-color: rgba(38, 128, 235, 0.14901960784313725);
      --el-input-placeholder-color: #9ac6e6;
      --el-input-hover-border-color: #2ca2fc;
      --el-input-clear-hover-color: #2ca2fc;
      --el-input-focus-border-color: #2ca2fc;
    }

    .expend-icon {
      position: absolute;
      top: vh(-10);
      right: vw(30);
      width: vw(16);
      height: vh(16);
      cursor: pointer;
    }
  }

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

  .address {
    flex: 1;
    margin-right: vw(24);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .name {
    width: vw(84);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .result {
    width: vw(74);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .image {
    width: vw(106);
    margin-right: vw(24);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: vw(74);
      height: vh(52);
    }
  }

  ._item-main {
    width: 100%;
    height: vh(360);
    padding: 0 vw(30);
    margin-top: vh(6);
    box-sizing: border-box;
    overflow: hidden;

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

  .pagination-row {
    margin-top: vh(15);
    margin-bottom: vh(15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #89b0cc;
    line-height: vw(22);
    .summary {
      font-size: vw(12);
    }
    ::v-deep(.el-pagination) {
      --el-pagination-button-bg-color: transparent !important;
      --el-disabled-bg-color: transparent !important;
      --el-pagination-button-disabled-bg-color: transparent !important;
      --el-pagination-bg-color: transparent !important;
      --el-pagination-text-color: #89b0cc;
      --el-pagination-button-color: #89b0cc;
      .el-pager {
        li {
          width: vw(24);
          border-radius: vw(4);
          min-width: vw(24);
          height: vw(24);
          padding: 0 vw(4);
          &.is-active {
            background-color: #45a2ff;
            color: #00488e;
          }
        }
      }
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
