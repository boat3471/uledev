var config = require('../uledev-config');
var uleData = config.getUledevData();
log(uleData);
var express = global.uleExpress = require('express');
var expressApp = global.uleApp = express();
var http = require('http');
var server = http.createServer(expressApp);
var port = normalizePort(process.env.PORT || uleData.port);

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
	// require('./core/parser');
	// require('./core/cookie');
	require('./core/views');

	expressApp.set('port', port);
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
};