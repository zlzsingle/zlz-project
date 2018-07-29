/**
 * Created by cc on 2014/9/1.
 */
var path = require('path');

var service = tycom[path.basename(__dirname)];

var app = require('express')();


/////////////////////////////////////////////////////
//以上勿动
/////////////////////////////////////////////////////

/// <summary>
/// 发送短信
/// </summary>
/// <param>详见sms/service.js -> send方法</param>
/// <returns>详见sms/service.js -> send方法</returns>
app.post('/send', function (req, res) {
    service.send(req.body, req.session, function (result) {
        tycom.common.api_tools.return_result(result, res);
    });
});


/// <summary>
/// 发送手机短息验证码
/// </summary>
/// <param>详见sms/service.js -> sendValidCode方法</param>
/// <returns>详见sms/service.js -> sendValidCode方法</returns>
app.post('/sendValidCode', function (req, res) {
    console.log("手机号码   mobile : " + req.body.to);
    var time = 60;
    var data = {
        to:req.body.to,
        template:'code_msg',
        content:'abc',
        body:{
            code: "888888"
        }
    };
    var bool = service.checkValidSendTime(data.to, time);
    console.log("验证手机指定时间内的值 ： "+bool);
    if (bool) {
        console.log("验证不通过 ： " + bool);
        res.json({code: "error", msg: "手机号码为 “"+data.to+"” "+time+"秒内不能重复发送"});
        return;
    }

    //后台随机生成验证码
    var code = "";
    for (var i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    data.body.code = code;
    console.log("短信验证码 code : " + code);

    service.sendValidCode(data, req.session, function (result) {
        tycom.common.api_tools.return_result(result, res);
    });
});

//app.get('/last_send_date', function (req, res) {
//    console.log("last session :" + req.session.id);
//    console.log("req.session.lastSendDate :" + req.session.lastSendDate);
//
//    var dateInterval;
//    if (req.session.lastSendDate) {
//        dateInterval = 60 - ((new Date()).getTime() - req.session.lastSendDate ) / 1000;
//        dateInterval = parseInt(dateInterval);
//    } else {
//        dateInterval = 0;
//    }
////    var result = {code:'success',data:req.session.lastSendDate?req.session.lastSendDate:0};
//    console.log("last_send_date req.session.mobile :" + req.session.mobile);
//    var mobile = req.session.mobile ? req.session.mobile : "";
//    var result = {code: 'success', data: {dateInterval: dateInterval, mobile: mobile}};
//    tycom.common.api_tools.return_result(result, res);
//});

/////////////////////////////////////////////////////
//以下勿动
/////////////////////////////////////////////////////
module.exports = tycom.common.create_module(app, service, __dirname);