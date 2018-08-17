var config = {
    // img: "http://img.oneyouxi.com.cn/",
    // apk: "http://apk.oneyouxi.com.cn/",
    // data: "http://192.168.2.156:8877/",
    // data: "http://192.168.2.108:8877/",
    // data: "http://192.168.2.117:8877/",
    // data: "http://182.61.26.179:8877/",
    // data: "http://192.168.0.207:8877/",
    // data: "http://192.168.0.67:8877/",
    // data: "http://192.168.0.207:8877/",
    data: "http://192.168.0.207:8879/",
    // data: "http://www.oneyouxi.com.cn:8877/",
    // base64: "http://base64.oneyouxi.com.cn/",
    // url_upload: "http://182.61.26.179:8878/",
    // url_upload: "https://admin.oneyouxi.com.cn/",
    // url_upload: "http://192.168.0.207:8878/",
}

//获取cookie
function getCookie(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

//设置cookie
function setCookie(name, value, day) {
    if (day !== 0) {
        //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
        document.cookie = name + "=" + escape(value);
    }
}

//删除cookie
function delCookie(name) {
    $.cookie(name, '', {expires: -1});
}