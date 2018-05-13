//实例化导航点击
var myswiper = new Swiper(".main", {
    on: {
        slideChangeTransitionStart: function() {
            $("nav p").eq(this.activeIndex).addClass("active").siblings().removeClass("active");
        }
    }
});

$("nav").on("click", "p", function() {
    myswiper.slideTo($(this).index());
});

$.ajax({
    url: "/data",
    dataType: "json",
    success: function(res) {
        render(res);
    }
});

function render(data) {
    var str = "";
    $.each(data.list, function(i, v) {
        str += "<div class='list'><dl><dt><img src='" + v.url + "' alt=''></dt><dd><h3>" + v.tit + "</h3><p><b>" + v.tit + "</b><span>" + v.status + "</span></p><h4>" + v.con + "</h4><h5>" + v.ads + "</h5><h6><span>" + v.thing + "</span>" + v.time + "</h6></dd></dl></div>"
    });
    $(".three").html(str);
}