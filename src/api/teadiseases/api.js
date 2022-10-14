import api from '@/util/http.js';

// 未来15日天气
export function pestsMeteorologicalList(params) {
    return api.get('/api/pests/meteorological-list', params)
}

// 虫情监测
export function pestsMonitorList(params) {
    return api.get('/api/pests/monitor-list', params)
}

// 上年度病虫害
export function pestsHistoryList(params) {
    return api.get('/api/pests/history-list', params)
}

// 江山市茶叶病虫害15天预警
export function teaDiseasesWarning(params) {
    return api.get('/algorithm_api/tea_diseases_warning', params)
}

// 江山市茶叶病害检测
export function pestsDiseaseMonitorList(params) {
    return api.get('/api/pests/disease-monitor-list', params)
}

