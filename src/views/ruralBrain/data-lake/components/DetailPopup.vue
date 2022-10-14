<template>
  <el-dialog
    :model-value="modelValue"
    custom-class="dl-detail-modal"
    :close-on-click-modal="false"
    :show-close="false"
    top="106px"
  >
    <template #header>
      <div class="dl-detail-modal__header-container">
        <header class="dl-detail-modal__header">{{ title }}</header>
        <button class="dl-detail-modal__close-btn" @click="onClose">
          <img :src="require('@/assets/images/icon/close.svg')" alt="close" />
        </button>
      </div>
    </template>
    <div class="dl-detail-modal__body">
      <ScrollingBoard
        :data="data"
        :columns="columns"
        id-field="id"
        class="scrolling-detail-table"
        :visible-count="1000"
        :getRowBg="getRowBg"
        static
      />
    </div>
  </el-dialog>
</template>

<script setup>
import {watchEffect, onMounted} from 'vue';
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import rowBg from '@/assets/rural-brain/dl/table-row-bg-long.svg'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
})
const emits = defineEmits(['update:modelValue'])
const onClose = () => {
  emits('update:modelValue', false);
}
const getRowBg = (row) => {
  const srcIdx = props.data.findIndex(
    (e) => {
      return e.id === row.id
    }
  );
  if (srcIdx % 2 === 1) {
    return `no-repeat left / auto 100% url(${rowBg})`;
  }
}

</script>

<style scoped lang="scss">
.dl-detail-modal__header-container {
  display: flow-root;
  color: white;
  position: relative;
  .dl-detail-modal__header {
    text-align: left;
    font-size: 24px;
    line-height: 36px;
    height: 38px;
    font-family: PangMenZhengDao, fantasy;
    font-weight: 400;
    color: #FFFFFF;
    text-shadow: 0px 6px 6px #002160;
    margin-inline-start: 40px;
    padding-inline-start: 30px;
    background: no-repeat left / auto 100% url("~@/assets/images/smart-communities/tourism/title-border.png");
  }
  .dl-detail-modal__close-btn {
    cursor: pointer;
    color: white;
    position: absolute;
    background: none;
    right: 4px;
    top: 12px;
    img {
      width: 22px;
    }
  }
}
.scrolling-detail-table {
}
.dl-detail-modal__body {

  ::v-deep(.scrolling-table) {
    .table-header {
      padding-inline: 40px;
      width: auto;
      box-sizing: content-box;
      .cell {
        padding: vh(8) vw(8);
        box-sizing: border-box;
        font-size: 22px;
      }
    }
    .table-body {
      padding-inline: 40px;
      .row {
        height: 59px;
        .cell {
          font-size: 18px;
        }
        .default-text-cell {
          font-size: 18px;
        }
        .cell:first-of-type {
          .default-text-cell {
            margin-block: 12px;
            width: 44px;
            height: 32px;
            box-sizing: border-box;
            background: #082C74;
          }
        }
        .cell:not(:first-of-type) {
          .default-text-cell {
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            white-space: normal;
            padding-block: 0;
          }
        }
      }
      .row:not(:last-of-type) {
        margin-block-end: 16px;
      }
    }
  }
  ::v-deep(.table-body) {
    max-height: 700px;
    overflow: auto;

    &::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #DEDEDE;
      border-radius: 6px;
    }
  }
}
</style>
<style lang="scss">
.dl-detail-modal {
  &.el-dialog {
    width: 1227px;
    height: 865px;
    background: no-repeat center/100% 100% url("~@/assets/rural-brain/dl/popup-border.svg");
    .el-dialog__header {
      padding: 12px 12px;
    }
  }
}
</style>
