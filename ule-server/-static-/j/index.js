define(function(require, exports, module){
	require('hui');
	require('jquery_validate');
	
	var uledev = require('uledev');
	var loginName = '';
	var passWord = '';
	
	
	$(function(){
		$("[data-toggle='tooltip']").tooltip();
		$.Huifold("#Huifold3 .item h4", "#Huifold3 .item .info", "fast", 3, "click");
	});
	
	$('#linkGR').on('click', function(){
		var $this = $(this);
		var url = $this.attr('href-o');
		if(loginName && passWord)
			url = url + '?ln=' + loginName + '&&pw=' + passWord;
		window.open(url);
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
			loginName = $('#loginname').val();
			passWord = $('#password').val();
			$("#modalLogin").modal("hide");
		}
	});
	
	$("#modalLogin").modal("show");
});