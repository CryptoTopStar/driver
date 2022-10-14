import { reg } from './RegExp'
/* Echarts图表字体、间距自适应 */
const fitChartSize = (size, defaultWidth = 1920) => {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return size;
  let scale = clientWidth / defaultWidth;
  return Number((size * scale).toFixed(3));
};

// 浮点数保留两位小数
const keepTwoDecimal = (num) => {
  var result = parseFloat(num);
  if (isNaN(result)) {
    return 0;
  }
  result = Math.round(num * 100) / 100;
  return result;
};

// 定义数据间隔
const dataInterval = [0, 50, 500, 3000, 10000, 20000, 30000, 40000, 50000];

// 处理源数据 数据映射 data:源数据
const getTransferData = (data) => {
  return data
    .map((item) => {
      const value = item.value;

      // 寻找在数据间隔里小于amount的最大值
      const min_v = Math.max(...dataInterval.filter((v) => v <= value));
      // 寻找在数据间隔里大于amount的最小值
      const max_v = Math.min(...dataInterval.filter((v) => v > value));

      // 寻找 min_v 所在的下标
      const index = dataInterval.findIndex((v) => v === min_v);

      // 计算该amount在y轴上应该展示的位置
      const y_value = ((value - min_v) / (max_v - min_v)) * 10 + index * 10;

      return {
        value: keepTwoDecimal(y_value),
        realValue: keepTwoDecimal(value),
        name: item.name,
      };
    })
    .filter((x) => x);
};

// 向iframe发消息 type：消息类型 data：穿参
const sendMessage = (type, data) => {
  // console.log("向iframe传递数据", type, data);
  let iframe = document.getElementById("gisIframe");
  iframe && iframe.contentWindow.postMessage({ type: type, data: data }, "*");
};

// 占比列表图表工具函数
const getArrByKey = (data, k) => {
  let key = k || "value";
  let res = [];
  if (data) {
    data.forEach(function (t) {
      res.push(t[key]);
    });
  }
  return res;
};
const getSymbolData = (data) => {
  let arr = [];
  for (var i = 0; i < data.length; i++) {
    arr.push({
      value: data[i].value,
      symbolPosition: "end",
    });
  }
  return arr;
};

const desensitization = (strInfo) => {
  let reg = /\d{7}/; //验证一个长度为7的整数
  let str = strInfo; //将传入的包含电话号码的形参strInfo赋值给变量str
  let str2 = str.split("").reverse().join(""); //数据翻转 为了使号码后三位是明码
  let arr = str2.match(reg); //match方法会返回检索值的下标
  let newstrInfo = ""; //处理完的返回数据
  if (arr != null) {
    //文字中有7位数整数
    //substring方法用来截取指定位置的字符
    //str2.substring(0,arr.index+3) 从翻转后的字符串的第一个字符截取到号码的第三位数字,
    //'****'中间四位用*号替代
    //str2.substring(arr.index+7) 截取保留*号处理后面的全部字符
    let str3 =
      str2.substring(0, arr.index + 3) + "****" + str2.substring(arr.index + 7);
    //将处理完的字符再翻转回来
    newstrInfo = str3.split("").reverse().join("");
  } else {
    //文字中没有7位数整数,返回原数据
    newstrInfo = str;
  }
  return newstrInfo; //将处理完的数据返回出去
};

const segmentation = (num) => {
  console.log(num, 'nul')
  if(num) {
    return num.toString().replace(reg[0], ',');
  } else {
    return 0;
  }
}

export const downloadAs = (stream, name, MIMEType) => {
  if (stream && name) {
    const blob = new Blob([stream], {
      type: MIMEType,
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href); // 释放URL 对象
    document.body.removeChild(link);
  }
};

export default {
  fitChartSize,
  keepTwoDecimal,
  getTransferData,
  sendMessage,
  getArrByKey,
  getSymbolData,
  desensitization,
  segmentation
};
