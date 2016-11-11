var path = require('path');
var routesPath = path.normalize(path.join(__modluePath, '/ule-server/routes/index'));
var viewsPath = path.normalize(path.join(__modluePath, '/ule-server/views'));
var publicPath = path.join(__modluePath, '/ule-server/public');
var webrootPath = path.join(__ownPath, 'webroot');
var wwwrootPath = path.join(__ownPath, 'wwwroot');
// 设置视图引擎
var routes = require(routesPath);
__app.set('views', viewsPath);
__app.set('view engine', 'ejs');
__app.use('/', routes);

// 设置静态目录
__app.use('/', __express.static(webrootPath));
__app.use('/', __express.static(wwwrootPath));
__app.use('/public', __express.static(publicPath));

log('静态目录: ', webrootPath);
log('静态目录: ', wwwrootPath);

// 设置404跳转, 如果未被路由中间件找到的路径, 进入这里统一处理为 404
__app.use('/', function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// 开发环境下, 404页面打印详细信息
if(__app.get('env') === 'development'){
	__app.use('/', function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// 非开发环境下, 404页面不打印详细信息
__app.use('/', function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});