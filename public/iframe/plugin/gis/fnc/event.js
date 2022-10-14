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
