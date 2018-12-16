$(document).ready(function() {
    //购物车中的“+”
    var prices = document.getElementById('allprice');
    var addShoppings = document.getElementsByClassName("addShopping");
    var subShoppings = document.getElementsByClassName("subShopping");
    var del = document.getElementsByClassName('del');
    for (var i = 0; i < addShoppings.length; i++) {
        addShopping = addShoppings[i];
        addShopping.addEventListener("click", function () {

            pid = this.getAttribute("ga");
            $.post("/addcart/", {"goodid": pid}, function (data) {
                if (data.status == 200) {
                    //添加成功，把中间的span的innerHTML变成当前的数量
                    document.getElementById(`${pid}`).innerHTML = data.cart_number;
                    document.getElementById("subtotal"+data.id_).innerHTML=data.subtotal;
                    document.getElementById('allprice').innerHTML=data.price;


                    // document.getElementById(pid+"price").innerHTML = data.price
                }
            })
        })
    }

    //购物车中的“-”号
    for (var i = 0; i < subShoppings.length; i++) {
        subShopping = subShoppings[i];
        subShopping.addEventListener("click", function () {
            pid = this.getAttribute("ga");
            $.post("/subcart/", {"goodid": pid}, function (data) {
                if (data.status == 200) {
                    //添加成功，把中间的span的innerHTML变成当前的数量
                    document.getElementById(`${pid}`).innerHTML = data.cart_number;
                    document.getElementById("subtotal"+data.id_).innerHTML=data.subtotal;
                    document.getElementById("allprice").innerHTML = data.price;
                    if (data.cart_number == 0) {
                        //window.location.href = "http://127.0.0.1:8001/cart/"
                        var li = document.getElementById(`${pid}` + "good")
                        li.parentNode.removeChild(li)
                        document.getElementById("subtotal"+data.id_).innerHTML=data.subtotal;
                        document.getElementById("allprice").innerHTML = data.price;
                    }

                }
            })
        })
    }

    //购物车中的删除
    for (var i = 0; i < del.length; i++) {
        del = del[i];
        del.addEventListener("click", function () {
            pid = this.getAttribute("ga");
            $.post("/deletecart/", {"goodid": pid}, function (data) {
                if (data.status == 200) {
                    //添加成功，把中间的span的innerHTML变成当前的数量
                    // document.getElementById(`${pid}`).innerHTML = data.cart_number
                    // document.getElementById(pid+"price").innerHTML = data.price
                    if (data.dell == 0) {
                        //window.location.href = "http://127.0.0.1:8001/cart/"
                        var li = document.getElementById(`${pid}` + "good")
                        li.parentNode.removeChild(li)
                        document.getElementById("allprice").innerHTML = data.price;
                    }
                }
            })
        })
    }

    //  购物车的单选
    var ischoses = document.getElementsByClassName("tdone");
    for (var j = 0; j < ischoses.length; j++) {
        ischose = ischoses[j];
        ischose.addEventListener('click', function () {
            pid = this.getAttribute('cartid');
            $.post("/changeone/", {'cartid': pid}, function (data) {
                console.log('1')
                if (data.status == 200) {
                    var s = document.getElementById(`${pid}` + 'a');

                    // if (data.selected == 1) {
                    //     s.val = "on"
                    //
                    // }
                    // else {
                    //     s.val = "none"
                    //     document.getElementById("allprice").innerHTML = data.price;
                    //
                    // }
                     document.getElementById("allprice").innerHTML = data.price;


                }

            })

        })
    }







    // 购物车的全选按钮
    // $('#selectall').click(function () {
    //     var ischose_list = document.getElementsByClassName("ischose");
    //
    //     //用来存储已经被选中的购物车记录
    //     var select_array = [];
    //     //用来存储未被选中的购物车记录
    //     var not_select_array = [];
    //     for (var j = 0; j < ischose_list.length; j++) {
    //         ischose = ischose_list[j];  // checkbox 对象
    //         console.log(ischose);
    //         ischose.checked = this.checked;
    //     }
    //     document.getElementById("allprice").innerHTML = data.price;
    //
    // })
    // $("#selectall").click(function(){
    //      var select_array = [];  // 用来存储已经选中的购物车记录id
    //      var not_select_array = [];  // 用来存储未被选中的购物车记录id
    //      $(".ischose").each(function(){
    //          if($(this).val="on"){
    //              select_array.push($(this).parents("trclass").attr("ga"));
    //          }
    //          if($(this).val='none'){
    //              not_select_array.push($(this).parents("trclass").attr("ga"));
    //          }
    //      });
    //
    //      if(not_select_array.length!=0){   // 存在未被选中的购物车记录
    //          var notselects = not_select_array.join("#");
    //          $.getJSON("/changeall/",{"notselects":notselects},function(data){
    //              if(data["status"]=="200"){
    //                  $(".ischose").each(function(){
    //                      if($(this).val='none'){
    //                          $(this).checked=$("#selectall").checked;
    //                      }
    //                  });
    //
    //                  // $("#selectall").children("span").html("√");
    //              }
    //          });
    //      }
    //
    //      //$(".ischose").attr("is_select")
    // })
    //多选
    $("#selectall").click(function(){
        // console.log('zaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        var sel = $("#selectall").is(":checked");
        console.log(sel);
        $.post('/changeall/',{"sel": sel},function(data){
            if (data.status == 200) {
                $.each(data.data, function(index, ele){
                    console.log(ele, index);
                    if (ele.state == 1){
                        var st = true
                    }else{
                        var st = false
                    }
                    $(`#${ele.id_}a`).prop('checked',st)
                });
                $('#allprice')[0].innerHTML = data.price
            }
      })
    })


});

function commit(){
    window.open('/order/');
}