/**
 * 工具方法类
 */
var ext_util = ext_util||{};

/**
 * @function ext_util.getAreaLevelByCode
 * @description	通过行政编码获取行政区划级别
 * @param {Object} areaCode
 * @return {String}
 */
ext_util.getAreaLevelByCode = function(areaCode){
	// 判断
	switch(areaCode.length){
		case 6:
			if(parseInt(areaCode) % 10000 == 0){
				return "province";
			}else if(parseInt(areaCode) % 100 == 0){
				return "city";
			}else{
				return "county";
			}
		case 9:
			return "town";
		case 12:
			return "village";
		case 19:
			// 桐庐数据单独判断使用
			return "village";
		default:
			return null;
	}
};

/**
 * @function ext_util.FPconversion
 * @description	要素属性转换
 * @param {Object} properties
 * @return {Object}
 */
ext_util.FPconversion = function(properties){
	let resProperties = {};
	Object.getOwnPropertyNames(properties).forEach(function(key){
		if(key != "geometry") resProperties[key] = properties[key];
	});
	return resProperties;
};

/**
 * @function ext_util.objKeysToLowerCase
 * @description	对象key值转小写格式
 * @param {Object} obj
 * @return {Object}
 */
ext_util.objKeysToLowerCase = function(obj){
	for(let key in obj){
	    let newKey = key.toLowerCase();
		// 删除超图默认字段
		if(newKey.slice(0,2) == "sm"){
			delete obj[key];
			continue;
		} 
	    if((newKey != key)){
			obj[newKey] = obj[key];
			delete obj[key];
		}
	}
	return obj;
};

/**
 * @function ext_util.objKeysToUpperCase
 * @description	对象key值转大写格式
 * @param {Object} obj
 * @return {Object}
 */
ext_util.objKeysToUpperCase = function(obj){
	for(let key in obj){
	    let newKey = key.toUpperCase();
		// 删除超图默认字段
		if(newKey.slice(0,2) == "SM"){
			delete obj[key];
			continue;
		} 
	    if(newKey != key){
			obj[newKey] = obj[key];
			delete obj[key];
		}
	}
	return obj;
};

/**
 * @function ext_util.hexToRGB
 * @description	16进制转rgb
 * @param {String} hexColor
 * @return {Object} RGB
 */
ext_util.hexToRGB = function(hexColor){
	// 判断是否带#号
	if(hexColor.slice(0,1) == "#"){
		hexColor = hexColor.slice(1,hexColor.length);
	}
	// 十六进制颜色值的正则表达式
	const reg = /^([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	let sColor = hexColor.toLowerCase();
	if(sColor && reg.test(sColor)) {
		if(sColor.length === 4) {
			let sColorNew = "";
			for(let i=1; i<4; i+=1) {
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
			}
			sColor = sColorNew;
		}
		// 处理六位的颜色值
		let sColorChange = [];
		for(let i=0; i<6; i+=2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i,i+2)));
		}
		return {
			R:sColorChange[0], G:sColorChange[1], B:sColorChange[2]
		};
	}else{
		return sColor;
	}
};

/**
 * @function ext_util.objDeepCopy
 * @description	对象深拷贝
 * @param {Object} obj
 * @return {Object} 
 */
ext_util.objDeepCopy = function(obj){
	return JSON.parse(JSON.stringify(obj));
};

/**
 * @function ext_util.differenceByTurf
 * @description	通过从第一个多边形剪裁第二个多边形来查找两个多边形之间的差异
 * @param {Object} G1 GeoJson格式数据
 * @param {Object} G2 GeoJson格式数据
 */
ext_util.differenceByTurf = function(G1,G2){
	let G1JsonCollect = turf.flatten(G1);
	let G2JsonCollect = turf.flatten(G2);
	// 临时结果要素集合
	let tempFeatures = [];
	// 相交分析
	G1JsonCollect.features.forEach(function (layer1) {
		G2JsonCollect.features.forEach(function (layer2) {
			let difference = null;
			try{
				difference = turf.difference(layer1, layer2);
			}catch(e){
				//layer1 = turf.buffer(layer1, 0);
				//difference = turf.difference(layer1, layer2);
				console.log("--- difference catch ---");
			}
			if(difference != null){
				// 结果赋值
				difference.properties["TURF"] = "difference";
				tempFeatures.push(difference);
			}
		});
	});
	// 合并 -> geoJson
	let tempFeaturesCollect = turf.featureCollection(tempFeatures);
	return tempFeaturesCollect;
};

/**
 * @function ext_util.intersectByTurf
 * @description	通过从第一个多边形相交第二个多边形来查找两个多边形之间的交集
 * @param {Object} G1 GeoJson格式数据
 * @param {Object} G2 GeoJson格式数据
 */
ext_util.intersectByTurf = function(G1,G2){
	let G1JsonCollect = turf.flatten(G1);
	let G2JsonCollect = turf.flatten(G2);
	// 临时结果要素集合
	let tempFeatures = [];
	// 相交分析
	G1JsonCollect.features.forEach(function (layer1) {
		G2JsonCollect.features.forEach(function (layer2) {
			let intersection = null;
			try {
				intersection = turf.intersect(layer1, layer2);
			} catch (e) {
				layer1 = turf.buffer(layer1, 0);
				intersection = turf.intersect(layer1, layer2);
				console.log("--- intersect catch ---");
			}
			if (intersection != null) {
				// 结果赋值
				intersection.properties["TURF"] = "intersect";
				tempFeatures.push(intersection);
			}
		});
	});
	// 合并 -> geoJson
	let tempFeaturesCollect = turf.featureCollection(tempFeatures);
	return tempFeaturesCollect;
};