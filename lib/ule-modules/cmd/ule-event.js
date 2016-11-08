/**
 * Created by xinwenchao on 2016/7/18.
 * 邮乐活动生成器
 */
require('./../console');

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var read = require('read');

module.exports = function(cmd){
	switch(cmd){
		case '-d':
		case '-del':
			deleteEventHandler.init();
			break;
		case '-c':
		case '-copy':
			copyEventHandler.init();
			break;
		default:
			createEventHandler.init();
			break;
	}
};

var eventTypeMap = {
	'101': '推荐位活动',
	'102': '秒杀活动',
	'103': '抽奖活动',
	'104': '卡券活动',
	'201': '手机推荐位活动',
	'202': '手机秒杀活动'
};

var createEventHandler = {
	inputList: [
		{type: 'type', name: '请选择活动类型: ', error: 'Error: 未选择活动类型！', default: ''},
		{type: 'name', name: '请输入活动名称: ', error: 'Error: 未输入活动名称！', default: ''},
		{type: 'date', name: '请输入活动日期: ', error: 'Error: 未输入活动时间！', default: (moment().format('YYYYMMDD'))}
	],
	eventType: '',
	eventName: '',
	eventDate: '',
	create: function(type, name, date){
		if(!type) return assert('未选择活动类型！');
		if(!name) return assert('活动名不能为空！');

		var fullDate = (date && date.length == 8) ? date : (moment().format('YYYYMMDD'));
		var year = fullDate.substring(0, 4);
		var mmdd = fullDate.substr(-4);
		var cssPath, jsPath, htmlPath, imgPath;

		switch(type){
			case "101"://推荐位活动
				cssPath = path.join('c', 'event', year, mmdd, name + '.css');
				jsPath = path.join('j', 'event', year, mmdd, name + '.js');
				htmlPath = path.join('event', year, mmdd, name + '.html');
				imgPath = path.join('i', 'event', year, mmdd, name);
				break;
			case "102"://秒杀活动
				console.info('暂不支持！'); return;
				break;
			case "201"://手机推荐位
				console.info('暂不支持！'); return;
				break;
			case "202"://手机秒杀活动
				console.info('暂不支持！'); return;
				break;
		}

		log(cssPath, jsPath, htmlPath);
	},
	inputHandler: function(item, value){
		var owner = createEventHandler;
		if(!item) return;
		switch(item.type){
			case 'type':
				owner.eventType = value;
				break;
			case 'name':
				owner.eventName = value;
				break;
			case 'date':
				owner.eventDate = value || (+new Date());
				break;
		}
	},
	inputComplete: function(){
		var owner = createEventHandler;
		owner.create(owner.eventName, owner.eventType, owner.eventDate);
	},
	init: function(){
		console.info('<活动类型>: ');
		console.info(JSON.stringify(eventTypeMap, null, 4));
		console.info('');
		promptInput(createEventHandler);
	}
};

var deleteEventHandler = {
	inputList: [],
	eventType: '',
	eventName: '',
	eventDate: '',
	init: function(){
		console.info('删除活动');
	}
};

var copyEventHandler = {
	inputList: [],
	eventType: '',
	eventName: '',
	eventDate: '',
	init: function(){
		console.info('复制活动');
	}
};

/**
 * 控制台提示输入信息
 */
function promptInput(handler){
	var inputList = handler.inputList || [];
	var inputHandler = handler.inputHandler;
	var inputComplete = handler.inputComplete;
	if(handler.inputList.length <= 0){
		inputComplete && inputComplete();
		return;
	}
	var item = inputList.shift();
	read({prompt: item.name, default: item.default}, function(a1, value){
		if(value){
			inputHandler && inputHandler(item, value);
			console.info('');
			promptInput(handler);
		}else{
			console.info('');
			console.info(item.error);
		}
	});
}