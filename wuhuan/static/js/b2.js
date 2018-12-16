
/*$(document).ready(function(){
    var $category = $('.ttd a:gt(4):not(:last)');
	$category.hide();
	var $toggleBtn = $('.std .a_2');
	var $toggleBtn_1 = $('.std .a_1');
	$toggleBtn.toggle(function(){
		$category.show();
		$(this).removeClass('show').addClass('hide').text('更多');
	},function(){
		$category.hide();
		$(this).removeClass('hide').addClass('show').text('更多');
	})
	$('.std .a_1').toggle(function(){
		$category.show();
		$(".ttd a").find('input').addClass('cu');
		
	},function(){
		$category.hide();
		$(".ttd a").find('input').removeClass('cu');
	})
})


$(document).ready(function(){
    var $category = $('.ttd1 a:gt(4):not(:last)');
	$category.hide();
	var $toggleBtn = $('.std1 .a_2');
	$toggleBtn.toggle(function(){
		$category.show();
		$(this).removeClass('show').addClass('hide').text('更多');	
	},function(){
		$category.hide();
		$(this).removeClass('hide').addClass('show').text('更多');
	})
})*/





jQuery(function ($) {
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
	
	$("input[type=checkbox]").click(function () {
   try {
	   if ($(this).attr("checked")) {
		   $("#jsrtxt").val($("#jsrtxt").val() + $(this).parent().text() + ";");
	   } else {
		   $("#jsrtxt").val($("#jsrtxt").val().replace($(this).parent().text() + ';', ""));
	   }
   } catch (e) {
	   $("#jsrtxt").val("");
   }
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
			
		$("#px a").toggle(function(){
			$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
				})
	})
jQuery(function ($) {	
	$("#showArea a").click(function(){
		$("#showArea a").removeClass("hover");
		$(this).addClass("hover");
		})
	$("#xxj a").hover(function(){
		$("#xxj a").removeClass("hover");
		$(this).addClass("hover");
		},function(){
			$("#xxj a").removeClass("hover");
			})
	$("#gd").hover(function(){
		$("#gdfx").show();
		},function(){
			$("#gdfx").hide();
			})
	$("#gdfx").hover(function(){
		$("#gdfx").show();
		},function(){
			$("#gdfx").hide();
			})
	
	$("#ac").click(function(){
			$("#cx").removeClass("hover");
			$(this).addClass("hover");
			$("#cuxiao").hide();
			$("#active").show();
			})
	$("#cx").click(function(){
			$("#ac").removeClass("hover");
			$(this).addClass("hover");
			$("#active").hide();
			$("#cuxiao").show();
			})
	})
jQuery(function ($) {
	/*$(".jie_14>ul.le_1>li").toggle(function(){
		$(".jie_14>ul.le_1>li").removeClass("hover");
		$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
			})*/	
	/*$(".jie_15>ul.le_1>li").toggle(function(){
		$(".jie_15>ul.le_1>li").removeClass("hover");
		$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
			})	*/
/*	$(".wuliu li").hover(function(){
		$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
			})*/
			
		$("a.cwl").hover(function(){
			$(this).addClass("hove");
			},function(){	
				$(this).removeClass("hove");			
				})
				
		$("#xdd a").hover(function(){
			$("#xdd img").css('display','block')
			},function(){
				$("#xdd img").css('display','none')
				})
		$("#xsc a").hover(function(){
			$("#xsc img").css('display','block')
			},function(){
				$("#xsc img").css('display','none')
				})
		$("#ts").click(function(){
			$("#tl").removeClass("hover");
			$(this).addClass("hover");
			$(".z_box_5>div.tsl").css('display','none');
			$(".z_box_5>div.fts").css('display','block');
			})
		$("#tl").click(function(){
			$("#ts").removeClass("hover");
			$(this).addClass("hover");
			$(".z_box_5>div.fts").css('display','none');
			$(".z_box_5>div.tsl").css('display','block');
			})
			
})



/*jQuery(function ($) {
	$('#bannershow').cycle({
		fx:'scrollHorz',
		timeout:0,
		pager:'#bannerde3',
		next:'#bsNext',
		prev:'#bsPrev',
		pause:1
	})
})
jQuery(function ($) {
	$('#bannershow1').cycle({
		fx:'scrollHorz',
		timeout:0,
		next:'#bsNext1',
		prev:'#bsPrev1',
		pause:1
	})
})*/



















