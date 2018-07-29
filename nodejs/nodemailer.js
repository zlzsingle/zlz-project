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