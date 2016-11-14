/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */
require('./base/console');

var path = require('path');
var fs = require('fs');
var mkdirs = require('./base/mkdirs');
var _config = require('../uledev-config');
var _ownPath = process.cwd();

/* 创建启动文件 */
function _createLaunchFile(){
	var filePath = path.normalize(path.join(_ownPath, 'uledev.cmd'));
	var exists = fs.existsSync(filePath);
	if(exists) return;
	var cmdList = [
		'uledev start'
	];
	fs.writeFileSync(filePath, cmdList.join(''));
}

/* 创建目录结构 */
function _createDirectory(){
	mkdirs(_ownPath, 'wwwroot');
	mkdirs(_ownPath, 'webroot');
	mkdirs(_ownPath, 'webroot-src');
}

/* 开启ULEDEV */
function _start(){
	require('../ule-server/hosts')();
	require('../ule-server/app')();
}

module.exports = function(){
	global.__ownPath = _ownPath;
	_config.initUleDev();
	_config.createOwnUleDev();
	_createLaunchFile();
	_createDirectory();
	_start();
};