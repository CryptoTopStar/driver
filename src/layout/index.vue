<template>
  <div class="app-container">
    <!-- 头部 -->
    <AppHeader />
    <!-- 主体部分 -->
    <AppMain />
    <!-- 脚部 -->
    <AppFooter />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { AppHeader, AppMain, AppFooter } from "./components";

export default defineComponent({
  name: "YZTLayout",
  components: { AppHeader, AppMain, AppFooter },
  setup() {},
});
</script>
<style scoped lang="scss">
.app-container {
  background: url("~@/assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
  background-color: #061257;
}
</style>
