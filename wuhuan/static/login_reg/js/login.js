
$(function(){
	$("span").css({"display":"none"});
	$("#subMit").click(function(){
		if($("input").val()==""){
		$("span").css({"display":"block"});
		$("#misUsername").html("您必须提供一个用户名");
		$("#misUserpass").html("您必须提供一个密码");
		$("#diffUserpass").html("您必须再次确认您的密码");
		$("#misNumber").html("请输入手机号");
		$("#misImgcheck").html("请输入右侧图片中的文字");
		$("#misMasscheck").html("请输入短信验证码");
		$("#mastRead").html("您必须阅读并同意该协议,否则无法注册");
		}
	})
		//注册用户名的正确显示与否
		$("#username").blur(function(){
			let names=/^[a-z]\w{5,17}$/ig;
			if (names.test($(this).val())==false){
				$("#misUsername").css({
					"display":"block"
				});
				$("#misUsername").html("请输入3-15位字母+数字、下划线或中文");
			}
		});
		//密码
		$("#userpass").blur(function(){
			let pass=/^[a-z1-9]\w{5,15}[!@#$%^&*~]{0,2}[a-z0-9]$/ig;
			if (pass.test($(this).val())==false){
				$("#misUserpass").css({
					"display":"block"
				});
				$("#misUserpass").html("密码长度应在6-20个字符之间");
			}
		});
		//确认密码
		$("#rePass").blur(function(){
			let word=$("#userpass").val();
			if ($(this).val()!=word){
				$("#diffUserpass").css({
					"display":"block"
				});
				$("#diffUserpass").html("两次输入的密码不一致");
			}
		});
		//手机号
		$("#phoneNum").blur(function(){
			let number=/^0[\d]{2,3}\-[1-9][\d]{7}$/gi;	
			if (number.test($(this).val())==false){
				$("#misNumber").css({
					"display":"block"
				});
				$("#misNumber").html("请输入正确的手机号");
			}
		});
	
	
});
			
