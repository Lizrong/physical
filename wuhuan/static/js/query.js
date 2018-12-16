var times=0;
function addFav() {
	var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd':'Ctrl';
   	if(jQuery.browser.msie) {
    	window.external.addFavorite(window.location,document.title);
   	} else if(window.sidebar) {
    	window.sidebar.addPanel(document.title,window.location);
   	} else {
       	alert('添加失败，请用Ctrl+D进行添加');
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
    window.open("/facetSearch1" + facetName1 + "=" + value1 + "&" + facetName2 + "=" + value2 + "&" + facetName3 + "=" + value3);
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


});