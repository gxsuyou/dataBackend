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

    addNum:function(uid,time,callback){
        var sql="insert into t_login_num(uid,login_time) values(?,?)";
        query(sql,[uid,time],function(result){
            return callback(result);
        })
    },
};
module.exports = user;