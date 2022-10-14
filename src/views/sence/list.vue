<template>
  <div v-if="list.length > 0" class="_list">
    <div v-for="(item, index) in list" :key="index" class="item">
      <div class="item-column">
        <Item
          v-for="(item1, index1) in item.list"
          :key="index1"
          :item="item1"
          :style="customStyle"
        ></Item>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Item from "./item.vue";
export default {
  props: {
    list: {
      type: Array,
    },
    customStyle: {
      type: String,
      default: "",
    },
  },
  components: { Item },
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style lang="scss" scoped>
._list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .item {
    // width: 266px;
    // margin-left: -30px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .item-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
