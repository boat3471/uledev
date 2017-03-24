define(function(require, exports, module){
	require('hui');
	var uledev = require('uledev');
	
	$(function(){
		$("[data-toggle='tooltip']").tooltip();
		$.Huifold("#Huifold3 .item h4", "#Huifold3 .item .info", "fast", 3, "click");
	});
});