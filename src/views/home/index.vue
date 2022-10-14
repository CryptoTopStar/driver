<template>
  <div class="outer">
    <div class="content" ref="viewer">
      <div class="top">
        <img src="../../assets/images/home/组7485@2x.png" alt="" />
      </div>
      <div
        :class="['target-value', 'target' + index]"
        v-for="(item, index) in targetValues"
        :key="index"
      >
        <p>{{ item.title }}</p>
        <p>
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </p>
      </div>
      <!-- <canvas id="webgl" class="webgl"></canvas> -->
      <div class="entrance">
        <div class="item" v-for="item in list" @click="toPage(item)"> 
          <img :src="item.icon" alt="">
          <img :src="item.title" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';

const viewer = ref(null)
const route = useRoute();
const Router = useRouter();
const targetValues = ref([
  {
    title: '2021农业总产值',
    value: '38.5',
    unit: '亿元',
    top: '',
    left: '',
  },
  {
    title: '2021农业增加值增速',
    value: '2.81',
    unit: '%',
    top: '',
    left: '',
  },
  {
    title: '2020农村常住居民人口',
    value: '54.15',
    unit: '万人',
    top: '',
    left: '',
  },
  {
    title: '2021农村常住居民人均可支配收入',
    value: '31730',
    unit: '元',
    top: '',
    left: '',
  },
  {
    title: '2021农村居民人均生活消费支出',
    value: '20893',
    unit: '元',
    top: '',
    left: '',
  },
])
const list = ref([
  {
    icon: require('../../assets/images/home/数字应用中心@2x.png'),
    title: require('../../assets/images/home/路径11638@2x.png'),
    path: '/ruralBrain'
  },
  {
    icon: require('../../assets/images/home/数字协同平台@2x.png'),
    title: require('../../assets/images/home/路径25@2x.png'),
    path: 'https://jiangshan-szxt-admini.zjsszxc.com',
  },
  {
    icon: require('../../assets/images/home/数字驾驶舱@2x.png'),
    title: require('../../assets/images/home/路径8@2x.png'),
    path: 'https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6MjUxMn0=',
  },
  {
    icon: require('../../assets/images/home/组7483@2x.png'),
    title: require('../../assets/images/home/路径11636@2x(1).png'),
    path: '/sence',
  },
  {
    icon: require('../../assets/images/home/组7484@2x.png'),
    title: require('../../assets/images/home/路径11637@2x.png'),
    path: '/teaDiseases',
  },
]) 

onMounted(() => {
  resize();
  window.addEventListener('resize', resize);
})
onUnmounted(() => {
  window.removeEventListener('resize', resize);
})
const resize  = _.debounce(
  function() {
    switch (route.query.mode) {
      case 'vertical':
        viewer.value.style.transform = `scale(${window.innerHeight /
          1080})`;
        break;
      default:
        viewer.value.style.transform = `scaleX(${window.innerWidth /
          1920}) scaleY(${window.innerHeight / 1080})`;
    }
  },
  50,
  { leading: true, trailing: true },
)
  
const toPage = (item) => {
  if(item.path.indexOf('http') >= 0) {
    window.open(item.path)
  } else {
    Router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .content {
    background: url(https://img.hzanchu.com/acimg/ddbd9a62946903074db24b2bb92bd389.png) no-repeat;
    background-size: 100% 100%;
    transform-origin: 0 0;
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    transition: all 0.3s;
    .top {
      width: 100%;
      position: absolute;
      top: 0;
      z-index: 99;
      img {
        width: 100%;
      }
    }
    .target-value {
      text-align: center;
      position: absolute;
      p {
        &:nth-of-type(1) {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 600;
          color: #fff;
          line-height: 38px;
        }
        &:nth-of-type(2) {
          font-family: PangMenZhengDao;
          font-weight: 400;
          font-size: 14px;
          color: #6bfff3;
          span:nth-of-type(1) {
            font-size: 28px;
          }
        }
      }
    }
    .target0 {
      top: 25vh;
      left: 26%;
      opacity: 1;
      animation: data-one 3s ease-in-out infinite;
    }
    @keyframes data-one {
      0% {
        top: 25vh;
      }
      50% {
        top: 23vh;
      }
      100% {
        top: 25vh;
      }
    }
    .target1 {
      top: 22vh;
      left: 50%;
      animation: data-two 2.5s ease-in-out infinite;
    }
    @keyframes data-two {
      0% {
        top: 22vh;
        opacity: 0.5;
      }
      50% {
        top: 20vh;
        opacity: 1;
      }
      100% {
        top: 22vh;
        opacity: 0.5;
      }
    }
    .target2 {
      top: 52vh;
      left: 27%;
      animation: data-three 3.2s ease-in-out infinite;
    }
    @keyframes data-three {
      0% {
        top: 52vh;
        opacity: 0.5;
      }
      50% {
        top: 50vh;
        opacity: 1;
      }
      100% {
        top: 52vh;
        opacity: 0.5;
      }
    }
    .target3 {
      top: 42vh;
      left: 56%;
      animation: data-four 2.5s ease-in-out infinite;
    }
    @keyframes data-four {
      0% {
        top: 40vh;
        opacity: 0.5;
      }
      50% {
        top: 38vh;
        opacity: 1;
      }
      100% {
        top: 40vh;
        opacity: 0.5;
      }
    }
    .target4 {
      top: 42vh;
      left: 71%;
      animation: data-five 3.5s ease-in-out infinite;
    }
    @keyframes data-five {
      0% {
        top: 42vh;
        opacity: 0.5;
      }
      50% {
        top: 40vh;
        opacity: 1;
      }
      100% {
        top: 42vh;
        opacity: 0.5;
      }
    }
    .webgl {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      width: 100%;
      height: 100%;
      background: rgb(0,0,0,0);
    }
    .entrance {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 73px;
      width: 88%;
      z-index: 999;
      padding: 0 6%;
      .item {
        width: 310px;
        height: 332px;
        background: url(https://img.hzanchu.com/acimg/11dbd6dc1e0dfada6d2b73acb4800dc0.png) no-repeat;
        background-size: 100%;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          margin-top: -30px;   
        }
        img {
          display: block;
          &:nth-of-type(1) {
            width: 104px;
            margin: 74px auto 0;
          }
          &:nth-of-type(2) {
            height: 32px;
            margin: 37px auto 0;
          }
        }
      }
    }
  }
</style>
