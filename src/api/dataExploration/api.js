import api from '@/util/http.js';

// 算法模型生猪列表
export function getPigMarketList(params) {
    return api.get('/api/pig/market-list', params)
}

// 算法模型生猪销量/价格列表
export function getPigMarketSaleList(params) {
    return api.get('/api/pig/sale-list', params)
}