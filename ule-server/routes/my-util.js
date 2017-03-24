var fs = require('fs');
var url = require('url');
var router = __express.Router();
var formidable = require('formidable');
var cmd = require('child_process');

var config = uledev.config;

/* util home page. */
router.get('/', function(req, res, next){
	log('enter util home');
	res.render('util', {
		title: 'uledev',
		username: config.username,
		installPath: config.dir.installPath
	});
});

/* 打开资源管理器 */
router.get('/explorer', function(req, res, next){
	var params = url.parse(req.url, true).query;
	cmd.exec('explorer /e,' + params.path);
	res.json({code: '0000'});
});


module.exports = router;
