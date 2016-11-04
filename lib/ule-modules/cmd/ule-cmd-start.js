/**
 * Created by xinwenchao on 2016/11/4.
 * 启动开发环境
 */

var mkdirs = require('../mkdirs');


/* 初始化启动文件 */
function initLaunchFile(){
	var fileName = 'uledev-server';
	var filePath = path.normalize(path.join(__cmdname, fileName));
	var exists = fs.existsSync(filePath);
	if(exists) return;

	var content = [
		'#!/usr/bin/env node',
		'var uledev = require("uledev");',
		'uledev.launch();'
	].join('\n');
	fs.writeFileSync(filePath, content);
	console.info('[OK] 创建启动文件: ', fileName);
}

/* 初始化配置文件 */
function initConfig(){
	var fileName = 'uledev.json';
	var sourcePath = path.normalize(path.join(__dirname, '../lib/uledev.json'));
	var targetPath = path.normalize(path.join(__cmdname, fileName));
	var exists = fs.existsSync(targetPath);
	if(exists) return;

	var sourceData = require(sourcePath);
	var targetContent = JSON.stringify(sourceData, null, 4);
	fs.writeFileSync(targetPath, targetContent);
	console.info('[OK] 创建配置文件: ', fileName);
}

/* 初始化目录结构 */
function initDirectory(){
	mkdirs('wwwroot');
	mkdirs('webroot');
}

console.info('[OK] 初始化完成!');

/* 开启ULEDEV */
function start(){
	var uledevPath = path.normalize(path.join(__dirname, '../lib/uledev'));
	var uledev = require(uledevPath);
	uledev.launch();
}