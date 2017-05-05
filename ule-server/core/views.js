var path = require('path');

// 设置视图引擎
__app.set('views', pathWarp('/ule-server/-views-'));
__app.set('view engine', 'ejs');

// 设置路由
__app.use('/', require(pathWarp('/ule-server/core/routes/root')));
__app.use('/my', require(pathWarp('/ule-server/core/routes/my-home')));
__app.use('/util', require(pathWarp('/ule-server/core/routes/my-util')));

// 设置静态目录
__app.use('/h', __express.static(pathWarp('/ule-server/-static-/h')));
__app.use('/c', __express.static(pathWarp('/ule-server/-static-/c')));
__app.use('/j', __express.static(pathWarp('/ule-server/-static-/j')));
__app.use('/i', __express.static(pathWarp('/ule-server/-static-/i')));
__app.use('/o', __express.static(pathWarp('/ule-server/-static-/o')));
__app.use('/lib', __express.static(pathWarp('/ule-server/-static-/lib')));
__app.use('/m', __express.static(pathWarp('/ule-server/-static-/modules')));


// 设置404跳转, 如果未被路由中间件找到的路径, 进入这里统一处理为 404
__app.use('/', function(req, res, next){
	var host = req.headers.host;
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

function pathWarp(p){
	return path.join(__installPath, p);
}