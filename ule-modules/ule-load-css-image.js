/**
 * Created by xinwenchao on 2016/7/12.
 * 快速下载Css中图片文件
 */

var http = require("http");
var fs = require('fs');

var cssList = [
	'http://i0.ule.com/c/hnpay/2015/0921/publicstyle.css',
	'http://i0.ule.com/c/hnpay/2016/0506/publicstyle.css'
];
var imageList = [];
var imageIndex = 0;

function downloadCss(){
	if(cssList.length <= 0) {
		console.info('[Start] 下载图片文件共: ' + imageList.length + ' 个');
		downloadIamge();
		return;
	}
	var cssPath = cssList.shift();
	http.get(cssPath, function(res){
		var cssData = '';
		res.on("data", function(chunk){
			cssData += chunk;
		});
		res.on("end", function(){
			filterCssImageUrl(cssData);
			filterRepeat();
			downloadCss();
		});
	});
}

function downloadIamge(){
	if(imageList.length <= 0) return;
	var url = imageList.pop();
	if(url){
		imageIndex++;
		var filePath = url;
		url = 'http:///i0.ule.com/' + url;
		url = url.replace(/\/\//g, '/');
		http.get(url, function(res){
			var imgData = "";
			res.setEncoding("binary");
			res.on("data", function(chunk){
				imgData += chunk;
			});
			res.on("end", function(){
				mkdirsSync(filePath);
				filePath = filePath.replace(/\\/g, '/'); //转换\为/
				filePath = filePath.indexOf('/') == 0 ? filePath.replace(/\//, '') : filePath;//消除路径首个/
				fs.writeFile(filePath, imgData, "binary", function(err){
					var flag = '[OK] ';
					var index = ('00000' + imageIndex).substr(-5);
					if(err) flag = '[NO] ';
					console.log(flag + '---' + index + '--- ' + filePath + ' -------------------------------------------------------------');
					downloadIamge();
				});
			});
		});
	}
}

/** 过滤Css文件中包含的图片路径 */
function filterCssImageUrl(content){
	content.replace(/url\(([^(){}]+)\)/g, function(match, key) {
		imageList.push(key);
	});
}
/** 过滤重复路径 */
function filterRepeat(){
	var temp = [];
	if(imageList.length > 0) {
		for(var i = 0; i < imageList.length; i++){
			var url = imageList[i];
			if(temp.indexOf(url) == -1) {
				temp.push(url);
			}
		}
	}
	imageList = temp;
}
/** 多级文件夹创建 */
function mkdirsSync(dirpath, mode) {
	if(!dirpath) return;
	dirpath = dirpath.replace(/\\/g, '/'); //转换\为/
	dirpath = dirpath.indexOf('/') == 0 ? dirpath.replace(/\//, '') : dirpath;//消除路径首个/
	dirpath = dirpath.indexOf('.') >= 0 ? dirpath.substring(0, dirpath.lastIndexOf('/')) : dirpath; //消除文件名, 只保留路径
	if (fs.existsSync(dirpath)) return;
	var list = dirpath.split('/');
	var base = '';
	console.info('创建路径: ', dirpath, list);
	for(var i = 0; i < list.length; i++){
		var name = list[i];
		if(name) {
			var path = base + name;
			if (!fs.existsSync(path))
				fs.mkdirSync(path);
			base = base + name + '\\';
		}
	}
}
downloadCss();