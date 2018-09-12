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
    getLoginNum: function (callback) {
        var sql = "SELECT FROM_UNIXTIME(start_time,'%Y-%m-%d') AS start_time FROM t_all_activity_log WHERE type=2";
        query(sql, [], function (result) {
            return callback(result);
        })
    },

    getToDayNum: function (start, end, callback) {
        var sql = "SELECT count(*) AS count FROM t_user WHERE time_logon BETWEEN " + start + " AND " + end;
        query(sql, [], function (result) {
            return callback(result[0].count)
        })
    }
};
module.exports = user;