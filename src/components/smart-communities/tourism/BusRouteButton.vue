<template>
  <div
      class="button"
      @click="onButtonClick"
  >
    实时公交
    <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />
    <el-dialog
        v-model="isModalVisible"
        title="实时公交"
        custom-class="scs-bus-route-modal"
        append-to-body
        :show-close="false"
    >
      <template #header>
        <div class="header-container">
          <header class="header">实时公交</header>
          <div class="bus-routes">
            <div class="bus-route">307路</div>
          </div>
          <button class="close-btn" @click="isModalVisible = false">x</button>
        </div>
      </template>
      <div class="modal-body">
        <div class="route-detail">
          <div class="schedule">
            <span>火车站 → 廖其贵医院</span>
            <span :style="{marginInlineStart: 'auto', marginInlineEnd: '1em'}">首班车 06:00</span>
            <span>末班车 18:00</span>
          </div>
          <div class="line">
            <div v-for="(item, idx) in 16" :key="idx"></div>
          </div>
          <div class="track">
            <img class="bus" :src="require('@/assets/images/smart-communities/tourism/bus.png')" />
          </div>
          <div class="stops">
            <transition-group name="stops">
              <div v-for="(stop) in windowedData" :key="stop.idx">
                <span class="stop-index">{{stop.idx}}</span>
                <span class="stop-label">{{stop.name}}</span>
              </div>
            </transition-group>
          </div>
        </div>


        <div class="route-detail">
          <div class="schedule">
            <span>廖其贵医院 → 火车站</span>
            <span :style="{marginInlineStart: 'auto', marginInlineEnd: '1em'}">首班车 06:30</span>
            <span>末班车 18:30</span>
          </div>
          <div class="line">
            <div v-for="(item, idx) in 16" :key="idx"></div>
          </div>
          <div class="track">
            <img class="bus" :style="{animationDelay: '-2s'}" :src="require('@/assets/images/smart-communities/tourism/bus.png')" />
          </div>
          <div class="stops">
            <transition-group name="stops">
              <div v-for="(stop) in windowedRData" :key="stop.idx">
                <span class="stop-index">{{stop.idx}}</span>
                <span class="stop-label">{{stop.name}}</span>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import useSlidingWindow from "@/composables/useSlidingWindow";
// 27
const stops = ["火车站","黄陈小区","东方商厦","金陵大酒店","博物馆","贝林医院","实验中学","城北菜场","站前里","国际花城","长塘弄","须江敬老院","桐子坞","老虎坞","丰足水泥厂","大陈水泥厂","凉爿店","丰足岗","丰足","北焦路口","南蕉","乌龙路口","泉目塘顶","早田坂路口","大陈","夏家村","廖其贵医院"]
const stopData = ref(stops.map((e,idx)=>({name: e, idx: idx + 1})))
const reserveStopData = ref(([...stops].reverse()).map((e,idx)=>({name: e, idx: idx + 1})))

const {data: windowedData} = useSlidingWindow(stopData, 16, 3000)
const {data: windowedRData} = useSlidingWindow(reserveStopData, 16, 3000)

const isModalVisible = ref(false);
const onButtonClick = ()=>{
  isModalVisible.value = true;
}


</script>

<style scoped lang="scss">
.button {
  width: vw(120);
  height: vw(36);
  font-size: vw(14);
  line-height: vw(36);
  font-weight: normal;
  color: #FFFFFF;
  background: url('~@/assets/images/smart-communities/center-link-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  cursor: pointer;
  & > img {
    width: 1.5em;
    height: 1.5em;
    vertical-align: text-bottom;
  }
}
.close-btn {
  color: #A7EFF6;
  font-size: vw(38);
  background: none;
  border: none;
  cursor: pointer;
}
.modal-body {
  padding: vw(12);
  display: flex;
  flex-flow: column;
  row-gap: vh(40);
}
.header {
  font-size: vw(24);
  line-height: vw(38);
  width: vw(195);
  height: vw(38);
  box-sizing: border-box;
  padding-inline-start: vw(20);
  background: no-repeat center/100% 100% url("~@/assets/images/smart-communities/tourism/title-border.png");
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #FFFFFF;
  text-shadow: vw(0) vw(6) vw(6) #002160;
}
.header-container {
  margin-inline-start: vw(36);
  display: flex;
  align-items: center;
}
.bus-routes {
  display: flex;
  flex: 1;
  margin-inline-start: vw(26);
  .bus-route {
    width: vw(60);
    font-size: vw(14);
    height: vw(26);
    line-height: vw(26);
    text-align: center;
    font-family: PingFang SC-Regular, PingFang SC;
    background: no-repeat center/100% 100% url("~@/assets/images/smart-communities/tourism/active-route.png");
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
  }
}
.schedule {
  display: flex;
  font-size: vw(14);
  font-family: PingFangSC-Regular-, PingFangSC-Regular;
  font-weight: normal;
  color: #B3DFFF;
  line-height: vw(24);
}
.line {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  & > div {
    transform: translateX(50%);
    height: vh(25);
    border-top: vw(1) solid #2568B1;
    border-left: vw(1) solid #2568B1;
  }
  & > div:last-of-type {
    border-top: none;
  }
}
.track {
  width: 100%;
  height: vh(30);
  overflow: hidden;
  margin-top: vh(-20);
  .bus {
    width: vw(44);
    animation: scs-bus-anim 10s linear infinite;
  }
}
.stops {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  & > div {
    display: flex;
    flex-flow: column;
    align-items: center;
    font-size: vw(16);
    color: #FFFFFF;
    .stop-index {
      writing-mode: horizontal-tb;
      text-align: center;
      line-height: vw(32);
      width: vw(32);
      height: vw(32);
      background: no-repeat center/100% 100% url("~@/assets/images/smart-communities/tourism/index-ring.png");
    }
    .stop-label {
      writing-mode: vertical-lr;
      text-orientation: upright;
      line-height: vw(32);
      letter-spacing: vw(2);
    }
  }
}

.stops-move,
.stops-enter-active,
.stops-leave-active {
  transition: all 0.5s ease-out;
}
.stops-enter-from {
  opacity: 0;
  transform: translateX(50%);
}
.stops-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.stops-leave-active {
  position: absolute;
}







</style>

<style lang="scss">
@keyframes scs-bus-anim {
  from {
    transform: translateX(vw(-100));
  }
  to {
    transform: translateX(vw(900));
  }
}

@keyframes scs-bus-reversed-anim {
  from {
    transform: translateX(vw(-100));
  }
  to {
    transform: translateX(vw(900));
  }
}
.scs-bus-route-modal {
  &.el-dialog {
    width: vw(810);
    height: vh(648);
    background: no-repeat center/100% 100% url("~@/assets/images/smart-communities/tourism/bus-route-modal-bg.png");
    .el-dialog__header {
      padding: vh(12) vw(12);
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #A7EFF6;
      font-size: vw(38);
    }
  }
}
</style>
