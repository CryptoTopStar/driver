export const tokenMap = {
  // 数据资产指标
  jsc_sjzc_zb: '744D27150F6693C5D5A3DBF0FD343AA4',

  // 数据服务弹窗
  jsc_sjzc_sjfwtc: 'CEFFDFA73BBF5DF767A19D299074DA2A',
  // 数据来源弹窗
  jsc_sjzc_sjlytc: 'B1FC419EBCBF10BA4B88C6071599EFDE',
  // 资源使用弹窗
  jsc_sjzc_zysytc: '75C0DA67DA7228CA7E197DBA75FC95C6',

  // 数据资产_接口调用量
  jsc_sjzc_top10_24xs: '5E0A8DBA49ADC366038A3CFB2C75B3E7',
  jsc_sjzc_top10_7t: '5D37987E760FE0191F2220A873E19484',
  jsc_sjzc_top10_30t: 'CF99804BF80A48D82D153B64FD381A1E',
  jsc_sjzc_top10_h: 'F8CBD112AE395F20A2977DCE5611BD2D',
  // 数据资产_活跃度
  jsc_sjzc_hyd_24h: '2A8E6681FAF8DEF84E566587BA7AD0A8',
  jsc_sjzc_hyd_7t: '14D38DD576EBF29BBCD5BB1AF8B9D401',
  jsc_sjzc_hyd_30t: '998A891E84BA41C48C64AE741D1BFD0A',
};


export function fetchDtapi(api, params = {"inFields": {}}, fullRequestConfig) {
  const defaultConfig = {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'API-TOKEN': tokenMap[api],
      'Content-Type': 'application/json'
    }
  };
  return fetch(`https://jiangshan-dtapi.zjsszxc.com/api/gateway/${api}`, fullRequestConfig || defaultConfig )
    .then(r=>r.json())
}
