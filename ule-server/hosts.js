/** hosts文件修改 */
var fs = require('fs');
var assert = require('assert');
var tools = require('../uledev-tools');

module.exports = function(){
	var uledevData = tools.getUledevData();
	var hostsPath = uledevData.hostsPath;
	var exists = fs.existsSync(hostsPath);
	if(!exists) return console.info('\n  Error. hosts 文件找不到！');

	var fileContent = fs.readFileSync(hostsPath);
	var hosts = uledevData.hosts || [];
	var content = '';
	for(var i = 0; i < hosts.length; i++){
		var host = hosts[i];
		if(fileContent.indexOf(host) < 0)
			content += '127.0.0.1 ' + host + '\r\n';
		console.info('[ULE] 配置HOST: ', host);
	}
	if(!content) return;
	var list = [fileContent, ''];
	if(fileContent.length == 0) list = [];
	list.push('## uledev hosts ##');
	list.push('##\r\n');
	list.push(content);
	list.push('##');
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
};