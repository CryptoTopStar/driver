import api from '@/util/http.js';

// 乡村旅游模块数据
export function tourismModuleData(params) {
    return api.get('/api/countryside-tourism/module-data', params)
}

// 景区游客量
export function tourismFlowList(params) {
    return api.get('/api/countryside-tourism/flow-list', params)
}

// 景区热度排行
export function tourismHotSort(params) {
    return api.get('/api/countryside-tourism/hot-sort', params)
}

// 地图数据
export function tourismMapData(params) {
    return api.get('/api/countryside-tourism/map-data', params)
}