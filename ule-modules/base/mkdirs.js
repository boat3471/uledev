/**
 * Created by xinwenchao on 2016/11/4.
 * 创建多级文件夹
 */

var path = require('path');
var fs = require('fs');

module.exports = function(rootPath) {
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
};