//验证身份证号码的js方法
function checkIdCard(idcard) {
    var numberRegular = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return numberRegular.test(idcard);
}

//验证邮箱的js方法
function checkEmail(email) {
    var emailRegular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegular.test(email);
}

//验证手机号码
function checkMobile(mobile) {
    var mobileRegular = /^1[0-9][0-9]\d{8}$/;
    return mobileRegular.test(mobile);
}

function checkNumber(number) {
    var numberRegular = /^[0-9]*$/;
    return numberRegular.test(number);
}