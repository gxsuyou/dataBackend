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
    // data: "http://databack.oneyouxi.com.cn/",
    // base64: "http://base64.oneyouxi.com.cn/",
    // url_upload: "http://182.61.26.179:8878/",
    // url_upload: "https://admin.oneyouxi.com.cn/",
    // url_upload: "http://192.168.0.207:8878/",
}

var myDate = new Date();
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();       //获取当前小时数(0-23)
myDate.getMinutes();     //获取当前分钟数(0-59)
myDate.getSeconds();     //获取当前秒数(0-59)
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
myDate.toLocaleDateString();     //获取当前日期
var mytime = myDate.toLocaleTimeString();     //获取当前时间
myDate.toLocaleString();        //获取日期与时间

/*获取一个月的天数 */
function getCountDays(year = 0, month = 0) {
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();

    if (year > 0) {
        curYear = year;
    }
    curMonth = Number(curMonth) + 1
    if (month > 0) {
        curMonth = month;
    }
    var dayCount;
    var now = new Date(curYear, curMonth, 0);
    dayCount = now.getDate();
    return dayCount;

    // var curDate = new Date();
    // /* 默认获取当前月份 */
    // var curMonth = curDate.getMonth();
    //
    // if (getMonth > 0) {
    //     curMonth = Number(getMonth) - 1;//因为获取到的是实际的月份因此要减1后再加1
    // }
    // /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    // curDate.setMonth(Number(curMonth) + 1);
    // /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    // curDate.setDate(0);
    // /* 返回当月的天数 */
    // return curDate.getDate();
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