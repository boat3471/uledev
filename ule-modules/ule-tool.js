var fs = require('fs');
var path = require('path');
var moment = require('moment');

function mkdirs(){
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
}

function writeJsonFile(data, path, compress){
	if(!path) return;
	var content = '';
	data = data || {};
	var reg = /^\//;
	if(reg.test(path))
		path = __installPath + path;
	if(compress == true) content = JSON.stringify(data);
	else content = JSON.stringify(data, null, 4);
	fs.writeFileSync(path, content);
}

function currentDate(style){
	return moment().format(style || 'YYYY-MM-DD HH:mm:ss');
}

module.exports = {
	mkdirs: mkdirs,
	writeJsonFile: writeJsonFile,
	currentDate: currentDate
};