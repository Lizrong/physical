jQuery(function($) {
    $(".sort-list>ul>li").hover(function() {
        $(this).addClass("hover")
    }, function() {
        $(this).removeClass("hover")
    });
    $(".sort1-list>ul>li").hover(function() {
        $(this).addClass("hover")
    }, function() {
        $(this).removeClass("hover")
    });
})
jQuery(function($) {
    $("#nso").hover(function() {
        $("#nso_1").removeClass("cu_1");
        $("#nso_1").addClass("cu_2");
        $("#nav_1").css("z-index", "999")
    }, function() {
        $("#nso_1").removeClass("cu_2");
        $("#nso_1").addClass("cu_1");
        $("#nav_1").css("z-index", "-999")
    })
    $("#nso_1").hover(function() {
        $("#nso_1").addClass("cu_2");
        $("#nav_1").css("z-index", "999")
    }, function() {
        $("#nso_1").removeClass("cu_2");
        $("#nso_1").addClass("cu_1");
        $("#nav_1").css("z-index", "-999")
    })

    $("#px a").toggle(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    })
})
jQuery(function($) {
    $(".jie_14>ul.le_1>li").click(function() {
        $(".jie_14>ul.le_1>li").removeClass("hover");
        $(this).addClass("hover");
    })
    $("li.sp_xz").click(function() {
        $(this).hide();
    })
})

