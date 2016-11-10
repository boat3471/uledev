/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */

var path = require('path');
var fs = require('fs');
var mkdirs = require('./base/mkdirs');

var _defaultUledevJson = require('../ule-conf/default-uledev.json');
var _ownPath = '';

/* 初始化启动文件 */
function initLaunchFile(){
	var fileName = 'uledev.cmd';
	var filePath = path.normalize(path.join(_ownPath, fileName));
	var exists = fs.existsSync(filePath);
	if(exists) return;

	var content = 'uledev start';
	fs.writeFileSync(filePath, content);
}

/* 初始化配置文件 */
function initConfig(){
	var fileName = 'uledev.json';
	var targetPath = path.normalize(path.join(_ownPath, fileName));
	var exists = fs.existsSync(targetPath);
	if(exists) return;
	configData.devPath = __cmdPath;
	var targetContent = JSON.stringify(configData, null, 4);
	fs.writeFileSync(targetPath, targetContent);
	console.info('[ULE] 创建配置文件: ', fileName);
}

/* 初始化目录结构 */
function initDirectory(){
	mkdirs(_ownPath, 'wwwroot');
	mkdirs(_ownPath, 'webroot');
	mkdirs(_ownPath, 'webroot-src');
}

/* 开启ULEDEV */
function start(){
	var uledevPath = path.normalize(path.join(__dirname, '../../uledev'));
	require(uledevPath)();
}

module.exports = function(ownPath){
	_ownPath = ownPath;
	initLaunchFile();
	initConfig();
	initDirectory();
	start();
};