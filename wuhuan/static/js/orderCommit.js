$(function () {
    //用户备注
    $("#memo").blur(function () {
        var ss = $("#memo").val();
        $(".userbak").html("[用户备注]" + ss);
    });
    //显示所有收货地址
    $("#ck").click(function () {
        $('#tj_1 li').css({'display': 'block'});
        $("#ck").hide();
    });
});

function addclass(){
    $('#tj_2').addClass('cur');
    $('#tj_2 p input').attr('checked', true);
}


//改变省份，获取城市
function change() {
    var proId = $("#province").val();
    $("#city").empty();
    $.post("/selectcity/", {"pid": proId}, function (data) {
        var arr = data.city;
        $.each(arr,function(index,value){
            $('#city').append("<option selected='selected' value='" + value.id_ + "'>" + value.cityname + "</option>")
        });
        changeCity()
    });
}

//改变城市，获取区/县
function changeCity() {
    var cityId = $("#city").val();
    $("#district").empty();
    $.post("/selectcity/", {
        "pid": cityId
    }, function (data) {
        var arr = data.city;
        $.each(arr,function(index,value){
            $('#district').append("<option selected='selected' value='" + value.id_ + "'>" + value.cityname + "</option>")
        });
    });
}

//改变已有收货地址的区县
function changeEmptyDistrict() {
    var deli_Id = $("input[name='citys']:checked").attr("id");//收货地址id
    var districtId = $("#" + deli_Id + "_district").val();//区县
    $("#" + deli_Id).attr("district", districtId);
}

//添加收货地址
function addAddress() {
    //获取用户填入的信息
    var name = $("#name").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var district = $("#district").val();
    var address = $("#address").val();
    var telNum = $("#telnumber").val();
    var pattern = /^[0-9]*$/;
    //2个/是正值表达式的语法，/d表示是任何数字，等同于[0-9]，^ 表示要以数字开头，$表示要以数字结尾。

    if (name == "" || name == null) {
        window.alert("姓名不能为空");
        return;
    } else if (province == "" || province == null) {
        window.alert("请选择省信息");
        return;
    } else if (city == "" || city == null) {
        window.alert("请选择市信息");
        return;
    } else if (district == "" || district == null) {
        window.alert("请选择区/县信息");
        return;
    } else if (telNum == "" || telNum == null || telNum.length != 11) {
        window.alert("手机号码格式不对");
        return;
    } else if (!pattern.test(telNum)) {
        window.alert("手机号码格式不对");
        return;
    } else if (address == "" || address == null) {
        window.alert("配送地址不能为空");
        return;
    } else {
        console.log(name,province,city,district,address,telNum);
        $.post("/address/", {
            "name": name,
            "province": province,
            "cityId": city,
            "districtId": district,
            "address": address,
            "telnumber": telNum,
        }, function (data) {
            if(data.state == 200){
                var li = '<li id="li" style="display:block"> <span class="sp_2">' +
                    '<input id='+`${data.ads_id}`+' type="radio" name="citys" checked=true />'+ `${data.name}` +'</span><span class="sp_3">'+`${data.a_region}`+' '+`${data.address}`+'</span>' +
                    '<span class="sp_4">'+`${data.telnumber}`+'</span></li>'
                console.log(li);
                $('#1li').css({"display": "none"});
                $('#tj_1').append(li);
                $('#tj_2').removeClass('cur')
                $('#tj_2 p input').attr('checked', false)
            }else {
                alert("添加失败，请重试");
            }
        });
    }
}

//删除收货地址
function DeleData() {
    var mes = "确认要删除吗？";
    var deli = $("input:radio[name='citys']:checked");
    var deli_id = deli.attr("id");
    var deli_city_id = deli.parent().parent();
    if (confirm(mes) == true) {
        $.post("/deleteaddress/", {
            "deli_id": deli_id
        }, function (data) {
            if (data.state == 200){
                deli_city_id.remove();
            }
        });
    }
}

function modifyExpressFee(){
    var sel_id = $('#expressTypeId').val();
    var price = $('#pr').text();
    if (sel_id == 4){
        $('#expressFee').text(25);
        $('#exp').text(25);
        $('#totalPrice1').text(parseFloat(price) + 25)
    }else if(sel_id == 1){
        $('#expressFee').text(10);
        $('#exp').text(10);
        $('#totalPrice1').text(parseFloat(price) + 10);
        $('#totalPrice').text(parseFloat(price) + 10)
    }
}
// 计算商品总价
$(function(){
    var price = $('#pr').text();
    var exp = $('#exp').text();
    $('#totalPrice1').text(parseFloat(price) + 10);
    $('#totalPrice').text(parseFloat(price) + 10)
});

/*
 * 提交订单
 * @returns {Boolean}
 */
function commitOrder() {
	$("#tj_c").hide();
	$("#tishi").show();

	var deliveryFee = $("input[name='citys']:checked").attr('id');
	//var deliveryInfo = encodeURI($("input[name='citys']:checked").attr("addressInfo"));
	if (!typeof(deliveryFee)) {
		alert("请先选择收货信息");
		return;
	}
	// var memo = encodeURI($("#memo").val());
	var memo = $("#memo").val();
	var exp = $('#exp').text();
    var price =  $('#totalPrice').text();

	$.post("/orderCreate/", {
		'memo': memo,
        'exp': exp,
        'price': price,
		"deliveryFee" : deliveryFee,
		'state': 200
	}, function(data) {
		if (data == "nothing") {
			alert("购物车中没有商品");
			return;
		} else if (data == "toLogin") {
			alert("请登录后提交订单");
			return;
		}  else if (data == "freshCart") {
			alert("购物车中部分商品库存不足，点击确定刷新后提交");
			window.location.href = "/orderCommit";
			return;
		} else if (data == "false") {
			alert("库存不足，订单作废，请重新选择其他商品");
			return;
		} else if (data == "exception") {
			alert("服务器忙，请重试");
			return;
		}else{
		    // $('#tjc').css('display','block')
            criticalCode(data.order_num)
        }
	});
	return false;
}

function criticalCode(data){
	/*alert("系统已确认您的订单" + data + ",因本商场是店网同销，为避免货物滞留，请您于30分钟内完成支付，否则订单将自动作废，很抱歉给您带来的不便，感谢您的支持。\n五环网上商城");
	window.location.href = "/orderPay?orderNo=" + data;*/
	$(".shadow").show();
	$("#orderCreateSuccess").show();
	$("#orderCreateSuccess").find("#orderNo").text(data[0]);
	$("#orderCreateSuccess").find(".orderCreateSuccess_sub a").attr("href","/orderpay/?orderNo="+data[0]);
}