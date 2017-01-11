/** 配置 ULEDEV HOSTS */
var fs = require('fs');
var assert = require('assert');
var extend = require('extend');

var listData = require('./../ule-conf/uledev-hosts.json');

function clean(hosts){
	var oldlist = hosts.split('## uledev hosts start ##');
	var newList = [];
	for(var i = 0; i < oldlist.length; i++){
		var str = oldlist[i] || '';
		var end = str.indexOf('## uledev hosts end ##');
		if(str){
			str = end >= 0 ? str.substring(end + 22) : str;
			newList.push(str);
		}
	}
	return newList;
}

module.exports = {
	list: listData,
	init: function(path, hosts){
		var hostsPath = path || 'C:/WINDOWS/System32/drivers/etc/hosts';
		var exists = fs.existsSync(hostsPath);
		if(!exists) return console.info('\n  Error. hosts 文件找不到！');

		var oldhosts = fs.readFileSync(hostsPath).toString();
		var newhosts = (hosts || listData).join('\r\n');
		oldhosts = clean(oldhosts);
		newhosts = ['## uledev hosts start ##', newhosts, '## uledev hosts end ##'];
		var content = oldhosts.join('') + newhosts.join('\r\n');
		fs.writeFile(hostsPath, content, function(err){
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
		console.info('★ 配置hosts: \r\n');
		console.info(content);
	}
};