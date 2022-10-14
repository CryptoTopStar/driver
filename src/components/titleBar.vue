<template>
  <div
    class="_title-bar"
    :style="customStyle + (url || router ? ';cursor: pointer;' : '')"
    @click="goto"
  >
    <img
      v-if="!showLongTitleMore"
      src="https://img.hzanchu.com/acimg/72b5e03be999bc81356a9f4d2003d76b.png"
      class="_bg"
    />
    <img
      v-if="showLongTitleMore"
      :src="require('@/assets/images/label_background_lang.png')"
      style="width:100%;"
      class="_bg"
    />
    <div class="_title" :style="{'margin-left':showLongTitleMore? '0px':'5px'}">
      {{ title }}

      <el-popover
        v-if="moreType == 1 && showMore"
        popper-class="de-algo-detail-popover"
        placement="right-start"
        :title="tipTitle"
        trigger="click"
      >
        <template #reference>
          <button v-if="showMore" class="de-section-header__popover">
            <img
              src="@/assets/images/garbage/show-bottom.png"
              class="_show-bottom"
              @click="show"
            />
          </button>
        </template>
        <template #default>
          <slot name="content" />
          <div class="default-content" v-if="!Boolean($slots['content'])">
            <p class="desc" v-if="tips[0]">
              <span class="paragraph-label">{{ tips[0].title }}</span>
              {{ tips[0].sub }}
            </p>
            <p class="desc" v-if="tips[1]">
              <span class="paragraph-label">{{ tips[1].title }}</span>
              {{ tips[1].sub }}
            </p>
          </div>
        </template>
      </el-popover>

      <img
        v-else-if="moreType == 0 && showMore "
        src="@/assets/images/garbage/show-bottom.png"
        class="_show-bottom"
        @click="show"
      />

      <!--- 
       <div v-if="showTip" class="_tip">
        <div class="_tip-title">
          {{ tipTitle }}
        </div>
        <div class="_tip-item">
          <div class="_tip-over">
            <div v-for="(item, index) in tips" :key="index" class="_tip-items">
              <span>{{ item.title }}</span>
              {{ item.sub }}
            </div>
          </div>
        </div>
      </div>
      -->
    </div>

    <slot />
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
import AlgoDetailsPopover from "@/components/data-exploration/AlgoDetailsPopover.vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    customStyle: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    }, // 当前配置可跳转url
    router: {
      type: String,
      default: "",
    }, // 当前配置可跳转Router，上下两者按上者为准
    showLongTitleMore: {
      type: Boolean,
      default: false, //默认短版本
    }, // 是否展示长版本title图片
    showMore: {
      type: Boolean,
      default: false,
    }, // 是否展示底部区域、更多提示的按钮
    moreType: {
      type: Number,
      default: 0,
    }, // 当前点击更多按钮的type类型，默认为0，1表示为点击直接展示当前弹窗，弹窗内容
    tipTitle: {
      type: String,
      default: "",
    }, // 如果moreType 为1，那么这里可传title
    tips: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 当前tips列表，
  },
  setup(props, { emit }) {
    const showTip = ref(false); // 是否展示当前弹窗提示
    const show = () => {
      if (props.moreType == 1) {
        // 如果是点击弹窗，那么则直接点击出现弹窗
        showTip.value = !showTip.value;
      } else {
        emit("show");
      }
    };
    return {
      show,
      showTip,
    };
  },
};
</script>

<style scoped lang="scss">
._title-bar {
  position: relative;
  width: 100%;
  height: vh(46);
  margin-top: vh(24);
  margin-left: vw(24);
  // overflow: hidden;

  ._title {
    z-index: 101;
    position: absolute;
    top: vh(10);
    left: vw(40);
    height: vh(26);
    line-height: vh(26);
    font-size: vh(18);
    font-weight: bold;
    white-space: nowrap;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;

    ._show-bottom {
      width: vw(19);
      height: vh(19);
      margin-left: vw(12);
      cursor: pointer;
    }

    ._tip {
      width: vw(371);
      height: vh(230);
      background: url("https://img.hzanchu.com/acimg/4b35b4526674bd7d95c0198ecff1ab06.png")
        no-repeat;
      background-size: 100% 100%;
      white-space: normal;
      animation: _show-tip 300ms linear 1 normal;
      animation-fill-mode: forwards;
      overflow-y: scroll;

      ._tip-title {
        position: sticky;
        top: 0;
        width: 100%;
        height: vh(38);
        line-height: vh(38);
        padding-left: vw(59);
        padding-top: vh(3);
        box-sizing: border-box;
        font-size: vw(24);
        font-family: "PangMenZhengDao";
        color: #fff;
        letter-spacing: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        img {
          width: vw(20);
          height: vh(20);
          margin-right: vw(24);
          cursor: pointer;
        }
      }

      ._tip-item {
        width: 100%;
        height: vh(190);
        padding: 0 vw(32) vh(32) vw(32);
        box-sizing: border-box;
        overflow: hidden;

        ._tip-over {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        ._tip-over::-webkit-scrollbar {
          display: none;
        }
        ._tip-items {
          width: 100%;
          margin-top: vh(12);
          font-size: vw(14);
          line-height: vh(22);
          color: #fff;
          span {
            font-size: vw(16);
            font-family: "PangMenZhengDao";
            color: rgba(111, 194, 255, 1);
            letter-spacing: 2px;
          }
        }
      }

      ._tip-item::-webkit-scrollbar {
        display: none;
      }
    }

    ._tip::-webkit-scrollbar {
      display: none;
    }
  }
  ._bg {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: vw(390);
    height: vh(46);
    -webkit-user-drag: none; // 禁止拖拽
  }
}

.de-section-header__popover {
  background: none;
  cursor: pointer;
  font-size: vh(20);
  line-height: vh(20);
}
.paragraph-label {
  font-size: vh(16);
  color: rgba(111, 194, 255, 1);
  font-family: PangMenZhengDao;
}

.default-content {
  overflow: auto;
  flex: 1;
  min-height: 0;
  padding: vh(8) vw(24) vh(20) vw(24);
  display: flex;
  flex-flow: column;
  row-gap: vh(16);
  &::-webkit-scrollbar {
    height: vh(5);
    width: vw(5);
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 6px;
  }
}
.desc {
  font-size: vh(14);
  font-family: MicrosoftYaHei;
  line-height: vh(22);
  color: #ffffff;
}
</style>


<style lang="scss">
@keyframes _show-tip {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
