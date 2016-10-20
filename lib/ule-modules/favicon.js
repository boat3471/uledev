/**
 * 设置网站 favicon 图标
 * Created by xinwenchao on 2016/9/7.
 */
var app = uledev.app;
var path = require('path');
var favicon = require('serve-favicon');
try {
    var faviconIconPath = path.join(__basePath, 'public', 'www', 'favicon.ico');
    app.use(favicon(faviconIconPath));
} catch (e) {
    console.error('找不到文件', e.path);
}
