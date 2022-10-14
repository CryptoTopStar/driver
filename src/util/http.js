/**
 * 封装axios
 */
import { ElMessage } from 'element-plus'
import axios from 'axios'
const request = axios.create({
  timeout: 60 * 1000, // 请求超时时间
  // headers: { token: localStorage.getItem('token'), Authorization: localStorage.getItem('garbageToken') ? localStorage.getItem('garbageToken') : "" },
  headers: { token: localStorage.getItem('token'), },
})

function asFile(config) {
  return (
    [
      '/api/report/export',
    ].includes(config.url)
  );
}

// 请求拦截器
request.interceptors.request.use(
  config => {
    // console.log(config)
    if (config.url.indexOf("jiangshan-jsc") != -1) {
      config.headers['Authorization'] = "Bearer " + localStorage.getItem('weatherToken')
    } else if (config.url.indexOf("jiangshan-api") != -1) { 
      config.headers['Authorization'] = "Bearer " + localStorage.getItem('garbageToken')
    }
    if (asFile(config)) {
      console.log(config)
      config.responseType = 'blob';
    }
    return config
  },
  err => {
    ElMessage.error('请求超时')
    return Promise.resolve(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 正常返回
    if (['application/zip', 'application/vnd.ms-excel', 'application/octet-stream', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(response.headers["content-type"])) {
      if (response.statusText === "OK") {
        // const filenameStr = response.headers['content-disposition'].split(';').find(str => str.includes('filename')) ?? '';
        return {
          data: {
            data: response.data,
          }
          // fileName: /^filename="?(?<name>.+)"?$/.exec(filenameStr.trim())?.groups.name,
          // MIMEType: response.headers['content-type'],
        };
      }
      return Promise.reject(new Error(response.statusText))
    }

    const { data } = response
    if (data.code == 0) {
      // 成功返回
      return response
    } else {
      ElMessage.warning(`请求异常 ${data.msg}${data.code}`)
      return Promise.reject(data.msg)
    }
  },
  error => {
    ElMessage.error('请求失败，请稍后再试')
    return Promise.reject(error)
  }
)

// 导出两个请求方法
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      request
        .get(url, {
          params,
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, params = {}, config) {
    return new Promise((resolve, reject) => {
      request
        .post(url, params, config)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
