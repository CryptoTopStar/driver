<template>
  <el-form
    ref="formRef"
    :model="formContent"
    status-icon
    :rules="rules"
    label-width="160px"
    class="demo-ruleForm"
    hide-required-asterisk
  >
    <div class="table">
      <div class="table-header">栽培相关因子</div>
      <div class="table-header">室内环境因子</div>
      <div class="table-input-container">
        <el-form-item label="投料重量（吨）：" prop="weight">
          <el-input v-model="formContent.weight" placeholder="请输入投料重量" autocomplete="off" />
        </el-form-item>
        <el-form-item label="栽培面积（㎡）：" prop="size">
          <el-input v-model="formContent.size" placeholder="请输入栽培面积" autocomplete="off" />
        </el-form-item>
        <el-form-item label="培养基含水量（%）：" prop="water">
          <el-input v-model="formContent.water" placeholder="请输入培养基含水量" autocomplete="off" />
        </el-form-item>
        <el-form-item label="培养基PH值：" prop="ph">
          <el-input v-model="formContent.ph" placeholder="请输入培养基PH值" autocomplete="off" />
        </el-form-item>
      </div>
      <div class="table-input-container">
        <el-form-item label="湿度（%）：" prop="humidity">
          <el-input v-model="formContent.humidity" placeholder="请输入湿度" autocomplete="off" />
        </el-form-item>
        <el-form-item label="CO₂浓度（%）：" prop="co2Concentration">
          <el-input v-model="formContent.co2Concentration" placeholder="请输入CO₂浓度" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菌丝生长温度（℃）：" prop="targetTemp">
          <el-input v-model="formContent.targetTemp" placeholder="请输入菌丝生长温度" autocomplete="off" />
        </el-form-item>
        <el-form-item label="光线情况：" prop="lighting">
          <el-select
            v-model="formContent.lighting"
            placeholder="请选择光线情况"
          >
            <el-option label="黑暗" :value="0" />
            <el-option label="弱光" :value="1" />
            <el-option label="正常光" :value="2" />
          </el-select>
        </el-form-item>
      </div>
      <div class="table-actions">
        <button type="button" class="action-btn" @click="submitForm(formRef)">预测</button>
        <button type="reset" class="action-btn" @click="resetForm(formRef)">重置</button>
        <button type="button" class="action-btn" @click="loadSample">加载示例</button>
      </div>
      <div class="table-summary">
        <span class="estimate-result-label">综合产量：</span>
        <span class="estimate-result">{{ calculatedResult }}吨</span>
      </div>
    </div>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import request from '@/util/http.js';

// request.get('https://jiangshan-ai.zjsszxc.com/algorithm_api/tea_diseases_warning')

const formRef = ref();
const calculatedResult = ref('-');
const formContent = reactive({
  weight: undefined,
  size: undefined,
  water: undefined,
  ph: undefined,
  humidity: undefined,
  co2Concentration: undefined,
  targetTemp: undefined,
  lighting: undefined
})
const rules = reactive({
  weight: [
    { required: true, message: '请输入投料重量', trigger: 'blur' },
  ],
  size: [
    { required: true, message: '请输入栽培面积', trigger: 'blur' },
  ],
  water: [
    { required: true, message: '请输入培养基含水量', trigger: 'blur' },
  ],
  ph: [
    { required: true, message: '请输入培养基PH值', trigger: 'blur' },
  ],
  humidity: [
    { required: true, message: '请输入湿度', trigger: 'blur' },
  ],
  co2Concentration: [
    { required: true, message: '请输入CO₂浓度', trigger: 'blur' },
  ],
  targetTemp: [
    { required: true, message: '请输入菌丝生长温度', trigger: 'blur' },
  ],
  lighting: [
    { required: true, message: '请选择光线情况', trigger: 'change' },
  ],
})

const calculateResult = (inputs) => {
  const rawResult = -0.38*inputs.weight / 10
    +1.78*inputs.size / 100
    +0.48*inputs.water / 100
    -1*inputs.ph / 10
    +4.3*inputs.humidity / 100
    -3*inputs.co2Concentration
    +0.56*inputs.targetTemp / 100
    -0.5*inputs.lighting / 10
    +0.67;
  if (isNaN(rawResult)) {
    return '-'
  }
  return rawResult.toFixed(4)
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      calculatedResult.value = calculateResult(formContent);
    }
  }).catch(e=>{
    console.error(e)
  })
}
const resetForm = (formEl) => {
  calculatedResult.value = '-'
  if (!formEl) return
  formEl.resetFields()
}
const loadSample = ()=>{
  formContent.weight = 1.1;
  formContent.size = 60;
  formContent.water = 55;
  formContent.ph = 5.4;
  formContent.humidity = 23;
  formContent.co2Concentration = 0.02;
  formContent.targetTemp = 19;
  formContent.lighting = 0;
  calculatedResult.value = calculateResult(formContent)
  console.log(calculatedResult.value)
}

</script>

<style scoped lang="scss">
$border-color: #94C9E8;
$border-style: solid;
.table {
  width: 100%;
  box-sizing: border-box;
  padding: vh(12) vw(30);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  color: #FFFFFF;
  & > *:nth-child(2n + 1) {
    border-inline-end: none;
  }
}
.table-header {
  font-size: vh(22);
  padding: vh(12) vw(18);
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: vh(24);
  border: vh(1) $border-style $border-color;
  border-block-end: none;
}
.table-input-container {
  border: vh(1) $border-style $border-color;
  padding: vh(16) vw(50) vh(0) vw(24);
  // overwrite
  ::v-deep(.el-form-item) {
    // label
    --el-form-label-font-size: vh(16);
    --el-text-color-regular: #51C2FE;
    // input
    .el-input {
      border-radius: vh(2);
      --el-input-bg-color: linear-gradient(90deg, rgba(35, 84, 162, 0.66) 0%, rgba(35, 84, 162, 0.66) 100%);
      --el-fill-color-blank: linear-gradient(90deg, rgba(35, 84, 162, 0.66) 0%, rgba(35, 84, 162, 0.66) 100%);
      --el-input-text-color: #9AC6E6;
      --el-input-border-color: rgba(80, 194, 254, 0.36);
      --el-text-color-placeholder: rgba(255, 255, 255, 0.45);
      --el-input-placeholder-color: rgba(255, 255, 255, 0.45);
      --el-input-hover-border-color: #2CA2FC;
      --el-input-clear-hover-color: #2CA2FC;
      --el-input-focus-border-color: #2CA2FC;
    }
    .el-form-item__label {
      line-height: vh(32);
    }
    .el-form-item__error {
      font-size: vh(12);
    }
    .el-form-item {
      margin-bottom: vh(18);
      --font-size: vh(14);
    }
    .el-input__inner {
      line-height: vh(32);
      font-size: vh(16);
      height: vh(32);
    }
  }

}
.table-actions {
  border: vh(1) $border-style $border-color;
  border-block-start: none;
  border-inline-end: none;
  display: flex;
  align-items: center;
  padding: vh(8) vw(24);
  column-gap: vw(24);
  .action-btn {
    padding: vh(8) vw(24);
    font-size: vh(18);
    line-height: vh(24);
    font-weight: 600;
    color: #FFFFFF;
    background: no-repeat center/100% 100% url('~@/assets/images/data-exploration/shared/button-bg.png');
    cursor: pointer;
  }
}
.table-summary {
  border: vh(1) $border-style $border-color;
  border-block-start: none;
  display: flex;
  align-items: center;
}
.estimate-result-label {
  display: inline-block;
  font-size: vh(22);
  font-weight: 400;
  color: #FFFFFF;
  vertical-align: middle;
  margin-inline: vw(50) vw(24);
}
.estimate-result {
  font-size: vh(22);
  font-family: PangMenZhengDao;
  font-weight: 400;
  color: #58FFFF;
  vertical-align: middle;
}
</style>
