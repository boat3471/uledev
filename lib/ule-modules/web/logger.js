/**
 * 设置日志中间件
 * Created by xinwenchao on 2016/9/7.
 */

var app = uledev.app;
var fs = require('fs');
var logger = require('morgan'); //打印请求信息
app.use(logger('dev'));

// var accessLog = fs.createWriteStream('../access.log', {flags: 'a'});
// app.use(logger('combined', {stream: accessLog}));

