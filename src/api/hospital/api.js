import api from '@/util/http.js';

// 本月门诊挂号数
export function getMonthOutpatientNumber(params) {
    return api.get('/api/Hosp/getMonthOutpatientNumber', params)
}

// 资源配置
export function getResourceAllocation(params) {
    return api.get('/api/Hosp/getResourceAllocation', params)
}

// 疾病预防预警
export function getCountDiseEarlyWarn(params) {
    return api.get('/api/Hosp/getCountDiseEarlyWarn', params)
}

// 就诊人数统计
export function getCountVisitNumber(params) {
    return api.get('/api/Hosp/getCountVisitNumber', params)
}

// 历年资源投入量
export function getResourceInputQuantity(params) {
    return api.get('/api/Hosp/getResourceInputQuantity', params)
}

// 历年资源产出量
export function getResourceOutputQuantity(params) {
    return api.get('/api/Hosp/getResourceOutputQuantity', params)
}

// 历年常见病统计
export function getCountDise(params) {
    return api.get('/api/Hosp/getCountDise', params)
}