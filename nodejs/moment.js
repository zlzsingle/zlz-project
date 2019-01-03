const moment = require("moment");

moment.locale('zh-cn');

moment("2018-01-01 00:00:00", "YYYY-MM-DD HH:mm:ss"); //指定时间

moment().valueOf(); // 13位时间戳

moment().unix(); // unix时间戳

moment.unix(1530374400).format("MM/DD/YYYY"); //指定时间戳获取格式

moment().format('L');    // 2018-08-26
moment().format('l');    // 2018-08-26
moment().format('LL');   // 2018年8月26日
moment().format('ll');   // 2018年8月26日
moment().format('LLL');  // 2018年8月26日晚上6点25分
moment().format('lll');  // 2018年8月26日晚上6点25分
moment().format('LLLL'); // 2018年8月26日星期日晚上6点25分
moment().format('llll'); // 2018年8月26日星期日晚上6点25分

moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'); // 获取这个月最后一天
