var app = uledev.app;
var express = uledev.express;
var path = require('path');
var config = require('../uledev.json'); config = uledev || config;

// 设置视图引擎
var routes = require('../ule-routes/index');
app.set('views', path.join(__modulePath, 'lib/ule-views'));
app.set('view engine', 'ejs');
app.use('/', routes);

// 设置静态目录
app.use('/', express.static(path.join(uledev.cmd, 'webroot')));
app.use('/', express.static(path.join(uledev.cmd, 'wwwroot')));

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