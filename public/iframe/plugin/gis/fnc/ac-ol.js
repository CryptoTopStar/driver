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

/**
 * 事件控制类
 */
var ext_event = ext_event||{};

/**
 * map事件类型
 * 
 * LEFT_CLICK:鼠标左键单击事件
 * LEFT_DOUBLE_CLICK:鼠标左键双击事件
 * MOUSE_MOVE:鼠标移动事件
 * WHEEL:鼠标滚轮事件
 * 
 */
ext_event.mapEventType = {
	LEFT_CLICK: "singleclick",		// 真正的单机，延迟250毫秒，
	LEFT_DOUBLE_CLICK: "dblclick",  // 真正的双击
	MOUSE_WHEEL: "moveend", 		// 鼠标滚动事件
	MOUSE_MOVE: "pointermove", 		// 鼠标移动事件 
	MOUSE_DRAG: "pointerdrag", 		// 鼠标拖拽事件 
};

/**
 * @function ext_event.mapEventOn
 * @description	事件添加
 * @param {String} eventType 事件类型
 */
ext_event.mapEventOn = function(fnc,eventType){
	map.on(ext_event.mapEventType[eventType],fnc);
};

/**
 * @function ext_event.mapEventUn
 * @description	事件移除
 * @param {String} eventType 事件类型
 */
ext_event.mapEventUn = function(eventType){
	let listenerArr = map.listeners_[ext_event.mapEventType[eventType]];
	if(listenerArr && listenerArr.length) map.un(ext_event.mapEventType[eventType],listenerArr[0]);
};

/**
 * 图层控制类
 */
var ext_layerControl = ext_layerControl||{};

/**
 * @function ext_layerControl.tdtLayer
 * @description	初始化天地图图层
 * @param {String} name 图层名称，default "tdtLayer"
 * @param {String} type 天地图图层类型(vec:矢量图层，img:影像图层，ter:地形图层)，default "img"
 * @param {String} sourceType 资源类型("WMTS"，"XYZ")，default "WMTS"
 * @param {String} key 开发者key，default "6a4522498e001c6ec374d880898dfacd"
 * @param {Boolean} isLabel 是否是label图层，default false
 * @param {String} projection 坐标系，default "EPSG:4326"
 * @param {Number} minZoom 图层最小比例尺等级，default 0
 * @param {Number} maxZoom 图层最大比例尺等级，default 18
 * @param {Number} zIndex 图层层级，default 0
 * @return ol.layer.Tile
 */
ext_layerControl.tdtLayer = function({name="tdtLayer",type="img",sourceType="WMTS",key="6a4522498e001c6ec374d880898dfacd",isLabel=false,projection="EPSG:4326",minZoom=0,maxZoom=18,zIndex=0}){
	switch(sourceType){
		case "WMTS":
			return new ol.layer.Tile({
				name: name,
				type: "tdtLayer",
				source: new ol.source.Tianditu({
					layerType: type,
					key: key,
					isLabel: isLabel,
					projection: projection
				}),
				minZoom: minZoom,
				maxZoom: maxZoom,
				zIndex: zIndex
			});
		case "XYZ":
			let layerType = isLabel ? ((type == "img") ? "cia" : ((type == "vec") ? "cva" : ((type == "ter") ? "cta" : ""))) : type;
			return new ol.layer.Tile({
				name: name,
				type: "tdtLayer",
				source: new ol.source.XYZ({
					//url:  'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=4caf91d8465b13654a44b4f71c35e7e0',
					url : "https://t{0-7}.tianditu.gov.cn/DataServer?T="+layerType+"_w&x={x}&y={y}&l={z}&tk="+key
				}),
				minZoom: minZoom,
				maxZoom: maxZoom,
				zIndex: zIndex
			});
		default:
			return null;
	}
};

/**
 * @function ext_layerControl.vectorLayer
 * @description	初始化矢量图层
 * @param {String} name 图层名称，default "vectorLayer"
 * @param {Object} type 矢量图层类型，点(point)，线(line)，面(polygon)，文本标签(text)
 * @param {Object} style 图层样式对象
 * @param {String} projection 坐标系，default "EPSG:4326"
 * @param {Number} minZoom 图层最小比例尺等级，default 0
 * @param {Number} maxZoom 图层最大比例尺等级，default 18
 * @param {Number} zIndex 图层层级，default 0
 * @return ol.layer.Tile
 */
ext_layerControl.vectorLayer = function({name="vectorLayer",type,style=null,projection="EPSG:4326",minZoom=0,maxZoom=18,zIndex=0}){
	// 矢量图层
	let vectorLayer = new ol.layer.Vector({
		name: name,
		type: "vectorLayer",
		source: new ol.source.Vector({
			projection: projection,
		}),
		//样式设置
		style: null,
		minZoom: minZoom,
		maxZoom: maxZoom,
		zIndex: zIndex,
		declutter: (type == "text") ? true : false
	});
	// 配置样式
	if(style) return ext_layerControl.vectorLayerSetStyle(vectorLayer,type,style);
	return vectorLayer;
};
/**
 * @function ext_layerControl.vectorLayerSetStyle
 * @description	矢量图层样式设置
 * @param {Object} layer 图层对象
 * @param {Object} type 矢量图层类型，点(point)，线(line)，面(polygon)，文本标签(text)
 * @param {Object} iconField 图标字段，当设置此属性时，优先从feature要素中获取数据(marker点配置单体化样式时使用) default null
 * @param {Object} iconSUFF 图标后缀，例：".png"，默认为""
 * @param {Object} icon ol.style.Icon 要素点图标样式
 * @param {Object} circle ol.style.Circle 要素点圆形样式
 * @param {Object} fill ol.style.Fill 要素填充样式
 * @param {Object} stroke ol.style.Stroke 要素边界样式
 * @param {Object} text ol.style.Text 要素文字样式
 */
ext_layerControl.vectorLayerSetStyle = function(layer,type,{iconField=null,icon,iconSUFF="",circle,fill,stroke,text}){
	switch(type){
		case "point":
			// 设置样式
			layer.setStyle(function (feature) {
				let style_temp = new ol.style.Style(
				{
					image: icon ? new ol.style.Icon({
						src: iconField ? icon.src + feature.get(iconField)+iconSUFF : icon.src+iconSUFF,
						anchor: icon.anchor ? icon.anchor : [0.5,0.5],
						scale: icon.scale ? icon.scale : 1
					}) : (circle ? new ol.style.Circle({
						//点的半径
						radius: circle.radius ? circle.radius : 12,
						fill: circle.fill ? new ol.style.Fill(circle.fill) : new ol.style.Fill({"color":"rgba(0,191,255,0.5)"}), 
						stroke: circle.stroke ? new ol.style.Stroke(circle.stroke) : new ol.style.Stroke({"color":"rgba(0,0,0,1)","width":3})
					}) : null),
					text: text ? new ol.style.Text({
						text: text.field ? ((feature.get(text.field) != undefined) ? feature.get(text.field)+"" : "") : null,
						font: text.font ? text.font : "16px Calibri",
						fill: text.fill ? new ol.style.Fill(text.fill) : null,
						stroke: text.stroke ? new ol.style.Stroke(text.stroke) : null,
						offsetX: text.offsetX ? text.offsetX : 0, //水平文本偏移量（以像素为单位）。正数将使文本右移。
						offsetY: text.offsetY ? text.offsetY : 0 //垂直文本偏移量（以像素为单位）。正值将使文本向下移动。
					}) : null
				});
				return style_temp;
			});
			return layer;
		case "line":
			// 设置样式
			layer.setStyle(function (feature) {
				let style_temp = new ol.style.Style({
					stroke: stroke ? new ol.style.Stroke(stroke) : null
				});
				return style_temp;
			});
			return layer;
		case "polygon":
			// 设置样式
			layer.setStyle(function (feature) {
				let style_temp = new ol.style.Style({
					fill: fill ? new ol.style.Fill(fill) : null,
					stroke: stroke ? new ol.style.Stroke(stroke) : null,
					text: text ? new ol.style.Text({
						text: text.field ? ((feature.get(text.field) != undefined) ? feature.get(text.field)+"" : "") : null,
						font: text.font ? text.font : "16px Calibri",
						fill: text.fill ? new ol.style.Fill(text.fill) : null,
						stroke: text.stroke ? new ol.style.Stroke(text.stroke) : null,
						offsetX: text.offsetX ? text.offsetX : 0, //水平文本偏移量（以像素为单位）。正数将使文本右移。
						offsetY: text.offsetY ? text.offsetY : 0 //垂直文本偏移量（以像素为单位）。正值将使文本向下移动。
					}) : null
				});
				return style_temp;
			});
			return layer;
		case "text":
			// 设置样式
			layer.setStyle(function (feature) {
				let style_temp = new ol.style.Style({
					text: text ? new ol.style.Text({
						text: text.field ? ((feature.get(text.field) != undefined) ? feature.get(text.field)+"" : "") : null,
						font: text.font ? text.font : "16px Calibri",
						fill: text.fill ? new ol.style.Fill(text.fill) : null,
						stroke: text.stroke ? new ol.style.Stroke(text.stroke) : null,
						offsetX: text.offsetX ? text.offsetX : 0, //水平文本偏移量（以像素为单位）。正数将使文本右移。
						offsetY: text.offsetY ? text.offsetY : 0 //垂直文本偏移量（以像素为单位）。正值将使文本向下移动。
					}) : null
				});
				return style_temp;
			});
			return layer;
		default:
			return null;
	}
};

/**
 * @function ext_layerControl.overLayer
 * @description	overLayer叠加层
 * @param {String} id	default "popup"
 * @param {Object} element HTMLElement DOM对象
 * @param {Array} offset 右移，下移为正，default [0,0]
 * @param {String} positioning 定义叠加层相对于其position属性的实际定位方式，default "bottom-center",
 * 可选值：'bottom-left', 'bottom-center', 'bottom-right', 
 * 		   'center-left', 'center-center', 'center-right', 
 * 		   'top-left', 'top-center',  'top-right'
 * @param {Boolean} autoPan default true，是否开启自动平移
 * @return {Object} ol.Overlay
 */
ext_layerControl.overLayer = function({id="popup",element,offset=[0,0],positioning="bottom-center",autoPan=true}){
	// 暂仅支持HTMLDivElement
	if((!element) || (Object.prototype.toString.call(element) != "[object HTMLDivElement]")){
		return null;
	}
	// 创建overlay图层
	return new ol.Overlay(({
		id: id,
		element: element, // 绑定 Overlay 对象和 DOM 对象的
		offset: offset, // 右，下为正
		positioning: positioning,
		autoPan: autoPan, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
		autoPanAnimation: {
			duration: 250 //自动平移效果的动画时间
		}
	}));
};

/**
 * @function ext_layerControl.wmsLayer
 * @description	初始化wms图层
 * @param {String} name 图层名称，default "wmsLayer"
 * @param {Number} opacity Opacity (0, 1)，default 1
 * @param {String} mapUrl 地图服务url
 * @param {String} layerName 图层名称
 * @param {String} projection 坐标系，default "EPSG:4326"
 * @param {Number} minZoom 图层最小比例尺等级，default 0
 * @param {Number} maxZoom 图层最大比例尺等级，default 18
 * @param {Number} zIndex 图层层级，default 0
 * @return ol.layer.Tile
 */
ext_layerControl.wmsLayer = function({name="wmsLayer",opacity=1,mapUrl,layerName,projection="EPSG:4326",minZoom=0,maxZoom=18,zIndex=0}){
	return new ol.layer.Tile({
		name: name,
		type: "wmsLayer",
		opacity: opacity,
		source: new ol.source.TileWMS({
			url: mapUrl,
			params: {
				'LAYERS': layerName,
				'FORMAT': 'image/png'
			},
			projection:projection
		}),
		minZoom: minZoom,
		maxZoom: maxZoom,
		zIndex: zIndex
	});
};

/**
 * @function ext_layerControl.supermapLayer
 * @description	初始化supermap图层
 * @param {String} name 图层名称，default "spLayer"
 * @param {String} mapUrl 地图服务url
 * @param {String} layerName 图层名称
 * @param {Boolean} transparent 是否背景透明，default true
 * @param {Boolean} cacheEnabled 是否生成服务端缓存，default false，慎用!!!
 * @param {String} projection 坐标系，default "EPSG:4326"
 * @param {Number} minZoom 图层最小比例尺等级，default 0
 * @param {Number} maxZoom 图层最大比例尺等级，default 18
 * @param {Number} zIndex 图层层级，default 0
 * @return ol.layer.Tile
 */
ext_layerControl.supermapLayer = function({name="spLayer",mapUrl,layerName,transparent=true,cacheEnabled=false,projection="EPSG:4326",minZoom=0,maxZoom=18,zIndex=0}){
	return new ol.layer.Tile({
		name: name,
		type: "spLayer",
		source: new ol.source.TileSuperMapRest({
			url: mapUrl + "/" + layerName,
			transparent: transparent,
			cacheEnabled: cacheEnabled,
			//wrapX: true
		}),
		projection: projection,
	    minZoom: minZoom,
	    maxZoom: maxZoom,
	    zIndex: zIndex
	});
};

/**
 * @function ext_layerControl.imageLayer
 * @description	初始化image图层
 * @param {String} name 图层名称，default "imageLayer"
 * @param {Number} opacity Opacity (0, 1)，default 1
 * @param {String} imageUrl 图片url
 * @param {Array} extent 图像范围 [左，下，右，上]
 * @param {String} projection 坐标系，default "EPSG:4326"
 * @param {Number} minZoom 图层最小比例尺等级，default 0
 * @param {Number} maxZoom 图层最大比例尺等级，default 18
 * @param {Number} zIndex 图层层级，default 0
 * @return ol.layer.Tile
 */
ext_layerControl.imageLayer = function({name="imageLayer",opacity=1,imageUrl,extent,projection="EPSG:4326",minZoom=0,maxZoom=18,zIndex=0}){
	return new ol.layer.Image({
		name: name,
		type: "imageLayer",
		opacity: opacity,
		source: new ol.source.ImageStatic({
			url: imageUrl,//图片网址
			projection: 'EPSG:4326',//投影
			imageExtent: extent//图像坐标[minLon,minLat,maxLon,maxLat]
		}),
		extent:extent,//图层渲染范围，可选值，默认渲染全部
		zIndex: zIndex
	});
};

/**
 * @function ext_layerControl.getOverlayById
 * @description	根据id获取overlayer图层
 * @param {String} id
 * @return {Object} ol.Overlay
 */
ext_layerControl.getOverlayById = function(id){
	// 获取overlay图层
	let olLyrs = map.getOverlays().getArray();
	let olLyrsLength = olLyrs.length;
	// 由大 --> 小循环
	for(let i=olLyrsLength-1;i>=0;i--){
		if((olLyrs[i].id == id)){
			return olLyrs[i];
		}
	}
	return null;
};

/**
 * @function ext_layerControl.removeOverlayById
 * @description	根据id移除overLayer图层
 * @param {String} id
 */
ext_layerControl.removeOverlayById = function(id){
	// 清除对应overlay图层
	let olLyrs = map.getOverlays().getArray();
	let olLyrsLength = olLyrs.length;
	// 由大 --> 小循环
	for(let i=olLyrsLength-1;i>=0;i--){
		if((olLyrs[i].id == id)){
			map.removeOverlay(olLyrs[i]);
		}
	}
};

/**
 * @function ext_layerControl.isLayerExistByName
 * @description	根据名称判断图层是否存在
 * @param {String} layerName 图层名称
 * @return {Boolean}
 */
ext_layerControl.isLayerExistByName = function(layerName){
	if(!(layerName && ((typeof layerName) == "string"))) return false;
	// 获取map全部图层
	let layers = map.getLayers();
	for(let i=0;i<layers.getLength();++i){
		if(layers.item(i).get('name') && (layers.item(i).get('name') == layerName)){
			return true;
		}
	}
	return false;
};

/**
 * @function ext_layerControl.getLayerByName
 * @description	根据名称获取图层对象
 * @param {String} layerName 图层名称
 * @return {Object}
 */
ext_layerControl.getLayerByName = function(layerName){
	if(!(layerName && ((typeof layerName) == "string"))) return null;
	//获取地图中所有图层
	let layers = map.getLayers(); 
	for(let i=0;i<layers.getLength();++i){
		//获取每个图层的名称、是否可见属性
		if(layers.item(i).get('name') && (layers.item(i).get('name') == layerName)){
			return layers.item(i);
		}
	}
	return null;
};

/**
 * @function ext_layerControl.showLayerByName
 * @description	根据名称显示图层
 * @param {String} layerName 图层名称
 * @return {Void}
 */
ext_layerControl.showLayerByName = function(layerName){	
	if(!(layerName && ((typeof layerName) == "string"))) return;
	// 获取图层
	let layerTemp = ext_layerControl.getLayerByName(layerName);
	if(layerTemp) layerTemp.setVisible(true);
};

/**
 * @function ext_layerControl.hideLayerByName
 * @description	根据名称隐藏图层
 * @param {String} layerName 图层名称
 * @return {Void}
 */
ext_layerControl.hideLayerByName = function(layerName){
	if(!(layerName && ((typeof layerName) == "string"))) return;
	// 获取图层
	let layerTemp = ext_layerControl.getLayerByName(layerName);
	if(layerTemp) layerTemp.setVisible(false);
};

/**
 * @function ext_layerControl.addLayer
 * @description	地图添加图层
 * @param {Object} layerObj 图层对象
 * @param {Number} zIndex 图层层级
 * @return {Void}
 */
ext_layerControl.addLayer = function(layerObj,zIndex){
	if(!(layerObj && ((typeof layerObj) == "object"))) return;
	// 添加图层
	let layerName = layerObj.getProperties()["name"];
	// 避免重复添加图层，如果图层存在，则显示图层
	if(ext_layerControl.isLayerExistByName(layerName)){
		ext_layerControl.showLayerByName(layerName);
	}else{
		map.addLayer(layerObj);
	}
	// 设置图层层级
	if(zIndex && ((typeof zIndex) == "number")) layerObj.setZIndex(zIndex);
};

/**
 * @function ext_layerControl.removeLayerByName
 * @description	通过名称移除图层
 * @param {Object} layerName
 * @return {Void}
 */
ext_layerControl.removeLayerByName = function(layerName){
	if(!(layerName && ((typeof layerName) == "string"))) return;
	// 获取图层
	let layerTemp = ext_layerControl.getLayerByName(layerName);
	if(layerTemp) map.removeLayer(layerTemp);
};
/**
 * @function ext_layerControl.removeLayerByNames
 * @description	通过名称数组移除图层
 */
ext_layerControl.removeLayerByNames = function(nameArray){
	for(let i=0;i<nameArray.length;++i){
		ext_layerControl.removeLayerByName(nameArray[i]);
	}
};
/**
 * @function ext_layerControl.getMaxZIndex
 * @description	获取所有图层中最大zIndex
 * @return {Number} zIndex
 */
ext_layerControl.getMaxZIndex = function(){
	let zIndex = 0;
	//获取地图中所有图层
	let layers = map.getLayers(); 
	for(let i=0;i<layers.getLength();++i){
		zIndex = Math.max(zIndex,layers.item(i).get("zIndex"));
	}
	return zIndex;
};

/**
 * 查询方法类
 */
var ext_search = ext_search||{};

/**
 * @function ext_search.getGeoJsonFeatureByFieldValue
 * @description	根据字段值，从geoJson数据中获取feature要素
 * @param {Object} geoJsonData
 * @param {String} field
 * @param {Any} value
 * @return {Object} GeoJson格式数据
 */
ext_search.getGeoJsonFeatureByFieldValue = function(geoJsonData,field,value){
	let featureArray = [];
	for(let i=0;i<geoJsonData.features.length;++i){
		if(geoJsonData.features[i].properties[field] == value){
			featureArray.push(JSON.parse(JSON.stringify(geoJsonData.features[i])));
		};
	}
	return turf.featureCollection(featureArray);
};

/**
 * @function ext_search.getSPFeatureBySQL
 * @description	根据SQL条件，从超图数据服务中获取feature要素
 * @param {String} dataUrl 超图数据服务地址 例："http://10.10.11.96:8090/iserver/services/data-CeShi/rest/data"
 * @param {Array} datasetNames 数据集集合中的数据集名称列表 例：["data:LOG"]
 * @param {Array} fields 查询字段数组 例：["序号","网点名称"]
 * @param {Number} fromIndex default 0，查询结果的最小索引号
 * @param {Number} toIndex 查询结果的最大索引号
 * @param {String} attributeFilter 属性过滤条件 例："网点名称 like '%营业厅%'"
 * @param {String} name 查询数据集名称或者图层名称 例："LOG@data"
 * @param {Array} joinItems Array.<SuperMap.JoinItem> 与外部表的连接信息 SuperMap.JoinItem 数组
 * @param {Array} linkItems Array.<SuperMap.LinkItem> 与外部表的关联信息 SuperMap.LinkItem 数组
 * @param {Array} ids Array.<string> 查询 id 数组，即属性表中的 SmID 值
 * @param {String} orderBy 查询排序的字段，orderBy 的字段须为数值型的
 * @param {String} groupBy 查询分组条件的字段
 * @return {Object} GeoJson格式数据
 */
ext_search.getSPFeatureBySQL = function({dataUrl,datasetNames,fields=null,fromIndex=0,toIndex=-1,attributeFilter=null,name=null,joinItems=null,linkItems=null,ids=null,orderBy=null,groupBy=null},fnc){
	// toIndex为0时，返回空要素GeoJson格式数据
	if(toIndex == 0){
		 fnc(turf.featureCollection([]));
		 return;
	}
	// 查询参数设置
	let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
		queryParameter: {
			attributeFilter: attributeFilter,
			name: name,
			joinItems: joinItems,
			linkItems: linkItems,
			ids: ids,
			orderBy: orderBy,
			groupBy: groupBy,
			fields: fields
		},
		fromIndex: fromIndex,
		toIndex: (toIndex == -1) ? -1 : (((toIndex - 1) < 0) ? -1 : (toIndex - 1)+""),
		datasetNames: datasetNames //数据集名称数组
	});
	// sql服务查询
	new ol.supermap.FeatureService(dataUrl).getFeaturesBySQL(sqlParam, function(e){
		//回调函数
		fnc(e.result.features); 
	});
};

/**
 * @function ext_search.getSPFeatureByGeometry
 * @description	根据几何图形，从超图数据服务中获取feature要素
 * @param {Object} geometry 用于查询的几何对象
 * @param {String} dataUrl 超图数据服务地址 例："http://10.10.11.96:8090/iserver/services/data-CeShi/rest/data"
 * @param {Array} datasetNames 数据集集合中的数据集名称列表 例：["data:LOG"]
 * @param {Array} fields 查询字段数组 例：["序号","网点名称"]
 * @param {Number} fromIndex default 0，查询结果的最小索引号
 * @param {Number} toIndex 查询结果的最大索引号
 * @param {String} attributeFilter 属性过滤条件 例："网点名称 like '%营业厅%'"
 * @param {String} spatialQueryMode 空间查询模式常量，例：CONTAIN：包含关系，INTERSECT：相交关系，WITHIN：被包含关系
 * @return {Object} GeoJson格式数据
 */
ext_search.getSPFeatureByGeometry = function({geometry,dataUrl,datasetNames,fields=null,fromIndex=0,toIndex=-1,attributeFilter=null,spatialQueryMode="INTERSECT"},fnc){
	// toIndex为0时，返回空要素GeoJson格式数据
	if(toIndex == 0){
		 fnc(turf.featureCollection([]));
		 return;
	}
	// 几何查询参数设置
	let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
		geometry: geometry,
		datasetNames: datasetNames,
		attributeFilter: attributeFilter,
		fields: fields,
		spatialQueryMode: spatialQueryMode,
		fromIndex: fromIndex,
		toIndex: toIndex
	});
	// 几何服务查询
	new ol.supermap.FeatureService(dataUrl).getFeaturesByGeometry(geometryParam, function(e){
		//回调函数
		fnc(e.result.features);
	});
};
