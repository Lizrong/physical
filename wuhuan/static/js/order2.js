function choosePay1 (num){
    console.log('11111111111111');
    $('#box_s').css({'display':'block'});
    $('#tjc').css({'display':'block'});
    $('#zf1').css({'display':'block'});
    $('#zf2').css({'display':'none'});
    $('#zf3').css({'display':'none'});
    setTimeout(function(){
        $('#zf1').css({'display':'none'});
        $.post('/orderupdate/',{'ord_num': $('#ord_num').text()}, function(data){
            if(data.state == '200'){
                $('#zf2').css({'display':'block'});
                setTimeout(function(){
                    window.open('/index/', '_self')
                }, 2000)
            }else{
                $('#zf3').css({'display':'block'});
                setTimeout(function(){
                    $('#tjc').css({'display':'none'});
                    $('#box_s').css({'display':'none'});
                }, 1000)
            }
        });

    }, 2000)

}