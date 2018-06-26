//获取两位小数部分， 如 15.6  -> " .60"
Number.prototype.getDecimal2 = function () {
    return (this - Math.floor(this)).toFixed(2).substr(1);
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//1月5日 下午14:05 或者 2020年1月5日 下午14:05
//1月18日10:00:00开抢
Date.prototype.toPreStr = function(){
    var year = this.getFullYear();
    var month = this.getMonth();
    var day = this.getDate();
    var hour = this.getHours();
    var minute = this.getMinutes();
    var seconds = this.getSeconds();
    var now = new Date();
    var result = "";
    if(year !== now.getFullYear()){
        result += year + "年";
    }
    /*
     if(!(year === now.getFullYear() && month === now.getMonth())){
     result += (month + 1) + "月";
     }
     if(year === now.getFullYear() && month === now.getMonth() && now.getDate() === day){
     result += "今日";
     }else{
     result += day + "日";
     }
     */
    result += (month + 1) + "月";
    result += day + "日";

    /*
     if(hour >= 6 && hour < 12){
     result += "上午";
     }else if(hour >= 12 && hour < 18){
     result += "下午";
     }else{
     result += "晚上";
     }
     */
    if(hour < 10){
        result += "0";
    }
    result += hour;
    result += ":";
    if(minute < 10){
        result += "0";
    }
    result += minute;
    result += ":";
    if(seconds < 10){
        result += "0";
    }
    result += seconds;
    return result;
}

var maxLimitNum = 999999;//每人最大购买数量

var relatedProductsflexslidered = false;
function loadTab(index) {
    if (index == 0) {
        $("#moreProducts").removeClass("inactive");
        $("#moreProducts").addClass("active");
        $("#liMoreProducts").addClass("current");
        $("#relatedProducts").removeClass("active");
        $("#relatedProducts").addClass("inactive");
        $("#liRelatedProducts").removeClass("current");
    } else {
        $("#relatedProducts").removeClass("inactive");
        $("#relatedProducts").addClass("active");
        $("#liRelatedProducts").addClass("current");
        $("#moreProducts").removeClass("active");
        $("#moreProducts").addClass("inactive");
        $("#liMoreProducts").removeClass("current");
        if (!relatedProductsflexslidered) {
            $('.relatedProductsflexslider').flexslider({
                slideshow: true,
                animation: "slide",
                slideshowSpeed: 3000,
                directionNav: true,
                controlNav: false, //Boolean: Create navigation for previous/next navigation? (true/false)
                prevText: "Previous", //String: Set the text for the "previous" directionNav item
                nextText: "Next",
                pauseOnHover: true,
                useCSS: false
            });
            relatedProductsflexslidered = true;
        }
    }
}
//格式化日、时、分、秒数字。例子： 返回“02”
function formatTwo(day1){
    var dayTxt = "" + day1;
    if(day1 < 10){
        dayTxt = "0" + dayTxt;
    }
    return dayTxt;
}
function daojishi(timeStart, dayId, hourInd, minuteInd, secondId){
    //后台返回的时间戳
    //var timeStart = parseInt($("#dateVal1").text());

    var dayMsecs = 24 * 60 * 60 * 1000;
    var hourMsecs = 60 * 60 * 1000;
    var minMsecs = 60 * 1000;
    var msecs = 1000;
    //倒计时
    window.setInterval(function () {
        var day1 = 0, hour1 = 0, minute1 = 0, seconds1 = 0;

        var  timeNow = (new Date()).getTime();
        var distance = timeStart - timeNow;
        if(distance > 0){
            day1 = Math.floor(distance / dayMsecs);
            distance -= day1 * dayMsecs;
            hour1 = Math.floor(distance / hourMsecs);
            distance -= hour1 * hourMsecs;
            minute1 = Math.floor(distance / minMsecs);
            distance -= minute1 * minMsecs;
            seconds1 = Math.floor(distance / msecs);
        }

        //days  hours  minutes  seconds
        $("#" + dayId).text(formatTwo(day1));
        $("#" + hourInd).text(formatTwo(hour1));
        $("#" + minuteInd).text(formatTwo(minute1));
        $("#" + secondId).text(formatTwo(seconds1));
    }, 1000);
}

$().ready(function () {
    var $historyProduct = $("#historyProduct ul");
    var $clearHistoryProduct = $("#clearHistoryProduct");
    var $zoom = $("#zoom");
    var $scrollable = $("#scrollable");
    var $thumbnail = $("#scrollable a");
    var $specification = $("#specification .tm-prd-type-div");
    var $specificationValue = $("#specification a");
    var $quantity = $("#quantity");
    var $increase = $("#increase");
    var $decrease = $("#decrease");
    var $addCart = $("#addCart");
    var $buyAtonce = $("#buyAtonce");
    var $fmBuyAtonce = $("#fmBuyAtonce");
    var $addFavorite = $("#addFavorite");
    var $window = $(window);
    var $tabProdInfo = $("#tabProdInfo");
    var $introductionTab = $("#introductionTab");
    var $parameterTab = $("#parameterTab");
    var $reviewTab = $("#reviewTab");
    var $consultationTab = $("#consultationTab");
    var $introduction = $("#introduction");
    var $parameter = $("#parameter");
    var $review = $("#review");
    var $addReview = $("#addReview");
    var $consultation = $("#consultation");
    var $addInfoCorrection = $("#addInfoCorrection");
    var $addConsultation = $("#addConsultation");
    var $freight = $("#freight");
    var $areaId = $("#areaId");
    var $tmaddtocart = $(".tmaddtocart");
    var $moreReview = $("#moreReview");


    // 判断是否包含
    var contains = function(array, values) {
        var contains = true;
        for (i in values) {
            if ($.inArray(values[i], array) < 0) {
                contains = false;
                break;
            }
        }
        return contains;
    };

    var changeMaxMin = function(numNow, limitNum, $control){
        if(numNow <= 1){
            $control.addClass("min");
        }else{
            $control.removeClass("min");
        }
        if(numNow >= limitNum){
            $control.addClass("max");
        }else{
            $control.removeClass("max");
        }
    };


    // 商品图片放大镜
    $zoom.jqzoom({
        zoomWidth: 368,
        zoomHeight: 368,
        title: false,
        showPreload: false,
        preloadImages: false,
        preloadText:'加载中...'
    });

  if($("#quantity").attr("data-max-num")){
    maxLimitNum = parseInt($("#quantity").attr("data-max-num"));
  }

  //加、减
  $(".tm-prd-num-plus").click(function () {
    if ($(this).parent().hasClass("max")) {
      return;
    }
    var elem = $(this).parent().find(".tm-prd-num-input");
    var valNow = $(elem).val();
    if (isNaN(valNow)) {
      alert("无效数字，默认1件");
      $(elem).val("1");
      changeMaxMin(1, maxLimitNum, $(this).closest(".tm-prd-num"));
      return;
    }
    var numNow = parseInt(valNow);
    if (numNow < maxLimitNum) {
      numNow = numNow + 1;
    } else {
      numNow = maxLimitNum;
    }
    $(elem).val(numNow);
    changeMaxMin(numNow, maxLimitNum, $(this).closest(".tm-prd-num"));
    //calculatefreight("0");
  });
  $(".tm-prd-num-minus").click(function () {
    if ($(this).parent().hasClass("min")) {
      return;
    }
    var elem = $(this).parent().find(".tm-prd-num-input");
    var valNow = $(elem).val();
    if (isNaN(valNow)) {
      alert("无效数字，默认1件");
      $(elem).val("1");
      changeMaxMin(1, maxLimitNum, $(this).closest(".tm-prd-num"));
      return;
    }
    var numNow = parseInt(valNow);
    numNow = numNow - 1;
    if (numNow < 1) {
      numNow = 1;
    }
    $(elem).val(numNow);
    changeMaxMin(numNow, maxLimitNum, $(this).closest(".tm-prd-num"));
    //calculatefreight("0");
  });
  $(".tm-prd-num-input").keyup(function (event) {
    if (isNaN($(this).val())) {
      $(this).val("1");
      changeMaxMin(1, maxLimitNum, $(this).closest(".tm-prd-num"));
      calculatefreight("0");
      return;
    }
    var num1 = parseInt($(this).val());
    if (num1 < 1) {
      $(this).val("1");
      changeMaxMin(1, maxLimitNum, $(this).closest(".tm-prd-num"));
      //calculatefreight("0");
      return;
    }
    if (num1 > maxLimitNum) {
      $(this).val("" + maxLimitNum);
      changeMaxMin(maxLimitNum, maxLimitNum, $(this).closest(".tm-prd-num"));
    }
    //calculatefreight("0");
    return;
  });

  //选择省份    tm_city_select  tm_city_content
  $(".tm-prd-select-item").on("click", function () {
    $(".tm-prd-select-item").removeClass("active");
    $(this).addClass("active");
    $("#tm_city_content").text($(this).text());
    $areaId.val($(this).attr("value"));
    //calculatefreight("0");
    //$("#tm_city_select").removeClass("spreaded");
  });
  //省份选择框隐藏
  $("body").on("click", function (event) {
    if ($(event.target).is("#tm_city_select") || $(event.target).is("#tm_city_select *")) {
      //alert("选择框中");
    } else {
      //alert("选择框外");
      $("#tm_city_select").removeClass("spreaded");
    }
  });
  var isareaselect = false;
  var $tm_select = $("#tm_select");

  $("#tm_city_select").click(function () {
    $(this).toggleClass("spreaded");
  });

    // 商品缩略图滚动
    //假定，容器只能盛放4个项目
    var scrollImgsNum = 4;
    var scrollNextEnabled = function(){
        if(scrollApi.getSize() - scrollApi.getIndex() <= scrollImgsNum){
            $("#js_scroll_next").addClass("disabled");
        }else{
            $("#js_scroll_next").removeClass("disabled");
        }
    }
    /*var scrollImgs = $scrollable.scrollable({
        size:1,
        onBeforeSeek:function(event,index){
            if(index > scrollApi.getIndex()){
                if(scrollApi.getSize() - scrollApi.getIndex() <= scrollImgsNum){
                    event.preventDefault();
                }
            }
            scrollNextEnabled();
        },
        onSeek:function(event,index){
            scrollNextEnabled();
        }
    });
    var scrollApi = $scrollable.data("scrollable");*/

    $thumbnail.hover(function () {
        var $this = $(this);
        if ($this.hasClass("current")) {
            return false;
        } else {
            $thumbnail.removeClass("current");
            $this.addClass("current").click();
        }
    });

    /*//ellipsis
    $("#tm_subName").ellipsis({
        row: 2
    });*/

    //三级菜单的收起折叠
    $(".tm-item-p2").click(function () {
        if ($(this).parent().hasClass("tm-hasChild")) {
            if ($(this).parent().hasClass("spreaded")) {
                $(".tm-item-2").removeClass("spreaded");
            } else {
                $(".tm-item-2").removeClass("spreaded");
                $(this).parent().addClass("spreaded");
            }
        }
    });
    $(".tm-item-p").click(function () {
        if ($(this).parent().hasClass("tm-hasChild")) {
            if ($(this).parent().hasClass("spreaded")) {
                $(".tm-item").removeClass("spreaded");
            } else {
                $(".tm-item").removeClass("spreaded");
                $(this).parent().addClass("spreaded");
            }
        }
    });


    //商品介绍、参数、评论的多标签切换
    var barTop;
    if (tmPrdGlobal.hasMorePrds) {
        barTop = $tabProdInfo.offset().top;
    } else {
        barTop = $("#secondPanel").offset().top + 310;
    }
    $window.scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > barTop) {
            if (window.XMLHttpRequest) {
                $tabProdInfo.css({position: "fixed", top: 0});
            } else {
                $tabProdInfo.css({position: "absolute", top: scrollTop});
            }
        } else {
            $tabProdInfo.find("li").removeClass("current");
            $tabProdInfo.css({position: "static", top: 0});
        }
    });
    //Tab页切换
    if ($.tools != null) {
        var $tabProdInfo = $("#tabProdInfo");

        // Tab效果
        $tabProdInfo.tabs("div.tabProdInfoContent, table.tabProdInfoContent", {
            tabs: "a"
        });
    }


});


