var express = ule.express = require('express');
var expressApp = ule.app = express();
var http = require('http');
var server = http.createServer(expressApp);
var port = normalizePort(process.env.PORT || ule.port);

function onError(error){
	if(error.syscall !== 'listen')
		throw error;
	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
	switch(error.code){
		case 'EACCES':
			log('Error: 权限不足，无法启动 ' + bind + ' 端口！');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			log('Error: ' + bind + ' 被占用！');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening(){
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	log('启动成功！ 监听端口：' + addr.port);
}

function normalizePort(val){
	var port = parseInt(val, 10);
	if(isNaN(port))
		return val;
	if(port >= 0)
		return port;
	return false;
}

module.exports = function(){
	// require('./favicon');
	// require('./logger');
	// require('./parser');
	// require('./cookie');
	require('./views');

	expressApp.set('port', port);
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
};