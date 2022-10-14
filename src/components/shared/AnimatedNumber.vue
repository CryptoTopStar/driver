<template>
  <span>{{displayValue}}</span>
</template>

<script setup>
import {ref, computed, watchEffect, watch, onUnmounted} from 'vue';
import gsap from 'gsap';
import {round} from 'lodash';

const props = defineProps({
  value: {
    type: [Number, String, undefined],
  },
  fallback: {
    type: String,
    default: '-'
  },
  scale: {
    type: Number,
    default: 0,
  },
  animConfig: {
    type: Object,
    default() {return {}}
  },
  disableRandomizedDuration: Boolean,
});
const emits = defineEmits(['update:visualValue'])

const animatedValueRef = ref(props.value);
const displayValue = computed(()=>{
  return Number.isNaN(animatedValueRef.value) ? props.fallback : animatedValueRef.value;
})
const gsapAnimRef = ref(undefined);

watch(()=>props.value, ()=>{
  gsapAnimRef.value?.kill();
  const animatedValue = {value: animatedValueRef.value}
  gsapAnimRef.value = gsap.to(animatedValue, {
    value: props.value,
    duration: props.disableRandomizedDuration ? 2 : Math.random()* 1.5 + 1.5,
    ease: 'expo.out',
    ...props.animConfig,
    onUpdate() {
      animatedValueRef.value = round(animatedValue.value, props.scale);
      emits('update:visualValue', animatedValueRef.value)
    },
  })
})
onUnmounted(()=>{
  gsapAnimRef.value?.kill();
})
</script>
