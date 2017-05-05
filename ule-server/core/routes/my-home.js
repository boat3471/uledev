var fs = require('fs');
var url = require('url');
var router = __express.Router();
var formidable = require('formidable');
var cmd = require('child_process');
var marked = require('marked');

var config = uledev.config;

/* home page. */
router.get('/', function(req, res, next){
	var host = req.headers.host;
	var articles = require('../../-static-/h/articles/map.json');
	// if(host === 'www.uledev.com')
		res.render('index.ejs', {
			title: 'uledev',
			username: config.username,
			installPath: config.dir.installPath,
			articles: articles
		});
	// else
	// 	res.redirect('//www.uledev.com/404');
});

router.get('/md', function(req, res, next) {
	var base = config.dir.serverPath;
	fs.readFile(base + '/-static-/md/1.md', function(err, data) {
		var html = marked(data.toString());
		//res.render('markdown.ejs', {mdContent: html});
		res.send(html);
	});
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
			var fileData = fs.readFileSync(file.path);
			var data = JSON.parse(fileData.toString());
			log(data.devPath, file.name);
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
