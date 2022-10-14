import { ref, onUnmounted, watchEffect, isRef } from 'vue'

export default function useSlidingWindow(src, windowSize = 4, updateInterval = 1000) {
  const data = ref([])
  const cursorIdx = ref(0)
  let updater = null
  const interrupts = new Set()

  const update = () => {
    if (interrupts.size === 0) {
      data.value.shift();
      cursorIdx.value = (cursorIdx.value + 1) % (src.value.length || 1);
      data.value.push(src.value[cursorIdx.value])
    }
  }
  watchEffect(()=>{
    clearInterval(updater);
    const unwrappedWindowSize = isRef(windowSize) ? windowSize.value : windowSize;
    if (Array.isArray(src.value)) {
      if (src.value.length > unwrappedWindowSize) {
        data.value = src.value.slice(0, unwrappedWindowSize);
        cursorIdx.value = unwrappedWindowSize - 1;
        updater = setInterval(()=>{update()}, updateInterval)
      } else {
        data.value = [...src.value];
        cursorIdx.value = src.value.length - 1;
      }
    }
  })

  onUnmounted(()=>{
    clearInterval(updater)
  })
  const interrupt = (sourceIdentifier) => {
    interrupts.add(sourceIdentifier)
  }
  const resume = (sourceIdentifier) => {
    interrupts.delete(sourceIdentifier)
  }
  const setStartingIdx = (idx) => {
    const unwrappedWindowSize = isRef(windowSize) ? windowSize.value : windowSize;
    if (Array.isArray(src.value) && src.value.length > unwrappedWindowSize) {
      interrupt('__manuallySetStart')
      let start = idx % src.value.length;
      if (start < 0) {
        start += src.value.length;
      }
      const overflowCount = Math.max(start + unwrappedWindowSize - src.value.length, 0);
      data.value = [...src.value.slice(start, start + unwrappedWindowSize), ...src.value.slice(0, overflowCount)];
      cursorIdx.value = (start + unwrappedWindowSize - 1) % src.value.length;
      setTimeout(()=>{resume('__manuallySetStart')}, updateInterval)
    }
  }

  return {
    data,
    interrupt,
    resume,
    cursorIdx,
    setStartingIdx
  }
}
