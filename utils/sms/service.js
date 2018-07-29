var smsex = require('smsex');
var yunpian = require('./yunpian.js');

smsex.template('code_msg', '【xxxx】您的验证码是{{code}}');
smsex.template('user_approved', '【xxxx】您的账号{{name}}通过审核！');
smsex.template('user_no_approved', '【xxxx】您的账号{{name}}未通过审核！');
smsex.template('user_enabled', '【xxxx】您的账号{{name}}已启用！');
smsex.template('user_disabled', '【xxxx】您的账号{{name}}已禁用！');

smsex.use(yunpian);

var validCode = [];
var emailValidCode = [];
var isValidCodeLock = false;
var isEmailValidCodeLock = false;

var url = 'sms';

module.exports = {};

/**
 * 发送短信
 * @param send_obj
 * @param session
 * @param cb
 */
module.exports.send = function (send_obj, session, cb) {
    smsex.send(send_obj, function (result) {
        if (result && result.code == 0) {
            result.result.mobile = send_obj.to;
            cb({code: 'success', msg: ''});
        } else {
            cb(result);
        }
    });
};

//发送手机短息验证码
module.exports.sendValidCode = function (send_obj, session, cb) {
    if (false) { // todo 测试时使用
        console.error("手机:" + send_obj.to + ",code:" + send_obj.body.code);
        addValidCode(send_obj.to, send_obj.body.code);
        cb({code: 'success', msg: ''});
    } else {
        smsex.send(send_obj, function (result) {
            if (result && result.code == 0) {
                addValidCode(send_obj.to, send_obj.body.code);
                result.result.mobile = send_obj.to;
                cb({code: 'success', msg: ''});
            } else {
                cb(result);
            }
        });
    }
};

/**
 * 检查指定时间内手机短信是否发送
 * @param mobile  手机号码
 * @param time  指定时间 以秒为单位
 * @returns {boolean} true 指定时间已经发送,false 指定时间没有发送
 */
module.exports.checkValidSendTime = function (mobile, time) {
    try {
        isValidCodeLock = true;
        for (var i = 0; i < validCode.length; i++) {
            if (validCode[i].mobile == mobile) {
                var thisTime = (new Date()).getTime();
                if ((thisTime - validCode[i].createTime) < (time * 1000)) {
                    return true;
                }
            }
        }
        return false;
    } finally {
        isValidCodeLock = false;
    }
};

/**
 * 检查指定时间内邮件是否发送
 * @param email 邮箱地址
 * @param time 指定时间 以秒为单位
 * @returns {boolean} true 指定时间已经发送,false 指定时间没有发送
 */
module.exports.checkEmailSendTime = function (email, time) {
    try {
        isEmailValidCodeLock = true;
        for (var i = 0; i < emailValidCode.length; i++) {
            if (emailValidCode[i].email == email) {
                var thisTime = (new Date()).getTime();
                if ((thisTime - emailValidCode[i].createTime) < (time * 1000)) {
                    return true;
                }
            }
        }
        return false;
    } finally {
        isEmailValidCodeLock = false;
    }
};

/**
 * 验证手机短信验证码是否正确
 * @param mobile 手机号码
 * @param code 手机短信验证码
 * @param bool 验证成功后之后是否移除验证码
 * @returns {boolean} true 验证通过 ，false 验证不通过
 */
module.exports.checkValidCode = function (mobile, code, bool) {
    //2016-12-7 18:36:17 by zhaojj 手机验证码使用后移除
    //bool = true;
    var flag = false;
    try {
        isValidCodeLock = true;
        for (var i = 0; i < validCode.length; i++) {
            if (validCode[i].mobile == mobile) {
                if (validCode[i].code == code) {
                    flag = true;
                    break;
                }
            }
        }
    } finally {
        isValidCodeLock = false;
    }
    if (flag && bool) {
        removeValidCode(mobile, code);
        return true;
    }
    return flag;
};

/**
 * 获取随机验证码
 * @param maxLength 最大长度
 * @returns {string}
 */
module.exports.getRandomCode = function (maxLength) {
    var codes = [];
    var max = typeof maxLength !== "number" ? 6 : maxLength;
    for (var i = 0; i < max; i++) {
        codes.push(Math.floor(Math.random() * 10));
    }
    return codes.join("");
};

/**
 * 添加手机短信验证信息
 * @param mobile 手机号码
 * @param code  手机短信验证码
 */
function addValidCode(mobile, code) {
    try {
        isValidCodeLock = true;
        //检查手机号是否已经存在，如果存在则删除，
        for (var i = 0; i < validCode.length; i++) {
            if (validCode[i].mobile == mobile) {
                validCode.splice(i, 1);
                break;
            }
        }
        var obj = {mobile: mobile, code: code, createTime: (new Date()).getTime()};
        validCode.push(obj);
    } finally {
        isValidCodeLock = false;
    }
}

//移除手机短信验证码信息 mobile : 手机号码, code :手机短信验证码
function removeValidCode(mobile, code) {
    if (isValidCodeLock) {
        return;
    }
    try {
        isValidCodeLock = true;
        for (var i = 0; i < validCode.length; i++) {
            if (validCode[i].mobile == mobile && validCode[i].code == code) {
                validCode.splice(i, 1);
                break;
            }
        }
    } finally {
        isValidCodeLock = false;
    }
}

/**
 * 清理10分钟以前的验证码，
 */
function clearValidCode() {
    if (isValidCodeLock) {
        return;
    }
    try {
        isValidCodeLock = true;
        for (var i = 0; i < validCode.length; i++) {
            var thisTime = (new Date()).getTime();
            if ((thisTime - validCode[i].createTime) > (1000 * 60 * 10)) {
                validCode.splice(i, 1);
            }
        }
    } finally {
        isValidCodeLock = false;
    }
}

var timer = setInterval(function () {
    if (false) {
        clearValidCode();
    } else {
        clearInterval(timer);
    }
}, 2 * 60 * 1000);