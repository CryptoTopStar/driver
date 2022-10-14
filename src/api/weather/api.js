import api from '@/util/http.js';

// 获取当前气象资源token 
export function getWeatherToken(params) {
    return api.get('/jiangshan-jsc/auth/oauth/token', params)
}

// 获取近5个月的天气温度和降水
export function weatherGetWeatherLastFiveMonth(params) {
    return api.get('/jiangshan-jsc/data-bridge/weather/getWeatherLastFiveMonth', params)
}

