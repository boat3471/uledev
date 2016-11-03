/**
 * Created by xinwenchao on 2016/7/18.
 * 图片转换base64格式
 */

var fs = require('fs');
var list = [
	'images/1.png',
	'images/2.png',
	'images/3.png'
];
var index = 1;
function convert(){
	if(list.length == 0) return;
	var imagePath = list.pop();
	var imageFileName = imagePath.replace(/\//g, '-') + '.txt';
	var imageBuf = fs.readFileSync(imagePath);
	var imageString = 'data:image/jpg;base64,' + imageBuf.toString("base64");
	fs.writeFile(imageFileName, imageString, function(err){
		console.log('[OK]', imagePath);
		convert();
	});
}

convert();