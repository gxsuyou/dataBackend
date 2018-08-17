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

// 获取APP用户
router.get('/getUserList', function (req, res, next) {
    user.getUserList(function (result) {
        if (result.length) {
            res.json({state: 1, userList: result});
        } else {
            res.json({state: 0});
        }
    })
});

// 登录
router.post('/login', function (req, res, next) {
    var data = req.body;
    console.log(data);
    if (data.name && data.psd) {
        user.login(data.name, data.psd, function (result) {
            if (result.length) {
                res.json({state: 1});
            } else {
                res.json({state: 0});
            }
        })
    }
});
// router.get("/edit");
module.exports = router;





