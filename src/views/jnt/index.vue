<template>
  <div class="jnt-index" ref="viewer">
    <component :is="commenHeader" :bgUrl="require('./images/header_bg.png')" />

    <component :is="leftComp" />
    <component :is="midComp" />
    <component :is="rightComp" />

    <understandModal v-if="showUnderstandModal" />
    <understandDetailModal v-if="showUnderstandDetailModal" />
  </div>
</template>

<script setup>
import commenHeader from '@/components/commonHeader.vue'
import understandModal from './components/understandModal.vue'
import understandDetailModal from './components/understandDetailModal.vue'
import leftComp from './leftComp'
import midComp from './midComp'
import rightComp from './rightComp'
import _ from 'lodash'
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const showUnderstandModal = computed(() => store.state.JiangShan.showUnderModal)
const showUnderstandDetailModal = computed(() => store.state.JiangShan.showUnderDetailModal)
const state = reactive({})

const route = useRoute()
const viewer = ref(null)

const resize = _.debounce(
  function () {
    switch (route.query.mode) {
      case 'vertical':
        viewer.value.style.transform = `scale(${window.innerHeight / 1080})`
        break
      default:
        viewer.value.style.transform = `scaleX(${window.innerWidth / 1920}) scaleY(${window.innerHeight / 1080})`
    }
  },
  500,
  { leading: true, trailing: true }
)

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style scoped lang="scss">
.jnt-index {
  position: relative;
  overflow: hidden;
  transform-origin: 0 0;
  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
  transition: all 0.3s;
  background: url('./images/page_bg.png') no-repeat;
  background-size: 100% 100%;
  color: #a1ceef;
  :deep(._common-header) {
    width: 100%;
  }
  .left-comp {
    position: absolute;
    top: 68px;
    left: 28px;
    z-index: 20;
  }
  .mid-comp {
    position: absolute;
    top: 96px;
    left: 606px;
    z-index: 20;
  }
  .right-comp {
    position: absolute;
    top: 68px;
    left: 1358px;
    z-index: 20;
  }
  @keyframes recycle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
