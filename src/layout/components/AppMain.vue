<template>
  <section class="app-main">
    <router-view :key="newKey" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="newKey"></component>
      </transition>
    </router-view>
  </section>
</template>

<script>
import {defineComponent, watch, ref} from "vue";
import {useRoute} from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const newKey = ref(route.path)
    watch(() => route.path, (newVal) => {
      newKey.value = newVal
    })
    return {
      newKey
    };
  },
});
</script>
<style scoped lang="scss">
.app-main {
  width: 100%;
  // padding-top: vh(215);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: vh(60);
}
</style>

<style lang="scss">
@import "~@/styles/mixin.scss";

.right-list {
}
</style>
