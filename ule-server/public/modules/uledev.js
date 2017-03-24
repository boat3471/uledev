define(function(require, exports, module){
	var $ = require('jquery');
	
	var uledev = function(){
	};
	
	$.extend(uledev, {
		explorer: function(path){
			if(!path) return;
			$.ajax({
				url: '/util/explorer',
				data: {path: path},
				success: function(data){
					var code = data ? (data.code || '') : '';
					if(code !== '0000')
						console.error(data);
				}
			})
		}
	});
	
	function initEvent(){
		var $body = $('body');
		$body.on('click', '.explorer-link', function(){
			var path = $(this).attr('path');
			uledev.explorer(path);
		});
	}
	
	initEvent();
});