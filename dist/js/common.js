/*



 *
 * JavaScript - Common
 * Version: 3.0
 */

var shoplg = {
	base: "",
	locale: "zh_CN",
	resourceSite: "",
	baseHttp: "",
	baseHttps: "",
	smsAuthCodeCountDownSeconds:120,
	jsCheckLogin:null
};
/*
说明：shoplg.jsCheckLogin
纯js判断是否已经登录，准确性低，但有利于网站性能
根据用户名的div是否可见来判断
初始化为null
文档准备好后，变成函数
*/
$().ready(function(){
	shoplg.jsCheckLogin = function(){
		var isLogin = false;
    	if($("#headerUsername").css("display") !== "none"){
    		isLogin = true;
    	}
    	return isLogin;
    }
});

var setting = {
	priceScale: "2",
	priceRoundType: "roundHalfUp",
	currencySign: "￥",
	currencyUnit: "元",
	uploadImageExtension: "jpg,jpeg,bmp,gif,png",
	uploadFlashExtension: "swf,flv",
	uploadMediaExtension: "swf,flv,mp3,wav,avi,rm,rmvb",
	uploadFileExtension: "zip,rar,7z,doc,docx,xls,xlsx,ppt,pptx"
};

var messages = {
	"shop.message.success": "操作成功",
	"shop.message.error": "操作错误",
	"shop.dialog.ok": "确&nbsp;&nbsp;定",
	"shop.dialog.cancel": "取&nbsp;&nbsp;消",
	"shop.dialog.deleteConfirm": "您确定要删除吗？",
	"shop.dialog.clearConfirm": "您确定要清空吗？",
	"shop.validate.required": "必填",
	"shop.validate.email": "E-mail格式错误",
	"shop.validate.url": "网址格式错误",
	"shop.validate.date": "日期格式错误",
	"shop.validate.dateISO": "日期格式错误",
	"shop.validate.pointcard": "信用卡格式错误",
	"shop.validate.number": "只允许输入数字",
	"shop.validate.digits": "只允许输入零或正整数",
	"shop.validate.minlength": "长度不允许小于{0}",
	"shop.validate.maxlength": "长度不允许大于{0}",
	"shop.validate.rangelength": "长度必须在{0}-{1}之间",
	"shop.validate.min": "不允许小于{0}",
	"shop.validate.max": "不允许大于{0}",
	"shop.validate.range": "必须在{0}-{1}之间",
	"shop.validate.accept": "输入后缀错误",
	"shop.validate.equalTo": "两次输入不一致",
	"shop.validate.remote": "输入错误",
	"shop.validate.integer": "只允许输入整数",
	"shop.validate.positive": "只允许输入正数",
	"shop.validate.negative": "只允许输入负数",
	"shop.validate.decimal": "数值超出了允许范围",
	"shop.validate.pattern": "格式错误",
	"shop.validate.extension": "文件格式错误",
	"shop.message.warn.alreadyCollected": "您已经收藏了！"
};

//2017.11.14 tmUtil_Pc 公共的js帮助方法集合
//依赖于jquery, thirdParty/Modaal,
var tmUtil_Pc = {};
tmUtil_Pc.formatNumberFixed = formatNumberFixed;
tmUtil_Pc.timeOverCover = timeOverCover;
tmUtil_Pc.getIdFromUrl = getIdFromUrl;
tmUtil_Pc.htmlDecode = htmlDecode;
tmUtil_Pc.modalIndex = 0;//modaal插件用到的，对弹出框的内容进行编码
tmUtil_Pc.modaalElemIdPrefix = "tm_modaal_target_";//inline类型的 modaal的id前缀
tmUtil_Pc.modaalContainerClass = "tm-Modaal-container";//modaal用到的 弹出框的外包类
tmUtil_Pc.modaalTriggersOutElemId = "tm_modaal_tiggers_out";
tmUtil_Pc.alertTriggerElemId = "tm_modaal_alert_trigger";//
tmUtil_Pc.confirmTriggerElemId = "tm_modaal_confirm_trigger";//
tmUtil_Pc.modalTriggerElemId = "tm_modaal_modal_trigger";
tmUtil_Pc.modalPlainTriggerElemId = "tm_modaal_modalPlain_trigger";
tmUtil_Pc.promptTriggerElemId = "tm_modaal_prompt_trigger";

function isCrossDomainUrl() {
  return false
}

tmUtil_Pc.redirect = function (url, milliseconds) {
  if(!url){
      return;
  }
  if(milliseconds == null || milliseconds === ""){
      milliseconds = 2000;
  }
  if(milliseconds){
      milliseconds = milliseconds / 1;
      window.setTimeout(function(){
          location.href = url;
      }, milliseconds);
  }
};

//html解码，依赖于jquery
function htmlDecode(value){
    return $('<div/>').html(value).text();
}

// 添加Cookie
function addCookie(name, value, options) {
    if (arguments.length > 1 && name != null) {
        if (options == null) {
            options = {};
        }
        if (value == null) {
            options.expires = -1;
        }
        if (typeof options.expires == "number") {
            var time = options.expires;
            var expires = options.expires = new Date();
            expires.setTime(expires.getTime() + time * 1000);
        }
        document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires ? "; expires=" + options.expires.toUTCString() : "") + (options.path ? "; path=" + options.path : "; path=/") + (options.domain ? "; domain=" + options.domain : "; domain="), (options.secure ? "; secure" : "");
        var addCookieCallback = function(data) {

        };
        var me_url_16 = shoplg.base + "/common/addcookie.jhtm";
        if(isCrossDomainUrl(me_url_16)){
            //jsonp
            $.ajax({
                url: me_url_16,
                type: "GET",
                scriptCharset:'UTF-8',
                cache:false,
                dataType:'jsonp',
                data:{name:name,value:value},
                success:addCookieCallback
            });
        }else{
            //json
            $.ajax({
                url:me_url_16,
                type: "GET",
                dataType: "json",
                cache: false,
                data:{name:name,value:value},
                success:addCookieCallback
            });
        }
    }
}

// 获取Cookie
function getCookieCallback(name, callback) {
	if (name != null) {
		var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
		var result1 = value ? decodeURIComponent(value[1]) : null;
		callback(result1);
	}
}

// 获取Cookie
function getCookie(name) {
	if (name != null) {
		var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
		return value ? decodeURIComponent(value[1]) : null;
	}
}


// 移除Cookie
function removeCookie(name, options) {
	addCookie(name, null, options);
}

// 货币格式化
function currency(value, showSign, showUnit) {
	if (value != null) {
		var price;
		if (setting.priceRoundType == "roundHalfUp") {
			price = (Math.round(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else if (setting.priceRoundType == "roundUp") {
			price = (Math.ceil(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else {
			price = (Math.floor(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		}
		if (showSign) {
			price = setting.currencySign + price;
		}
		if (showUnit) {
			price += setting.currencyUnit;
		}
		return price;
	}
}

// 多语言
function message(code) {
	if (code != null) {
		var content = messages[code] != null ? messages[code] : code;
		if (arguments.length == 1) {
			return content;
		} else {
			if ($.isArray(arguments[1])) {
				$.each(arguments[1], function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			} else {
				$.each(Array.prototype.slice.apply(arguments).slice(1), function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			}
		}
	}
}

function isMobileNo(mobile){
	var mobileReg = /^(1[0-9]{2})\d{8}$/;
	return mobileReg.test(mobile);
}
function removeErrors(){
	$(".fieldErrorRedTr").remove();
}
function clearErrors(){
	$(".fieldErrorRed").remove();
}
function showTrError(input, msg){
	var errelement = $("<label class='fieldErrorRed'>" + msg + "</label>");
	var nextTr = input.closest("tr").next();
	if (!nextTr.hasClass("fieldErrorRedTr")){
		nextTr = $("<tr class='fieldErrorRedTr'><th></th><td></td></tr>");
		nextTr.insertAfter(input.closest("tr"));
	}
	nextTr.find("td").html(errelement);
}

(function($) {

	var zIndex = 100;

	// 检测登录
	$.checkLoginCallback = function(callback) {
	    var result = false;
	    var checkLoginCallback = function(data) {
	    	if(data.isok){
	    		result = true;
	    	}else{
	    		result = false;
	    	}
	    	callback(result);
	    }
	    var me_url_17 =  shoplg.base + "/login/checkInJsonp.jhtm";
	    if(isCrossDomainUrl(me_url_17)){
	        //jsonp
	        $.ajax({
	            url: me_url_17,
	            type: "GET",
	            scriptCharset:'UTF-8',
	            cache:false,
	            dataType:'jsonp',
	            async:false,
	            global: false,
	            success:checkLoginCallback
	        });
	    }else{
	        //json
	        $.ajax({
	            url:me_url_17,
	            type: "GET",
	            dataType: "json",
	            cache: false,
	            async:false,
	            global: false,
	            success:checkLoginCallback
	        });
	    }
	};

	// 检测登录
	$.checkLogin = function() {
	    var result = false;
	    var checkLoginCallback = function(data) {
	    	if(data.isok){
	    		result = true;
	    	}else{
	    		result = false;
	    	}
	    }
	    var me_url_17 =  shoplg.base + "/login/checkInJsonp.jhtm";
	    if(isCrossDomainUrl(me_url_17)){
	        //jsonp
	        $.ajax({
	            url: me_url_17,
	            type: "GET",
	            scriptCharset:'UTF-8',
	            cache:false,
	            dataType:'jsonp',
	            async:false,
	            success:checkLoginCallback
	        });
	    }else{
	        //json
	        $.ajax({
	            url:me_url_17,
	            type: "GET",
	            dataType: "json",
	            cache: false,
	            async:false,
	            success:checkLoginCallback
	        });
	    }
	    return result;
	};
	//刷新购物车金额
	// 跳转登录
	$.refreshCartAmount = function () {
		var cartAmount = getCookie("cartAmount");
		if (cartAmount == null){
			cartAmount = "0.00";
		}
		$("#cartAmount").html("&#165&nbsp;" + cartAmount);

	};

	//刷新购物车数量
	// 跳转登录
	$.refreshCartQuantities = function () {
		var cartId = getCookie("cartId");
		var cartQuantities = getCookie("cartQuantities");
		if (cartQuantities == null || cartId == null){
			cartQuantities = "0";
		}
		$("#cartQuantities").html(cartQuantities)
	};
	// 跳转登录
	$.redirectLogin = function (redirectUrl, message) {
		var href = shoplg.base + "/login.jhtm";
		if (redirectUrl != null) {
			href += "?redirectUrl=" + encodeURIComponent(redirectUrl);
		}
		if (message != null) {
			$.message("warn", message);
			setTimeout(function() {
				location.href = href;
			}, 1000);
		} else {
			location.href = href;
		}
	};

	// 消息框
	var $message;
	var messageTimer;
	/*
	 *  2017.11.14注释
	 *  参数： 一个对象{}；  或者 两个string(第一个是 type, 第二个是 content; 只能传递这两个参数)
	 *  type: 类型，string,  必须传入,  可取值  "warn"、"error" 或 "success"
	 *  content: 内容，string, 必须传入
	 *  time: 停留毫秒，integer, 默认值2000
	 *  size: 可以取值 "normal"(默认), "big"(标识独占一行)
	 *  */
    $.message = function() {
        var message = {};
        if ($.isPlainObject(arguments[0])) {
            message = arguments[0];
        } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            message.type = arguments[0];
            message.content = arguments[1];
        } else {
            return false;
        }

        if (message.type == null || message.content == null) {
            return false;
        }
        if(!message.size){
            message.size = "normal";
        }
        var time = 2000;
        if (message.time != null){
            time = message.time;
        }
        if ($message == null) {
            if(message.size == "big"){
                $message = $('<div class="xxMessage xxMessage-big"></div>');
            }else{
                $message = $('<div class="xxMessage"></div>');
            }

            if (!window.XMLHttpRequest) {
                $message.append('<iframe class="messageIframe"></iframe>');
            }
            $message.appendTo("body");
        }

        $message.removeClass("xxMessage-warn").removeClass("xxMessage-error").removeClass("xxMessage-success").addClass("xxMessage-" + message.type).html("");
        var iconHtml = '';
        if(message.type == "warn"){
            iconHtml = '<span class="icon-danger"></span>';
        }else if(message.type == "error"){
            iconHtml =  '<span class="icon-error"></span>';
        }else if(message.type == "success"){
            iconHtml =  '<span class="icon-ok"></span>';
        }
        if(message.size == "big"){
            iconHtml = '<div class="xxMessage-title">' + iconHtml + '</div>';
			$message.append(iconHtml);
        }else{
            $message.append(iconHtml);
        }
        if(message.size == "big"){
            $message.append('<div class="xxMessage-content">' + message.content + '</div>');
        }else{
            $message.append('<span class="afterIconText">' + message.content + '</span>');
        }
        $message.css({"margin-left": - parseInt($message.outerWidth() / 2), "z-index": 2147483584}).show();

        clearTimeout(messageTimer);
        messageTimer = setTimeout(function() {
            $message.hide();
        }, time);
        return $message;
    };

	$.hideMessage = function() {
		var message = $('.xxMessage');
		if (message){
			message.hide();
		}
	};

	$.messageanchor = function(message) {
		if (message.anchor == 'undefined' || message.anchor == null){
			return $.message(message);
		} else {
			showTrError($("#" + message.anchor), message.content);
		}
	};

	// 对话框
	$.dialog = function(options) {
		var settings = {
			width: 320,
			height: "auto",
			modal: true,//固定这样
			closeAble:true,
			ok: message("shop.dialog.ok"),
			cancel: message("shop.dialog.cancel"),
			onShow: null,
			onClose: null,
			onOk: null,
			onCancel: null
		};
		$.extend(settings, options);

		if (settings.content == null) {
			return false;
		}

		var $dialog = $('<div class="xxDialog"><\/div>');
		var $dialogTitle;
		var $dialogClose;
		var $dialogContent;
		var $dialogBottom;
		var $dialogOk;
		var $dialogCancel;
		var $dialogOverlay;
		if(settings.closeAble){
            $dialogClose = $('<div class="dialogClose"><\/div>').appendTo($dialog);
        }
		if (settings.title != null) {
			$dialogTitle = $('<div class="dialogTitle"><\/div>').appendTo($dialog);
		}
		if (settings.type != null) {
			$dialogContent = $('<div class="dialogContent dialog' + settings.type + 'Icon"><\/div>').appendTo($dialog);
		} else {
			$dialogContent = $('<div class="dialogContent"><\/div>').appendTo($dialog);
		}
		if (settings.ok != null || settings.cancel != null) {
			$dialogBottom = $('<div class="dialogBottom"><\/div>').appendTo($dialog);
		}
		if (settings.ok != null) {
			$dialogOk = $('<input type="button" class="button" value="' + settings.ok + '" \/>').appendTo($dialogBottom);
		}
		if (settings.cancel != null) {
			$dialogCancel = $('<input type="button" class="button" value="' + settings.cancel + '" \/>').appendTo($dialogBottom);
		}
		if (!window.XMLHttpRequest) {
			$dialog.append('<iframe class="dialogIframe"><\/iframe>');
		}
		$dialog.appendTo("body");
		if (settings.modal) {
			$dialogOverlay = $('<div class="dialogOverlay"><\/div>').insertAfter($dialog);
		}

		var dialogX;
		var dialogY;
		if (settings.title != null) {
			$dialogTitle.text(settings.title);
		}
		$dialogContent.html(settings.content);
		$dialog.css({"width": settings.width, "height": settings.height, "margin-left": - parseInt(settings.width / 2), "z-index": zIndex ++});
		dialogShow();

		if ($dialogTitle != null) {
			$dialogTitle.mousedown(function(event) {
				$dialog.css({"z-index": zIndex ++});
				var offset = $(this).offset();
				if (!window.XMLHttpRequest) {
					dialogX = event.clientX - offset.left;
					dialogY = event.clientY - offset.top;
				} else {
					dialogX = event.pageX - offset.left;
					dialogY = event.pageY - offset.top;
				}
				$("body").bind("mousemove", function(event) {
					$dialog.css({"top": event.clientY - dialogY, "left": event.clientX - dialogX, "margin": 0});
				});
				return false;
			}).mouseup(function() {
				$("body").unbind("mousemove");
				return false;
			});
		}

		if ($dialogClose != null) {
			$dialogClose.click(function() {
				dialogClose();
				return false;
			});
		}

		if ($dialogOk != null) {
			$dialogOk.click(function() {
				if (settings.onOk && typeof settings.onOk == "function") {
					if (settings.onOk($dialog) != false) {
						dialogClose();
					}
				} else {
					dialogClose();
				}
				return false;
			});
		}

		if ($dialogCancel != null) {
			$dialogCancel.click(function() {
				if (settings.onCancel && typeof settings.onCancel == "function") {
					if (settings.onCancel($dialog) != false) {
						dialogClose();
					}
				} else {
					dialogClose();
				}
				return false;
			});
		}

		function dialogShow() {
			if (settings.onShow && typeof settings.onShow == "function") {
				if (settings.onShow($dialog) != false) {
					$dialog.show();
					$dialogOverlay.show();
				}
			} else {
				$dialog.show();
				$dialogOverlay.show();
			}
		}
		function dialogClose() {
			if (settings.onClose && typeof settings.onClose == "function") {
				if (settings.onClose($dialog) != false) {
					$dialogOverlay.remove();
					$dialog.remove();
				}
			} else {
				$dialogOverlay.remove();
				$dialog.remove();
			}
		}
		return $dialog;
	};

	//关闭所有的对话框. 简单粗暴，因为只用考虑ie8
	$.closeDialog = function(){
		$(".xxDialog").remove();
		$(".dialogOverlay").remove();
	};


	/*
	* */
	tmUtil_Pc.toast = $.message;


	if(typeof jQuery.fn.modaal === "function"){
        /*也可以用一个对象来传
         * @parameter message 类型：html字符串
         * @parameter title 类型：纯文本字符串
         * @parameter btnValue  类型是数组
         * @parameter callback  点击确认时的回调函数
         * @parameter triggerElem  类型 string,  css选择器的字符串 必须传入
         * @parameter triggerEvent  类型 string,  触发事件， 默认是 click
         * @params 更多参数 包括 width 等
         * */
        tmUtil_Pc.confirmBind = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            $(_triggerElem).modaal({
                type:"confirm",
                width:_width,
                overlay_opacity:0.5,
                custom_class:tmUtil_Pc.modaalContainerClass,
                confirm_button_text:_btnValue[0],
                confirm_cancel_button_text:_btnValue[1],
                confirm_title:_title,
                confirm_content:_message,
                confirm_callback:_callback
            });
        };

        tmUtil_Pc.confirm = function(_message, _title, _btnValue, _callback, _params) {
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
                _triggerElem = arguments[0]._triggerElem;
                _message = arguments[0]._message;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [message]");
            }
            if(!_btnValue || !_btnValue.length){
                _btnValue = ["确定","取消"];
            }
            if(Object.create) {//现代浏览器
                if($("#" + tmUtil_Pc.modaalTriggersOutElemId).length < 1){
                    $("body").append('<div id="' + tmUtil_Pc.modaalTriggersOutElemId + '" style="display: none;"></div>');
                }
                if($("#" + tmUtil_Pc.confirmTriggerElemId).length < 1){
                    $("#" + tmUtil_Pc.modaalTriggersOutElemId).append('<button type="button" id="' + tmUtil_Pc.confirmTriggerElemId + '"></button>');
                }

                if($("#" + tmUtil_Pc.confirmTriggerElemId).data("modaal")){
                    //使用过
                    var options1 = $("#" + tmUtil_Pc.confirmTriggerElemId).data("modaal").options;
                    options1.confirm_button_text =_btnValue[0];
                    options1.confirm_cancel_button_text = _btnValue[1];
                    options1.confirm_title = _title;
                    options1.confirm_content = _message;
                    options1.confirm_callback = _callback;
                }else{//首次使用
                    tmUtil_Pc.confirmBind(_message, _title, _btnValue, _callback, "#" + tmUtil_Pc.confirmTriggerElemId, _params);
                }
                $("#" + tmUtil_Pc.confirmTriggerElemId).trigger("click");
            }else{//ie8
                $.dialog({
                    title: _title,
                    width:_width,
                    closeAble:false,
                    content: _message,
                    ok: _btnValue[0],
                    cancel: _btnValue[1],
                    onOk: _callback
                });
            }
        };

        tmUtil_Pc.confirmBindOnce = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
                _triggerElem = arguments[0]._triggerElem;
                _message = arguments[0]._message;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.confirmBindOnce:  invalid parameter [message]");
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.confirmBindOnce:  invalid parameter [_triggerElem]");
            }
            if(!_btnValue || !_btnValue.length){
                _btnValue = ["确定","取消"];
            }
            if(Object.create) {//现代浏览器
                $(_triggerElem).modaal({
                    type:"confirm",
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                    confirm_button_text:_btnValue[0],
                    confirm_cancel_button_text:_btnValue[1],
                    confirm_title:_title,
                    confirm_content:_message,
                    confirm_callback:_callback
                });
            }else{//ie8
                $(_triggerElem).click(function(){
                    $.dialog({
                        title: _title,
                        width:_width,
                        closeAble:false,
                        content: _message,
                        ok: _btnValue[0],
                        cancel: _btnValue[1],
                        onOk: _callback
                    });
                });
            }
        };

        /*也可以用一个对象来传
         * @parameter message 类型：html字符串
         * @parameter title 类型：纯文本字符串
         * @parameter btnValue  类型是string
         * @parameter callback  点击确认时的回调函数, 没有大用
         * @parameter triggerElem  类型 string,  css选择器的字符串 必须传入
         * @parameter triggerEvent  类型 string,  触发事件， 默认是 click
         * */
        tmUtil_Pc.alertBind = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
            var $modaalContent = $('<div class="modaal-content-in"></div>');
            $modaalContent.html(_message);
            $modaalElem.append($modaalContent);
            if(_title){
                $modaalElem.prepend('<h1 id="modaal-title">' + _title + '</h1>');
            }
            $modaalElem.append('<div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="'+ _btnValue + '">' + _btnValue + '</button></div>');
            $("body").append($modaalElem);
            $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
            //_btnValue
            $(_triggerElem).modaal({
                width:_width,
                overlay_opacity:0.5,
                custom_class:tmUtil_Pc.modaalContainerClass,
            });
            tmUtil_Pc.modalIndex++;
        };

        tmUtil_Pc.alert = function(_message, _title, _btnValue, _callback, _params) {
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
                _message = arguments[0]._message;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [message]");
            }
            if(!_btnValue){
                _btnValue = "确定";
            }
            if(Object.create) {//现代浏览器
                if($("#" + tmUtil_Pc.modaalTriggersOutElemId).length < 1){
                    $("body").append('<div id="' + tmUtil_Pc.modaalTriggersOutElemId + '" style="display: none;"></div>');
                }
                if($("#" + tmUtil_Pc.alertTriggerElemId).length < 1){
                    $("#" + tmUtil_Pc.modaalTriggersOutElemId).append('<button type="button" id="' + tmUtil_Pc.alertTriggerElemId + '"></button>');
                }
                if($("#" + tmUtil_Pc.alertTriggerElemId).data("modaal")){
                    //使用过
                     var $modaalElem = $($("#" + tmUtil_Pc.alertTriggerElemId).attr("href"));
                    $modaalElem.find(".modaal-content-in").eq(0).html(_message);
                    $modaalElem.find("#modaal-title").remove();
                    if(_title){
                        $modaalElem.find(".modaal-content-in").eq(0).before('<h1 id="modaal-title">' + _title + '</h1>');
                    }
                    $modaalElem.find(".modaal-ok").text(_btnValue);
                }else{//首次使用
                    tmUtil_Pc.alertBind(_message, _title, _btnValue, _callback, "#" + tmUtil_Pc.alertTriggerElemId, _params );
                }
                $("#" + tmUtil_Pc.alertTriggerElemId).trigger("click");
            }else{//ie8
                $.dialog({
                    title: _title,
                    content: _message,
                    width:_width,
                    ok: _btnValue,
                    cancel: null,
                    onOk: _callback
                });
            }
        };

        tmUtil_Pc.alertBindOnce = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
                _message = arguments[0]._message;
                _triggerElem = arguments[0]._triggerElem;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.alertBindOnce:  invalid parameter [message]");
            }
            if(!_btnValue){
                _btnValue = "确定";
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.alertBindOnce:  invalid parameter [_triggerElem]");
            }
            if(Object.create) {//现代浏览器
                var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
                var $modaalContent = $('<div class="modaal-content-in"></div>');
                $modaalContent.html(_message);
                $modaalElem.append($modaalContent);
                if(_title){
                    $modaalElem.prepend('<h1 id="modaal-title">' + _title + '</h1>');
                }
                $modaalElem.append('<div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="'+ _btnValue + '">' + _btnValue + '</button></div>');
                $("body").append($modaalElem);
                $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
                //_btnValue
                $(_triggerElem).modaal({
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                });
                tmUtil_Pc.modalIndex++;
            }else{//ie8
                $(_triggerElem).click(function () {
                    $.dialog({
                        title: _title,
                        content: _message,
                        width:_width,
                        ok: _btnValue,
                        cancel: null,
                        onOk: _callback
                    });
                });
            }

        };

        /*
         * 普通的inline类型的 modaal
         * @parameter modaalParams 传递给 Modaal插件的参数, 必须传入且是对象
         * @parameter triggerElem  类型 string,  css选择器的字符串 必须传入
         * @parameter message 类型：html字符串
         * */
        tmUtil_Pc.modalBind = function(modaalParams, _triggerElem, _message, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
            $modaalElem.html(_message);
            $("body").append($modaalElem);
            $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
            //_btnValue
            var newModaalParams = $.extend({}, {
                width:_width,
                overlay_opacity:0.5,
                custom_class:tmUtil_Pc.modaalContainerClass,
                is_locked:true,
                hide_close:true
            }, modaalParams);
            $(_triggerElem).modaal(newModaalParams);
            tmUtil_Pc.modalIndex++;
        };

        tmUtil_Pc.modal = function(_message, modaalParams, _params) {
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(!_message){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [_message]");
            }
            if(!modaalParams || typeof modaalParams != "object"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [modaalParams]");
            }
            if(Object.create) {//现代浏览器
                if($("#" + tmUtil_Pc.modaalTriggersOutElemId).length < 1){
                    $("body").append('<div id="' + tmUtil_Pc.modaalTriggersOutElemId + '" style="display: none;"></div>');
                }
                if($("#" + tmUtil_Pc.modalTriggerElemId).length < 1){
                    $("#" + tmUtil_Pc.modaalTriggersOutElemId).append('<button type="button" id="' + tmUtil_Pc.modalTriggerElemId + '"></button>');
                }
                if($("#" + tmUtil_Pc.modalTriggerElemId).data("modaal")){
                    //使用过
                    var $modaalElem = $($("#" + tmUtil_Pc.modalTriggerElemId).attr("href"));
                    $modaalElem.html(_message);
                }else{//首次使用
                    tmUtil_Pc.modalBind(modaalParams, "#" + tmUtil_Pc.modalTriggerElemId , _message, _params);
                }
                $("#" + tmUtil_Pc.modalTriggerElemId).trigger("click");
            }else{//ie8
                $.dialog({
                    title: "",
                    content: _message,
                    width:_width,
                    closeAble:false,
                    ok: null,
                    cancel: null,
                    onOk: null
                });
            }
        };

        tmUtil_Pc.modalBindOnce = function(modaalParams, _triggerElem, _message, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(!_message){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_message]");
            }
            if(!modaalParams || typeof modaalParams != "object"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [modaalParams]");
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_triggerElem]");
            }
            if(Object.create) {//现代浏览器
                var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
                $modaalElem.html(_message);
                $("body").append($modaalElem);
                $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
                //_btnValue
                var newModaalParams = $.extend({}, {
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                    is_locked:true,
                    hide_close:true
                }, modaalParams);
                $(_triggerElem).modaal(newModaalParams);
                tmUtil_Pc.modalIndex++;
            }else{//ie8
                $(_triggerElem).click(function(){
                    $.dialog({
                        title: "",
                        content: _message,
                        width:_width,
                        closeAble:false,
                        ok: null,
                        cancel: null,
                        onOk: null
                    });
                });
            }
        };

        /*
         * 普通的inline类型的 modaal, 非模态
         * */
        tmUtil_Pc.modalPlainBind = function(modaalParams, _triggerElem, _message, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
            $modaalElem.html(_message);
            $("body").append($modaalElem);
            $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
            //_btnValue
            var newModaalParams = $.extend({}, {
                width:_width,
                overlay_opacity:0.5,
                custom_class:tmUtil_Pc.modaalContainerClass,
                is_locked:false,
                hide_close:false
            }, modaalParams);
            $(_triggerElem).modaal(newModaalParams);
            tmUtil_Pc.modalIndex++;
        };

        tmUtil_Pc.modalPlain = function(_message, modaalParams, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(!_message){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [_message]");
            }
            if(!modaalParams || typeof modaalParams != "object"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [modaalParams]");
            }
            if(Object.create) {//现代浏览器
                if($("#" + tmUtil_Pc.modaalTriggersOutElemId).length < 1){
                    $("body").append('<div id="' + tmUtil_Pc.modaalTriggersOutElemId + '" style="display: none;"></div>');
                }
                if($("#" + tmUtil_Pc.modalPlainTriggerElemId).length < 1){
                    $("#" + tmUtil_Pc.modaalTriggersOutElemId).append('<button type="button" id="' + tmUtil_Pc.modalPlainTriggerElemId + '"></button>');
                }
                if($("#" + tmUtil_Pc.modalPlainTriggerElemId).data("modaal")){
                    //使用过
                    var $modaalElem = $($("#" + tmUtil_Pc.modalPlainTriggerElemId).attr("href"));
                    $modaalElem.html(_message);
                }else{//首次使用
                    tmUtil_Pc.modalPlainBind(modaalParams, "#" + tmUtil_Pc.modalPlainTriggerElemId, _message, _params);
                }
                $("#" + tmUtil_Pc.modalPlainTriggerElemId).trigger("click");
            }else{//ie8
                $.dialog({
                    title: "",
                    content: _message,
                    width:_width,
                    ok: null,
                    cancel: null,
                    onOk: null
                });
            }
        };

        tmUtil_Pc.modalPlainBindOnce = function(_message, modaalParams, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(!_message){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_message]");
            }
            if(!modaalParams || typeof modaalParams != "object"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [modaalParams]");
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_triggerElem]");
            }
            if(Object.create) {//现代浏览器
                var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
                $modaalElem.html(_message);
                $("body").append($modaalElem);
                $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
                //_btnValue
                var newModaalParams = $.extend({}, {
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                    is_locked:false,
                    hide_close:false
                }, modaalParams);
                $(_triggerElem).modaal(newModaalParams);
                tmUtil_Pc.modalIndex++;
            }else{//ie8
                $(_triggerElem).click(function(){
                    $.dialog({
                        title: "",
                        content: _message,
                        width:_width,
                        closeAble:false,
                        ok: null,
                        cancel: null,
                        onOk: null
                    });
                });
            }
        };

        tmUtil_Pc.modalPlainBindOnceHref = function(_message, modaalParams, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(!_message){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_message]");
            }
            if(!modaalParams || typeof modaalParams != "object"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [modaalParams]");
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_triggerElem]");
            }
            if(Object.create) {//现代浏览器
                var $modaalElem = $('<div style="display: none;" id="' + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex + '"></div>');
                $modaalElem.html(_message);
                $("body").append($modaalElem);
                $(_triggerElem).attr("href", "#" + tmUtil_Pc.modaalElemIdPrefix + tmUtil_Pc.modalIndex);
                //_btnValue
                var newModaalParams = $.extend({}, {
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                    is_locked:false,
                    hide_close:false
                }, modaalParams);
                $(_triggerElem).modaal(newModaalParams);
                tmUtil_Pc.modalIndex++;
            }else{//ie8
                $(_triggerElem).click(function(){
                    $.dialog({
                        title: "",
                        content: _message,
                        width:_width,
                        closeAble:false,
                        ok: null,
                        cancel: null,
                        onOk: null
                    });
                });
            }
        };

        /*
         * @parameter message 类型：纯文本字符串
         * @parameter title 类型：纯文本字符串
         * @parameter btnValue  类型是数组
         * @parameter callback  点击确认时的回调函数
         * @parameter triggerElem  类型 string,  css选择器的字符串 必须传入
         * @parameter triggerEvent  类型 string,  触发事件， 默认是 click
         * */
        tmUtil_Pc.promptBind = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            var content1 = '<p class="tm-modaal-prompt-label">' + _message + '</p>';
            content1 += '<p class="tm-modaal-promt-input-p"><input class="tm-modaal-promt-input" type="text"/></p>';
            $(_triggerElem).modaal({
                type:"confirm",
                width:_width,
                overlay_opacity:0.5,
                custom_class:tmUtil_Pc.modaalContainerClass,
                confirm_button_text:_btnValue[0],
                confirm_cancel_button_text:_btnValue[1],
                confirm_title:_title,
                confirm_content:content1,
                confirm_callback:function(){
                    var $modaalElem = $("#" + $(_triggerElem).data("modaal").scope.id);
                    var input1 = $modaalElem.find("input.tm-modaal-promt-input").val();
                    _callback(input1);
                }
            });
        };

        tmUtil_Pc.prompt = function(_message, _title, _btnValue, _callback, _params) {
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _message = arguments[0]._message;
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [message]");
            }
            if(!_btnValue || !_btnValue.length){
                _btnValue = ["确定","取消"];
            }
            var content1 = '<p class="tm-modaal-prompt-label">' + _message + '</p>';
            content1 += '<p class="tm-modaal-promt-input-p"><input class="tm-modaal-promt-input" type="text"/></p>';
            if(Object.create) {//现代浏览器
                if($("#" + tmUtil_Pc.modaalTriggersOutElemId).length < 1){
                    $("body").append('<div id="' + tmUtil_Pc.modaalTriggersOutElemId + '" style="display: none;"></div>');
                }
                if($("#" + tmUtil_Pc.promptTriggerElemId).length < 1){
                    $("#" + tmUtil_Pc.modaalTriggersOutElemId).append('<button type="button" id="' + tmUtil_Pc.promptTriggerElemId + '"></button>');
                }

                if($("#" + tmUtil_Pc.promptTriggerElemId).data("modaal")){
                    //使用过
                    var options1 = $("#" + tmUtil_Pc.promptTriggerElemId).data("modaal").options;
                    options1.confirm_button_text =_btnValue[0];
                    options1.confirm_cancel_button_text = _btnValue[1];
                    options1.confirm_title = _title;
                    options1.confirm_content = content1;
                    options1.confirm_callback = function(){
                        var $modaalElem = $("#" + $("#" + tmUtil_Pc.promptTriggerElemId).data("modaal").scope.id);
                        var input1 = $modaalElem.find("input.tm-modaal-promt-input").val();
                        _callback(input1);
                    };
                }else{//首次使用
                    tmUtil_Pc.promptBind(_message, _title, _btnValue, _callback, "#" + tmUtil_Pc.promptTriggerElemId, _params );
                }
                $("#" + tmUtil_Pc.promptTriggerElemId).trigger("click");
            }else{//ie8
                $.dialog({
                    title: _title,
                    content: content1,
                    ok: _btnValue[0],
                    cancel: _btnValue[1],
                    width:_width,
                    closeAble:false,
                    onOk: function(){
                        var $modaalElem = $(".xxDialog");
                        var input1 = $modaalElem.find("input.tm-modaal-promt-input").val();
                        _callback(input1);
                    }
                });
            }
        };

        tmUtil_Pc.promptBindOnce = function(_message, _title, _btnValue, _callback, _triggerElem, _params){
            var _width = 800;
            if(_params && typeof _params === "object" && _params.width && typeof _params.width == "number"){
                _width = _params.width;
            }
            if(typeof arguments[0] == "object"){
                _message = arguments[0]._message;
                _title = arguments[0]._title;
                _btnValue = arguments[0]._btnValue;
                _callback = arguments[0]._callback;
            }
            if(typeof _message != "string"){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [message]");
            }
            if(!_btnValue || !_btnValue.length){
                _btnValue = ["确定","取消"];
            }
            if(!_triggerElem || typeof _triggerElem != "string"){
                throw Error("tmUtil_Pc.modalBindOnce:  invalid parameter [_triggerElem]");
            }
            if(Object.create) {//现代浏览器
                var content1 = '<p class="tm-modaal-prompt-label">' + _message + '</p>';
                content1 += '<p class="tm-modaal-promt-input-p"><input class="tm-modaal-promt-input" type="text"/></p>';
                $(_triggerElem).modaal({
                    type:"confirm",
                    width:_width,
                    overlay_opacity:0.5,
                    custom_class:tmUtil_Pc.modaalContainerClass,
                    confirm_button_text:_btnValue[0],
                    confirm_cancel_button_text:_btnValue[1],
                    confirm_title:_title,
                    confirm_content:content1,
                    confirm_callback:function(){
                        var $modaalElem = $("#" + $(_triggerElem).data("modaal").scope.id);
                        var input1 = $modaalElem.find("input.tm-modaal-promt-input").val();
                        _callback(input1);
                    }
                });
            }else{//ie8
                $(_triggerElem).click(function(){
                    $.dialog({
                        title: _title,
                        content: content1,
                        ok: _btnValue[0],
                        cancel: _btnValue[1],
                        width:_width,
                        closeAble:false,
                        onOk: function(){
                            var $modaalElem = $(".xxDialog");
                            var input1 = $modaalElem.find("input.tm-modaal-promt-input").val();
                            _callback(input1);
                        }
                    });
                });
            }
        };
        /*
         * 关闭  modaal
         * @parameter triggerElem  类型 string,  css选择器的字符串 必须传入
         * */
        tmUtil_Pc.modal.closeBind = function(_triggerElem){
            if(!_triggerElem){
                throw Error("tmUtil_Pc.confirm:  invalid parameter [_triggerElem]");
            }
            if(Object.create){//现代浏览器
                $(_triggerElem).modaal("close");
            }else{//ie8
                $.closeDialog();
            }
        };
    }



	// 对话框
	$.wapdialog = function(options) {
		var settings = {
			width: 200,
			height: "auto",
			modal: true,
			ok: message("shop.dialog.ok"),
			cancel: message("shop.dialog.cancel"),
			onShow: null,
			onClose: null,
			onOk: null,
			onCancel: null
		};
		$.extend(settings, options);

		if (settings.content == null) {
			return false;
		}

		var $dialog = $('<div class="xxDialog"><\/div>');
		var $dialogTitle;
		var $dialogClose = $('<div class="dialogClose"><\/div>').appendTo($dialog);
		var $dialogContent;
		var $dialogBottom;
		var $dialogOk;
		var $dialogCancel;
		var $dialogOverlay;
		if (settings.title != null) {
			$dialogTitle = $('<div class="dialogTitle"><\/div>').appendTo($dialog);
		}
		if (settings.type != null) {
			$dialogContent = $('<div class="dialogContent dialog' + settings.type + 'Icon"><\/div>').appendTo($dialog);
		} else {
			$dialogContent = $('<div class="dialogContent"><\/div>').appendTo($dialog);
		}
		if (settings.ok != null || settings.cancel != null) {
			$dialogBottom = $('<div class="dialogBottom"><\/div>').appendTo($dialog);
		}
		if (settings.ok != null) {
			$dialogOk = $('<input type="button" class="button" value="' + settings.ok + '" \/>').appendTo($dialogBottom);
		}
		if (settings.cancel != null) {
			$dialogCancel = $('<input type="button" class="button" value="' + settings.cancel + '" \/>').appendTo($dialogBottom);
		}
		if (!window.XMLHttpRequest) {
			$dialog.append('<iframe class="dialogIframe"><\/iframe>');
		}
		$dialog.appendTo("body");
		if (settings.modal) {
			$dialogOverlay = $('<div class="dialogOverlay"><\/div>').insertAfter($dialog);
		}

		var dialogX;
		var dialogY;
		if (settings.title != null) {
			$dialogTitle.text(settings.title);
		}
		$dialogContent.html(settings.content);
		$dialog.css({"width": settings.width, "height": settings.height,"position":"absolute",top:$(window).height()/2, left:$(window).width() / 2-90 , "z-index": zIndex ++});
		dialogShow();

		if ($dialogTitle != null) {
			$dialogTitle.mousedown(function(event) {
				$dialog.css({"z-index": zIndex ++});
				var offset = $(this).offset();
				if (!window.XMLHttpRequest) {
					dialogX = event.clientX - offset.left;
					dialogY = event.clientY - offset.top;
				} else {
					dialogX = event.pageX - offset.left;
					dialogY = event.pageY - offset.top;
				}
				$("body").bind("mousemove", function(event) {
					$dialog.css({"top": event.clientY - dialogY, "left": event.clientX - dialogX, "margin": 0});
				});
				return false;
			}).mouseup(function() {
				$("body").unbind("mousemove");
				return false;
			});
		}

		if ($dialogClose != null) {
			$dialogClose.click(function() {
				dialogClose();
				return false;
			});
		}

		if ($dialogOk != null) {
			$dialogOk.click(function() {
				if (settings.onOk && typeof settings.onOk == "function") {
					if (settings.onOk($dialog) != false) {
						dialogClose();
					}
				} else {
					dialogClose();
				}
				return false;
			});
		}

		if ($dialogCancel != null) {
			$dialogCancel.click(function() {
				if (settings.onCancel && typeof settings.onCancel == "function") {
					if (settings.onCancel($dialog) != false) {
						dialogClose();
					}
				} else {
					dialogClose();
				}
				return false;
			});
		}

		function dialogShow() {
			if (settings.onShow && typeof settings.onShow == "function") {
				if (settings.onShow($dialog) != false) {
					$dialog.show();
					$dialogOverlay.show();
				}
			} else {
				$dialog.show();
				$dialogOverlay.show();
			}
		}
		function dialogClose() {
			if (settings.onClose && typeof settings.onClose == "function") {
				if (settings.onClose($dialog) != false) {
					$dialogOverlay.remove();
					$dialog.remove();
				}
			} else {
				$dialogOverlay.remove();
				$dialog.remove();
			}
		}
		return $dialog;
	};

	// 信息纠错
	$.findMistake = function(option) {

		var $popup = $('<div id="pop_win_detail" class="popup_infoCorrection">');
		var $popupTitle = $('<h3 class="title">纠错</h3>').appendTo($popup);
		var $popupCloseBtn = $('<span class="close">关闭</span>').appendTo($popupTitle);
		var $popupBox = $('<div class="box"><p class="p_text">如果您发现产品描述、规格参数、包装信息、产品图片等信息有错误或不完整，欢迎指出，感谢您的关注与支持</p><p class="p_box"><textarea rows="" cols="" id="findMistakeContent"></textarea></p><p id="findMistakeContentTips_p" class="p_error_text error_color"><em>*</em><span class="font_num" id="findMistakeContentTips">请输入纠错内容</span></p></div>').appendTo($popup);
		var $popupSubmitBtn = $('<p class="btn"><input id="findMistakeButton" class="submit_correction" type="button" value="提交纠错内容"></p>').appendTo($popupBox);
		$popupOverlay = $('<div class="dialogOverlay"><\/div>').insertAfter($popup);

		$popup.appendTo("body");
		$popup.css({"position":"absolute", "width": 440, "height": 220, top:$(window).height()/2, left:$(window).width() / 2 - 200,"z-index": 1});
		popupShow();

		$popupCloseBtn.click(function() {
			popupClose();
			return false;
		});

		$popupCloseBtn.click(function() {
			popupClose();
			return false;
		});

		$popupSubmitBtn.click(function() {
			if (option.onSubmit && typeof option.onSubmit == "function") {
				if (option.onSubmit($popup) != false) {
					popupClose();
				}
			} else {
				popupClose();
			}
			return false;
		});

		function popupShow() {
			$popup.show();
			$popupOverlay.show();
		}
		function popupClose() {
			$popupOverlay.remove();
			$popup.remove();
		}
		return $popup;
	};

	// 申请样本册
	$.applyBrochure = function(option) {

		var $popup = $('<div id="pop_win_detail" class="popup_common">');
		var $popupTitle = $('<h3 class="title">样本册申请</h3>').appendTo($popup);
		var $popupCloseBtn = $('<span class="close">关闭</span>').appendTo($popupTitle);
		var $popupBox = $('<div class="box"><p class="p_text">请填入您的收件信息，我们将为您邮寄纸质样本册。</p></div>').appendTo($popup);
		var $phase = $('<p class="p_box">姓名: </p>').appendTo($popupBox);
		var $name = $('<input type="text" id="name"></input>').appendTo($phase);

		$phase = $('<p class="p_box">电话: </p>').appendTo($popupBox);
		var $phoneNo = $('<input type="text" id="phoneNo"></input>').appendTo($phase);
		$phase = $('<p class="p_box_textarea">地址: </p>').appendTo($popupBox);
		var $address = $('<textarea rows="" cols="" id="address"></textarea>').appendTo($phase);
		var $errorPanel = $('<div class="p_error_text"></div>').appendTo($popup);
		var $popupSubmitBtn = $('<div class="btn"><input id="brochureApplyButton" class="popup_submit" type="button" value="提交"></div>').appendTo($popup);

		$popupOverlay = $('<div class="dialogOverlay"><\/div>').insertAfter($popup);

		$popup.appendTo("body");
		$popup.css({"position":"absolute", "width": 450, "height": 250, top:$(window).height()/2, left:$(window).width() / 2 - 200,"z-index": 1});
		popupShow();

		$popupCloseBtn.click(function() {
			popupClose();
			return false;
		});

		$popupSubmitBtn.click(function() {
			if ($.trim($name.val()) == ""){
				$errorPanel.html("姓名为必填");
				return;
			}
			if ($.trim($phoneNo.val()) == ""){
				$errorPanel.html("电话为必填");
				return;
			}
			if ($.trim($address.val()) == ""){
				$errorPanel.html("地址为必填");
				return;
			}
			if (option.onSubmit && typeof option.onSubmit == "function") {
				var data = {"name":$name.val(), "phoneNo":$phoneNo.val(), "address":$address.val()};
				if (option.onSubmit(data) != false) {
					popupClose();
				}
			} else {
				popupClose();
			}
			return false;
		});

		function popupShow() {
			$popup.show();
			$popupOverlay.show();
		}
		function popupClose() {
			$popupOverlay.remove();
			$popup.remove();
		}
		return $popup;
	};

	// 取消订单
	$.cancelOrder = function(option) {
		var $popup = $('<div id="pop_win_detail" class="popup_common">');
		var $popupTitle = $('<h3 class="title">订单取消</h3>').appendTo($popup);
		var $popupCloseBtn = $('<span class="close">关闭</span>').appendTo($popupTitle);
		var $popupBox = $('<div class="box"><p class="p_text">您确定要取消该订单吗？取消订单后，不能恢复。</p></div>').appendTo($popup);
		var $phase = $('<p class="p_box">请选择取消订单的理由：</p>').appendTo($popupBox);
		var $cancelReason = $('<select id="cancelReason"><option value="none" checked>请选择关闭理由</option><option value="noReason" checked>我不想买了</option><option value="sizeWrong" checked>尺寸/规格填错了</option><option value="addressWrong" checked>收货地址/电话填写错了</option><option value="other" checked>其他</option></select>').appendTo($phase);

		var $errorPanel = $('<div class="p_error_text"></div>').appendTo($popup);
		var $buttonDiv =  $('<div class="btn"></div>').appendTo($popup);
		var $popupSubmitBtn = $('<input class="popup_cancelreason_submit" id="cancelReasonOk" type="button" value="确定">').appendTo($buttonDiv);
		var $popupBtmCloseBtn = $('<input class="popup_close" type="button" value="关闭">').appendTo($buttonDiv);
		$popupOverlay = $('<div class="dialogOverlay"><\/div>').insertAfter($popup);

		$popup.appendTo("body");
		$popup.css({"position":"absolute", "width": 350, "height": 180, top:200, left:$(window).width() / 2 - 100,"z-index": 1});
		popupShow();

		$popupCloseBtn.click(function() {
			popupClose();
			return false;
		});
		$popupBtmCloseBtn.click(function() {
			popupClose();
			return false;
		});

		$popupSubmitBtn.click(function() {
			if ($.trim($cancelReason.val()) == "none"){
				$errorPanel.html("请选择一种理由");
				return;
			}
			if (option.onSubmit && typeof option.onSubmit == "function") {
				var data = {"cancelReason":$cancelReason.val()};
				if (option.onSubmit(data) != false) {
					popupClose();
				}
			} else {
				popupClose();
			}
			return false;
		});

		function popupShow() {
			$popup.show();
			$popupOverlay.show();
		}
		function popupClose() {
			$popupOverlay.remove();
			$popup.remove();
		}
		return $popup;
	};

	// 令牌
	$(document).ajaxSend(function(event, request, settings) {
		if (!settings.crossDomain && settings.type != null && settings.type.toLowerCase() == "post") {
			var token = getCookie("token");
			if (token != null) {
				request.setRequestHeader("token", token);
			}
		}
	});

	$(document).ajaxComplete(function(event, request, settings) {
		var loginStatus = request.getResponseHeader("loginStatus");
		var tokenStatus = request.getResponseHeader("tokenStatus");

		if (loginStatus == "accessDenied") {
			$.redirectLogin(location.href, "请登录后再进行操作");
		} else if (tokenStatus == "accessDenied") {
			var token = getCookie("token");
			if (token != null) {
				$.extend(settings, {
					global: false,
					headers: {token: token}
				});
				$.ajax(settings);
			}
		}
	});

})(jQuery);

// 令牌
$().ready(function() {

	$("form").submit(function() {
		var $this = $(this);
		if ($this.attr("method") != null && $this.attr("method").toLowerCase() == "post" && $this.find("input[name='token']").size() == 0) {
			var token = getCookie("token");
			if (token != null) {
				$this.append('<input type="hidden" name="token" value="' + token + '" \/>');
			}
		}
	});

});

// 验证消息
if ($.validator != null) {
	$.extend($.validator.messages, {
		required: message("shop.validate.required"),
		email: message("shop.validate.email"),
		url: message("shop.validate.url"),
		date: message("shop.validate.date"),
		dateISO: message("shop.validate.dateISO"),
		pointcard: message("shop.validate.pointcard"),
		number: message("shop.validate.number"),
		digits: message("shop.validate.digits"),
		minlength: $.validator.format(message("shop.validate.minlength")),
		maxlength: $.validator.format(message("shop.validate.maxlength")),
		rangelength: $.validator.format(message("shop.validate.rangelength")),
		min: $.validator.format(message("shop.validate.min")),
		max: $.validator.format(message("shop.validate.max")),
		range: $.validator.format(message("shop.validate.range")),
		accept: message("shop.validate.accept"),
		equalTo: message("shop.validate.equalTo"),
		remote: message("shop.validate.remote"),
		integer: message("shop.validate.integer"),
		positive: message("shop.validate.positive"),
		negative: message("shop.validate.negative"),
		decimal: message("shop.validate.decimal"),
		pattern: message("shop.validate.pattern"),
		extension: message("shop.validate.extension")
	});

	$.validator.setDefaults({
		errorClass: "fieldError",
		ignore: ".ignore",
		ignoreTitle: true,
		errorPlacement: function(error, element) {
			var fieldSet = element.closest("span.fieldSet");
			if (fieldSet.size() > 0) {
				error.appendTo(fieldSet);
			} else {
				error.insertAfter(element);
			}
		},
		submitHandler: function(form) {
			$(form).find(":submit").prop("disabled", true);
			form.submit();
		}
	});
}

function setCookie2(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function getCookie2(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
//PC端用的，当土猫网用户退出时，调用七鱼的logout接口
tmUtil_Pc.qiyuLogout = function(){
    var camzql = getCookie("camzql");
    if(camzql && ysf && ysf.logoff){
        ysf.logoff({
            uid:camzql
        });
    }
};

$().ready(function () {
    //菜单
    $(".menu>li").mouseenter(function (event) {
        $(".menuSecond").hide();
        $(this).find(".menuSecond").show();
    });
    $(".menu>li").mouseleave(function (event) {
       if(!($(event.relatedTarget).is(".menu>li") || $(event.relatedTarget).is(".menuSecond"))){
           $(".menuSecond").hide();
       }
    });
    $(".menuSecond").mouseleave(function (event) {
        $(".menuSecond").hide();
    });
    //PC端用的，当土猫网用户退出时，调用七鱼的logout接口。注册事件
    $("a#headerLogout,li#headerLogout>a").click(function(){
        tmUtil_Pc.qiyuLogout();
		return true;
    });
});

//顶部通栏广告
$().ready(function () {
var html1 = '<a href="http://activity.toolmall.com/activity/static/1021.html" target="_blank">';
	html1 += '<div class="tm-header-banner" style="background-image: url(//resource.toolmall.com/resource/toolmallPc/resources/shop/bigImages/index/recommend_1920_80.png);display:block;height: 80px;">';
		html1 += '双十一来了，全场狂欢仅此一周';
		html1 += '</div>';
	html1 += '</a>';
$(".headertop").eq(0).before(html1);
});

//帮助方法，提取出url中的id
//例如：http://product.toolmall.com/productinfo/51946.html  ，提取到的id是51946。
//如果url为空，则从当前的url取值。如果匹配不到id, 那么返回空字符串
//不是特别健壮，慎用
function getIdFromUrl(url){
    if(!url) url = window.location.href;
    var idPattern = /\/\d+\.(html|jhtm|htm)/;
    var matches = url.match(idPattern);
    if(!matches){
        return "";
    }
    var id = matches[0];
    var indexLast = id.indexOf(".");
    id = id.substring(1, indexLast);
    return id;
}

//帮助方法，对已经过期的网页，覆盖蒙层。
//传入参数： url 引导跳转到的链接
//传入参数： img  引导跳转的图片地址
//依赖于jquery
function timeOverCover(url, img) {
    if(!url){
        url = "";
    }
    if(!img){
        img = "";
    }
    var coverHtml = '';
    coverHtml += '<div class="tm-prmtOver-cover">';
    coverHtml += '<div class="tm-prmtOver">';
    coverHtml += '<div class="tm-prmtOver-h">';
    coverHtml += '<span class="icon-alarm"></span>';
    coverHtml += '<div class="tm-prmtOver-h-in">';
    coverHtml += '<div class="tm-p1">本次活动结束啦！</div>';
    coverHtml += '<div class="tm-p1">推荐您关注最新活动</div>';
    coverHtml += '</div>';
    coverHtml += '</div>';
    coverHtml += '<div class="tm-prmtOver-content">';
    coverHtml += '<a class="tm-a-inherit" href="' + url + '">';
    coverHtml += '<div class="tm-prmtOver-a2">点击进入&gt;</div>';
    coverHtml += '<img class="tm-prmtOver-img" src="' + img + '" width="600" height="320"/>';
    coverHtml += '</a>';
    coverHtml += '</div>';
    coverHtml += '<div class="tm-prmtOver-footer">';
    coverHtml += '<a class="tm-a-inherit tm-prmtOver-a" href="http://www.toolmall.com">点击进入土猫网首页&gt;&gt;</a>';
    coverHtml += '</div>';
    coverHtml += '</div>';
    coverHtml += '</div>';
    $('body').append(coverHtml);
}

//对数字，生成固定小数位数
//参数：number, 数字，且必须大于等于0
//参数： digits, 小数位数。只能取值 0、1、2、3、4， 默认是2
//返回值：一个对象,如 {intStr:'15',decimalStr:'16'}。  调用处要拼接数字，拼接结果是： 15.16
function formatNumberFixed(number, digits) {
    var result = {intStr:'',decimalStr:''};
    var number1, intNumber1, intStr1 = '', decimalNumber1, decimalStr1 = '';
    if(typeof number === 'string'){
        number = parseFloat(number);
    }
    if(typeof number  !== 'number' || isNaN(number)){
        throw 'the first param is not a number . by function [formatNumberFixed] ';
        return {};
    }
    if(number < 0){
        throw 'the number cannot be negative . by function [formatNumberFixed] ';
        return {};
    }
    if(typeof digits === 'string'){
        digits = parseInt(digits);
    }
    if(typeof digits !== 'number' || isNaN(digits)){
        digits = 2;
    }
    if(digits !== 0 && digits !== 1 && digits !== 2 && digits !== 3 && digits !== 4){
        digits = 2;
    }
    if(digits === 0){
        intStr1 = '' + Math.round(number);
        decimalStr1 = '';
    }else if(digits === 1){
        number1 = Math.round(number * 10);
        intNumber1 = Math.floor(number1 / 10);
        intStr1 = '' + intNumber1;
        decimalNumber1 =  number1 - intNumber1 * 10;
        decimalStr1 = '' + decimalNumber1;
    }else if(digits === 2){
        number1 = Math.round(number * 100);
        intNumber1 = Math.floor(number1 / 100);
        intStr1 = '' + intNumber1;
        decimalNumber1 =  number1 - intNumber1 * 100;
        decimalStr1 = '' + decimalNumber1;
        if(decimalNumber1 < 10){
            decimalStr1 = '0' + decimalStr1;
        }
    }else if(digits === 3){
        number1 = Math.round(number * 1000);
        intNumber1 = Math.floor(number1 / 1000);
        intStr1 = '' + intNumber1;
        decimalNumber1 =  number1 - intNumber1 * 1000;
        decimalStr1 = '' + decimalNumber1;
        if(decimalNumber1 < 10){
            decimalStr1 = '0' + decimalStr1;
        }
        if(decimalNumber1 < 100){
            decimalStr1 = '0' + decimalStr1;
        }
    }else if(digits === 4){
        number1 = Math.round(number * 10000);
        intNumber1 = Math.floor(number1 / 10000);
        intStr1 = '' + intNumber1;
        decimalNumber1 =  number1 - intNumber1 * 10000;
        decimalStr1 = '' + decimalNumber1;
        if(decimalNumber1 < 10){
            decimalStr1 = '0' + decimalStr1;
        }
        if(decimalNumber1 < 100){
            decimalStr1 = '0' + decimalStr1;
        }
        if(decimalNumber1 < 1000){
            decimalStr1 = '0' + decimalStr1;
        }
    }
    result.intStr = intStr1;
    result.decimalStr = decimalStr1;
    return result;
}
