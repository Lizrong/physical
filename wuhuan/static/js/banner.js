jQuery(function ($) {
    if ($(".slide-pic").length > 0) {
        var defaultOpts = { interval: 5000, fadeInTime:50, fadeOutTime:500};
/*        var _titles = $("ul.slide-txt li");
*/        var _titles_bg = $("ul.op li");
        var _bodies = $("ul.slide-pic li");
        var _count = _titles_bg.length;
        var _current = 0;
        var _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slide = function (opts) {
            if (opts) {
                _current = opts.current || 0;
            } else {
                _current = (_current >= (_count - 1)) ? 0 : (++_current);
            };
            _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
                _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
                _bodies.removeClass("cur").eq(_current).addClass("cur");
            });
/*            _titles.removeClass("cur").eq(_current).addClass("cur");
*/            _titles_bg.removeClass("cur").eq(_current).addClass("cur");
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
        };
        var itemMouseOver = function (target, items) {
            stop();
            var i = $.inArray(target, items);
            slide({ current: i });
        };
        _titles_bg.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles_bg); } else { stop(); } }, go);
        _bodies.hover(stop, go);
        go();
    }

	$(".sort-list>ul>li").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
	$(".sort1-list>ul>li").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
})
/*$(document).ready(function(e) {			
	t = $('.b_le').offset().top;
	mh = $('.b_ri').height()+157;
	fh = $('.b_le').height();
	$(window).scroll(function(e){
		s = $(document).scrollTop();	
		if(s >t-10){
			$('.b_le').css('position','fixed');
			if(s + fh > mh){
				$('.b_le').css('top',mh-s-fh+'px');	
			}	
				
		}else{
			$('.b_le').css('position','');
			$('.b_le').css('top','0px');
		}
		
		
	})
});*/



jQuery(function ($) {
	try{
		var isIE6 = $.browser.msie && $.browser.version == "6.0";
		var $headerH=$('#header').height();
		var $ygcate=$('.b_le');
		var tBottom=$('#box_1').offset().top+25;
		$(window).scroll(function(){
			var scrollHeight=$(window).scrollTop();
			//height会变化
			if(scrollHeight>$headerH){
				tBottom=$('#box_1').offset().top+25;
				$ygcate.addClass('js_yg_category');
					if(scrollHeight>tBottom-$ygcate.height()){
						$ygcate.addClass('js_yg_category_btm').css("top",tBottom-$ygcate.height()-$headerH);
						$(".sort .sort-list ul.one ul").css("top",0);
					}else{
						$ygcate.removeClass('js_yg_category_btm').css("top",0);
						if(isIE6){
							$ygcate.css("top",scrollHeight-$headerH);
						}		
						$(".sort .sort-list ul.one ul").css("top",0);
					}
			}else{
				$ygcate.css("top",0);
				$ygcate.removeClass('js_yg_category');
				$(".sort .sort-list ul.one ul").css("top","45px");
			}
		});
	}catch(e){}
	
	
	
	
	$(".sort-list>ul>li").hover(function() {
        $(this).addClass("hover")
    },
    function() {
        $(this).removeClass("hover")
    });
	})
jQuery(function ($) {	
	$("#qie .a_1").hover(function(){
		$(this).removeClass("ca_1")
		$("#qie .a_2").addClass("ca_2")
		$("#caa_1").show();
		$("#caa_2").hide();
		})
		
	$("#qie .a_2").hover(function(){
		$(this).removeClass("ca_2")
		$("#qie .a_1").addClass("ca_1");
		$("#caa_2").show();
		$("#caa_1").hide();
		})
	
})

jQuery(function ($) {	
	$("#nso").hover(function(){
		$("#nso_1").removeClass("cu_1");
		$("#nso_1").addClass("cu_2");
		$("#nav_1").css("z-index","999")
		},function(){
			$("#nso_1").removeClass("cu_2");
			$("#nso_1").addClass("cu_1");
			$("#nav_1").css("z-index","-999")
			})
		$("#nso_1").hover(function(){
		$("#nso_1").addClass("cu_2");
		$("#nav_1").css("z-index","999")
		},function(){
			$("#nso_1").removeClass("cu_2");
			$("#nso_1").addClass("cu_1");
			$("#nav_1").css("z-index","-999")
			})

	})















