/**
 * Created by xinwenchao on 2016/7/18.
 * 邮乐活动生成器
 */
require('./../console');

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var read = require('read');
var configData = require('./../../default-uledev-event.json');
var ownConfigFileName = 'uledev-event.json';

module.exports = function(cmd){
	switch(cmd){
		case 'init':
			installEvent();
			break;
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

		var map = configData;
		var ownConfigPath = path.normalize(path.join(__cmdPath, ownConfigFileName));
		var ownConfigExists = fs.existsSync(ownConfigPath);
		if(ownConfigExists) map = require(ownConfigPath);
		var config = map[type];
		if(!config || !config.css || !config.js || !config.html)
			return console.info('暂不支持活动类型: ', type);

		var fullDate = (date && date.length == 8) ? date : (moment().format('YYYYMMDD'));
		var yyyy = fullDate.substring(0, 4);
		var mmdd = fullDate.substr(-4);

		var imgPath = config.img.replace('{yyyy}', yyyy).replace('{mmdd}', mmdd).replace('{name}', name);
		var cssPath = config.css.replace('{yyyy}', yyyy).replace('{mmdd}', mmdd).replace('{name}', name);
		var jsPath = config.js.replace('{yyyy}', yyyy).replace('{mmdd}', mmdd).replace('{name}', name);
		var htmlPath = config.html.replace('{yyyy}', yyyy).replace('{mmdd}', mmdd).replace('{name}', name);

		console.info('创建: ', imgPath);
		console.info('创建: ', cssPath);
		console.info('创建: ', jsPath);
		console.info('创建: ', htmlPath);

		//var templeteCss = fs.readFileSync(path.join(__dirname, 'event-templete/' + type + '/css-templete.css'), 'utf-8');
		//var templeteHtml = fs.readFileSync(path.join(__dirname, 'event-templete/' + type + '/html-templete.html'), 'utf-8');
		//var templeteJS = fs.readFileSync(path.join(__dirname, 'event-templete/' + type + '/js-templete.js'), 'utf-8');
		//log(templeteCss);
		//log(templeteHtml);
		//log(templeteJS);
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
		owner.create(owner.eventType, owner.eventName, owner.eventDate);
	},
	init: function(){
		outputConfig('<活动类型>: ');
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
 * 配置活动环境
 */
function installEvent(){
	var targetPath = path.normalize(path.join(__cmdPath, ownConfigFileName));
	var exists = fs.existsSync(targetPath);
	if(exists) return outputConfig('\r\n  活动配置文件已存在！');
	var targetContent = JSON.stringify(configData, null, 4);
	fs.writeFileSync(targetPath, targetContent);
	console.info('\r\n  活动配置文件创建成功: ', ownConfigFileName);
	outputConfig();
}

function outputConfig(tip){
	console.info((tip || ''), '\r\n');
	for(var key in configData){
		var item = configData[key];
		console.info('  ', key, item.description);
	}
	console.info('\r\n');
}

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