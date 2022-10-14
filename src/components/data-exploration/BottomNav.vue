<template>
  <nav class="bottom-nav" :style="customStyle">
    <router-link
      v-for="nav in navs"
      :key="nav.url"
      :to="nav.url"
      :class="{
        'nav-link': true,
        'active': route.path === nav.url
      }"
    >
      {{ nav.name }}
    </router-link>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// TODO: 地址
const navs = [
  { name: "病虫害预警", url: "/teaDiseases" },
  { name: "农机资源分析", url: "/agriculturalMachine" },
  {name: '价格红线预警', url: '/data-exploration/priceDanger-warning'},
  {name: '销量突变预警', url: '/data-exploration/regionalSales-warning'},
  {name: '食用菌长势检测', url: '/data-exploration/iot-monitoring'},
  {name: '食用菌产量预估', url: '/data-exploration/production-forecast'},
];

const props = defineProps({
  customStyle: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.bottom-nav {
  display: flex;
  justify-content: space-between;
  z-index: 800;
  box-sizing: border-box;
  width: vw(1400);
  padding-inline: vw(120);
  pointer-events: none;
  background: no-repeat bottom/ vw(1400) vh(34)
    url("~@/assets/images/data-exploration/shared/bottom-nav-container-bg.webp");
}
.nav-link {
  pointer-events: auto;
  height: vw(42);
  box-sizing: border-box;
  padding: vw(8) vw(24);
  margin-bottom: vw(10);
  display: grid;
  place-items: center;
  text-align: center;
  font-size: vw(20);
  color: #63afe9;
  filter: saturate(0.75);
  background: no-repeat bottom/ 100% 100%
    url("~@/assets/images/data-exploration/shared/bottom-nav-bg.webp");
  transition: all 0.8s ease;
  &.active {
    color: #ffffff;
    filter: saturate(1) brightness(2);
    //background: url("~@/assets/images/smart-communities/shared/active-bg.png");
    //background-size: 180% 100%;
    //background-repeat: no-repeat;
    //background-position: center;
  }
  &:first-of-type {
    padding-inline: vw(66) vw(24);
    clip-path: polygon(0% 0, 100% 0%, 100% 100%, 25% 100%);
  }
  &:last-of-type {
    padding-inline: vw(10) vw(66);
    clip-path: polygon(0% 0, 100% 0%, 75% 100%, 0% 100%);
  }
}
</style>
