<template>
  <div class="de-layout">
    <PageHeader
      :headerTitle="router.currentRoute.value.meta.title"
      returnUrl="/home"
    />
    <main class="de-main">
      <router-view />
    </main>
    <footer class="de-footer">
      <BottomNav />
    </footer>
  </div>
</template>

<script setup>
import PageHeader from "@/components/data-exploration/PageHeader";
import BottomNav from "@/components/data-exploration/BottomNav";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped lang="scss">
.de-layout {
  height: 100%;
  width: 100%;
  background: no-repeat center/100% 100%
    url("~@/assets/images/data-exploration/shared/page-bg.webp");
  position: relative;
  display: grid;
  grid-template-rows: [start] vw(110) [main-start] 1fr [main-end] vw(72) [end];
}
.de-main {
  grid-row: span main-start / main-end;
  min-height: 0;
}
.de-footer {
  width: 100%;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  bottom: vh(10);
}
</style>
