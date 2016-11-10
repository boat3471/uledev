var fs = require('fs');
var express = require('express');
var router = express.Router();
var formidable = require('formidable');


/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index', {title: 'ULE Dev'});
});

/* GET event page. */
router.get('/event', function(req, res, next){
	var defPath = ule.uledevEventJsonPath;
	var ownPath = ule.uledevEventJsonOwnPath;
	var exists = fs.existsSync(ownPath);

	delete require.cache[ownPath];

	var configData = exists ? require(ownPath) : require(defPath);

	res.render('event', {configData: configData});
});

/* upload. */
router.post('/eventDirectorySet.do', function(req, res, next){
	var form = formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var file = files['eventDirectoryFileInput'];
		if(file && file.name == 'uledev.json') {
			var fileData = fs.readFileSync(file.path);
			var data = JSON.parse(fileData.toString());
			log(data.devPath, file.name);
			res.redirect('/event?initSuccess');
		} else {
			res.redirect('/event?initError');
		}
	});
});

module.exports = router;
