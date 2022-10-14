/**
 * 气泡控制类
 */
var ext_popup = ext_popup || {};

/**
 * @function ext_popup.createHtmlByInfo
 * @description	动态配置气泡弹窗
 * @param {Object} info
 */
ext_popup.createHtmlByInfo = function (info) {
	let containerHtml = "";
	containerHtml += '<div class="item">' +
		'<img src="./data/SYJ/images/tip_bg1.png" alt="">' +
		'<div class="list">' +
		'<div class="title">历史受灾害天数</div>' +
		'<div class="content">' +
		'<p>' +
		'<span>高温热害</span>' +
		'<span>' + info["gwrh"] + '天</span>' +
		'</p>' +
		'<p>' +
		'<span>低温冷害</span>' +
		'<span>' + info["dwlh"] + '天</span>' +
		'</p>' +
		'<p>' +
		'<span>暴雨</span>' +
		'<span>' + info["by"] + '天</span>' +
		'</p>' +
		'<p>' +
		'<span>干旱</span>' +
		'<span>' + info["gh"] + '天</span>' +
		'</p>' +
		'<p>' +
		'<span>大风</span>' +
		'<span>' + info["df"] + '天</span>' +
		'</p>' +
		'<p>' +
		'<span>雷电</span>' +
		'<span>' + info["ld"] + '天</span>' +
		'</p>' +
		'</div>' +
		'</div>' +
		'</div>';

	return containerHtml;
};