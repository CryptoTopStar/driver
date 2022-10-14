import api from '@/util/http.js';

// 农机资源列表
export function machineresourceList(params) {
    return api.get('/api/machine/resource-list', params)
}

