<template>
  <div :id="id" class="scrolling-table" :style="{ '--visible-count': visibleCount }" role="table">
    <div class="table-header row" aria-label="table header" role="columnheader">
      <div
          v-for="col in props.columns"
          :key="col.field"
          :aria-label="col.name"
          class="cell"
          :style="{
            textAlign: col.textAlign || 'center',
            width: col.width,
            maxWidth: col.width,
          }"
      >
        {{ col.name }}
      </div>
    </div>
    <div class="table-body">
      <TransitionGroup name="rows">
        <div
            class="row"
            aria-label="row"
            role="row"
            v-for="item in displayData"
            :key="props.compositeKey?.(item) || item[props.idField]"
            :style="{
              background: (getRowBg || defaultGetRowBg)(item),
            }"
        >
          <div
              v-for="col in props.columns"
              class="cell"
              :aria-label="col.name"
              role="cell"
              :key="col.field"
              :style="{
                width: col.width,
                maxWidth: col.width,
              }"
          >
            <component
              v-if="!!col.customComponent"
              :is="col.customComponent"
              :value="item[col.field]"
              :interrupt="interrupt"
              :resume="resume"
            />
            <span
              v-else
              class="default-text-cell"
              :title="item[col.field]"
              :style="{
                textAlign: col.textAlign || 'center',
              }"
            >{{ item[col.field] }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRef, onMounted, onBeforeUnmount, watchEffect } from "vue";
import useSlidingWindow from "@/composables/useSlidingWindow";

const props = defineProps({
  id: String,
  columns: Array,
  visibleCount: {
    type: Number,
    default: 5,
  },
  updateInterval: {
    type: Number,
    default: 3000,
  },
  data: Array,
  idField: String,
  compositeKey: Function,
  getRowBg: Function,
  static: Boolean,
});
// 设置行背景
const defaultGetRowBg = (row) => {
  const srcIdx = props.data.findIndex(
      (e) => {
        if (props.compositeKey) {
          return props.compositeKey(e) === props.compositeKey(row)
        }
        return e[props.idField] === row[props.idField]
      }
  );
  if (srcIdx % 2 === 1) {
    return "rgba(25, 152, 248, 0.08)";
  }
};
// 定期更新逻辑
const dataRef = toRef(props, 'data')
const sizeRef = toRef(props, 'visibleCount')
const {data: displayData, interrupt, resume} = useSlidingWindow(dataRef, sizeRef, props.updateInterval);

// const currentIdx = ref(0);
// const updateDisplay = () => {
//   if (props.visibleCount < props.data.length) {
//     displayData.value.shift();
//     currentIdx.value += 1;
//     if (currentIdx.value >= props.data.length) {
//       currentIdx.value = 0;
//     }
//     displayData.value.push(props.data[currentIdx.value]);
//   }
// };
// watchEffect(() => {
//   if (props.data.length <= props.visibleCount) {
//     displayData.value = [...props.data];
//     currentIdx.value = props.data.length - 1;
//   } else {
//     displayData.value = props.data.slice(0, props.visibleCount);
//     currentIdx.value = props.visibleCount - 1;
//   }
// });
// let updateClock = ref(null);
onMounted(() => {
  // updateClock.value = setInterval(() => {
  //   updateDisplay();
  // }, props.updateInterval);
  if (props.static) {
    interrupt('static')
  }
});
onBeforeUnmount(() => {
  // clearInterval(updateClock.value);
});
</script>

<style scoped lang="scss">
.scrolling-table {
  position: relative;
  z-index: 1;
  color: white;
  pointer-events: auto;
}
.row {
  display: flex;
  width: 100%;
  border-block-end: vh(1) solid transparent;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  .default-text-cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: vw(16);
    font-weight: normal;
    color: #FFFFFF;
    line-height: vw(17);
    padding: vh(8) vw(8)
  }
}
.table-header {
  .cell {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: vw(18);
    font-weight: normal;
    color: #A1CEEF;
    line-height: vw(19);
  }
}
.table-body {
  position: relative;
  overflow: hidden;
  //min-height: calc(var(--visible-count) * vw(35));
}

.rows-move,
.rows-enter-active,
.rows-leave-active {
  transition: all 0.5s ease;
}
.rows-enter-from {
  opacity: 0;
  transform: translateY(50%);
}
.rows-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.rows-leave-active {
  position: absolute;
}
</style>
