/**
 * Created by xinwenchao on 2016/7/18.
 * 邮乐资源加载器
 */

var _http = require("http");
var _fs = require('fs');
var _path = require('path');
var _url = require('url');

var FileDownloadHandler = {
	list: [
		'http://www.ule.com/life/hnpay/henan/daily-correct.html',
		'http://www.ule.com/life/hnpay/henan/daily-correct.html',
		'http://www.ule.com/life/hnpay/henan/daily-password.html',
		'http://www.ule.com/life/hnpay/henan/daily-print.html',
		'http://www.ule.com/life/hnpay/henan/daily-surplus.html',
		'http://www.ule.com/life/hnpay/henan/form-daily.html',
		'http://www.ule.com/life/hnpay/henan/form-detail.html',
		'http://www.ule.com/life/hnpay/henan/form-summary.html',
		'http://www.ule.com/life/hnpay/henan/pay-fixed.html',
		'http://www.ule.com/life/hnpay/henan/pay-lifeCableTV1.html',
		'http://www.ule.com/life/hnpay/henan/pay-power.html',
		'http://www.ule.com/life/hnpay/henan/pay-power1.html',
		'http://www.ule.com/life/hnpay/henan/pay-surplus1.html',
		'http://www.ule.com/life/hnpay/henan/pay-telphoneCost1.html',
		'http://www.ule.com/life/hnpay/henan/pay-water1.html',
		'http://www.ule.com/life/hnpay/henan/rec-deposit.html',
		'http://www.ule.com/life/hnpay/henan/rec-phone.html',
		'http://www.ule.com/life/hnpay/henan/rec-phone1.html',
		'http://i1.ule.com/yzg/life/16382/j/public.js',
		'http://i1.ule.com/yzg/life/16382/j/daily-correct.js',
		'http://i1.ule.com/yzg/life/16382/j/password.js',
		'http://i1.ule.com/yzg/life/16382/j/page.js',
		'http://i1.ule.com/yzg/life/16382/j/daily-print.js',
		'http://i1.ule.com/yzg/life/16382/j/daily-surplus.js',
		'http://i1.ule.com/yzg/life/16382/j/form-daily.js',
		'http://i1.ule.com/yzg/life/16382/j/form-detail.js',
		'http://i1.ule.com/yzg/life/16382/j/form-summary.js',
		'http://i1.ule.com/yzg/life/16382/j/pay-service.js',
		'http://i1.ule.com/yzg/life/16382/j/pay-service-v1.js',
		'http://i1.ule.com/yzg/life/16382/j/coupons.js',
		'http://i1.ule.com/yzg/life/16382/j/rec-deposit.js',
		'http://i1.ule.com/yzg/life/16382/j/rec-phone.js',
		'http://i0.ule.com/yzg/life/16382/c/top-balance.css',
		'http://i0.ule.com/yzg/life/16382/c/i/icon-loading.gif',
		'http://i0.ule.com/yzg/life/16382/c/i/icon-money.png',
		'http://i0.ule.com/yzg/life/16382/c/i/icon-refresh.png',
		{www: 'http://i0.ule.com/j/app/hnpay/2015/0921/public.js?v1=1', local: 'yzg/life/16382/j/public.js?v1=1'}
	],
	index: 0,
	start: function(){
		var owner = FileDownloadHandler;
		var list = owner.list;
		log('');
		log('[ Run ] ●●● 开始下载文件, 文件共 ' + list.length + ' 个');
		owner.downloadOne();
	},
	downloadOne: function(){
		var owner = FileDownloadHandler;
		var list = owner.list;
		if (!list || list.length <= 0) {
			CssImageDownloadHandler.start();
			return;
		}
		var data = list.pop();
		if(data) {
			owner.index++;
			var www = typeof(data) == 'string' ? data : data.www;
			var filePath = data; if(data && data.www) filePath = (data.local || '');
			var req = _http.get(www, owner.downloadCallback(data, www, filePath)).on('error', function(err){
				log('[Error]            ', www, (www != filePath ? filePath : ''));
				list.push(data); owner.index--;
				owner.executeNext();
			});
		}
	},
	downloadCallback: function(data, www, filePath){
		var owner = FileDownloadHandler;
		var list = owner.list;
		var callback = function(res){
			if(res.statusCode == 200 || res.statusCode == 304) {
				var fileBuff = '';
				res.setEncoding("binary");
				res.on("data", function(chunk){
					fileBuff += chunk;
				});
				res.on("end", function(){
					filePath = mkdirMultiple(filePath);
					var fileInfo = _path.parse(filePath);
					if(fileInfo && fileInfo.ext == '.css')
						CssImageDownloadHandler.add(fileBuff, filePath);
					writeDownloadFile(owner.index, filePath, fileBuff, owner.executeNext);
				});
			} else {
				log('[Error]            ', res.statusCode, www, (www != filePath ? filePath : ''));
				list.push(data); owner.index--;
				owner.executeNext();
			}
		};
		return callback;
	},
	executeNext: function() {
		var owner = FileDownloadHandler;
		setTimeout(function(){
			owner.downloadOne();
		}, 500);
	}
};
FileDownloadHandler.start();

var CssImageDownloadHandler = {
	list: [],
	start: function(){
		var owner = CssImageDownloadHandler;
		var file = FileDownloadHandler;
		var list = owner.list;
		if(list.length > 0) {
			log('');
			log('[ Run ] ●●● 开始下载CSS图片, 图片共 ' + list.length + ' 个');
			log('');
			log(list);
			log('');
			file.list = list;
			file.index = 0;
			file.downloadOne();
		}
	},
	add: function(content, rootPath){
		var owner = CssImageDownloadHandler;
		owner.filterImageUrl(content, rootPath);
		owner.filterRepeat();
	},
	/** 过滤Css文件中包含的图片路径 */
	filterImageUrl: function(content, rootPath){
		var owner = CssImageDownloadHandler;
		var list = owner.list;
		rootPath = _url.parse(rootPath);
		rootPath = rootPath.pathname;
		rootPath = rootPath.substring(0, rootPath.lastIndexOf('/'));
		content.replace(/url\(([^(){}]+)\)/g, function(match, key) {
			if(key.indexOf('/') == 0) {
				list.push('http://i0.ule.com' + key);
			} else {
				list.push('http://i0.ule.com/' + rootPath + '/' + key);
			}
		});
	},
	/** 过滤重复路径 */
	filterRepeat: function(){
		var owner = CssImageDownloadHandler;
		var source = owner.list;
		var temp = [];
		if(source.length > 0) {
			for(var i = 0; i < source.length; i++){
				var url = source[i];
				if(temp.indexOf(url) == -1) {
					temp.push(url);
				}
			}
		}
		owner.list = temp;
	}
};


/** 写本地文件 */
function writeDownloadFile(fileIndex, path, data, next) {
	_fs.writeFile(path, data, "binary", function(err){
		var i = ('00000' + fileIndex).substr(-5);
		var flag = '[ OK  ] '; if(err) flag = '[ NO  ] ';
		if(flag == '[ OK  ] ')
			log(flag + '---' + i + '--- -------------------------------------------------------------' + path);
		else
			log(flag + '---' + i + '--- ' + path + ' -------------------------------------------------------------');
		next && next();
	});
}
/** 多重文件夹创建 */
function mkdirMultiple(path, mode) {
	if(!path) return '';
	var pathData = _url.parse(path);
	var filePath = pathData.pathname; if(!filePath) return '';
	pathData = _path.parse(_path.normalize(filePath));
	var dirPath = pathData.dir.replace(pathData.root, '');
	filePath = dirPath + "\\" + pathData.base;
	if(_fs.existsSync(dirPath)) return filePath;
	var list = dirPath.split(_path.sep);
	var levelPath = '';
	log('');
	log('[ Dir ]             ------------------------------------------------------------', dirPath, list);
	for(var i = 0; i < list.length; i++){
		var dirName = list[i];
		if(!dirName) continue;
		var curPath = levelPath + dirName;
		if (!_fs.existsSync(curPath))
			_fs.mkdirSync(curPath);
		levelPath = levelPath + dirName + '\\';
	}
	return filePath;
}
function log(){ console.info.apply(console, arguments); }