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
			content += '127.0.0.1 ' + host + '\r\n';
		log('配置HOST: ', host);
	}
	if(!content) return;
	log(content);
	var list = [
		fileContent,
		'',
		'## uledev hosts ##',
		'##\r\n',
		content,
		'##',
		'## uledev hosts ##'
	];
	fs.writeFile(hostsPath, list.join('\r\n'), function(err){
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