/**
 * TODO 获取URL参数
 * @param {name} String
 */
const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * Echarts图表字体、间距自适应
 * @param {*} size 默认宽度下的尺寸
 * @param {*} defaultWidth 默认设计图宽度
 * @returns
 */
const fitChartSize = (size, defaultWidth = 1920) => {
  let clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return size
  let scale = clientWidth / defaultWidth
  return Number((size * scale).toFixed(3))
}

/**
 * 浮点数保留两位小数
 * @param {*} num
 * @returns
 */
const keepTwoDecimal = num => {
  var result = parseFloat(num)
  if (isNaN(result)) {
    return 0
  }
  result = Math.round(num * 100) / 100
  return result
}

/**
 * 向iframe发消息
 * @param {*} type 消息类型
 * @param {*} data 传参
 */
const sendMessage = (type, data) => {
  // console.log('向iframe传递数据', data)
  let iframe = document.getElementById('gisIframe')
  iframe && iframe.contentWindow.postMessage({ type: type, data: data }, '*')
}

/**
 * 电话号码脱敏
 * @param {*} strInfo
 * @returns
 */
const desensitization = strInfo => {
  let reg = /\d{7}/ //验证一个长度为7的整数
  let str = strInfo //将传入的包含电话号码的形参strInfo赋值给变量str
  let str2 = str
    .split('')
    .reverse()
    .join('') //数据翻转 为了使号码后三位是明码
  let arr = str2.match(reg) //match方法会返回检索值的下标
  let newstrInfo = '' //处理完的返回数据
  if (arr != null) {
    //文字中有7位数整数
    //substring方法用来截取指定位置的字符
    //str2.substring(0,arr.index+3) 从翻转后的字符串的第一个字符截取到号码的第三位数字,
    //'****'中间四位用*号替代
    //str2.substring(arr.index+7) 截取保留*号处理后面的全部字符
    let str3 = str2.substring(0, arr.index + 3) + '****' + str2.substring(arr.index + 7)
    //将处理完的字符再翻转回来
    newstrInfo = str3
      .split('')
      .reverse()
      .join('')
  } else {
    //文字中没有7位数整数,返回原数据
    newstrInfo = str
  }
  return newstrInfo //将处理完的数据返回出去
}

/**
 * @param {string} first - first date string
 * @param {string} second - second date string
 * @param {'asc' | 'desc'} [order = 'desc'] - order
 * @returns {number}
 */
export function compareDateString(first, second, order = 'desc') {
  return order === 'asc' ? new Date(first).getTime() - new Date(second).getTime() : new Date(second).getTime() - new Date(first).getTime()
}

export function sanitizeInvalidDate(string) {
  if (!string || string.startsWith('0000')) {
    return '-'
  }
  return string;
}

export function sliceCircularArray(array, start, size) {
  if (Array.isArray(array) && array.length > 0) {
    const reverse = size < 0;
    const absSize = Math.abs(size);
    let normalizedStart = start % array.length > 0 ? start % array.length : start % array.length + array.length;
    const normalizedSize = Math.min(absSize, array.length);
    if (reverse) {
      if (normalizedStart >= normalizedSize) {
        normalizedStart -= normalizedSize;
      } else {
        normalizedStart = normalizedStart - normalizedSize + array.length;
      }
    }
    const overflowLen = Math.max(normalizedStart + normalizedSize - array.length, 0);
    return [...array.slice(normalizedStart, normalizedStart + normalizedSize), ...array.slice(0, overflowLen)]
  } else {
    return []
  }
}



export default {
  getQueryString,
  fitChartSize,
  keepTwoDecimal,
  sendMessage,
  desensitization,
}
