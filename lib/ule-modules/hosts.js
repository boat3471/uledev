/** hosts文件修改 */
var fs = require("fs");
fs.readFile(ule.hostsPath, 'utf-8', function(err, data){
	if(err){
		assertFail(err);
	}else{
		var hosts = ule.hosts;
		var content = data;
		for(var i = 0; i < hosts.length; i++){
			var host = hosts[i];
			if(data.indexOf(host) < 0)
				content += '127.0.0.1 ' + host + '\n';
			log('配置HOST: ', host);
		}
		fs.writeFile(ule.hostsPath, content, function(err){
			if(err){
				switch(err.errno){
					case -4048:
						assert('HOSTS 文件只读权限, 无法写入');
						break;
					default:
						assertFail(err);
						break;
				}
			}
		});
	}
});

