<template>
  <div class="custom-element c-select">
    <div class="select-wrap">
      <span class="single" v-if="!Array.isArray(modelValue) || !modelValue.length">{{ columns[modelValue] || '请选择' }}</span>
      <span class="multiple" v-if="Array.isArray(modelValue) && modelValue.length">{{ columns[modelValue[0]] }}</span>
      <span class="multiple" v-if="Array.isArray(modelValue) && modelValue.length > 1">+{{ modelValue.length - 1 }}</span>
    </div>
    <img
      :style="{ transform: 'rotate(' + (selectStatus ? -180 : 0) + 'deg)',  }"
      :src="require('./../images/select_icon.png')"
      alt=""
    />
    <el-select
      v-model="selectVal"
      @visible-change="onStatusChange"
      @change="onChange"
      :multiple="multiple"
      collapse-tags
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Number, String, Array],
    default: ''
  },
  columns: {
    type: [Object, Array],
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const selectStatus = ref(false)
const options = ref([])

const selectVal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const onStatusChange = (e) => {
  selectStatus.value = e
}
const onChange = (e) => {
  console.log(e, props.modelValue)
  // emit('update:modelValue', props.modelValue)
}

watch(() => props.columns, val => {
  options.value = []
  if (Array.isArray(val)) {
    options.value = val
  } else {
    Object.keys(val).forEach(key => {
      options.value.push({ label: val[key], value: key })
    })
  }
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.c-select {
  position: relative;
  height: 34px;
  width: 306px;
  background: url("../images/select_bg.png") no-repeat;
  background-size: 100% 100%;
  .select-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 36px;
    font-size: 16px;
    text-indent: 12px;
  }
  .multiple {
    background: #063971;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    margin-right: 12px;
    border-radius: 2px;
  }
  img {
    position: absolute;
    right: 20px;
    top: 10px;
    transition: all .3s;
    width: 24px;
    height: 18px;
  }
  :deep(.el-select) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
