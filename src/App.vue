<template>
  <div id="app">
    <!-- <Layout>
      <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    </Layout> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  name: "App",
  components: { Layout },
  setup() {

  }
};
</script>

<style lang="scss">
#app {
  font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(vw(-30));
}
.arithmetic-tip{
   background: no-repeat center/118% 108% url("~@/assets/images/data-exploration/shared/tip.png");
  // background-size:100% ;''
  border: 0 !important;
  .el-notification__title{
      color: white;
  }
    .tip-box{
    b{
      color: #6FC2FF;
    }
    div{
      color: white;
      &:nth-of-type(1) {
        margin-bottom: 16px;
      }
    }
  }
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(vw(30));
}
</style>
