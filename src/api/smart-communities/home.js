import request from '@/util/http.js';
import {ref, reactive} from "vue";
import {classificationModuletData, getGarbageToken} from "@/api/garbage/api";
import {set} from 'lodash'

// 未来社区主页模块数据
export function getHomePageData(params) {
  return request.get('/api/future-community/module-data', params);
}
// 未来社区主页监管人员数据
export function getSupervisors(params) {
  return request.get('/api/future-community/supervision-list', params);
}
// 未来社区主页图书管的数据汇总信息
export function getLibraryStats() {
  return request.get('/jiangshan-api/data-bridge/library/getDbLibrarySummary?libraryId=330881000');
}

export function useHomePageData() {
  const isLoading = ref(false);
  const data = reactive({});
  const supervisors = reactive([]);
  const hasRetrievedToken = ref(false)

  getGarbageToken({
    grant_type: "client_credentials",
    client_id: "anchu_js",
    client_secret: "123456",
  }).then((res) => {
    localStorage.setItem("garbageToken", res.data.access_token);
    hasRetrievedToken.value = true;
  })
    .then(()=>{
    return Promise.allSettled([getHomePageData(), getSupervisors(), classificationModuletData({
      street: "大陈乡",
      dsCode: "A000013",
    }), getLibraryStats()])
  })
    .then((results)=>{
      if (results[0].status === 'fulfilled') {
        Object.assign(data, results[0].value.data)
      }
      if (results[1].status === 'fulfilled') {
        supervisors.push(...results[1].value.data)
      }
      if (results[2].status === 'fulfilled') {
        set(data, ['service', 'garbage_classification_rate'], results[2].value.data.correctRate)
      }
      if (results[3].status === 'fulfilled') {
        set(data, ['culture', 'user'], results[3].value.data.collectionNum)
        set(data, ['culture', 'borrowing_amount'], results[3].value.data.borrowNum)
      }
    })
    .finally(()=>{
    isLoading.value = true;
  })

  return {
    isLoading,
    data,
    supervisors,
    hasRetrievedToken
  }
}
