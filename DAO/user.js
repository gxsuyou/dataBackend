/**
 * Created by Administrator on 2016/12/15.
 */
var query = require('../config/config');

//收藏、取消收藏
var user = {
    // 获取APP用户
    getUserList:function(callback){
        var sql="select * from t_user order by time_logon desc";
        query(sql,[],function(result){
            return callback(result);
        })
    },
};
module.exports = user;