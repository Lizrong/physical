//add by lizhineng, 2012.11.25
//设置当前需要展示的缩略图片，imgObj缩略图Jquery对象
var thumbsList = [];
// 缩略图列表li
function setCurrentImageShow(imgObj) {
	var smallImage = imgObj.attr("smallimg");
	var bigImage = imgObj.attr("bigimg");
	var imgDom = jQuery("#imgzoom");
	imgDom.attr("src", smallImage);
	imgDom.attr("jqimg", bigImage);
	var ie6 = (jQuery.browser.msie && jQuery.browser.version == "6.0" && !jQuery.support.style);

	// 先设置所有缩略图为未选中状态
	thumbsList.each(function(j) {
		jQuery(this).removeClass();
		if (ie6) {
			jQuery(this).css("filter", "alpha(opacity=70)");
		} else {
			jQuery(this).css("opacity", "0.7");
		}
	});
	// 设置当前缩略图为选中状态
	imgObj.parent().removeClass().addClass("on");
	if (ie6) {
		imgObj.parent().css("filter", "alpha(opacity=100)");
	} else {
		imgObj.parent().css("opacity", "1.0");
	}
}

$(document).ready(function() {
	// add by lizhineng, 2012.11.25
	thumbsList = jQuery("ul.thumbs li");
	// 缩略图 li list

	// 设置默认第一张大图展示
	var imgObj = jQuery("ul.thumbs li:first").find("img:first");
	if (imgObj.length > 0) {
		setCurrentImageShow(imgObj);
		// 显示大图
		// jQuery("span.jqzoom").show();
		// 放大镜效果
		jQuery(".jqzoom").ImageZoom({
			xzoom : 350,
			yzoom : 350
		});
	} else {
		// 设置大图显示默认nopic逻辑
	}

	// add by lizhineng, 2012.11.25
	thumbsList.each(function(i) {
		// 给缩略图赋予单击事件处理程序
		jQuery(this).bind("click", function(e) {
			var element = jQuery(e.target || e.srcElement);
			if (!element.is("img")) {
				return;
			}
			setCurrentImageShow(element);
		});
	});
});
/* 设置缩略图最后一个为当前颜色的最后一个*/
function reloadImg(){
	var imgList=$(".fjbox img");
		for(var i=4;i<imgList.length;i++){
			var imgStr=imgList[i].src;
			if(i==imgList.length-1){
			    if(imgStr.indexOf("sizecompare")>0){
			    	$("#img_4 img").attr("src",imgList[i-1].src);
					$('#img_4').attr("href",imgList[i-1].src);
					$('#img_4').attr("rev",imgList[i-1].src);
			    }else{
					$("#img_4 img").attr("src",imgStr);
					$('#img_4').attr("href",imgStr);
					$('#img_4').attr("rev",imgStr);
			    }
			}else{
				var arrayImg=imgStr.split("_");
				var arrayImg2=imgList[i+1].src.split("_");
			    if(arrayImg[2]!=arrayImg2[2]){
			    	$("#img_4 img").attr("src",imgStr);
				    $('#img_4').attr("href",imgStr);
				    $('#img_4').attr("rev",imgStr);
				    break;
			    }
			}
	}
};
function getProductInfos(productId) {
	$.getJSON("/getProductInfos?pid=" + productId + "&time="
			+ new Date().getMilliseconds(),
		function(json) {
			if (json.info == "exception" || json[5][0] == 0 || json[5][1] == 0) {
				if($("#pro_sku").attr('value')==null){
					$("#box_1").before('<div class="view_wrap"><h3 style="line-height: 45px; width: 335px; margin: 0px auto;">该商品已售罄，请<a href="/">继续</a>访问其他商品。</h3></div>');
				}else{
					$("#box_1").before('<div class="view_wrap"><h3 style="line-height: 45px; width: 335px; margin: 0px auto;">该商品'+$("#pro_sku").attr('value')+'已售罄，请<a href="/">继续</a>访问其他商品。</h3></div>');
				}
				$("#nav_1").remove();
				$("#box").remove();
				return;
			}
			$("#gwt_original_price").html(json[5][0]);
			$("#gwt_promotion_price").html("￥" + json[5][1]);
			$("#gwt_discount").html(json[5][3]);
			/*if(parseFloat(json[5][3])>=4){
				$("#promotionDesc").html("该商品下单再享折上8.8折优惠！");
			}*/
			$("#gwt_saver").html(parseInt(json[5][0]) - parseInt(json[5][1]));
			$("#color").html(json[0][0].proColorDesc.toString());
			$("#stan").html(json[1][0][0].proStanName);
			$("#stock").html(json[2][json[1][0][0].id * 10]);
			$("#proDetailId").val(json[3][json[1][0][0].id * 10]);
			var colorLength = json[0].length;
			if (colorLength == 1) {
				$(".v_good_color").css("display", "none");
			}
			if ($("#gwt_original_price").html() == ""
					|| $("#gwt_promotion_price").html() == "") {
			$(".view_wrap").remove();
			$(".bottom_0").before('<div class="view_wrap"><h3 style="line-height: 45px; width: 335px; margin: 0px auto;">该商品已经下架或不存在，请<a href="/">继续</a>访问其他商品。</h3></div>');
				return;
			}
			//重新加载最后一个缩略图
			reloadImg();
			/* 色码 */
			//$("#colors").append('<a id=color1 class="a_1" text='
				//	+ json[0][0].proColor.toString() + ' onclick=changeColor(' 
				//	+ 1 + ',' + json[0][0].id + ',' + json[4][0] + ') value=' 
				//	+ json[0][0].id + ' colorId=' + json[0][0].id + '>' 
				//	+ json[0][0].proColor.toString() + '</a>');
			for ( var i = 0; i < colorLength; i++) {
				$("#colors").append('<a class="a_1" id=color' + (i + 1) 
						+ ' text=' + json[0][i].proColor.toString() 
						+ ' onclick=changeColor(' + (i + 1)	+ ',' 
						+ json[0][i].id + ',' + json[4][i] + ') value=' 
						+ json[0][i].id + ' colorId=' + json[0][i].id + '>' 
						+ json[0][i].proColor.toString() + '</a>');
				}
				var stansLength = json[1].length;
			//	$("#color1").addClass('dd_selected');
				
				/* 尺码 */
				for ( var i = 0; i < stansLength; i++) {
					if (i == 0) {
						$("#showStan").append('<div id=stans' + (i + 1) + 
								' ></div>');
					} else {
						$("#showStan").append('<div id=stans' + (i + 1) 
								+ ' class=hideStan ></div>');
					}
					var stanLength = json[1][i].length;
					for ( var j = 0; j < stanLength; j++) {
						if (j == 0) {
							$("#stans" + (i + 1))
									.append('<span class="a_1 dd_selected" id=' 
											+ (i + 1) + json[1][i][j].id
											+ ' onclick=changeStan(' 
											+ json[1][i][j].id + ',' + (i + 1) 
											+ ',' + (json[1][i][j].id * 10 + i) 
											+ ')>' + json[1][i][j].proStanName
											+ '</span><input id=stock'
											+ (json[1][i][j].id * 10 + i)
											+ ' type=hidden value='
											+ json[2][json[1][i][j].id * 10 + i]
											+ '></input><input id=detailId'
											+ (json[1][i][j].id * 10 + i)
											+ ' type=hidden value='
											+ json[3][json[1][i][j].id * 10 + i]
											+ ' ></input>');
						} else {
							$("#stans" + (i + 1)).append('<span class="a_1" id='
									+ (i + 1) + json[1][i][j].id 
									+ ' onclick=changeStan(' + json[1][i][j].id 
									+ ',' + (i + 1) + ',' 
									+ (json[1][i][j].id * 10 + i) + ')>'
									+ json[1][i][j].proStanName
									+ '</span><input id=stock' 
									+ (json[1][i][j].id * 10 + i) 
									+ ' type=hidden value=' 
									+ json[2][json[1][i][j].id * 10 + i]
									+ '></input><input id=detailId'
									+ (json[1][i][j].id * 10 + i)
									+ ' type=hidden value='
									+ json[3][json[1][i][j].id * 10 + i]
									+ ' ></input>');
						}
					}
					// $("#" + (i +
					// 1)).children().get(0).addClass('dd_selected');

				}
			});
		}

function changeStan(stanId, id, stanFlag, productId) {
	$("#" + id + stanId).parent().children(".dd_selected").removeClass(
			"dd_selected");
	$("#" + id + stanId).addClass("dd_selected");
	var proId = productId;
	var colorId = $("#colors").children(".dd_selected").attr("colorId");
	var stock = $("#stock" + stanFlag).val();
	var detailId = $("#detailId" + stanFlag).val();
	$("#stock").html(stock);
	$("#proDetailId").val(detailId);
	$("#stan").html($("#stans" + id).children(".dd_selected").html());
	$("#color").html($("#colors").children(".dd_selected").attr("text"));
}

function collectPro(proId) {
	$.getJSON("collectPro", {
		"proId" : proId
	}, function(data) {
		if (data == true) {
			alert("添加成功");
		} else {
			alert("请登录后操作");
		}
	});
}

function buyPro(link) {
	var detailId = $("#proDetailId").val();
	var proNum = $("#proNum").val();
	if (isNaN(proNum) || proNum <= 0) {
		alert("请输入正确的数量");
		return;
	}
	$
			.get(
					"buyPro",
					{
						"detailId" : detailId,
						"proNum" : proNum,
						"time" : new Date().getMilliseconds()
					},
					function(data) {
						if (data == "true") {
							$("#cartMessage")
									.text(
											'您已经成功将商品放入购物车\n因为本商场是店网同销，为避免货物滞留，请您于60分钟之内完成支付，否则订单将自动作废\n感谢您的支持。');
							window.location.href = link;
						} else if (data == "hasBuy") {
							alert("您已购买过该物品，请在购物车中修改数量");
						} else {
							alert("超过库存量");
						}
					});
}

function add() {
	var proNum = $("#proNum").val();
	if (parseInt($("#stock").html()) != proNum) {
		$("#proNum").val(parseInt($("#proNum").val()) + 1);
	}
}

function sub() {
	var proNum = $("#proNum").val();
	if (1 != proNum) {
		$("#proNum").val(parseInt(--proNum));
	}
}

window.onload=function(){
	var colorList=$("#colors .a_1");
	var img=$("#img_0").attr('href');
	for (var i = 1; i < colorList.length+1; i++) {
		if(img.indexOf($("#color"+i).attr('value'))>0){
			$("#color"+i).click();
			return;
		}
	}
}
