/** hosts文件修改 */
var fs = require("fs");
var config = require('../uledev.json');
fs.readFile(config.hostsPath, 'utf-8', function(err, data){
	if(err){
		assertFail(err);
	}else{
		var hosts = config.hosts;
		var content = data;
		for(var i = 0; i < hosts.length; i++){
			var host = hosts[i];
			if(data.indexOf(host) < 0)
				content += '127.0.0.1 ' + host + '\n';
		}
		fs.writeFile(config.hostsPath, content, function(err){
			if(err){
				switch(err.errno){
					case -4048:
						assert('hosts 只读权限, 无法写入');
						break;
					default:
						assertFail(err);
						break;
				}
			}
			log('hosts 配置完成');
		});
	}
});

