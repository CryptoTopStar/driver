<template>
  <div class="mid-comp">
    <component :is="statistics" />

    <component
      :is="radioTab"
      :list="radio.list"
      v-model:active-index="radio.active"
      :height="40"
      :bg="require('./images/radio_bg_2.png')"
    />

    <div class="search-box">
      <div class="item">
        <p>地区</p>
        <component :is="cSelect" v-model:modelValue="formData.town" multiple :columns="formData.townEnum"  />
      </div>
      <div class="item">
      </div>
      <div class="item">
        <p>{{ radio.active === 1 ? '分类' : '是否逾期' }}</p>
        <component v-if="radio.active === 1" :is="cSelect" v-model:modelValue="formData.type" :columns="formData.typeEnum" />
        <component v-else :is="cSelect" v-model:modelValue="formData.overdue" :columns="formData.overdueEnum" />
      </div>
      <div class="item btns">
        <div @click="onReset">重 置</div>
        <div @click="getMapData">搜 索</div>
        <div @click="onExport">
          <img :src="require('./images/export_icon.png')" alt="" />
          导出
        </div>
      </div>
    </div>

    <component
      :is="jsMap"
      :map-data="mapData"
      :active="radio.active"
      @mapClick="mapClick"
    />

    <component :is="cDialog" :title="`${radio.activeTownName}${radio.list[radio.active]}`" v-model="radio.visible">
      <template #table>
        <component
          :is="project"
          :town="+radio.activeTownId"
          :type="+radio.active === 0 ? 'project' : 'project_sub'"
        />
      </template>
    </component>
  </div>
</template>

<script setup>
import statistics from './components/statistics'
import jsMap from './components/jsMap'
import radioTab from './components/radioTab'
import cSelect from './components/cSelect'
import cDialog from './components/cDialog'
import { reactive, onMounted, ref, watch } from 'vue'
import { getTownList, getFinancialList } from '@/api/jnt'
import { downloadAs } from '@/util/tools'
import project from './table/project'

const mapData = ref([])

const formData = reactive({
  townEnum: {},
  overdueEnum: {
    0: '否',
    1: '是'
  },
  town: '',
  overdue: '',
  type: '',
  typeEnum: {
    1: '有机肥使用补贴',
    2: '秸秆综合利用补贴',
    3: '湖羊产业补贴',
    4: '病死动物无害化处理补贴',
    5: '粮油适度规模经营补贴'
  }
})

const radio = reactive({
  list: ['竞争性财政支农项目分布', '惠农补贴项目分布'],
  active: 0,
  activeTownName: '',
  activeTownId: '',
  visible: false
})

const mapClick = async (e) => {
  radio.activeTownName = e
  Object.keys(formData.townEnum).forEach(key => {
    if (formData.townEnum[key] === e) radio.activeTownId = key
  })
  radio.visible = true
  console.log(radio)
}

const getMapData = async () => {
  const result = await getFinancialList({
    search_project_type: radio.active === 0 ? 'project' : 'project_sub',
    search_town_ids: formData.town,
    search_is_overdue: formData.overdue ? +formData.overdue : null,
    search_policy_category_name: formData.typeEnum[formData.type],
  })
  mapData.value = result
}

const getTown = async () => {
  const result = await getTownList()
  result.list.map(item => {
    formData.townEnum[item.id] = item.town_name
  })
}

const onExport = async () => {
  const result = await getFinancialList({
    search_project_type: radio.active === 0 ? 'project' : 'project_sub',
    search_town_ids: formData.town,
    search_is_overdue: formData.overdue ? +formData.overdue : null,
    search_policy_category_name: formData.typeEnum[formData.type],
    is_export: 1
  })
  downloadAs(result, `${new Date().toLocaleString()}${radio.list[radio.active]}.xls`, 'application/vnd.ms-excel');
}

const onReset = () => {
  formData.town = ''
  formData.overdue = ''
  formData.type = ''
  getMapData()
}

onMounted(() => {
  getTown()
})
watch(() => radio.active, () => {
  getMapData()
}, { immediate: true })
</script>

<style scoped lang="scss">
.mid-comp {
  width: 686px;
  :deep(.radio-tab) {
    .item {
      font-size: 20px;
      padding: 0 32px;
    }
    color: #fff;
    margin: 34px 0 24px;
  }

  .search-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      white-space: nowrap;
      width: 50%;
      display: flex;
      height: 34px;
      line-height: 34px;
      &:nth-of-type(1) {
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #fff;
        width: 76px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 8px;
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
      div {
        cursor: pointer;
        width: 80px;
        height: 40px;
        line-height: 44px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-image: url("images/btn_bg_cancel.png");
        background-size: 100% 100%;
        &:nth-of-type(2) {
          background-image: url("images/btn_bg_confirm.png");
        }
        &:nth-of-type(3) {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 92px;
          height: 40px;
          font-size: 14px;
          background: url("images/export_bg.png") no-repeat;
          background-size: 100% 100%;
          img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
