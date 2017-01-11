/**
 * 设置网站 favicon 图标
 * Created by xinwenchao on 2016/9/7.
 */
var path = require('path');
var favicon = require('serve-favicon');
try {
    var faviconIconPath = path.join(__installPath, 'public', 'www', 'favicon.ico');
    __app.use(favicon(faviconIconPath));
} catch (e) {
    console.error('找不到文件', e.path);
}
