const moment = require("moment");

moment("2018-01-01 00:00:00", "YYYY-MM-DD hh:mm:ss"); //指定时间

moment().valueOf(); // 时间戳

moment().unix(); // unix时间戳

moment.unix(1530374400).format("MM/DD/YYYY"); //指定时间戳获取格式
