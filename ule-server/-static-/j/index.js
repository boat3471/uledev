define(function(require, exports, module){
	require('hui');
	require('jquery_validate');
	
	var uledev = require('uledev');
	
	$(function(){
		$("[data-toggle='tooltip']").tooltip();
	});
	
	$('#nav').on('click', 'li', function(){
		var $this = $(this);
		$this.siblings().removeClass('current');
		var index = $this.addClass('current').index();
		$('body > .info').addClass('hide').eq(index).toggleClass('hide');
	});
	
	$('#linkGR').on('click', function(){
		$.ajax({
			url: 'my/loginGR',
			type: 'POST',
			success: function(data){
				if(data && data.url)
					window.open(data.url);
			}
		});
	});
	
	$.extend($.validator.messages, {
		required: "这是必填字段",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		maxlength: $.validator.format("最多可以输入 {0} 个字符"),
		minlength: $.validator.format("最少要输入 {0} 个字符"),
		rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
		range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
		max: $.validator.format("请输入不大于 {0} 的数值"),
		min: $.validator.format("请输入不小于 {0} 的数值")
	});
	
	$('#formLogin').validate({
		submitHandler: function(){
			var loginName = $('#loginname').val();
			var passWord = $('#password').val();
			
			$.ajax({
				url: 'my/login',
				type: 'POST',
				data: {
					loginName: loginName,
					password: passWord
				},
				success: function(data){
					console.log(data);
					$("#modalLogin").modal("hide");
				}
			});
		}
	});
	
	$('#loginIn').on('click', function(){
		$("#modalLogin").modal("show");
	});
	
	$.ajax({
		url: 'my/loginCheck',
		data: {},
		type: 'POST',
		success: function(data){
			data = data || {};
			if(data.code == '0'){
				//$("#modalLogin").modal("hide");
			}else{
				$("#modalLogin").modal("show");
			}
		}
	});
});