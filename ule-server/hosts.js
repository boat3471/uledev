/** hosts文件修改 */
var fs = require("fs");
var config = require('../uledev-config');

module.exports = function(){
	var uledevData = config.getUledevData();
	var hostsPath = uledevData.hostsPath;
	var exists = fs.existsSync(hostsPath);
	if(!exists) return console.info('\n  Error. hosts 文件找不到！');

	var fileContent = fs.readFileSync(hostsPath);
	var hosts = uledevData.hosts || [];
	var content = '';
	for(var i = 0; i < hosts.length; i++){
		var host = hosts[i];
		if(fileContent.indexOf(host) < 0)
			content += '127.0.0.1 ' + host + '\n';
		log('配置HOST: ', host);
	}
	if(!content) return;
	var list = [
		fileContent,
		'\n\n',
		'## uledev ##\n',
		'##\n',
		content,
		'##\n',
		'## uledev ##',
		'\n\n'
	];
	// content = fileContent + '\n\n' + content;
	fs.writeFile(hostsPath, list.join(''), function(err){
		if(err){
			switch(err.errno){
				case -4048:
					assert('HOSTS 文件只读权限, 无法写入！');
					break;
				default:
					assertFail(err);
					break;
			}
		}else{
		}
	});
};