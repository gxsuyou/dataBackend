var express = require('express');
var router = express.Router();
var user = require("../DAO/user");
var https = require('https');
var qs = require('querystring');
var path = 'F:/node/public/';
var crypto = require('crypto');
var md5 = crypto.createHash("md5");
var common = require('../DAO/common');

function isReverse(text) {
    return text.split('').reverse().join('');
}

var verify = {};
var date = new Date();
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth());

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
};

// 获取APP用户
router.get('/getUserList', function (req, res, next) {
    var p = req.query.p > 0 ? req.query.p : 1;
    var tables = ['t_user', 't_user b'];
    var where = {
        left1: " t_user.rid=b.id ",
        where: " t_user.id>0 ORDER BY t_user.id DESC "
    };
    var field = "t_user.id,t_user.only_id,FROM_UNIXTIME(t_user.time_logon,'%Y-%m-%d') AS time_logon," +
        "FROM_UNIXTIME(t_user.login_time,'%Y-%m-%d') AS login_time,t_user.nick_name,t_user.tel," +
        "t_user.sex,(SELECT COUNT(*) FROM t_all_activity_log WHERE user_id=t_user.id ) AS log_count," +
        "b.nick_name AS r_nick,b.tel AS r_tel,b.only_id AS r_only";

    common.page(tables, p, where, "left", field, function (result) {
        for (var i in result.result) {
            result.result[i].login_time = result.result[i].login_time ? result.result[i].login_time : "无";
            result.result[i].r_nick = result.result[i].r_nick ? result.result[i].r_nick : "无";
            result.result[i].r_tel = result.result[i].r_tel ? result.result[i].r_tel : "无";
            result.result[i].r_only = result.result[i].r_only ? result.result[i].r_only : "无";
        }
        res.json(result);
    })
});

router.get('/getRecUserList', function (req, res, next) {
    var data = req.query;
    var id = data.uid;
    var p = data.p > 0 ? data.p : 1;
    var tables = ['t_user', 't_user b'];
    var where = {
        left1: " t_user.rid=b.id ",
        where: " t_user.rid=" + id + " ORDER BY t_user.id DESC "
    };
    var field = "t_user.id,t_user.only_id,FROM_UNIXTIME(t_user.time_logon,'%Y-%m-%d') AS time_logon," +
        "FROM_UNIXTIME(t_user.login_time,'%Y-%m-%d') AS login_time,t_user.nick_name,t_user.tel," +
        "t_user.sex,(SELECT COUNT(*) FROM t_all_activity_log WHERE user_id=t_user.id ) AS log_count," +
        "b.nick_name AS r_nick,b.tel AS r_tel,b.only_id AS r_only";

    common.page(tables, p, where, "left", field, function (result) {
        for (var i in result.result) {
            result.result[i].login_time = result.result[i].login_time ? result.result[i].login_time : "无";
            result.result[i].r_nick = result.result[i].r_nick ? result.result[i].r_nick : "无";
            result.result[i].r_tel = result.result[i].r_tel ? result.result[i].r_tel : "无";
            result.result[i].r_only = result.result[i].r_only ? result.result[i].r_only : "无";
        }
        res.json(result);
    })

})

// 登录
router.post('/login', function (req, res, next) {
    var data = req.body;
    if (data.name && data.psd) {
        user.login(data.name, data.psd, function (result) {
            if (result.length) {
                res.json({state: 1, user: result[0]});
            } else {
                res.json({state: 0});
            }
        })
    }
});

/**
 * 活动综合统计
 */
router.get('/getActivityNum', function (req, res, next) {
    var data = req.query;
    var sort = data.sort;
    data.type = data.type > 0 ? data.type : 2;
    user.getActivityNum(data, function (result) {
        if (sort == 0) { //获取所有的登录用户数
            if (!result.length) {
                res.json({state: 0, loginNum: 0});
                return false
            }
            res.json({state: 1, loginNum: result.length});
        } else if (sort == 1) {  //按月份获取登录数
            var last = data.last_time;
            var ly = parseInt(last.substring(0, 4));
            var lm = parseInt(last.substring(5, 7));
            for (var i = result.length - 1; i >= 0; i--) {
                var time = result[i].start_time;
                var y = parseInt(time.substring(0, 4));
                var m = parseInt(time.substring(5, 7));
                var d = parseInt(time.substring(8, 10));
                if (y != ly) {
                    result.splice(i, 1);
                }
                if (m != lm) {
                    result.splice(i, 1);
                }
            }
            var thisDate = new Date(ly, lm, 0);
            var days = thisDate.getDate();
            var arr = [];
            if (lm < 10) {
                lm = '0' + lm;
            }
            for (var i = 1; i <= days; i++) {
                if (i < 10) {
                    i = '0' + i;
                }
                var val = ly + '-' + lm + '-' + i;
                var newarr = result.filter(function (obj) {
                    return obj.start_time == val;
                });
                arr.push(newarr.length);
            }
            var fnum = 0;//每个月第一个星期的总数
            var snum = 0;//每个月第二个星期的总数
            var tnum = 0;//每个月第三个星期的总数
            var fournum = 0;//每个月第四个星期的总数
            var gnum = result.length;//每个月的总数
            for (var i = 0; i <= 6; i++) {
                fnum = arr[i] + fnum;
            }
            for (var i = 7; i <= 13; i++) {
                snum = arr[i] + snum;
            }
            for (var i = 14; i <= 20; i++) {
                tnum = arr[i] + tnum;
            }
            for (var i = 21; i <= days - 1; i++) {
                fournum = arr[i] + fournum;
            }
            res.json({
                state: 1,
                arrNum: arr,
                monthNum: gnum,
                oneNum: fnum,
                twoNum: snum,
                triNum: tnum,
                fourNum: fournum,
            });
        } else if (sort == 2) {
            var ly = parseInt(data.last_time);
            for (var i = result.length - 1; i >= 0; i--) {
                var time = result[i].start_time;
                var y = parseInt(time.substring(0, 4));
                var m = parseInt(time.substring(5, 7));
                if (y != ly) {
                    result.splice(i, 1);
                }
            }
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                if (i < 10) {
                    i = '0' + i;
                }
                var val = ly + '-' + i;
                var newarr = result.filter(function (obj) {
                    return obj.start_time.substring(0, 7) == val;
                });
                arr.push(newarr.length);
            }
            var fnum = 0;//每年第一个季度的总数
            var snum = 0;//每年第二个季度的总数
            var tnum = 0;//每年第三个季度的总数
            var fournum = 0;//每年第四个季度的总数
            var gnum = result.length;//每个月的总数
            for (var i = 0; i <= 2; i++) {
                fnum = arr[i] + fnum;
            }
            for (var i = 3; i <= 5; i++) {
                snum = arr[i] + snum;
            }
            for (var i = 6; i <= 8; i++) {
                tnum = arr[i] + tnum;
            }
            for (var i = 9; i <= 11; i++) {
                fournum = arr[i] + fournum;
            }
            res.json({
                state: 1,
                arrNum: arr,
                monthNum: gnum,
                oneNum: fnum,
                twoNum: snum,
                triNum: tnum,
                fourNum: fournum,
            });
        }
    })
});

// 获取APP用户
router.get('/getUserNum', function (req, res, next) {
    var date = new Date();
    var start = date.setHours(0, 0, 0, 0) / 1000;
    var end = Number(start) + 86400 - 1;

    var data = req.query;
    var sort = data.sort;
    user.getToDayNum(start, end, function (day_count) {

        user.getUserList(function (result) {
            var totalUser = result.length;
            if (sort == 0) { //获取所有的登录用户数
                res.json({state: 1, userNum: result.length});
            } else if (sort == 1) {  //按月份获取登录数
                var last = data.last_time;
                var ly = parseInt(last.substring(0, 4));
                var lm = parseInt(last.substring(5, 7));
                for (var i = result.length - 1; i >= 0; i--) {
                    var time = result[i].time_logon;
                    var y = parseInt(time.substring(0, 4));
                    var m = parseInt(time.substring(5, 7));
                    var d = parseInt(time.substring(8, 10));
                    if (y != ly) {
                        result.splice(i, 1);
                    }
                    if (m != lm) {
                        result.splice(i, 1);
                    }
                }
                var thisDate = new Date(ly, lm, 0);
                var days = thisDate.getDate();
                var arr = [];
                if (lm < 10) {
                    lm = '0' + lm;
                }
                for (var i = 1; i <= days; i++) {
                    if (i < 10) {
                        i = '0' + i;
                    }
                    var val = ly + '-' + lm + '-' + i;
                    var newarr = result.filter(function (obj) {
                        return obj.time_logon == val;
                    });
                    arr.push(newarr.length);
                }
                var fnum = 0;//每个月第一个星期的总数
                var snum = 0;//每个月第二个星期的总数
                var tnum = 0;//每个月第三个星期的总数
                var fournum = 0;//每个月第四个星期的总数
                var gnum = result.length;//每个月的总数
                for (var i = 0; i <= 6; i++) {
                    fnum = arr[i] + fnum;
                }
                for (var i = 7; i <= 13; i++) {
                    snum = arr[i] + snum;
                }
                for (var i = 14; i <= 20; i++) {
                    tnum = arr[i] + tnum;
                }
                for (var i = 21; i <= days - 1; i++) {
                    fournum = arr[i] + fournum;
                }

                res.json({
                    state: 1,
                    userNum: arr,
                    gnum: gnum,
                    fnum: fnum,
                    snum: snum,
                    tnum: tnum,
                    fournum: fournum,
                    totalUser: totalUser,
                    toDayReg: day_count > 0 ? day_count : 0
                });
            } else if (sort == 2) {
                var ly = parseInt(data.last_time);
                for (var i = result.length - 1; i >= 0; i--) {
                    var time = result[i].time_logon;
                    var y = parseInt(time.substring(0, 4));
                    var m = parseInt(time.substring(5, 7));
                    if (y != ly) {
                        result.splice(i, 1);
                    }
                }
                var arr = [];
                for (var i = 1; i <= 12; i++) {
                    if (i < 10) {
                        i = '0' + i;
                    }
                    var val = ly + '-' + i;
                    var newarr = result.filter(function (obj) {
                        return obj.time_logon.substring(0, 7) == val;
                    });
                    arr.push(newarr.length);
                    // var nn = parseInt(i);
                    // arr[nn] = newarr.length;
                }
                var fnum = 0;//每年第一个季度的总数
                var snum = 0;//每年第二个季度的总数
                var tnum = 0;//每年第三个季度的总数
                var fournum = 0;//每年第四个季度的总数
                var gnum = result.length;//每年的总数
                for (var i = 0; i <= 2; i++) {
                    fnum = arr[i] + fnum;
                }
                for (var i = 3; i <= 5; i++) {
                    snum = arr[i] + snum;
                }
                for (var i = 6; i <= 8; i++) {
                    tnum = arr[i] + tnum;
                }
                for (var i = 9; i <= 11; i++) {
                    fournum = arr[i] + fournum;
                }
                res.json({
                    state: 1,
                    userNum: arr,
                    gnum: gnum,
                    fnum: fnum,
                    snum: snum,
                    tnum: tnum,
                    fournum: fournum,
                    totalUser: totalUser,
                    toDayReg: day_count > 0 ? day_count : 0
                });
            }
        })
    })
});


/*router.get('/getChange', function (req, res, next) {
    user.changeDnum(function (result) {
        if (result[0].sys_b.indexOf(",") > -1) {
            var sysArr = result[0].sys_b.split(",");
            var numArr = result[0].num_b.split(",");
            for (var i in sysArr) {
                for (var ii = 0; ii < numArr[i]; ii++) {
                    var arr = {
                        sys: sysArr[i],
                        start: result[0].start_time,
                    }
                    user.changeDnum2(arr, function () {

                    })
                }
            }
            res.json({state: 1});
        } else {

            for (var ii = 0; ii < result[0].num_b; ii++) {
                var arr = {
                    sys: result[0].sys_b,
                    start: result[0].start_time,
                }
                user.changeDnum2(arr, function () {

                })
            }

            res.json({state: 0});
        }
    })
})*/


// router.get("/edit");
module.exports = router;





