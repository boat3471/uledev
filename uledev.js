var fs = require('fs');
var path = require('path');
var extend = require('extend');
var moment = require('moment');
var uledev = {
	username: '',
	installPath: __dirname,
	config: null,
	port: 80,
	createOwnUledevEvent: function(){
		var ownJsonPath = path.normalize(path.join(__ownPath, 'uledev-event.json'));
		var exists = fs.existsSync(ownJsonPath);
		if(!exists) this.writeJsonFile(eventData, ownJsonPath);

	},
	getUledevEventData: function(){
		var ownJsonPath = path.normalize(path.join(__ownPath, 'uledev-event.json'));
		var exists = fs.existsSync(ownJsonPath);
		if(!exists) this.createOwnUledevEvent();
		var ownJsonData = require(ownJsonPath);
		delete require.cache[ownJsonPath];
		return ownJsonData || eventData;
	},
	mkdirs: function(){
		if(!arguments || arguments.length == 0) return;
		var list = Array.prototype.slice.apply(arguments);
		var dirPath = list.shift() || process.cwd();
		while(list.length){
			var item = list.shift();
			dirPath = path.normalize(path.join(dirPath, item));
			var exists = fs.existsSync(dirPath);
			if(exists) continue;
			fs.mkdirSync(dirPath);
			console.info('[ULE] 创建目录: ', dirPath);
		}
	},
	writeJsonFile: function(data, path){
		if(!path) return;
		data = data || {};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
	},
	developed: function(){
		return fs.existsSync(path.join(__dirname, '/ule-conf/.dev'));
	},
	killProcess: function(){
		var pidPath = path.join(__dirname, '/ule-conf/uledev-pid.json');
		var exec = require('child_process').exec;
		var oldPid = require(pidPath);
		var newPid = process.pid;
		if(oldPid > 0)
			exec('taskkill /F /pid ' + oldPid, function(err, stdout, stderr){});
		fs.writeFileSync(pidPath, newPid);
		console.info('[ULE] 启动进程: ', newPid);
	},
	install: function(username){
		var owner = this;

		// 初始化PID文件 uledev-pid.json
		var pidPath = path.join(__dirname, '/ule-conf/uledev-pid.json');
		if(!fs.existsSync(pidPath)) fs.writeFileSync(pidPath, '0');

		// 初始化全局配置文件 uledev.json
		var uledevConfPath = path.join(__dirname, '/ule-conf/uledev.json');
		if(!fs.existsSync(uledevConfPath)) owner.writeJsonFile({}, uledevConfPath);

		var uledevJson = require(uledevConfPath);
		uledevJson.installDate = uledevJson.installDate || moment().format('YYYY-MM-DD HH:mm:ss');
		uledevJson.updateDate = moment().format('YYYY-MM-DD HH:mm:ss');
		uledevJson.username = username;
		uledevJson.port = 80;
		uledevJson.dir = uledevJson.dir || {};
		uledevJson.dir.installPath = __dirname;
		uledevJson.dir.confPath = __dirname + '\\ule-conf';
		uledevJson.dir.modulesPath = __dirname + '\\ule-modules';
		uledevJson.dir.serverPath = __dirname + '\\ule-server';
		uledevJson.css = uledevJson.css || {};
		uledevJson.css.type = uledevJson.css.type || 'gulp-stylus';
		owner.writeJsonFile(uledevJson, uledevConfPath);

		console.info('');
		console.info('★ 你好 ' + username + '！欢迎安装uledev开发环境\n');
		console.info('★ 安装目录: ' + uledevJson.dir.installPath);
		console.info('★ 配置目录: ' + uledevJson.dir.confPath);
		console.info('★ 模块目录: ' + uledevJson.dir.modulesPath);
		console.info('★ 服务目录: ' + uledevJson.dir.serverPath + '\n');
		console.info('★ 安装完成！\n');
	}
};

(function(){
	try{
		var config = require('./ule-conf/uledev.json');
		uledev.port = config.port || 80;
		uledev.dir = config.dir;
		uledev.username = config.username;
		uledev.config = config;
	}catch(e){}
})();

module.exports = uledev;