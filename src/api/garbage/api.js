import api from '@/util/http.js';

// 正确率列表
export function classificationAccuracyList(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getDbRubbishCollectAccuracyRateToday', params)
    // return api.get('/api/garbage-classification/accuracy-list', params)
}

// 模块数据
export function classificationModuletData(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getDbRubbishCollectTodayBasicData', params)
    // return api.get('/api/garbage-classification/module-data', params)
}

// 分时投放情况列表
export function classificationSituationList(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getDbRubbishCollectWeightSevenDays', params)
    // return api.get('/api/garbage-classification/situation-list', params)
}

// 当日预警列表
export function classificationAlertList(params) {
    return api.get('/api/garbage-classification/alert-list', params)
}

// 清运人员列表
export function classificationClearanceList(params) {
    return api.get('/api/garbage-classification/clearance-list', params)
}

// 车辆轨迹列表
export function classificationTrackList(params) {
    return api.get('/api/garbage-classification/track-list', params)
}

// 实时垃圾分类情况列表
export function classificationRealTimeList(params) {
    // return api.get('/jiangshan-api/garbage-classification/real-time-list', params)
    return api.get('/api/garbage-classification/real-time-list', params)
}

// 获取当前垃圾token 
export function getGarbageToken(params) {
    return api.get('/jiangshan-api/auth/oauth/token', params)
}

// 获取当前垃圾列表
export function rubbishGetRealTimeRubbishCollectByPage(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getCurrentDayRubbishCollectByPage', params)
}

// 垃圾红黑榜单
export function rubbishgetDbRealTimeRubbishCollectRedBlackList(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getDbRealTimeRubbishCollectRedBlackList', params)
}

// 获取近七日数据
export function rubbishgetDbRubbishCollectSevenDaysBasicData(params) {
    return api.get('/jiangshan-api/data-bridge/rubbish/getDbRubbishCollectSevenDaysBasicData', params)
}