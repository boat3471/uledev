/** hosts文件修改 */
var fs = require('fs');
var assert = require('assert');
var tools = require('../uledev-tools');

module.exports = function(){
	var uledevData = tools.getUledevData();
	var hostsPath = uledevData.hostsPath;
	var exists = fs.existsSync(hostsPath);
	if(!exists) return console.info('\n  Error. hosts 文件找不到！');

	var oldhosts = fs.readFileSync(hostsPath).toString();
	var newhosts = uledevData.hosts || '127.0.0.1 www.dev.ule.com i0.dev.ulecdn.com i1.dev.ulecdn.com i2.dev.ulecdn.com i3.dev.ulecdn.com';
	oldhosts = oldhosts.replace(/## uledev hosts ##/g, '').replace(/\n/g, '').replace(/\r/g, '').replace(/127.0.0.1/g, '\r\n127.0.0.1');
	var list = [oldhosts, ''];
	if(oldhosts.indexOf('dev.ulecdn.com') > 0 && oldhosts.indexOf('dev.ule.com') > 0) {

	} else {
		list.push('## uledev hosts ##');
		list.push(newhosts);
		list.push('## uledev hosts ##');
		fs.writeFile(hostsPath, list.join('\r\n'), function(err){
			if(err){
				switch(err.errno){
					case -4048:
						console.info('Error. 请修改HOSTS文件权限, HOSTS文件为只读权限, 无法写入！');
						break;
					default:
						console.info(err);
						break;
				}
				assert.equal('');
			}else{
			}
		});
	}
};