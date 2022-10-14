import request from '@/util/http.js'
const BASE_URL = '/admin'

export function jntIndexInfo() {
  return request.post(BASE_URL + '/jsc/index/info')
}

export function getTownList() {
  return request.post(BASE_URL + '/jsc/area/get_town_list')
}

export function getYearSolveList() {
  return request.post(BASE_URL + '/jsc/feedback/get_recent_year_solve_list')
}

export function getFeedbackList(params) {
  return request.post(BASE_URL + '/jsc/feedback/get_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getJzxProjectOverview(params) {
  return request.post(BASE_URL + '/jsc/project/get_jzx_project_overview', params)
}

export function getJzxProjectList(params) {
  return request.post(BASE_URL + '/jsc/project/get_all_project_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getReserveList(params) {
  return request.post(BASE_URL + '/jsc/project_reserve/get_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getMbzInfo(params) {
  return request.post(BASE_URL + '/jsc/understand_paper/index_info', params)
}

export function getQuestionList(params) {
  return request.post(BASE_URL + '/jsc/understand_paper/section_question_list', params, { responseType: params.is_export ? 'blob' : '' })
}
export function getQuestionInfo(params) {
  return request.post(BASE_URL + '/jsc/understand_paper/section_question_detail', params, { responseType: params.is_export ? 'blob' : '' })
}
export function getAnswerInfo(params) {
  return request.post(BASE_URL + '/jsc/understand_paper/section_answer_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getSearchList(params) {
  return request.post(BASE_URL + '/jsc/understand_paper/search_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getFinancialList(params) {
  return request.post(BASE_URL + '/jsc/index/get_financial_distribution_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getHnOverview(params) {
  return request.post(BASE_URL + '/jsc/project_sub/get_hn_czbt_project_overview', params)
}

export function getHnList(params) {
  return request.post(BASE_URL + '/jsc/project_sub/get_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getTownProject(params) {
  return request.post(BASE_URL + '/jsc/index/get_click_map_town_project_list', params, { responseType: params.is_export ? 'blob' : '' })
}

export function getFirstCategoryList(params) {
  return request.post(BASE_URL + '/jsc/mbz_yhhx_category/get_first_category_list', params)
}

export function getSecondCategoryList(params) {
  return request.post(BASE_URL + '/jsc/mbz_yhhx_category/get_second_category_list', params)
}

export function mbzYhhxUserList(params) {
  return request.post(BASE_URL + '/jsc/mbz_yhhx_user/get_user_list', params)
}
