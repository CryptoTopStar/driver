<template>
  <div
    :class="customClass ? '_item  ' + customClass : '_item '"
    :style="customStyle ? customStyle : ''"
    @click="gotoDetail"
  >
    <div class="icon-box">
      <img
        :src="
          item.miniIcon
            ? item.miniIcon
            : 'https://img.hzanchu.com/acimg/7850e7b375bda2fd056e283169582c50.png'
        "
        class="icon"
      />
      <img v-show="item.miniIcon" class="mini-img" :src="item.miniImg" />
    </div>

    <div class="title" :style="item.title.length > 6 ? '' : 'margin-top: 25px'">
      {{ item.title }}
    </div>
    <img
      src="https://img.hzanchu.com/acimg/833eb0492df5fcccb7ce3e89b34e9668.png"
      class="arrow"
    />
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    item: {
      type: Object,
    },
    customStyle: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const Router = useRouter();
    const { proxy } = getCurrentInstance();
    const gotoDetail = () => {
      let item = props.item;
      if (item.url) {
        window.open(item.url);
      } else if (item.route) {
        Router.push(item.route);
      } else if (item.miniIcon) {
      } else {
        proxy.$message("即将开放，敬请期待");
      }
    };
    onMounted(() => {});
    return { gotoDetail };
  },
};
</script>

<style lang="scss" scoped>
._item {
  position: relative;
  width: vw(266);
  height: vh(230);
  margin-left: vw(-30);
  margin-bottom: vh(30);
  background: url("https://img.hzanchu.com/acimg/eddb09a024ad3469692b75eb0a5486ca.png")
    no-repeat;
  background-size: 100% 100%;
  // overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon-box {
    position: relative;
    .icon {
      width: vw(70);
      height: vw(70);
      border-radius: 100%;
    }
    .mini-img {
      position: absolute;
      z-index: -1;
      top: vh(-311);
      left: 50%;
      width: vw(300);
      height: vh(300);
      background-color: #fff;
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .title {
    width: vw(166);
    margin-top: vh(10);
    line-height: vh(30);
    text-align: center;
    font-size: vw(20);
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #fff;
  }

  .arrow {
    width: 0px;
    height: 0px;
    margin-top: vh(10);
  }

  .ml {
    margin-left: vw(-30);
  }
}

._item:hover {
  background: url("https://img.hzanchu.com/acimg/06f4ea38b3414bccd3769b83100addb9.png")
    no-repeat;
  background-size: 100% 100%;

  .arrow {
    width: vw(26);
    height: vw(14);
    margin-top: vw(10);
    animation: _scroll 1.5s linear infinite;
  }
}
.icon-box:hover {
  .mini-img {
    position: absolute;
    z-index: 3;
    left: 50%;
    transform: translateX(-50%);
    width: vw(300);
    height: vh(300);
    background-color: #fff;
    opacity: 1;
  }
}
</style>

<style lang="scss" >
@keyframes _scroll {
  0% {
    transform: translateX(vw(-5));
  }
  50% {
    transform: translateX(vw(10));
  }
  100% {
    transform: translateX(vw(-5));
  }
}
</style>
