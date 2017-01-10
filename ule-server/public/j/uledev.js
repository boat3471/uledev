/** Created by xinwenchao on 2016/12/23. */

(function(){

	try{ (jQuery || $); }catch(e){ throw new Error('jQuery is not defined, Please use the <script src="//i1.uledev.com/yzg/j/lib/jquery.js"></script>'); }
	if(jQuery.fn.jquery != '3.1.1') throw new Error('jQuery version is not 2.2.2, Please use the <script src="//i1.uledev.com/yzg/j/lib/jquery.js"></script>');


	var explorer = function(){
		$(document).on('click', '.explorer-link', function(){
			var path = $(this).attr('path');
			$.ajax({
				url: '/ule/util/explorer',
				data: { path: path },
				success: function(data){
					var code = data ? (data.code || '') : '';
					if(code !== '0000')
						console.error(data);
				}
			})
		});
	};

	$(function(){
		explorer();
	});
})();
