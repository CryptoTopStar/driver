<template>
  <div :class="isLang?'labelBackgroundLang':'labelBackground'">
    <div class="box">
      {{ label || ''}}
      <router-link :to="redirectUrl" v-if="redirectUrl" class="redirect-arrow">
        <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />
      </router-link>
      <p v-if="isShowTip" class="redirect-arrow" @click="showTip">
        <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />
      </p>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive} from "vue";

export default defineComponent({
  name: "Label",
  props:{
    label:{
      type: String,
      default: ''
    },
    type:{
      type: String,
      default: ''
    },
    isLang:{
      type: Boolean,
      default: false
    },
    isShowTip:{
      type: Boolean,
      default: false
    },
    redirectUrl: String
  },
  setup(props, context){
    const state = reactive({
      props:props
    })
    const showTip=()=>{//告诉父组件展开弹窗
      context.emit('handle',props.type)
    }
    return {
      state,
      showTip
    }
  }
})
</script>

<style scoped lang="scss">
.labelBackground,.labelBackgroundLang{
  position: relative;
  background: url("~@/assets/images/label_background.png") no-repeat;
  background-size: 100% 100% ;
  width: 100%;
  height: vh(46);
  div{
    font-size: vh(18);
    color: #fff;
    line-height: vh(46);
    padding-left: vw(45);
    font-weight: bold;
    display: flex;
  }
  p{
    margin-left: 5px;
  }
}
.labelBackgroundLang{
  background: url("~@/assets/images/label_background_lang.png") no-repeat;
  background-size: 100% 100% ;
}
.redirect-arrow {
  &:hover {
  }
  img {
    vertical-align: text-bottom;
    width: 1.4em;
    height: 1.4em;
  }
}
</style>
