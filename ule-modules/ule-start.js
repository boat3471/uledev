/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */
var fs = require('fs');
var path = require('path');
var tools = require('../uledev-tools');
var moment = require('moment');
var ownPath = process.cwd();

/* 创建启动文件 */
function _createLaunchFile(){
	var filePath = path.join(ownPath, 'uledev.cmd');
	var exists = fs.existsSync(filePath);
	if(exists) return;
	var cmdList = [
		'uledev start'
	];
	fs.writeFileSync(filePath, cmdList.join(''));
}

/* 创建目录结构 */
function _createDirectory(){
	tools.mkdirs(ownPath, 'wwwroot');
	tools.mkdirs(ownPath, 'webroot');
	tools.mkdirs(ownPath, 'webroot-src');
}

/* 创建个人配置文件 */
function _createOwnUleDevJsonFile(){
	var ownUledevPath = path.join(ownPath, 'uledev.json');
	if(fs.existsSync(ownUledevPath)) return;
	var uledevData = require('../ule-conf/uledev.json');
	uledevData.dir.own = ownPath;
	tools.writeJsonFile(uledevData, ownUledevPath);
	console.info('[ULE] 创建配置: ', ownUledevPath);
}

/* 开启ULEDEV */
function _start(){
	require('../ule-server/hosts')();
	require('../ule-server/app')();
}

module.exports = function(){
	tools.ownPath = ownPath;
	_createOwnUleDevJsonFile();
	_createLaunchFile();
	_createDirectory();
	_start();
};