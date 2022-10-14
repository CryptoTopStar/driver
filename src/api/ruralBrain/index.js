import request from '@/util/http.js';
const BASE_URL = '/api'

// 乡村大脑-主题列表
export function categoryList() {
  return request.get(BASE_URL + '/village-brain/category-list')
}

// 乡村大脑-资源目录列表
export function tableList(params) {
  return request.get(BASE_URL + '/village-brain/table-list', params)
}

// 乡村大脑-表信息
export function tableInfo(params) {
  return request.get(BASE_URL + '/village-brain/table-info', params)
}

// 查询所有资源目录
export function categoryTableList(params) {
  return request.get(BASE_URL + '/village-brain/category-table-list', params)
}