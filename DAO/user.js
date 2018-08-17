/**
 * Created by Administrator on 2016/12/15.
 */
var query = require('../config/config');

var user = {
    // 获取APP用户
    getUserList:function(callback){
        var sql="select *,FROM_UNIXTIME(time_logon,'%Y-%m-%d') as time_logon from t_user order by time_logon desc";
        query(sql,[],function(result){
            return callback(result);
        })
    },

    // 登录
    login:function(name,psd,callback){
        var sql="select * from t_admin where name=? and password=?";
        query(sql,[name,psd],function(result){
            return callback(result);
        })
    },

    // 获取用户登录数量
    getLoginNum:function(callback){
        var sql="select FROM_UNIXTIME(login_time,'%Y-%m-%d') as login_time from t_login_num";
        query(sql,[],function(result){
            return callback(result);
        })
    },
};
module.exports = user;