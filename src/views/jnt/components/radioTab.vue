<template>
  <div class="radio-tab">
    <div
      class="item"
      :class="{ active: activeIndex === index }"
      v-for="(item, index) in list"
      :key="index"
      @click="onChange(index)"
      :style="{
        height: height + 'px',
        lineHeight: height + 'px',
        backgroundImage: activeIndex === index ? 'url(' + bg + ')' : '',
        color: activeIndex === index ? '#fff' : ''
      }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    },
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 32,
  },
  bg: {
    type: String,
    default: require('./../images/radio_bg.png')
  }
})
const emit = defineEmits('update:activeIndex')

const onChange = (index) => {
  emit('update:activeIndex', index)
}

</script>

<style scoped lang="scss">
.radio-tab {
  height: 32px;
  display: flex;
  .item {
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    font-size: 16px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .active {

  }
}
</style>
