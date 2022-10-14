<template>
  <div class="result-container">
    <div class="result-images">
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
    </div>

    <div class="item-desc">
      <TextField name="设备编号" :desc="data?.serialNo" />
      <TextField name="疑似被虫害" :desc="data?.type" class="mt" />
      <TextField name="防治措施" :desc="data?.measure" class="mt" />
      <TextField name="识别时间" :desc="data?.date" class="mt" />
    </div>
  </div>
</template>

<script setup>
import BorderedImage from "@/components/data-exploration/mushroom/monitoring/sub-components/BorderedImage.vue";
import TextField from "@/components/data-exploration/mushroom/monitoring/sub-components/TextField.vue";
import { inject } from "vue";
const interrupt = inject("interrupt", () => {}, false);
const resume = inject("resume", () => {}, false);
const props = defineProps({
  data: Object,
});

const onPreviewOpen = () => {
  interrupt("previewOpen");
};
const onPreviewClose = () => {
  resume("previewOpen");
};
const onFallbackImageClick = (e) => {
  e.stopPropagation();
};
</script>

<style scoped lang="scss">
.result-container {
  width: 100%;
  height: vh(440);
  display: flex;
  flex-direction: column;
  align-content: center;
}

.result-images {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.labeled-image-container {
  width: vw(160);
  height: vh(160);
}
.source-image-container {
  width: vw(160);
  height: vh(160);
  margin-left: vw(80);
}
.item-desc {
  height: 100%;
  margin-top: vh(24);
  display: flex;
  flex-flow: column;
}

.mt {
  margin-top: vh(16);
}
</style>
