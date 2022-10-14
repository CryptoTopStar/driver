import api from '@/util/http.js';

// 获取产业主体
export function getMainBody(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/enterprise-dashboard', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/enterprise-dashboard', params)
  }
}
// 产业面积/加工/产量/产值趋势
export function getTendency(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/tendency', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/tendency', params)
  }
}
// 产业面积排行
export function areaSort(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/area-sort', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/area-sort', params)
  }
}
// 产业面积排行
export function getPriceMarket(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/price-market', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/price-market', params)
  }
}
// 产业资源分布汇总
export function getResourceDistributionDashboard(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/resource-distribution-dashboard', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/resource-distribution-dashboard', params)
  }
}
// 产业资源分布
export function getResourceDistribution(params) {
  if(params.type === 'fungi'){ // 食用菌
    return api.get('/api/resource-distribution-count', params)
  }else{ // 猕猴桃 api/mht/enterprise-dashboard
    return api.get('/api/mht/resource-distribution-count', params)
  }
}
// 监测点列表
export function getLandList(params) {
  if(params.type === 'fungi'){ // 食用菌
    // return api.get('/api/resource-distribution-count', params)
  }else{ // 猕猴桃
    return api.get('/api/mht/land_list', params)
  }
}
// 监测点列表 猕猴桃
export function getLandDayList(params) {
  if(params.type === 'fungi'){ // 食用菌
    // return api.get('/api/resource-distribution-count', params)
  }else{ // 猕猴桃
    return api.get('/api/mht/land_data_day_list', params)
  }
}
// 监测点列表 猕猴桃 时间
export function getLandTimeList(params) {
  if(params.type === 'fungi'){ // 食用菌
    // return api.get('/api/resource-distribution-count', params)
  }else{ // 猕猴桃
    return api.get('/api/mht/land_data_hour_list', params)
  }
}
