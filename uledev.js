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