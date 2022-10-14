<template>
  <nav class="bottom-nav">
    <router-link
        v-for="nav in navs"
        :key="nav.url"
        :to="nav.url"
        :class="{
          'nav-link': true,
          'active': route.path === nav.url
        }"
    >
      {{nav.name}}
    </router-link>
  </nav>
</template>

<script setup>
import {defineProps} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const navs = [
  {name: '乡村旅游', url: '/villageTour'},
  {name: '垃圾分类', url: '/villageGarbage'},
  {name: '消防监管', url: '/smart-communities/fire-stats'},
  {name: '乡村医院', url: '/villageHospital'},
  {name: '重点人员', url: '/smart-communities/census-data'},
]

const props = defineProps({
})
</script>

<style scoped lang="scss">
.bottom-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: vw(1920);
  height: vw(100);
  display: flex;
  justify-content: space-evenly;
  z-index: 800;
  box-sizing: border-box;
  padding-inline: vw(540);
  pointer-events: none;
}
.nav-link {
  pointer-events: auto;
  width: vw(92);
  height: vw(92);
  box-sizing: border-box;
  padding: vw(16);
  display: grid;
  place-items: center;
  text-align: center;
  font-size: vw(22);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #88a1d9;
  filter: saturate(0.75);
  background: url("~@/assets/images/smart-communities/shared/nav-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &.active {
    color: #FFFFFF;
    filter: saturate(1);
    //background: url("~@/assets/images/smart-communities/shared/active-bg.png");
    //background-size: 180% 100%;
    //background-repeat: no-repeat;
    //background-position: center;
  }
}
</style>
