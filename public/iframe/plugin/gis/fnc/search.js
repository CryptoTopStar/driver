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
