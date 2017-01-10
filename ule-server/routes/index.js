var router = __express.Router();

router.get('/', function(req, res){
	var host = req.headers.host;
	if(host === 'www.dev.com')
		res.redirect('//www.dev.com/ule');
	else
		res.redirect('//www.dev.com/404');
});

module.exports = router;
