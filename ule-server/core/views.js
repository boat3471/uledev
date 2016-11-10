var path = require('path');
var config = require('../../uledev-config');
var routesPath = path.normalize(path.join(config.modluePath, 'lib/ule-routes/index'));
var viewsPath = path.normalize(path.join(config.modluePath, 'lib/ule-views'));
var ulePublicPath = path.join(config.modluePath, 'lib/ule-public');
var webrootPath = path.join(config.devPath, 'webroot');
var wwwrootPath = path.join(config.devPath, 'wwwroot');
// 设置视图引擎
var routes = require(routesPath);
uleApp.set('views', viewsPath);
uleApp.set('view engine', 'ejs');
uleApp.use('/', routes);

// 设置静态目录
uleApp.use('/', uleExpress.static(webrootPath));
uleApp.use('/', uleExpress.static(wwwrootPath));
uleApp.use('/public', uleExpress.static(ulePublicPath));

log('静态目录: ', webrootPath);
log('静态目录: ', wwwrootPath);

// 设置404跳转, 如果未被路由中间件找到的路径, 进入这里统一处理为 404
uleApp.use('/', function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// 开发环境下, 404页面打印详细信息
if(uleApp.get('env') === 'development'){
	uleApp.use('/', function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// 非开发环境下, 404页面不打印详细信息
uleApp.use('/', function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});