/**
 * 设置 cookie 处理中间件, 用于处理每个请求的cookie
 * Created by xinwenchao on 2016/9/7.
 */
var cookieParser = require('cookie-parser');
__app.use(cookieParser());