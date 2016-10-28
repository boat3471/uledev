var app = uledev.app;
var express = uledev.express;
var path = require('path');
var routesPath = path.normalize(path.join(__modulePath, 'lib/ule-routes/index'));
var viewsPath = path.normalize(path.join(__modulePath, 'lib/ule-views'));
var webrootPath = path.join(ule.cmd, 'webroot');
var wwwrootPath = path.join(ule.cmd, 'wwwroot');
// 设置视图引擎
var routes = require(routesPath);
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use('/', routes);

// 设置静态目录
app.use('/', express.static(webrootPath));
app.use('/', express.static(wwwrootPath));

log('静态目录: ', webrootPath);
log('静态目录: ', wwwrootPath);

// 设置404跳转, 如果未被路由中间件找到的路径, 进入这里统一处理为 404
app.use('/', function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// 开发环境下, 404页面打印详细信息
if(app.get('env') === 'development'){
	app.use('/', function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// 非开发环境下, 404页面不打印详细信息
app.use('/', function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});