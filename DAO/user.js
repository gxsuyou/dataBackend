/**
 * Created by Administrator on 2016/12/15.
 */
var query = require('../config/config');
var md5 = require('../DAO/common')
var user = {
    // 获取APP用户
    getUserList: function (callback) {
        var sql = "select *,FROM_UNIXTIME(time_logon,'%Y-%m-%d') as time_logon from t_user order by time_logon desc";
        query(sql, [], function (result) {
            return callback(result);
        })
    },

    // 登录
    login: function (name, psd, callback) {
        var pwd = md5.pwdMd5(psd);
        var sql = "select * from t_admin where name=? and password=?";
        query(sql, [name, pwd], function (result) {
            return callback(result);
        })
    },

    addNum: function (uid, time, callback) {
        var sql = "insert into t_login_num(uid,login_time) values(?,?)";
        query(sql, [uid, time], function (result) {
            return callback(result);
        })
    },
    // 获取用户登录数量
    getActivityNum: function (obj, callback) {
        var sql = "SELECT FROM_UNIXTIME(start_time,'%Y-%m-%d') AS start_time FROM t_all_activity_log WHERE type=?";
        query(sql, [obj.type], function (result) {
            return callback(result);
        })
    },
    getActivityNum2: function (obj, callback) {
        var sql = "SELECT FROM_UNIXTIME(start_time,'%Y-%m-%d') AS start_time FROM t_all_activity_log";
        query(sql, [obj.type], function (result) {
            return callback(result);
        })
    },
    // 获取下载数量
    getDownNum: function (callback) {
        var sql = "SELECT FROM_UNIXTIME(start_time,'%Y-%m-%d') AS start_time FROM t_all_activity_log WHERE type=1";
        query(sql, [], function (result) {
            return callback(result);
        })
    },

    getToDayNum: function (start, end, callback) {
        var sql = "SELECT count(*) AS count FROM t_user WHERE time_logon BETWEEN " + start + " AND " + end;
        query(sql, [], function (result) {
            return callback(result[0].count)
        })
    },

    /*changeDnum: function (callback) {
        var sql = "SELECT *,GROUP_CONCAT(sys) AS sys_b,GROUP_CONCAT(num) AS num_b " +
            "FROM t_all_activity_log WHERE type=1 AND start_time=1539705600 GROUP BY type";
        query(sql, [], function (result) {
            return callback(result)
        })
    },

    changeDnum2: function (obj, callback) {
        var sql = "INSERT INTO t_all_activity_log (`start_time`,`type`,`sys`,`num`) VALUES (?,1,?,0)";
        query(sql, [obj.start, obj.sys], function (result) {
            return callback(result);
        })
    }*/


};
module.exports = user;