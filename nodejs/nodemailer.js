// http://blog.fens.me/nodejs-email-nodemailer/
var config = {
    mail: {
        from: {
            name: 'App name',
            service: 'qq',
            auth: {
                user: '777777777@qq.com',
                pass: '123456789'
            }
        },
        to: [
            '111111111@qq.com'
        ]
    }
};
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport('SMTP', config.mail.from);


function sendMail(subject, html) {
    var mailOptions = {
        from: [config.mail.from.name, config.mail.from.auth.user].join(' '),
        to: config.mail.to.join(','),
        subject: subject,
        html: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
}

sendMail('测试发邮件', '<p>Hello world!</p>');



/*
const nodemailer = require('nodemailer');
// const config = require('config')

const config = {
    "mail": {
        "host": "smtp.exmail.qq.com",
        "port": 465,
        "from": "xxxxxx<xxxxxx@xxxxxx.cn>",
        "auth": {
            "user": "xxxxxx@xxxxxx.cn",
            "pass": "xxxxxx"
        }
    }
};

class MailUtils {

    mail;

    constructor() {
        console.log('創建mail : ', JSON.stringify(config.mail));
        this.mail = nodemailer.createTransport(config.mail);
    }

    /!**
     * 发送邮件
     * @param accepted 收件人邮件, "xxxxx@163.com" | ["xxxxx@163.com", "xxxxx@qq.com"]
     * @param subject 邮件主题, "我是一封测试邮件"
     * @param contents 邮件内容, 富文本
     *!/
    sendMail(accepted, subject, contents) {
        return new Promise((resolve, reject) => {
            const HelperOption = {
                // 发件人
                from: config.mail.from,
                // 收件人
                to: accepted,
                // 邮件主题
                subject,
                // 邮件富文本
                html: contents,
            };
            console.log('發送的option : ', JSON.stringify(HelperOption));
            this.mail.sendMail(HelperOption, (error, info) => {
                if (error) {
                    console.error('error : ', error)
                    reject(error);
                } else {
                    console.log('success : ', info)
                    resolve(info);
                }
            });
        });
    }
}

async function main() {
    const mail = new MailUtils();
    const beginDate = Date.now();
    console.log('開始發送');
    await mail.sendMail('774320433@qq.com', '[FollowQuant] trial account application', 'You are applying for a FollowQuant trial account. The verification code is 2927');
    console.log(`耗時: ${(Date.now() - beginDate) / 1000}s`)
}

main().then();
*/
