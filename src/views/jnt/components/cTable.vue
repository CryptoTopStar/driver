<template>
  <div class="c-table">
    <div class="item">
      <p>序号</p>
      <p
        v-for="item in title"
        :key="item.key"
        :style="{
          flex: item.width ? 'none' : 1,
          width: item.width || 0
        }"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="item-wrap">
      <div class="item" v-for="(item, index) in list" :key="index">
        <p>{{ index + 1 }}</p>
        <p
          v-for="title in title"
          :key="title.key"
          :style="{
            flex: title.width ? 'none' : 1,
            width: title.width || 0,
            color: title.key === 'is_check' ? statusColor[item.is_check]
                    : title.key === 'show_bl_aging_txt' ? timeColor[item.show_bl_aging_txt]
                      : ''
          }"
        >
          {{
            title.key === 'is_check' ? statusEnum[item[title.key]]
              : item[title.key]
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

defineProps({
  title: {
    list: Array,
    default: () => {
      return []
    }
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const statusEnum = {
  1: '待处理',
  2: '已处理'
}
const statusColor = {
  1: '#fff',
  2: '#FF9500'
}
const timeColor = {
  '停留超过24小时': '#24D9D6',
  '停留超过48小时': '#FF9500',
  '停留超过72小时': '#FF3B30'
}

</script>

<style scoped lang="scss">
.c-table {
  padding: 0 12px;
  .item {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 34px;
    p {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 6px;
      &:nth-of-type(1) {
        flex: none;
        width: 30px;
        margin-right: 5px;
      }
    }
  }
  .item-wrap {
    height: calc(34px * 2);
    overflow-y: scroll;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    &::-webkit-scrollbar{
      display: none; /* ChromeSafari */
    }
    .item {
      color: #fff;
      &:nth-of-type(2n-1) {
        background: url("~@/assets/rural-brain/dl/table-row-bg-long.svg") no-repeat;
        background-size: 100% 100%;
      }
      p:nth-of-type(1) {
        height: 22px;
        text-align: center;
        line-height: 24px;
        background: url('./../images/index_bg.png') no-repeat center;
        background-size: auto 100%;
        font-size: 12px;
      }
    }
  }
}
</style>
