$(function() {
   //输入积分框失去焦点
	$("#point").blur(function(){
		checkPoint();
	});
}); 


/**
 * 确认兑换积分
 */
function submitChange(){
	//先验证
	checkPoint();
	var jifen=$("#point").val();
	$.get("/changeCardCoupon",{
		jifen:jifen
		},function(data){
		if(data.indexOf("success") >= 0){
			var result=data.substring(7,data.length);
			var infos=result.split("_");
			if(infos.length>=2){
				alert("兑换优惠券成功，您已用"+parseInt(infos[0])+"积分兑换"+parseInt(infos[1])+"元优惠券");
				location.reload();
			}else{
				alert("兑换成功");
			}
		}else{
			alert("兑换失败，"+data.substring(1,data.length));
		}
	})
}

/**
 * 输入兑换积分，验证积分是否可用
 * @param jifenToMoney 积分用券兑换比例
 * @param cardPoint 会员卡积分
 * @returns {Boolean}
 */
function checkPoint(){
	var jifen=$("#point").val();
	var jifenToMoney=$("#jifenToMoney").val();
	var cardPoint=$("#cardPoint").val();
	//判断是否有积分或者积分是否可以兑换券
	if(parseFloat(jifenToMoney)<=0 || jifenToMoney==""){
		return false;
	}
	var percent=jifen/jifenToMoney;
	//先判断填写的积分格式是否正确
	if(isNaN(jifen)){
		alert("请输入需兑换的积分，格式只能为整数！");
		$("#point").val(0);
		return false;
	}else if(parseInt(jifen)>parseInt(cardPoint) || parseInt(jifen)<0){
		alert("需兑换的积分不能小于0不能超过现有积分！");
		$("#point").val(0);
		return false;
	}else if(parseInt(jifenToMoney) > parseInt(jifen) && parseInt(jifen)>0){
		alert("需兑换的积分不能小于"+jifenToMoney+"！");
		$("#point").val(0);
		return false;
	}else if(parseFloat(percent) != parseInt(percent)){
		alert("需兑换的积分必须是"+jifenToMoney+"的整数！");
		$("#point").val(parseInt(percent)*parseInt(jifenToMoney));
		return false;
	}else{
		return true;
	}
}

