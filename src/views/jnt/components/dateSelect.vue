<template>
  <div class="date-select"
    :style="{
      backgroundImage: showBg ? `url(${selectBg})` : `url(${dateBg})`,
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <div
      class="date-show"
      :style="{
        fontSize: showBg ? '16px' : '14px',
        paddingTop: showBg ? '4px' : ''
      }"
    >
      <p>{{ modelValue ? startDate : '开始日期' }}</p>
      <img :src="require('./../images/date_icon_1.png')" alt="" />
      <p>{{ modelValue ? endDate : '开始日期' }}</p>
      <img :src="require('./../images/date_icon_2.png')" alt="" />
    </div>
    <el-date-picker
      v-model="selectVal"
      type="daterange"
      range-separator="-"
      @change="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import selectBg from '@/views/jnt/images/select_bg.png'
import dateBg from '@/views/jnt/images/date_select_bg.png'
import { format } from 'date-fns'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  showBg: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 306
  },
  height: {
    type: Number,
    default: 34
  }
})
const emit = defineEmits(['update:modelValue'])

const startDate = ref('')
const endDate = ref('')

const selectVal = computed({
  get: () => props.modelValue,
  set: (e) => {
    startDate.value = format(e[0], 'yyyy-MM-dd')
    endDate.value = format(e[1], 'yyyy-MM-dd')
    emit('update:modelValue', [startDate.value, endDate.value])
  }
  // set: (value) => emit('update:modelValue', [format(value[0], 'yyyy-MM-dd'), format(value[1], 'yyyy-MM-dd')]),
})

const onConfirm = (e) => {
  startDate.value = format(e[0], 'yyyy-MM-dd')
  endDate.value = format(e[1], 'yyyy-MM-dd')
  // emit('update:modelValue', [startDate.value, endDate.value])
}

</script>

<style scoped lang="scss">
.date-select {
  position: relative;
  background-size: 100% 100%;
  :deep(.el-date-editor) {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
  }
  .date-show {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 32px;
    padding: 0 20px 0 0;
    p {
      width: 0;
      flex: 1;
      text-align: center;
      height: 20px;
      line-height: 20px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
