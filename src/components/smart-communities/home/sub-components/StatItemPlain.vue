<template>
  <div
      ref="containerRef"
      :class="{
    'stat-container': true,
     [calculatedClass]: true
  }"
  >
    <slot name="icon"></slot>
    <div class="content">
      <div class="label">
        {{label ?? '-'}}
        <router-link :to="redirectUrl" v-if="redirectUrl" class="redirect-arrow">
          <img :src="require('@/assets/images/icon/right-arrow@2x.png')" alt="redirect" />
        </router-link>
      </div>
      <div class="value" :style="{color: valueColor}">{{value ?? '-'}}<span class="unit">{{unit}}</span></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onBeforeUnmount, watchEffect } from 'vue';

const props = defineProps({
  value: [String, Number],
  unit: String,
  label: String,
  valueColor: String,
  redirectUrl: {
    type: String,
    default: undefined,
    required: false
  },
  // 'horizontal' / 'vertical'
  variant: {
    type: String,
    default: 'horizontal'
  },
})
// reactive state
const containerRef = ref(null)

const calculatedClass = ref('');
watchEffect(()=>{
  switch (props.variant) {
    case 'vertical': {
      calculatedClass.value = 'vertical-variant';
      break;
    }
    // case 'box': {
    //   calculatedClass.value = 'box-variant';
    //   break;
    // }
    case 'horizontal':
    default: {
      calculatedClass.value = 'horizontal-variant';
      break;
    }
  }
})


onMounted(() => {
})
onBeforeUnmount(()=>{
})
</script>

<style scoped lang="scss">
.content {
  display: flex;
}
.vertical-variant {
  //background: green;
  .content {
    flex-flow: column;
    margin-inline-start: vw(8);
  }
}
.horizontal-variant {
  //background: blue;
  .content {
    width: 100%;
    flex-flow: row;
    align-items: baseline;
    margin-inline-start: vw(4);
    .label {
      flex: 1;
    }
    .value {
      place-self: flex-end;
    }
  }
}
.stat-container {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  //width: 100%;
  //height: vw(120);
  background-position: center;
  background-repeat: no-repeat;
  .icon {
    width: vw(40);
  }
}
.value {
  font-size: vw(24);
  line-height: vw(24);
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #27E0FD;
}
.unit {
  font-size: vw(14);
  font-weight: normal;
  color: #90B6D2;
}
.label {
  font-size: vw(16);
  line-height: vw(24);
  font-weight: normal;
  color: #CCEAFF;
  word-break: break-all;
}
.redirect-arrow {
  &:hover {
  }
  img {
    vertical-align: text-bottom;
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
