/**
 * 设置请求数据解析中间件, 用于Post数据解析, JSON, url编码处理以及对于文件的上传处理.
 * Created by xinwenchao on 2016/9/7.
 */

var bodyParser = require('body-parser');
__app.use(bodyParser.json()); //json解析
__app.use(bodyParser.urlencoded({extended: false})); //