<template>
  <el-popover
    popper-class="de-algo-detail-popover"
    placement="right-start"
    title="算法说明"
    trigger="click"
  >
    <template #reference>
      <button class="de-section-header__popover">
        <img class="arrow-btn" :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="show-details"/>
      </button>
    </template>
    <template #default>
      <slot name="content" />
      <div class="default-content" v-if="!Boolean($slots['content'])">
        <p class="desc" v-if="desc"><span class="paragraph-label">算法简介：</span>
          {{desc}}
        </p>
        <p class="desc" v-if="formula"><span class="paragraph-label">算法公式：</span>
          {{formula}}
        </p>
      </div>
    </template>
  </el-popover>
</template>

<script setup>
import {computed, ref, onMounted, onBeforeUnmount} from 'vue';
const props = defineProps({
  title: String,
  desc: String,
  formula: String,
  // popoverWidth: {
  //   type: Number,
  //   default: 360,
  // }
})

// const reactivePopoverWidth = ref(props.popoverWidth * window.innerWidth / 1920)
// const resizeHandler = ()=>{
//   reactivePopoverWidth.value = props.popoverWidth * window.innerWidth / 1920;
// }
// onMounted(()=>{
//   window.addEventListener('resize', resizeHandler)
// })
// onBeforeUnmount(()=>{
//   window.removeEventListener('resize', resizeHandler)
// })


</script>

<style scoped lang="scss">
.de-section-header__popover {
  background: none;
  cursor: pointer;
  margin-inline: vw(8);
  font-size: vh(20);
  line-height: vh(20);
}
.arrow-btn {
  width: 1em;
  vertical-align: -15%;
}
.default-content {
  overflow: auto;
  flex: 1;
  min-height: 0;
  padding: vh(8) vw(24) vh(20) vw(24);
  display: flex;
  flex-flow: column;
  row-gap: vh(16);
  &::-webkit-scrollbar {
    height: vh(5);
    width: vw(5);
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #DEDEDE;
    border-radius: 6px;
  }
}
.desc {
  font-size: vh(14);
  font-family: MicrosoftYaHei;
  line-height: vh(20);
  color: #FFFFFF;
}
.paragraph-label {
  font-size: vh(16);
  color: rgba(111, 194, 255, 1);
  font-family: PangMenZhengDao;
}
</style>
<style lang="scss">
.de-algo-detail-popover.el-popper {
  margin-block-start: vh(-107) !important;
  min-width: 50px;
  width: vw(378) !important;
  height: vh(318);
  background: no-repeat center / 100% 100% url("~@/assets/images/data-exploration/shared/popover-bd.svg");
  box-sizing: border-box;
  border: none;
  padding: vh(10) vw(12);
  display: flex;
  flex-flow: column;
  .el-popper__arrow::before {
    content: none;
  }
  .el-popover__title {
    font-size: vh(24);
    margin-inline-start: vw(46);
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #FFFFFF;
    text-shadow: 0px vh(6) vh(6) #002160;
    margin-bottom: vh(12)
  }
  //border-image: url("~@/assets/images/data-exploration/shared/popover-bd.svg");
  //border-image-slice: 50 30 30 30 fill;
  //border-image-repeat: stretch;
  //border-width: vh(50) vw(30) vh(30) vw(30);
  //border-style: solid;
  //background: none;
}
</style>
