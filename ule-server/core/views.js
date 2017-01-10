var path = require('path');
// 设置视图引擎
__app.set('views', pathWarp('/ule-server/views'));
__app.set('view engine', 'ejs');
__app.use('/', require(pathWarp('/ule-server/routes/index')));
__app.use('/ule', require(pathWarp('/ule-server/routes/ule')));
__app.use('/ule/util', require(pathWarp('/ule-server/routes/ule-util')));

// 设置静态目录
__app.use('/ule', __express.static(pathWarp('/ule-server/public')));
__app.use('/i0', __express.static(pathWarp('/ule-server/public/c')));
__app.use('/i1', __express.static(pathWarp('/ule-server/public/j')));
__app.use('/i2', __express.static(pathWarp('/ule-server/public/i')));
__app.use('/i3', __express.static(pathWarp('/ule-server/public/o')));


function pathWarp(p){
	return path.join(__modluePath, p);
}

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