<template>
  <el-radio-group
    :model-value="modelValue"
    @update:model-value="onValueUpdate"
    size="large"
    class="jscm-radio-group"
  >
    <el-radio-button
      class="jscm-radio-group__option"
      v-for="option in options"
      :key="option.value"
      :label="option.value"
    >
      {{option.label}}
    </el-radio-button>
  </el-radio-group>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, undefined],
  },
  options: {
    type: Object,
    default: () => []
  },
  autoSwitch: Boolean,
  autoSwitchInterval: {
    type: Number,
    default: 5000
  },
});

const emits = defineEmits(['update:modelValue']);
const onValueUpdate = (value) => {
  emits('update:modelValue', value)
}

const autoSwitchRef = ref(undefined);
watchEffect(()=>{
  const idx = Math.max(props.options.findIndex(e=>e.value === props.modelValue), -1);
  const nextIdx = (idx + 1) % props.options.length;
  if (props.autoSwitch) {
    clearTimeout(autoSwitchRef.value)
    autoSwitchRef.value = setTimeout(()=>onValueUpdate(props.options[nextIdx].value), props.autoSwitchInterval)
  }
})

onMounted(()=>{
})

</script>

<style scoped lang="scss">
.jscm-radio-group {
  display: flex;
  column-gap: vw(4);
  //--el-button-bg-color: #b74df6;
  --el-button-text-color: #aaa;
  --el-border-color: transparent;
  --el-border-width: 0;
  --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
}
.jscm-radio-group__option {
  //--el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
  //--el-radio-button-checked-bg-color: transparent;
  --el-radio-button-checked-text-color: white;
  --el-radio-button-checked-border-color: transparent;
  ::v-deep(.el-radio-button__inner) {
    padding: vh(4) vw(4);
    min-width: vw(77);
    box-sizing: border-box;
    background: no-repeat center / 100% 100% url('~@/assets/images/radio-box-bg.svg');
    font-size: vh(14);
    font-weight: 400;
    line-height: vh(18);
    &:hover {
      color: #ccc
    }
  }
  &.is-active {
    ::v-deep(.el-radio-button__inner) {
      filter: hue-rotate(-23deg) brightness(calc(55/30 + 1));
    }
  }
}
</style>
