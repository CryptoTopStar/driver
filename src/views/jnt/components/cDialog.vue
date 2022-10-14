<template>
  <el-dialog
    custom-class="c-dialog"
    v-model="modelValue"
    destroy-on-close
    append-to-body
    top="100px"
    :show-close="false"
    @close="onClose"
  >
    <div class="title">
      <h4>{{ title }}</h4>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <img @click="onClose" :src="require('@/assets/images/dialog_close_btn.png')" alt="" />
    </div>
    <div class="container">
      <slot name="table"></slot>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题',
  }
})

const emit = defineEmits(['update:modelValue'])

const onClose = () => {
  emit('update:modelValue', false)
}

</script>

<style lang="scss">
.c-dialog {
  .title {
    display: flex;
    align-items: center;
    height: 46px;
    line-height: 46px;
    h4 {
      width: 400px;
      line-height: 50px;
      font-size: 20px;
      color: #fff;
      font-weight: 500;
    }
    .content {
      flex: 1;
    }
    img {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}

</style>
