var times=0;
//添加收藏
function addFav() {
    //判断是机器是mac 或 windows
	var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd':'Ctrl';
	//jQuery 从 1.9 版开始，移除了 $.browser 和 $.browser.version ， 取而代之的是 $.support
    //
   	if(jQuery.browser.msie) {
   	    //window.location.href是能够获取当前页面的url的
    	window.external.addFavorite(window.location,document.title);
   	} else if(window.sidebar) { 
    	window.sidebar.addPanel(document.title,window.location);
   	} else {
       	alert('添加失败，请用Ctrl+D进行添加');
   	}
}

//设为主页
function setMain() {
	if (document.all) {	  
        document.body.style.behavior = 'url(#default#homepage)';  
        document.body.setHomePage(document.URL);  
    } else {
        alert("设置首页失败，请手动设置！");  
    }
}
//检查cookies信息、验证是否老用户
$(function() {
    //获取cookies中的信息
	var name = $.cookies.get('userName');
    var cart = $.cookies.get('translatedCart');
    if (cart != null) {
        //设置购物车中商品的数量
        var size = cart.split('o').length - 1;
        $('#cartss').html(size);
    } else {
        $('#cartss').html(0);
    }
    if ($.cookies.get('userName') != null) {
        //decodeURI() 函数 对 encodeURI() 函数编码过的 URI 进行解码
   		var uname = decodeURI($.cookies.get('userName'), "UTF-8");
   		//cookies中存在信息就直接登录
        $('#welcome1').html('<p style="float:left;">您好，' + uname + ' ，欢迎来到五环！</p><a href="/logout"> [退出]</a><a href="/myOrder" class="a">我的五环体育</a>');
        $('#welcome').hide();
    }
});

function checkLogin() {
	if (null == $.cookies.get('userName')) {
			$("body").append("<div id='mask'></div>");
			//fadeIn() 显示 fadeOut() 隐藏
			$("#mask").addClass("mask").fadeIn("slow");
			$("#login").fadeIn("slow");
	}
}

/**
 * 关闭通栏广告
 */
var snActive = $(snActive), hideImg = snActive.find('a:hidden'), em = snActive.find("em");
timeout = !1;
if (hideImg[0]) {
    timeout = setTimeout(function() {
        snActive.animate({
            height : 40
        }, 600, function() {
            hideImg.siblings('a:visible').hide();
            hideImg.show();
            em.show().live("click", function() {
                snActive.slideUp(300);
            });
        });
    }, 3000)
}

/**
 * 刷新验证码
 */
function refreshCaptcha(name) {
	++times;
    $("#validateImg" + name).attr("src", "/SimpleCaptcha.lic?counter=0");
}

/**
 * 重置密码检查邮箱
 */
function checkInput() {
    //trim() 函数移除字符串两侧的空白字符或其他预定义字符
	var email=$("#email").attr("value").trim();
	if(!isEmail(email)){
		$(".ui-form-item-group").addClass(" z-ui-tooltips-in");
		return;
	}
	$(".ui-form-item-group").removeClass(" z-ui-tooltips-in");
    $.post("/forgetPasswordStep1", {
        name : $("#email").attr("value").trim(),
        //validate : $("#validate").attr("value")
    }, function(data) {
        if ("OK" == data) {
            location.href="/reset";
        } else {
        	$(".ui-form-item-group").addClass(" z-ui-tooltips-in");
        	$(".ui-form-item-group .ui-tooltips-msg").text(data);
    		return;
        }
    });
}

/**
 * 宽窄屏切换
 */
$(function() {
    var bigscreen = false;
    //screen.width浏览器窗口的最大宽度
    if (screen.width >= 1200) {
        bigscreen = true;
        var bodyTag = document.getElementsByTagName("body")[0], bodyClassName = bodyTag.getAttribute("className") || bodyTag.getAttribute("class");
        bodyClassName = bodyClassName ? bodyClassName + " " : "";
        bodyTag.className = bodyClassName + "root1200";
    }
});

/**
 * 用户操作时弹出提示并刷新验证码
 * message 提示内容
 * pageForm 验证码的位置
 */
function userAlert(message, pageForm) {
    alert(message);
    refreshCaptcha(pageForm);
}

/**
 * 检查是否是email格式
 */
function isEmail(obj) {
    reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
    if (!reg.test(obj)) {
        //$("#test").html("<b>请输入正确的邮箱地址</b>");
        return false;
    } else {
        //$("#test").html("");
        return true;
    }
}

/**
 * 检查是否是手机格式
 */
function isMobile(obj) {
    reg = /^[0-9]{11}$/;///^(+d{2,3}-)?d{11}$/;
    if (!reg.test(obj)) {
        //$("#test").html("请输入正确移动电话");
        return false;
    } else {
        //$("#test").html("");
        return true;
    }
}

/**
 * 检查是否是身份证的正确格式
 */
function isIDCard(obj) {
     IDCard=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
     if(!IDCard.test(obj)){
    	 return false;
     }else{
    	 return true;
     }
} 
/**
 * 检查生日格式是否正确
 */
function isBirth(obj){
	birth=/^[0-9]{8}$/;
	if (!birth.test(obj)) {
        return false;
    } else {
    	var year=obj.substring(0,4);
    	var month=obj.substring(4,6);
    	var day=obj.substring(6,8);
    	var date=new Date(year,month-1,day);
    	var nowDate=new Date();
    	if(date.getDate() == day && date.getMonth() == (month-1) && (date.getYear()+1900) == year 
    			&& year>1900 && date.getTime()<nowDate.getTime()){
    		return true;
    	}else{
    		return false;
    	}
    }
}


/**
 * 用户登录
 */
var loginPath;
function login() {
	var usernameLogin=$("#usernameLogin").val();
	var validateStrLogin=$("#validateStrLogin").val();
    /*数据验证*/
    if ("" == usernameLogin.trim() || "用户名/邮箱" == usernameLogin.trim()) {
        userAlert("请输入用户名或邮箱", "Login");
    } else if ("" == $("#passwordLogin").val()) {
        userAlert("请输入密码", "Login");
    } else if ("" == validateStrLogin.trim()) {
        userAlert("请输入验证码", "Login");
    } else {    	
        /*数据提交*/
        $.post("/login", {
        	username : encodeURI(usernameLogin.trim(), "UTF-8"),
            //username : encodeURI($("#usernameLogin").val()),
            password : $.md5($("#passwordLogin").val()),
            validate : validateStrLogin.trim()
        }, function(res) {
            if ("success" == res) {
               if(loginPath==null||loginPath==""){
            	   location.reload(); 
               }else{
            	   location.href=loginPath;
               }
                
            }else if ("wrongCaptcha" == res) {
                userAlert("验证码错误，请重新输入", "Login");
            } else if ("userNull" == res) {
                userAlert("用户名或邮箱错误，请重新输入", "Login");
            } else if ("wrongpassword" == res) {
            	userAlert("密码错误，请重新输入", "Login");
            }
        });
    }
}

/**
 * 用户注册
 */
function register() {
	var usernameReg=$("#usernameReg").val();
	var passwordReg=$("#passwordReg").val();
	var passwordReg2=$("#passwordReg2").val();
	var validateStrReg=$("#validateStrReg").val();
	var emailReg=$("#emailReg").val();
	var mobileReg=$("#mobileReg").val();
    /*数据验证*/
    if (!$("#agreed").is(':checked')) {
        userAlert("请接受协议", "Reg");
    } else if ("" == usernameReg.trim() || "用户名/手机/邮箱" == usernameReg.trim()) {
        userAlert("请输入用户名", "Reg");
    } else if ("" == passwordReg.trim()) {
        userAlert("请输入密码", "Reg");
    } else if (passwordReg.trim() != passwordReg2.trim()) {
        userAlert("两次密码输入不一致", "Reg");
    } else if ("" == validateStrReg) {
        userAlert("请输入验证码", "Reg");
    } else if ("" == emailReg.trim()) {
        userAlert("请输入电子邮件地址", "Reg");
    } else if ("" == mobileReg.trim()) {
        userAlert("请输入手机号码", "Reg");
    } else if (!isEmail(emailReg.trim())) {
        userAlert("电子邮件格式错误", "Reg");
    } else if (!isMobile(mobileReg.trim())) {
        userAlert("输入的不是手机号码", "Reg");
    } else {/*数据提交*/
        $.post("/register", {
            username : encodeURI(usernameReg.trim(), "UTF-8"),
            password : $.md5(passwordReg.trim()),
            email : emailReg.trim(),
            mobile : mobileReg.trim(),
            validate : validateStrReg
        }, function(res) {
            if ("success" == res) {
                $("#resign_1").fadeOut();
                $("#registerSuccess").fadeIn();
            } else if ("wrongCaptcha" == res) {
                userAlert("验证码错误，请重新输入", "Reg");
            } else if ("wrongUserName" == res) {
                userAlert("该用户名已被注册", "Reg");
            } else if ("wrongEmail" == res) {
                userAlert("该邮箱地址已被注册", "Reg");
            } else if ("wrongMobile" == res) {
                userAlert("该手机号码已被注册", "Reg");
            }
        });
    }
}

/**
 * 绑定线下会员卡
 */
function joinVIPCard() {
    /*数据验证*/
    if ("" == $("#memberCardNo").val()) {
        alert("请输入会员卡号");
    } else if ("" == $("#IDCard").val() || "输入18位数的身份证号码" == $("#IDCard").val()) {
        alert("请输入身份证号");
    } else if ("" == $("#memberPhone").val() || "输入11位数的手机号码" == $("#memberPhone").val()) {
        alert("请输入手机号");
    }else if (!isIDCard($("#IDCard").val())) {
        alert("身份证号格式错误");
    }else if (!isMobile($("#memberPhone").val())) {
        alert("手机号码格式错误");
    } else {    	
        /*数据提交*/
        $.post("/joinOfflineCard", {
        	memberCardNo : $("#memberCardNo").val(),
        	IDCard : $("#IDCard").val(),
        	memberPhone : $("#memberPhone").val()
        }, function(res) {
            if (res.indexOf("success")>=0) {
            	alert(res);
            	location.reload(); 
            }else {
            	alert(res);
            }
        });
    }
}

/**
 * 新建会员卡
 */
function newCard() {
/*数据验证*/
if ("" == $("#memberAddress").val()) {
    alert("请输入通讯地址");
} else if ("" == $("#NewIDCard").val() || "输入18位数的身份证号码" == $("#NewIDCard").val()) {
    alert("请输入身份证号   ");
} else if ("" == $("#memberBirth").val() || "格式为20160101" == $("#memberPhone").val()) {
    alert("请输入您的生日");
}else if (!isIDCard($("#NewIDCard").val())) {
    alert("身份证号格式错误");
}else if (!isBirth($("#memberBirth").val())) {
    alert("出生日期格式错误");
} else {    	
    /*数据提交*/
    $.post("/newOfflineCard", {
    	memberAddress : $("#memberAddress").val(),
    	IDCard : $("#NewIDCard").val(),
    	sex:$("input[type='radio']:checked").val(),
    	memberBirth : $("#memberBirth").val()
    }, function(res) {
        if (res.indexOf("false")>=0) {
        	alert(res);
        }else {
        	  $.get("/joinOfflineCard"+res, function(res) {
                  if (res.indexOf("success")>=0) {
                  	alert("新建会员卡成功！");
                  	window.location.href="/index.html";
                  }else {
                  	alert("新建会员卡失败！");
                  }
              });
        }
    });
}}


// 重组请求参数
function recombination(key, val){
    var par = window.location.href.split('?');
    console.log('par:'+par);
    if (par[1] == ''){
        console.log(`${key}=${val}`);
        return `${key}=${val}`
    }else{
        var ss = par[1];
        console.log('ss:'+ss);
        var ar = ss.split('&');
        console.log('ar: '+ar);
        var flag = 0;
        ar.forEach(function (ele, inx) {
            if (ele.startsWith(key)){
                ar[inx] = `${key}=${val}`;
                flag = 1
            }
        });
        var fs = ar.join('&');
        console.log('flag:'+flag);
        console.log('ar:'+ar);
        if (flag == 0){
            fs = fs + `&${key}=${val}`
        }
        console.log(fs);
        return fs
    }

}

/**
 * 以下三个函数解决乱码
 * @param {Object} facetName 搜索的名称
 * @param {Object} value 搜索的值
 */
function getUrl(facetName, value) {
    window.open("/facetSearch?" + facetName + "=" + value);
}

function getUrl0(rootName, value) {
    window.open("/facetSearch?" + rootName + "=" + value);
}

function getUrl2(facetName1, value1, facetName2, value2) {
    window.open("/facetSearch?" + facetName1 + "=" + value1 + "&" + facetName2 + "=" + value2);
}

function getUrl3(facetName1, value1, facetName2, value2, facetName3, value3) {
    window.open("/facetSearch?" + facetName1 + "=" + value1 + "&" + facetName2 + "=" + value2 + "&" + facetName3 + "=" + value3);
};

function getUrl4(facetName, value) {
    window.open("/facetSearch?" + facetName + value);
};

function getUrl5(facetName, value) {
    window.open("/facetSearch?" + recombination(facetName, value))
};

function showMore(){
    var link_a = $('#moreLink');
    var li = $('#more');
    if(link_a.val() == '更多'){
        li.css({display: block});
        link_a.val('收起')
    }else if(link_a.val() == '收起'){
       li.css({display: block});
        link_a.val('更多')
    }
};

$(document).ready(function(e) {
    $("#rightButton").css("right", "0px");

    var button_toggle = true;
    $(".right_ico").live("mouseover", function() {
        var tip_top;
        var show = $(this).attr('show');
        var hide = $(this).attr('hide');
        tip_top = show == 'tel' ? 65 : -10;
        button_toggle = false;
        $("#right_tip").css("top", tip_top).show().find(".flag_" + show).show();
        $(".flag_" + hide).hide();

    }).live("mouseout", function() {
        button_toggle = true;
        hideRightTip();
    });

    $("#right_tip").live("mouseover", function() {
        button_toggle = false;
        $(this).show();
    }).live("mouseout", function() {
        button_toggle = true;
        hideRightTip();
    });

    function hideRightTip() {
        setTimeout(function() {
            if (button_toggle)
                $("#right_tip").hide();
        }, 500);
    };

    //live()事件 点击是显式或隐藏元素
    $("#backToTop").live("click", function() {
        $('html,body').animate({
            scrollTop : 0
        }, 500);
    });
    
   
    
    $(".slide_menu .right_slide_1").hover(function() {
    	$(this).find('a .text').css('display','block');
    },function(){
    	$(this).find('a .text').css('display','none');
    });
    
    /*
   
      $("#backToTop").live("click", function() {
        var _this = $(this);
        $('html,body').animate({
            scrollTop : 0
        }, 500, function() {
            _this.hide();
        });
    });

    $(window).scroll(function() {
        var htmlTop = $(document).scrollTop();
        if (htmlTop > 0) {
            $(".slide_menu").show();
        } else {
            $(".slide_menu").hide();
        }
    });
*/
    /**
     * 顶部伸展广告
     */
    if ($("#js_ads_banner_top_slide").length){
    	var $slidebannertop = $("#js_ads_banner_top_slide"),$bannertop = $("#js_ads_banner_top");
    	setTimeout(function(){$bannertop.slideUp(1000);$slidebannertop.slideDown(1000);},1500);
    	setTimeout(function(){$slidebannertop.slideUp(1000,function (){$bannertop.slideDown(1000);});},5500);
    }
    
//设置按键事件，13为enter回车
    $(document).keydown(function(event){
    	 switch(event.keyCode) {
    	 case 13:
    		 if($("#login").css("display")=="block"){
    			 login();
    		 }
    	 }

    });
});