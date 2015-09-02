/**
 * @author:dbxiao
 * @class:common
 * @module:util
 */
(function(){
    var util = {
        toFriendlyFileSize : function(size) {
            if (size < 0 || isNaN(size)) {
                return "0KB";
            } else if (size < 1024)
                return Math.round(size) + "B";
            else if (size < 1024 * 1024 && size >= 1024)
                return Math.round(size / 1024) + "KB";
            else if (size < 1024 * 1024 * 1024 && size >= 1024 * 1024)
                return (size / 1024 / 1024).toFixed(1) * 10 / 10 + "MB";
            else
                return (size / 1024 / 1024 / 1024).toFixed(2) * 100 / 100 + "GB";
        },
        toFriendlyFileSizeMB : function(size) {
            var s = (size / 1024 / 1024).toFixed(1) * 10 / 10;
            if (isNaN(s)) {
                return "0KB";
            } else {
                return s + "MB";
            }
        },
        requireTpl : function(tpl, callback) {
            var time = new Date().getTime();
            var tplUrl = tpl + "?t=" + time;
            $.get(tplUrl, function(tpl) {
                if ( typeof callback == "function") {
                    callback(tpl);
                };
            });
        },
        parseNetType : function(netType) {
            return netType;
        },
        parseFromeTime : function(t) {
            var d = parseInt(t / 86400), 
                h = parseInt((t - d * 86400) / 3600), 
                m = parseInt((t - d * 86400 - h * 3600) / 60), 
                s = t - d * 86400 - h * 3600 - m * 60;
            var time = d + "天" + h + "小时" + m + "分" + s + "秒";
            return time;
        },
        parseDate : function(timerub) {
            var date = new Date(timerub * 1000);
            var i = 0;
    
            var time = [date.getUTCFullYear(), 
                date.getUTCMonth() + 1, 
                date.getUTCDate(), 
                date.getHours(), 
                date.getMinutes(), 
                date.getSeconds()];
    
            $.each(time, function(val, i) {
                if (val <= 9) {
                    time[i] = '0' + val;
                }
            });
            time = time.slice(0, 3).join('-') + ' ' + time.slice(3, 5).join(':');
    
            return time;
        },
        getParam : function(name, src) {
            try{
                var re = new RegExp('(?:^|\\?|#|&)' + name + '=([^&#]*)(?:$|&|#)', 'i');
                var m = re.exec(src || location.href);
                return m ? m[1] : '';
            }catch(e){};
            
        },
        getProportion : function(total, used, width) {
            return Math.round(width / total * used);
        },
        getProorWidth : function(per, width) {
            return Math.round(width / 100 * per);
        },
        setHeight : function() {
            var bodyH = $("body").height(), 
                windowH = $(window).height(), 
                headerH = $("header").height(), 
                rangeH = windowH - headerH, 
                contH = bodyH - headerH;
                
            return trulyH = contH > rangeH ? contH : rangeH;
        },
        setStrCookie : function(name, value) {
            var _name = name;
            var _value = value;
            var _data;
    
            if (!_name) {
                _name = "webos.data";
            }
            _data = $.parseJSON(webos.common.getCookie(_name));
            if (!_data) {
                _data = {};
            }
            for (x in value) {
                _data[x] = value[x];
            }
            webos.common.setCookie(name, $.stringify(_data), "", "/");
        },
        getParCookie : function(name) {
            return $.parseJSON(webos.common.getCookie(name));
        },
        setCookie : function(name, value, expiredays, path, domain) {
            var exdate = new Date(), domainStr = "", pathStr = "";
            exdate.setDate(exdate.getDate() + expiredays);
            if (domain) {
                domainStr = ";domain=" + domain;
            }
            if (path) {
                pathStr = ";path=" + path;
            }
            //window.document.cookie = name + "=" + escape(value) + ";path=/;domain=baidu.com";
            document.cookie = name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + pathStr + domainStr;
        },
        getCookie : function(name) {
            if (window.document.cookie.length > 0) {
                c_start = window.document.cookie.indexOf(name + "=");
                if (c_start != -1) {
                    c_start = c_start + name.length + 1;
                    c_end = window.document.cookie.indexOf(";", c_start);
                    if (c_end == -1)
                        c_end = window.document.cookie.length;
                    return unescape(window.document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        },
        getSignId : function(callback) {
            var data = {};
            $.get(webos.luci.API_GET_SIGN_ID, function(res) {
                var _data = $.parseJSON(res || {});
                if (_data) {
                    data.device_id = _data.id;
                    data.sign = _data.sign;
                    webos.common.setStrCookie("webos-system-data", data);
                    if ( typeof callback == "function") {
                        callback(data);
                    }
                }
    
            });
        },
        getMailAddr : function(mail){
            mailAddr  = mail.split("@")[1];
            return mailAddr;
        },
        formatGetParam : function(param){
            var urlparam=[];
            for(var i in param){
                urlparam.push(i+"="+param[i]);
            }
            urlparam.push("ak="+webos.PageConf["ak"]);
            urlparam.push("sign="+webos.PageConf["sign"]);
            urlparam.push("t="+new Date().getTime());
            return "?"+urlparam.join("&");
        },
        debug : function(){
            return false;
        }
    };
    
    webos.util = util;
})();
