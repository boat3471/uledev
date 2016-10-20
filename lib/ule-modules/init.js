/** Created by xinwenchao on 2016/9/28. */

/** 设置项目路径 */
var path = require('path');
global.__modulePath = path.join(__dirname, '../../');
global.__projectPath = path.join(__dirname, '../../../');

log('全局变量: __modulePath  = ' + __modulePath);
log('全局变量: __projectPath = ' + __projectPath);