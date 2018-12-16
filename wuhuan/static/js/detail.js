//评论
$(document).ready(function(){
    var shoping_detail = document.getElementById("shoping_detail");
    var look_speak=document.getElementById("look_speak");
    var jfbox =document.getElementById("fjbox");
    var shoping_speak=document.getElementById("shoping_speak");

    jfbox.style.display="block";
    shoping_speak.style.display = "none";

    shoping_detail.addEventListener("click",function(){
        jfbox.style.display="block";
        shoping_speak.style.display = "none"
    },false);
    look_speak.addEventListener("click",function(){
        jfbox.style.display='none';
        shoping_speak.style.display='block'

    },false);
    //  '+'和'-'
    var addShopping=document.getElementById("addShopping");
    var subShopping=document.getElementById("subShopping");
        addShopping.addEventListener("click", function () {
            var num=$("#proNum").val();
            $("#proNum").val(parseInt(num)+ 1);
            if($("#proNum").val()>=parseInt($("#stock").text())){
                $("#proNum").val($("#stock").text())
            }
        });
        subShopping.addEventListener("click", function () {
            var num=$("#proNum").val();
            $("#proNum").val(parseInt(num) - 1);
            if($("#proNum").val()<=1){
                $("#proNum").val(1)
            }
        });

        // 获取颜色和尺码
    var colors = document.getElementById("colors");
    var showStan = document.getElementById("showStan");
    colors.addEventListener("click",function(){
        $("#color").text($("#colors").text())
    })
    showStan.addEventListener("click",function(){
        $("#stan").text($("#showStan").text())
    })


});


function func(){
        var c_id=$("#g_id").attr("cart_id");
        var c_color=$('#color').text();
        var c_size=$('#stan').text();
        var c_number=$("#proNum").val();
        console.log(c_id,c_color,c_size,c_number);
        if ((c_color == "") || (c_size == '')){
            alert("您还没有选择尺码或颜色！");
            return
        }
        $.get("/savedetail/",{"c_id":c_id,"c_color":c_color,"c_size":c_size,"c_number":c_number},function(data){
            window.open('/cart/');
        })
    }



