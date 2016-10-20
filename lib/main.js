require('../lib/ule-modules/console');
require('../lib/ule-modules/init');
var uledev = require('./uledev');
module.exports = {
	init: function(){
		console.info('创建配置文件uledev.json');
		console.info('生成ULE前端开发目录');
	},
	run: function(){
		uledev.launch();
	}
};