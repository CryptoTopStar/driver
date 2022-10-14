<template>
  <div class="title" role="heading" aria-level="3">
    {{text}}
    <slot name="inline-after" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: String
})
</script>

<style scoped>
  .title {
    box-sizing: border-box;
    display: flex;
    height: 37px;
    background: url('../../../assets/rural-brain/title-bg.svg') no-repeat;
    background-size: auto 100%;

    color: #fff;
    font-size: 20px;
    font-family: MicrosoftYaHei-Bold-, MicrosoftYaHei-Bold;
    line-height: 37px;
    padding-left: 40px;
  }
</style>
