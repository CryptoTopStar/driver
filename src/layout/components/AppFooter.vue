<template>
  <div>
    <div class="app-footer">
      <div class="tabBox">
        <div class="tab" v-for="(item,index) in tabList" :key="index" @click="changeActive(item,index)">
          <span :style="state.activeIndex === index?'color:#fff':''">{{item.label}}</span>
          <img v-show="state.activeIndex === index" class="bgImg" :src="item.activeImg" alt="">
        </div>
      </div>
    </div>
    <div class="subTab" v-if="state.subTab.length > 0">
      <div :class="state.activeSubIndex === index?'subTabInfoActive':'subTabInfo'" v-for="(item,index) in state.subTab" :key="index" @click="leaveTab(item,index)">
        {{item?.label}}
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance,
  watch
} from "vue";
import {useRouter, useRoute} from "vue-router";

const IFRAME_METHODS = ["gisMapMessage", "gisLayerMessage", "gisSreachMessage"];
export default defineComponent({
  setup() {
    const {
      proxy: {
        $tools: { sendMessage },
      },
    } = getCurrentInstance();
    const Router = useRouter();
    const Route = useRoute();
    const state = reactive({
      isFinished: ref(false),
      activeIndex:0,
      activeSubIndex: 1,
      subTab:[],
    });
    const tabList = reactive([
      {
        label: '特色产业',
        activeImg: require('@/assets/images/active_left.png'),
        url: '',
        children: [
          {label: '猕猴桃产业', url: 'kiwi'},
          {label: '食用菌产业', url: 'fungi'},
        ]
      },
      {
        label: '产业产品',
        url: '',
        activeImg: require('@/assets/images/active_middle.png'),
      },
      {
        label: '数字营销',
        url: '',
        activeImg: require('@/assets/images/active_middle.png'),
      },
      {
        label: '乡村治理',
        url: '',
        activeImg: require('@/assets/images/active_middle.png'),
      },
      {
        label: '农业资源',
        url: '',
        activeImg: require('@/assets/images/active_right.png'),
      }
    ])
    // 点击菜单
    const changeActive = (item,index) => {
      state.activeIndex = index;
      state.subTab = item.children ?? []
    };
    const leaveTab = (item,index) => {
      console.log(item);
      console.log('item');
      state.activeSubIndex  = index
      state.subTab =  [];
      if(item.url){
        Router.push({
          name: item.url
        })
      }

    };

    onMounted(() => {

    });
    watch(()=>Route.path,(newVal)=>{
      let path = newVal;
      if(path.indexOf("fungi")> -1){ // 食用菌
        state.activeSubIndex = 1
      }else{ // 獼猴桃
        state.activeSubIndex = 0
      }
    })
    return {
      ...toRefs(state),
      changeActive,
      tabList,
      state,
      leaveTab
    };
  },
});
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";

.subTab {
  position: fixed;
  bottom: vw(66);
  height: vw(50);
  width: 35vw;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  .subTabInfo, .subTabInfoActive {
    width: vw(171);
    height: vw(47);
    background: url("~@/assets/images/sub_tab_bg.png") no-repeat;
    background-size: 100% 100%;
    color: rgba(95, 182, 255, 1);
    text-align: center;
    line-height: vw(47);
    font-size: vw(20);
    cursor: pointer ;
  }
  .subTabInfoActive {
    color: rgba(255, 246, 97, 1);
    background: url("~@/assets/images/sub_tab_bg_active.png") no-repeat;
    background-size: 100% 100%;
  }
}
.app-footer {
  @include ac-flex;
  @include flex-row-between;
  @include flex-column-start;
  width: 100vw;
  height: vw(63);
  background-color: aliceblue;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: url("~@/assets/images/footer_bg.png") no-repeat;
  background-size: 100% 100%;
  .tabBox {
    width: 35%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab{
      height: 100%;
      position: relative;
      .bgImg {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        height: 100%;
        width: vw(234);
        z-index: -1;
      }
      span {
        line-height: vw(63);
        font-size: vw(20);
        font-weight: bold;
        cursor: pointer;
        color: rgba(148, 201, 232, 1);
      }
    }
  }
}
</style>
