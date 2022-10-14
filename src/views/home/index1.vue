<template>
  <div class="jiangshan">
    <div class="circle1">
      <img
        v-for="(item, index) in list1"
        :key="index"
        :src="
          item.select
            ? 'https://img.hzanchu.com/acimg/a2a313c39922c6a11ee33f9bcfca96a5.png'
            : 'https://img.hzanchu.com/acimg/3dd35148887592ac25725ae12577d650.png'
        "
        :class="item.select ? 'radius' : ''"
      />
    </div>

    <div class="circle2">
      <img
        v-for="(item, index) in list2"
        :key="index"
        :src="
          item.select
            ? 'https://img.hzanchu.com/acimg/a2a313c39922c6a11ee33f9bcfca96a5.png'
            : 'https://img.hzanchu.com/acimg/3dd35148887592ac25725ae12577d650.png'
        "
        :class="item.select ? 'radius' : ''"
      />
    </div>

    <div
      v-for="(item, index) in homeList"
      :key="index"
      :class="item.className"
      @click="openLink(index)"
    >
      <div class="bg">
        <img :src="item.bg" class="big" />
        <img :src="item.small" :class="index % 2 == 0 ? 'small' : 'small1'" />
      </div>
      <img :src="item.text" class="text" />
    </div>

    <!-- <img class="route1" src="@/assets/images/home/route.png" />
    <img class="route2" src="@/assets/images/home/route.png" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: 1, // 当前times数量
      list1: [
        { select: true },
        { select: false },
        { select: false },
        { select: false },
      ],
      list2: [
        { select: false },
        { select: false },
        { select: false },
        { select: true },
      ],
      timer: null,

      // homeList: [
      //   {
      //     bg: require("@/assets/images/home/bg.png"),
      //     className: "pos1",
      //     small: require("@/assets/images/home/pos1-img.png"),
      //     text: require("@/assets/images/home/pos1-text.png"),
      //     path: "/ruralBrain",
      //     url: "",
      //   },
      //   {
      //     bg: require("@/assets/images/home/bg.png"),
      //     className: "pos2",
      //     small: require("@/assets/images/home/pos3-img.png"),
      //     text: require("@/assets/images/home/pos3-text.png"),
      //     path: "",
      //     url: "https://tonglu-sjdp.zjsszxc.com/shareScreen/eyJzY3JlZW5JZCI6MjUxMn0=",
      //   },
      //   {
      //     bg: require("@/assets/images/home/bg.png"),
      //     className: "pos3",
      //     small: require("@/assets/images/home/pos2-img.png"),
      //     text: require("@/assets/images/home/pos2-text.png"),
      //     path: "",
      //     url: "https://jiangshan-szxt-admini.zjsszxc.com",
      //   },
        
      //   {
      //     bg: require("@/assets/images/home/bg.png"),
      //     className: "pos4",
      //     small: require("@/assets/images/home/pos4-img.png"),
      //     text: require("@/assets/images/home/pos4-text.png"),
      //     path: "/sence",
      //     url: "",
      //   },
      //   {
      //     bg: require("@/assets/images/home/bg.png"),
      //     className: "pos5",
      //     small: require("@/assets/images/home/pos5-img.png"),
      //     text: require("@/assets/images/home/pos5-text.png"),
      //     path: "/teaDiseases",
      //     url: "",
      //   },
      // ],
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    openLink: function (index) {
      let url = this.homeList[index].url;
      let path = this.homeList[index].path;
      if (this.homeList[index].url) {
        window.open(url);
      } else if (path) {
        this.$router.push(path);
      } else {
        this.$message("建设中");
      }
    },
    init: function () {
      this.timer = setInterval(() => {
        for (const index in this.list1) {
          if (index == this.times % 4) {
            this.list1[index].select = true;
          } else {
            this.list1[index].select = false;
          }
        }
        for (const index in this.list2) {
          if (index == 3 - (this.times % 4)) {
            this.list2[index].select = true;
          } else {
            this.list2[index].select = false;
          }
        }
        this.times++;
      }, 3000);
    },
    // toPage(child, name, url, target) {
    //   if (target) {
    //     window.open(url)
    //   } else {
    //     if (!child) {
    //       this.activeMenu = name
    //       this.activeUrl = url
    //     }
    //   }
    // },
    // backhome() {
    //   this.$router.replace('/fenghua/data')
    // }
  },
};
</script>

<style scoped lang="scss">
.jiangshan {
  width: 100%;
  min-height: 100%;
  // background: url('~@/assets/images/home/bg.webp')
    // no-repeat;
  background-size: 100%;
  background-size: cover;

  .circle1 {
    position: absolute;
    top: vh(52);
    left: vw(590);
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: vw(10);
      height: vh(10);
      margin-right: vw(10);
    }
  }

  .circle2 {
    position: absolute;
    top: vh(52);
    right: vw(570);
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: vw(10);
      height: vh(10);
      margin-right: vw(10);
    }
  }

  .radius {
    box-shadow: 0px 0px 4px rgba(34, 203, 253, 0.7);
    border-radius: 50%;
  }

  .route1 {
    position: absolute;
    bottom: vh(76);
    left: vw(86);
    width: vw(68);
    height: vh(68);
    animation: _rotate 3s linear infinite;
  }

  .route2 {
    position: absolute;
    bottom: vh(76);
    right: vw(86);
    width: vw(68);
    height: vh(68);
    animation: _rotate 3s linear infinite;
  }
  @keyframes _rotate {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes _rotate {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .pos1 {
    position: absolute;
    left: vw(358);
    top: vh(157);
    width: vw(156);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .pos2 {
    position: absolute;
    left: vw(623);
    top: vh(214);
    width: vw(156);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .pos3 {
    position: absolute;
    left: vw(885);
    top: vh(214);
    width: vw(156);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .pos4 {
    position: absolute;
    left: vw(1147);
    top: vh(214);
    width: vw(156);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .pos5 {
    position: absolute;
    left: vw(1409);
    top: vh(157);
    width: vw(156);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .bg {
    position: relative;
    width: vw(156);
    width: vw(168);
    .big {
      width: vw(156);
      height: vh(168);
    }
    .small {
      position: absolute;
      left: vw(40);
      top: vh(27);
      width: vw(87);
      height: vh(87);
      animation: _up 3s linear infinite;
    }
    .small1 {
      position: absolute;
      left: vw(40);
      top: vh(27);
      width: vw(87);
      height: vh(87);
      animation: _down 3s linear infinite;
    }
  }

  .text {
    // width: vw(156);
    height: vh(48);
    margin-top: vh(10);
  }

  @keyframes _up {
    0% {
      top: vh(10);
    }
    50% {
      top: vh(-10);
    }
    100% {
      top: vh(10);
    }
  }
  @keyframes _down {
    0% {
      top: vh(-10);
    }
    50% {
      top: vh(10);
    }
    100% {
      top: vh(-10);
    }
  }
}
</style>
