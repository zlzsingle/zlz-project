(function (exports) {

    let obj = {
        //验证身份证号码的js方法
        checkIdCard: function (idcard) {
            let numberRegular = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            return numberRegular.test(idcard);
        },

        //验证邮箱的js方法
        checkEmail: function (email) {
            let emailRegular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return emailRegular.test(email);
        },

        //验证手机号码
        checkMobile: function (mobile) {
            let mobileRegular = /^1[0-9][0-9]\d{8}$/;
            return mobileRegular.test(mobile);
        },

        checkNumber: function (number) {
            let numberRegular = /^[0-9]*$/;
            return numberRegular.test(number);
        }
    };

    exports.regexpUtil = obj;

})(function () {
    if (typeof window !== 'undefined') {
        return window;
    } else if (typeof exports !== 'undefined') {
        return exports;
    } else {
        return {}
    }
}());