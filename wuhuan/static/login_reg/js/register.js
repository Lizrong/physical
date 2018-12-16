$(function(){
    var userName=false;
    var userPassword=false;
    var resPassword=false;
    var userPhone=false;
    $("span").css({"display":"none"});
	$("#subMit").click(function(){
		if(userName&&userPassword&&userPhone&&resPassword){
		    return true
        }else {
		$("span").css({"display":"block"});
		$("#misUsername").html("您必须提供一个用户名");
		$("#misUserpass").html("您必须提供一个密码");
		$("#diffUserpass").html("您必须再次确认您的密码");
		$("#misNumber").html("请输入手机号");
		$("#misImgcheck").html("请输入右侧图片中的文字");
		// $("#misMasscheck").html("请输入短信验证码");
		$("#mastRead").html("您必须阅读并同意该协议,否则无法注册");
		return false
		}
	});

    $("#username").change(function(){
        inputname=this.value;
        $.get("/checkusername/",{"username":inputname},function(data){
             $("#misUsername").css("display","block");
             $("#misUsername").css("color",data["color"]).html(data["msg"]);
            if (data["status"]=="444"){
                userName=false
            }
            else{
                userName=true
            }
        })
    })

//密码
    $("#userpass").blur(function(){
        let pass=/^[a-z1-9A-Z_]\w{6,20}$/;
        if (pass.test($(this).val())==false){
            $("#misUserpass").css({
                "display":"block"
            });
            $("#misUserpass").html("密码长度应在6-20个字符之间");
            userPassword=false
        }
        else{
            $("#misUserpass").css({
                "display":"none"
            });
            userPassword=true
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
            resPassword=false
        }
        else{
            $("#diffUserpass").css({
                "display":"none"
            });
            resPassword=true
        }
    });
    //手机号
    $("#phoneNum").blur(function(){
        let number=/^[1][3-9]\d{9}$/;
        if (number.test($(this).val())==false) {
            $("#misNumber").css({
                "display": "block"
            });
            $("#misNumber").html("请输入正确的手机号");
            userPhone=false
        }
        else{
             $("#misNumber").css({
                "display": "none"
            });
             userPhone=true
        }
    });
     //验证码
    $("#imgs").click(function(){
        $.get("/ajaxrequest/",function(data){
            $("#imgs").attr("src",data.path);

        })

    })



    });