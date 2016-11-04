/**
 * Created by xinwenchao on 2016/11/4.
 * 创建多级文件夹
 */

var path = require('path');
var fs = require('fs');

module.exports = function() {
	var list = Array.prototype.slice.apply(arguments);
	var dirPath = __cmdname || process.cwd();
	while(list.length){
		var name = list.shift();
		dirPath = path.normalize(path.join(dirPath, name));
		var exists = fs.existsSync(dirPath);
		if(exists) continue;
		fs.mkdirSync(dirPath);
		console.info('[OK] 创建目录: ', name);
	}
};