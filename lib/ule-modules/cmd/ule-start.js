/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */

var path = require('path');
var fs = require('fs');
var mkdirs = require('../mkdirs');


module.exports = function(){
	initLaunchFile();
	initConfig();
	initDirectory();
	start();
};

/* 初始化启动文件 */
function initLaunchFile(){
	var fileName = 'uledev.cmd';
	var filePath = path.normalize(path.join(__cmdPath, fileName));
	var exists = fs.existsSync(filePath);
	if(exists) return;

	var content = 'uledev start';
	fs.writeFileSync(filePath, content);
}

/* 初始化配置文件 */
function initConfig(){
	var fileName = 'uledev.json';
	var sourcePath = path.normalize(path.join(__dirname, '../../uledev.json'));
	var targetPath = path.normalize(path.join(__cmdPath, fileName));
	var exists = fs.existsSync(targetPath);
	if(exists) return;

	var sourceData = require(sourcePath);
	var targetContent = JSON.stringify(sourceData, null, 4);
	fs.writeFileSync(targetPath, targetContent);
	console.info('[ULE] 创建配置文件: ', fileName);
}

/* 初始化目录结构 */
function initDirectory(){
	mkdirs(__cmdPath, 'wwwroot');
	mkdirs(__cmdPath, 'webroot');
	mkdirs(__cmdPath, 'webroot-src');
}

/* 开启ULEDEV */
function start(){
	var uledevPath = path.normalize(path.join(__dirname, '../../uledev'));
	require(uledevPath)();
}