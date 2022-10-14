<template>
  <Header :title="headerTitle" />
  <div class="sc-subpage-layout">
    <iframe v-if="Boolean(iframeBackgroundSrc)" loading="eager" fetchpriority="high" class="iframe-background" :src="iframeBackgroundSrc" />
    <div class="left-column" v-if="Boolean($slots['left-column'])">
      <slot name="left-column"></slot>
    </div>
    <div class="center-top" v-if="Boolean($slots['center-top'])">
      <slot name="center-top"></slot>
    </div>
    <div class="center-mid" v-if="Boolean($slots['center-mid'])">
      <slot name="center-mid"></slot>
    </div>
    <div class="center-bottom" v-if="Boolean($slots['center-bottom'])">
      <slot name="center-bottom"></slot>
    </div>
    <div class="right-column" v-if="Boolean($slots['right-column'])">
      <slot name="right-column"></slot>
    </div>
    <slot name="additionals"></slot>
    <ReturnHomeButton />
    <BottomNav />
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import Header from '@/components/smart-communities/Header.vue'
import BottomNav from '@/components/smart-communities/BottomNav.vue'
import ReturnHomeButton from '@/components/smart-communities/ReturnHomeButton.vue'
const props = defineProps({
  headerTitle: String,
  headerImage: String,
  iframeBackgroundSrc: String,
})
</script>

<style scoped lang="scss">
//.scs-header {
//  position: fixed;
//  width: 100%;
//  z-index: 100;
//  img {
//    width: 100%;
//    pointer-events: none;
//  }
//}
.sc-subpage-layout {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: vh(70) vw(24) vh(56) vw(24);
  display: grid;
  grid-template:  "left mid-1 right" vh(57)
                  "left mid-2 right" fit-content(vh(85))
                  "left mid-3 right" 1fr
                  "left mid-4 right" auto
                  "left mid-5 right" vh(92) / (vw(460) minmax(0, 1fr) vw(460));
}
@mixin base-area {
  z-index: 2;
  position: relative;
  pointer-events: none;
}
.left-column {
  @include base-area;
  grid-area: left;
  background: url('~@/assets/images/smart-communities/fire-stats/left-column-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column;
  pointer-events: auto;
}
.center-top {
  @include base-area;
  grid-area: mid-2;
  display: flex;
}
.center-mid {
  @include base-area;
  grid-area: mid-3;
  display: flex;
}
.center-bottom {
  @include base-area;
  grid-area: mid-4;
  display: flex;
}
.right-column {
  @include base-area;
  grid-area: right;
  background: url('~@/assets/images/smart-communities/fire-stats/right-column-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column;
  pointer-events: auto;
}

.iframe-background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}

</style>
