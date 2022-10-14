import { ref, shallowRef, onMounted, onUnmounted, onBeforeMount, watchEffect, isRef } from 'vue';
import * as echarts from "echarts";

// 目前只是resize, 字体的大小还没处理. 用transform应该是最好的, 但会影响迭盖的mix-blend-mode, 这个问题还没解决
export default function useResponsiveChart(containerRef, theme) {
  const isInitialized = ref(false);
  const instance = shallowRef(null);
  const resizeHandler = ()=>{
    instance.value?.resize();
  }

  onMounted(()=>{
    if (containerRef.value) {
      instance.value = echarts.init(containerRef.value, theme);
      window.addEventListener('resize', resizeHandler)
    }
  })

  onBeforeMount(()=>{
    window.removeEventListener('resize', resizeHandler)
    instance.value?.dispose();
  })

  return {
    isInitialized,
    instance
  }
}
