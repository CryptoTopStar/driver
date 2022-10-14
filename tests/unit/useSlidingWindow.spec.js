import useSlidingWindow from "../../src/composables/useSlidingWindow";
import {withSetup} from "../test-utils";
import {ref, nextTick} from 'vue'

describe('useSlidingWindow test suite', ()=>{
  test('[1,2,3] (小于windowSize)', () => {
    jest.useFakeTimers()
    const refSrc = ref([1,2,3])
    const [{data, interrupt, resume}, app] = withSetup(() => useSlidingWindow(refSrc))
    // run assertions
    expect(data.value).toEqual([1,2,3])
    // trigger onUnmounted hook if needed
    app.unmount()
  });

  test('[1,2,3,4,5,6] (大于windowSize)', () => {
    jest.useFakeTimers()
    const refSrc = ref([1,2,3,4,5,6])
    const [{data, interrupt, resume}, app] = withSetup(() => useSlidingWindow(refSrc))
    // run assertions
    expect(data.value).toEqual([1,2,3,4])
    jest.advanceTimersByTime(1000);
    expect(data.value).toEqual([2,3,4,5])
    jest.advanceTimersByTime(3000);
    expect(data.value).toEqual([5,6,1,2])
    // trigger onUnmounted hook if needed
    app.unmount()
  });

  test('[1,2,3,4,5,6] with interrupt and resume', () => {
    jest.useFakeTimers()
    const updateInterval = 1000
    const interruptKey = 'test key'
    const refSrc = ref([1,2,3,4,5,6])
    const [{data, interrupt, resume}, app] = withSetup(() => useSlidingWindow(refSrc, 4, updateInterval))
    // run assertions
    interrupt(interruptKey)
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([1,2,3,4])
    resume(interruptKey)
    jest.advanceTimersByTime(updateInterval * 3);
    expect(data.value).toEqual([4,5,6,1])
    interrupt(interruptKey)
    jest.advanceTimersByTime(updateInterval * 3);
    expect(data.value).toEqual([4,5,6,1])
    resume(interruptKey)
    jest.advanceTimersByTime(updateInterval * 2);
    expect(data.value).toEqual([6,1,2,3])
    // trigger onUnmounted hook if needed
    app.unmount()
  });

  // src更新时暂时是重置, 如果有需要以后再改行为, 目前没有数据持续增长的使用场景
  test('dynamic source', async () => {
    jest.useFakeTimers()
    const updateInterval = 1000
    const refSrc = ref([])
    const [{data}, app] = withSetup(() => useSlidingWindow(refSrc, 4, updateInterval))
    // run assertions
    expect(data.value).toEqual([])
    refSrc.value = ([1,2])
    // watchEffect使用的flush不是'sync'
    await nextTick()
    expect(data.value).toEqual([1,2])
    refSrc.value.push(3,4,5,6)
    await nextTick()
    expect(data.value).toEqual([1,2,3,4])
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([3,4,5,6])
    refSrc.value.push(7,8)
    await nextTick()
    expect(data.value).toEqual([1,2,3,4])
    // trigger onUnmounted hook if needed
    app.unmount()
  });

  // size更新时暂时是重置, 如果有需要以后再改行为
  test('reactive window size', async () => {
    jest.useFakeTimers()
    const updateInterval = 1000
    const refSrc = ref([1,2,3,4,5,6,7])
    const sizeRef = ref(4)
    const [{data}, app] = withSetup(() => useSlidingWindow(refSrc, sizeRef, updateInterval))
    // run assertions
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([3,4,5,6])
    sizeRef.value = 8
    await nextTick()
    expect(data.value).toEqual([1,2,3,4,5,6,7])
    jest.advanceTimersByTime(updateInterval* 10);
    sizeRef.value = 2
    await nextTick()
    expect(data.value).toEqual([1,2])
    // trigger onUnmounted hook if needed
    app.unmount()
  });

  test('set arbitrary start', async () => {
    jest.useFakeTimers()
    const updateInterval = 1000
    const refSrc = ref([1,2,3,4,5,6,7])
    const sizeRef = ref(4)
    const [{data, cursorIdx, setStartingIdx}, app] = withSetup(() => useSlidingWindow(refSrc, sizeRef, updateInterval))
    // run assertions
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([3,4,5,6])
    setStartingIdx(6)
    expect(cursorIdx.value).toEqual(2)
    expect(data.value).toEqual([7,1,2,3])
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([1,2,3,4])
    // 过大
    setStartingIdx(16)
    expect(cursorIdx.value).toEqual(5)
    expect(data.value).toEqual([3,4,5,6])
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([4,5,6,7])
    // 负数
    setStartingIdx(-3)
    expect(cursorIdx.value).toEqual(0)
    expect(data.value).toEqual([5,6,7,1])
    jest.advanceTimersByTime(updateInterval* 2);
    expect(data.value).toEqual([6,7,1,2])
    // trigger onUnmounted hook if needed
    app.unmount()
  });
})
