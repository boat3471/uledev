var router = __express.Router();

router.get('/', function(req, res){
	var host = req.headers.host;
	if(host === 'www.uledev.com') res.redirect('//www.uledev.com/my');
	else res.redirect('//www.uledev.com/404');
});

module.exports = router;
