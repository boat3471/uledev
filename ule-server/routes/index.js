var config = require('../../uledev-config');
var fs = require('fs');
var url = require('url');
var router = __express.Router();
var formidable = require('formidable');
var cmd = require('child_process');

// cmd.exec('explorer /e,' + 'D:\\group001');

var uledevDate = config.getUledevData();

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index', {username: uledevDate.username, title: 'uledev'});
});

/* GET event page. */
router.get('/event', function(req, res, next){
	var uledeveEventDate = config.getUledevEventData();
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
