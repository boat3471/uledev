var url = require('url');
var router = __express.Router();
var formidable = require('formidable');
var marked = require('marked');
var path = require('path');
var config = uledev.config;
var tool = require('../../../ule-modules/ule-tool');
var loginInfo = require('../../../ule-conf/uledev-user.json');

/* home page. */
router.get('/', function(req, res, next){
	var host = req.headers.host;
	var articles = require('../../-static-/h/articles/map.json');
	res.render('index.ejs', {
		title: 'uledev',
		username: config.username,
		installPath: config.dir.installPath,
		articles: articles
	});
	// 	res.redirect('//www.uledev.com/404');
});

router.post('/login', function(req, res, next){
	var query = req.body;
	loginInfo.loginName = query.loginName;
	loginInfo.passWord = query.password;
	var data = {
		loginName: loginInfo.loginName,
		passWord: loginInfo.passWord
	};
	tool.writeJsonFile(data, '/ule-conf/uledev-user.json');
	res.json({code: '0', msg: ''});
});

router.post('/loginCheck', function(req, res, next){
	var data;
	if(loginInfo.loginName && loginInfo.passWord)
		data = {code: '0', msg: '无需登录'};
	else
		data = {code: '1', msg: '需登录'};
	res.json(data);
});

router.post('/loginGR', function(req, res, next){
	var data =  {code: '0', msg: ''}, url = 'http://gr.uletm.com/pmdm/login.jsp';
	if(loginInfo.loginName && loginInfo.passWord)
		data.url = url + '?ln=' + loginInfo.loginName + '&&pw=' + loginInfo.passWord;
	else
		data.url = url;
	res.json(data);
});

router.get('/md', function(req, res, next){
	var base = config.dir.serverPath;
});

/* GET event page. */
router.get('/event.ejs', function(req, res, next){
	var uledeveEventDate = uledev.getUledevEventData();
	res.render('event', {configData: uledeveEventDate});
});

/* upload. */
router.post('/eventDirectorySet.do', function(req, res, next){
	var form = formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var file = files['eventDirectoryFileInput'];
		if(file && file.name == 'uledev.json'){
			res.redirect('/event?initSuccess');
		}else{
			res.redirect('/event?initError');
		}
	});
});

router.get('/setting', function(req, res, next){
	var params = url.parse(req.url, true).query;
	log(params);
	switch(params.type){
		case 'ftp':
			//连接ftp
			break;
		case 'print':
			//配置打印机
			break;
		case 'upan':
			//配置共享盘
			break;
		case 'opencms':
			//配置Opencms
			break;
	}
	res.redirect('/public/setting/' + params.type + '.html');
});

module.exports = router;
