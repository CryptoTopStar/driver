<template>
  <div class="result-container">
    <BorderedImage
      :onPreviewOpen="onPreviewOpen"
      :onPreviewClose="onPreviewClose"
      :onFallbackImageClick="onFallbackImageClick"
      class="labeled-image-container"
      :src="data?.labeledSrc"
      label="识别照片"
    />
    <BorderedImage
      :onPreviewOpen="onPreviewOpen"
      :onPreviewClose="onPreviewClose"
      :onFallbackImageClick="onFallbackImageClick"
      class="source-image-container"
      :src="data?.source"
      label="参考照片"
    />
    <div class="item-desc">
      <TextField name="设备编号" :desc="data?.serialNo"/>
      <TextField name="所在生长期" :desc="data?.phase"/>
      <TextField name="异常描述" :desc="data?.desc"/>
      <TextField name="识别时间" :desc="data?.date"/>
    </div>
  </div>
</template>

<script setup>
import BorderedImage from '@/components/data-exploration/mushroom/monitoring/sub-components/BorderedImage.vue'
import TextField from '@/components/data-exploration/mushroom/monitoring/sub-components/TextField.vue'
import {inject} from 'vue';
const interrupt = inject('interrupt', ()=>{}, false)
const resume = inject('resume', ()=>{}, false)
const props = defineProps({
  data: Object
})

const onPreviewOpen = () => {
  interrupt('previewOpen')
}
const onPreviewClose = () => {
  resume('previewOpen')
}
const onFallbackImageClick = (e) => {
  e.stopPropagation();
}


</script>

<style scoped lang="scss">
.result-container {
  display: grid;
  gap: vh(24) vw(32);
  grid-template: 'labeled stat' vh(136)
                  'source stat' vh(136) / (vw(136) 1fr);
}

.labeled-image-container {
  grid-area: labeled;
}
.source-image-container {
  grid-area: source;
}
.item-desc {
  grid-area: stat;
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: space-between;
}
</style>
