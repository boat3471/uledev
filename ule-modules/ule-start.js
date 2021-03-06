/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var tool = require('./ule-tool');
var uledev = require('./../uledev');
var hosts = require('./../ule-modules/ule-hosts');
var app = require('../ule-server/app');

/* 创建启动文件 */
function _createLaunchFile(){
	var filePath = path.join(ownPath, 'uledev.bat');
	var exists = fs.existsSync(filePath);
	if(exists) return;
	var cmdList = [
		'uledev start'
	];
	fs.writeFileSync(filePath, cmdList.join(''));
}

/* 创建目录结构 */
function _createDirectory(){
	tool.mkdirs(ownPath, 'wwwroot');
	tool.mkdirs(ownPath, 'webroot');
	tool.mkdirs(ownPath, 'webroot-src');
}

/* 创建个人配置文件 */
function _createOwnUleDevJsonFile(){
	var ownUledevPath = path.join(ownPath, 'uledev.json');
	if(fs.existsSync(ownUledevPath)) return;
	var uledevData = require('../ule-conf/uledev.json');
	uledevData.dir.ownPath = ownPath;
	tool.writeJsonFile(uledevData, ownUledevPath);
	console.info('[ULE] 创建配置: ', ownUledevPath);
}

/* 读取自定义目录 */
function _readOwnDirectory(){
	var filterFile = ['webroot', 'webroot-src', 'wwwroot', 'uledev.bat', 'uledev.json'];
	fs.readdir(ownPath, function(err, files){
		if(files && files.length > 0) {
			for(var i = 0; i < files.length; i++){
				var fileName = files[i];
				if(filterFile.indexOf(fileName) >=0 ) continue;
				var filePath = ownPath + '\\' + fileName;
				var file = fs.statSync(filePath);
				if(file.isDirectory()) {
					tool.mkdirs(ownPath, fileName, 'wwwroot');
					tool.mkdirs(ownPath, fileName, 'webroot');
					tool.mkdirs(ownPath, fileName, 'webroot-src');
				}
				log(filePath, file.isDirectory());
			}
		}
	});
}

module.exports = function(){
	// _createOwnUleDevJsonFile();
	// _createLaunchFile();
	// _createDirectory();
	// _readOwnDirectory();
	hosts.init();
	app.start();
};