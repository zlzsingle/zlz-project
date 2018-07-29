(function (exports) {

    let MONTH_NAMES = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    let DAY_NAMES = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

    let constant = {
        yyyy_MM_dd_HH_mm_ss: "yyyy-MM-dd HH:mm:ss",
        yyyyMMddHHmmss: "yyyyMMddHHmmss",
        yyyy_MM_dd: "yyyy-MM-dd",
        yyyyMMdd: "yyyyMMdd",
        HH_mm_ss: "HH:mm:ss",
        HHmmss: "HHmmss"
    };

    let obj = {
        constant: constant,

        /**
         * 格式化日期
         * @param date {Date}
         * @param format {String}
         * @returns {string}
         */
        formatDate: function (date, format) {
            let format = (typeof(format) !== 'undefined') ? format : constant.yyyy_MM_dd;
            format = format + "";
            let result = "";
            let i_format = 0;
            let c = "";
            let token = "";
            let y = date.getYear() + "";
            let M = date.getMonth() + 1;
            let d = date.getDate();
            let E = date.getDay();
            let H = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
            // Convert real date parts into formatted versions
            let value = new Object();
            if (y.length < 4) {
                y = "" + (y - 0 + 1900);
            }
            value["y"] = "" + y;
            value["yyyy"] = y;
            value["yy"] = y.substring(2, 4);
            value["M"] = M;
            value["MM"] = LZ(M);
            value["MMM"] = MONTH_NAMES[M - 1];
            value["NNN"] = MONTH_NAMES[M + 11];
            value["d"] = d;
            value["dd"] = LZ(d);
            value["E"] = DAY_NAMES[E + 7];
            value["EE"] = DAY_NAMES[E];
            value["H"] = H;
            value["HH"] = LZ(H);
            if (H == 0) {
                value["h"] = 12;
            }
            else if (H > 12) {
                value["h"] = H - 12;
            }
            else {
                value["h"] = H;
            }
            value["hh"] = LZ(value["h"]);
            if (H > 11) {
                value["K"] = H - 12;
            } else {
                value["K"] = H;
            }
            value["k"] = H + 1;
            value["KK"] = LZ(value["K"]);
            value["kk"] = LZ(value["k"]);
            if (H > 11) {
                value["a"] = "PM";
            }
            else {
                value["a"] = "AM";
            }
            value["m"] = m;
            value["mm"] = LZ(m);
            value["s"] = s;
            value["ss"] = LZ(s);
            while (i_format < format.length) {
                c = format.charAt(i_format);
                token = "";
                while ((format.charAt(i_format) == c) && (i_format < format.length)) {
                    token += format.charAt(i_format++);
                }
                if (value[token] != null) {
                    result = result + value[token];
                }
                else {
                    result = result + token;
                }
            }
            return result;
        },

        /**
         * 格式化日期时间
         * @param date {Date}
         * @returns {*|string}
         */
        formatDateTime: function (date) {
            let _this = this;
            let rr = _this.formatDate(date, constant.yyyy_MM_dd_HH_mm_ss);
            return rr;
        },

        /**
         * 将日期格式的字符串,转成指定的格式
         * @param dateStr {String}
         * @param newFormat {String}
         * @param format {String}
         * @returns {*|string}
         */
        formatForDateStr: function (dateStr, format, newFormat) {
            let self = this;
            let dt = self.parseDate(dateStr, format);
            return self.formatDate(dt, newFormat);
        },

        /**
         * 获取置顶日期的时间戳
         * @param val {String}
         * @param format {String}
         * @returns {number}
         */
        getDateFromFormat: function (val, format) {
            var format = (typeof(format) != 'undefined') ? format : constant.yyyy_MM_dd_HH_mm_ss;
            val = val + "";
            format = format + "";
            let i_val = 0;
            let i_format = 0;
            let c = "";
            let token = "";
            let token2 = "";
            let x, y;
            let now = new Date();
            let year = now.getYear();
            let month = now.getMonth() + 1;
            let date = 1;
            let hh = now.getHours();
            let mm = now.getMinutes();
            let ss = now.getSeconds();
            let ampm = "";

            while (i_format < format.length) {
                // Get next token from format string
                c = format.charAt(i_format);
                token = "";
                while ((format.charAt(i_format) == c) && (i_format < format.length)) {
                    token += format.charAt(i_format++);
                }
                // Extract contents of value based on format token
                if (token == "yyyy" || token == "yy" || token == "y") {
                    if (token == "yyyy") {
                        x = 4;
                        y = 4;
                    }
                    if (token == "yy") {
                        x = 2;
                        y = 2;
                    }
                    if (token == "y") {
                        x = 2;
                        y = 4;
                    }
                    year = _getInt(val, i_val, x, y);
                    if (year == null) {
                        return 0;
                    }
                    i_val += year.length;
                    if (year.length == 2) {
                        if (year > 70) {
                            year = 1900 + (year - 0);
                        }
                        else {
                            year = 2000 + (year - 0);
                        }
                    }
                }
                else if (token == "MMM" || token == "NNN") {
                    month = 0;
                    for (let i = 0; i < MONTH_NAMES.length; i++) {
                        let month_name = MONTH_NAMES[i];
                        if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                            if (token == "MMM" || (token == "NNN" && i > 11)) {
                                month = i + 1;
                                if (month > 12) {
                                    month -= 12;
                                }
                                i_val += month_name.length;
                                break;
                            }
                        }
                    }
                    if ((month < 1) || (month > 12)) {
                        return 0;
                    }
                }
                else if (token == "EE" || token == "E") {
                    for (let i = 0; i < DAY_NAMES.length; i++) {
                        let day_name = DAY_NAMES[i];
                        if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                            i_val += day_name.length;
                            break;
                        }
                    }
                }
                else if (token == "MM" || token == "M") {
                    month = _getInt(val, i_val, token.length, 2);
                    if (month == null || (month < 1) || (month > 12)) {
                        return 0;
                    }
                    i_val += month.length;
                }
                else if (token == "dd" || token == "d") {
                    date = _getInt(val, i_val, token.length, 2);
                    if (date == null || (date < 1) || (date > 31)) {
                        return 0;
                    }
                    i_val += date.length;
                }
                else if (token == "hh" || token == "h") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 12)) {
                        return 0;
                    }
                    i_val += hh.length;
                }
                else if (token == "HH" || token == "H") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 23)) {
                        return 0;
                    }
                    i_val += hh.length;
                }
                else if (token == "KK" || token == "K") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 11)) {
                        return 0;
                    }
                    i_val += hh.length;
                }
                else if (token == "kk" || token == "k") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 24)) {
                        return 0;
                    }
                    i_val += hh.length;
                    hh--;
                }
                else if (token == "mm" || token == "m") {
                    mm = _getInt(val, i_val, token.length, 2);
                    if (mm == null || (mm < 0) || (mm > 59)) {
                        return 0;
                    }
                    i_val += mm.length;
                }
                else if (token == "ss" || token == "s") {
                    ss = _getInt(val, i_val, token.length, 2);
                    if (ss == null || (ss < 0) || (ss > 59)) {
                        return 0;
                    }
                    i_val += ss.length;
                }
                else if (token == "a") {
                    if (val.substring(i_val, i_val + 2).toLowerCase() == "am") {
                        ampm = "AM";
                    }
                    else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") {
                        ampm = "PM";
                    }
                    else {
                        return 0;
                    }
                    i_val += 2;
                }
                else {
                    if (val.substring(i_val, i_val + token.length) != token) {
                        return 0;
                    }
                    else {
                        i_val += token.length;
                    }
                }
            }
            // If there are any trailing characters left in the value, it doesn't match
            if (i_val != val.length) {
                return 0;
            }
            // Is date valid for month?
            if (month == 2) {
                // Check for leap year
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { // leap year
                    if (date > 29) {
                        return 0;
                    }
                }
                else {
                    if (date > 28) {
                        return 0;
                    }
                }
            }
            if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                if (date > 30) {
                    return 0;
                }
            }
            // Correct hours value
            if (hh < 12 && ampm == "PM") {
                hh = hh - 0 + 12;
            }
            else if (hh > 11 && ampm == "AM") {
                hh -= 12;
            }
            let newdate = new Date(year, month - 1, date, hh, mm, ss);
            return newdate.getTime();
        },

        /**
         * 将字符串转成日期
         * @param dateStr {String} "2018-02-04 12:23:06"
         * @param format {String}  "yyyy-MM-dd hh:mm:ss"
         * @returns {Date}
         */
        parseDate: function (dateStr, format) {
            if (!format) {
                format = constant.yyyy_MM_dd;
            }
            let self = this;
            let time = self.getDateFromFormat(dateStr, format);
            return new Date(time);
        },

        /**
         * 时间操作
         * @param date {Date}参照时间
         * @param strInterval {String}操作, s(秒)、n(分)、h(时)、d(天)、w(周)、q(季)、m(月)、y(年)
         * @param number {Number}增减量
         * @returns {Date}
         */
        dateAdd: function (date, strInterval, number) {
            let dtTmp = date;
            switch (strInterval) {
                case 's' :
                    return new Date(dtTmp.valueOf() + (1000 * number));
                case 'n' :
                    return new Date(dtTmp.valueOf() + (60000 * number));
                case 'h' :
                    return new Date(dtTmp.valueOf() + (3600000 * number));
                case 'd' :
                    return new Date(dtTmp.valueOf() + (86400000 * number));
                case 'w' :
                    return new Date(dtTmp.valueOf() + ((86400000 * 7) * number));
                case 'q' :
                    return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
                case 'm' :
                    return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
                case 'y' :
                    return new Date((dtTmp.getFullYear() + number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            }
        }
    };

    function LZ(x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
    }

    function _isInteger(val) {
        let digits = "1234567890";
        for (let i = 0; i < val.length; i++) {
            if (digits.indexOf(val.charAt(i)) == -1) {
                return false;
            }
        }
        return true;
    }

    function _getInt(str, i, minlength, maxlength) {
        for (let x = maxlength; x >= minlength; x--) {
            let token = str.substring(i, i + x);
            if (token.length < minlength) {
                return null;
            }
            if (_isInteger(token)) {
                return token;
            }
        }
        return null;
    }

    exports.dateUtils = obj;

})(function () {
    if (typeof window !== 'undefined') {
        return window;
    } else if (typeof exports !== 'undefined') {
        return exports;
    } else {
        return {}
    }
}());