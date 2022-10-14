/**
 * 气泡控制类
 */
var ext_popup = ext_popup||{};

/**
 * @function ext_popup.createHtmlByInfo
 * @description	动态配置气泡弹窗
 * @param {Object} info
 */
ext_popup.createHtmlByInfo = function(info){
	let containerHtml = "";
	/* containerHtml +='<div class="item">'+
					'<div class="title">'+info["company"]+'</div>'+
					'<div class="content">'+
					'<p>'+
					'<span>所属街道</span>'+
					'<span>'+info["town"]+'</span>'+
					'</p>'+
					'<p>'+
					'<span>栽培面积</span>'+
					'<span>'+info["cultivated"]+'</span>'+
					'</p>'+
					'<p>'+
					'<span>栽培品种</span>'+
					'<span>'+info["cultivar"]+'</span>'+
					'</p>'+
					'<p>'+
					'<span>厂房规模</span>'+
					'<span>'+info["plant_size"]+'</span>'+
					'</p>'+
					'<p>'+
					'<span>负责人</span>'+
					'<span>'+info["principal"]+'</span>'+
					'</p>'+
					'<p>'+
					'<span>联系电话</span>'+
					'<span>'+ext_popup.phoneNumCheck(info["phone"])+'</span>'+
					'</p>'+
					'</div>'+
					'</div>'; */
	
	 containerHtml += '<div class="item">'+
					  '<img src="./data/SYJ/images/tip_bg1.png" alt="">'+
					  '<div class="list">'+
					  '<div class="title">'+info["company"]+'</div>'+
					  '<div class="content">'+
					  '<p>'+
					  '<span>所属街道</span>'+
					  '<span>'+info["town"]+'</span>'+
					  '</p>'+
					  '<p>'+
					  '<span>栽培面积</span>'+
					  '<span>'+info["cultivated"]+'</span>'+
					  '</p>'+
					  '<p>'+
					  '<span>栽培品种</span>'+
					  '<span>'+info["cultivar"]+'</span>'+
					  '</p>'+
					  '<p>'+
					  '<span>厂房规模</span>'+
					  '<span>'+info["plant_size"]+'</span>'+
					  '</p>'+
					  '<p>'+
					  '<span>负责人</span>'+
					  '<span>'+info["principal"]+'</span>'+
					  '</p>'+
					  '<p>'+
					  '<span>联系电话</span>'+
					  '<span>'+ext_popup.phoneNumCheck(info["phone"])+'</span>'+
					  '</p>'+
					  '</div>'+
					  '</div>'+
					  '</div>';
	
	return containerHtml;
};

/**
 * @function ext_popup.phoneNumCheck
 * @description	手机号码校验
 * @param {Object} phoneNum
 */
ext_popup.phoneNumCheck = function(phoneNum){
	let reg =/(\d{3})\d{4}(\d{4})/; //正则表达式
	let resNum = phoneNum.replace(reg, "$1****$2")
	return resNum;
};