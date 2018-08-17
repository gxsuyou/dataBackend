var express = require('express');
var router = express.Router();
var user =require("../DAO/user");
var https = require('https');
var qs = require('querystring');
var path='F:/node/public/';
var crypto=require('crypto');
var md5=crypto.createHash("md5");
var common = require('../DAO/common');


function isReverse(text){
    return text.split('').reverse().join('');
}
var verify={};
var date=new  Date();
Date.prototype.Format = function(formatStr)
{
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str=str.replace(/M/g,this.getMonth());

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
};

// 获取APP用户
router.get('/getUserList',function(req,res,next){
    user.getUserList(function(result){
        if(result.length){s
            for(var i=0;i<result.length;i++){
                var time=result[i].time_logon;
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                result[i].time_logon=y+'-'+m+'-'+'-d'+''+h+':'+mm':'+s;
            }
            res.json({state:1,userList:result});
        }else{
            res.json({state:0});
        }
    })
});

// 登录
router.post('/login',function(req,res,next){
    var data=req.body;
    if(data.name && data.psd){
         user.login(data.name,data.psd,function(result){
            if(result.length){
                res.json({state:1});
            }else{
                res.json({state:0});
            }
        })
    }
});
// router.get("/edit");
module.exports = router;





