"use strict";

var url = 'mail_sender';

module.exports = tycom.common.create_service(url);

/////////////////////////////////////////////////////////
const nodemailer = require('nodemailer');

module.exports.send = function(mail_obj, option_obj,callback){

    var cb, called;
    if(option_obj && callback && option_obj.now){
        cb  = callback;
    }

    try{

        var  transporter = nodemailer.createTransport({
            host: mail_obj.sender.smtp_server,
            port: mail_obj.sender.port,
            auth: {
                user: mail_obj.sender.user,
                pass: mail_obj.sender.passwd
            }
        });

        mail_obj.from = '"' + mail_obj.from + '" <' + mail_obj.sender.user+ '>';
        mail_obj.sender = undefined;


        transporter.sendMail(mail_obj, function(error, info){
            if(cb){
                called = true;
                cb(error, info);
            }
        });
    }
    catch(e){
        if(e && cb && !called)
            cb(e,null);
    }

};


// for test
// var mail_obj = {
//     sender:{
//         smtp_server:'smtp.qq.com',
//         port:465 , //465
//         protocol:'smtp',
//         secure:true,
//         // tls:{
//         //     rejectUnauthorized:false
//         // },
//         user:'2180001@qq.com',
//         passwd:'lzkbhej'
//     },
//
//     from: '腾云科技信使', // 发件人称呼
//     to: '2180001@qq.com', // 收件人列表
//     subject: '邮件标题UTF8',
//     text: '邮件正文UTF8' // plain text body
// };
//
// var opt = {
//     now:true
// };
//
// module.exports.send(mail_obj, opt, function(error,info){
//     console.info('info by callback');
//     if(error)
//         console.error(error);
//
//     if(info)
//         console.info(info);
//
//
// });
