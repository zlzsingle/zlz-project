(function () {

    /*
        秒    分    时    天(星期)   月   年
        *     *     *     *          *    *
        ┬    ┬    ┬    ┬         ┬    ┬
        │    │    │    │         │    │
        │    │    │    │         │    └ day of week (0 - 7) (0 or 7 is Sun)
        │    │    │    │         └───── month (1 - 12)
        │    │    │    └────────── day of month (1 - 31)
        │    │    └─────────────── hour (0 - 23)
        │    └──────────────────── minute (0 - 59)
        └───────────────────────── second (0 - 59, OPTIONAL)
    */

    var schedule = require('node-schedule');
    var dateUtils = require("../utils/gen/date_utils").dateUtils;

    //指定时间执行
    function theDateTime() {
        var date = new Date();

        date.setSeconds(date.getSeconds() + 10); //设置10秒之后执行

        schedule.scheduleJob(date, function () {
            console.log("执行任务");
        });
        // j.cancel(); //取消任务
    }

    //固定每个小时、每分钟
    function fixedDateTime() {

        var rule = new schedule.RecurrenceRule();

        // rule.minute = 40; //每小时的40分钟执行

        rule.second = 10; //每分钟的10秒执行

        console.error("fixedDateTime");

        var j = schedule.scheduleJob(rule, function () {
            console.log("执行任务 date : " + dateUtils.formatDate(new Date(), dateUtils.constant.yyyy_MM_dd_HH_mm_ss));
        });
    }

    //每间隔5秒执行一次
    function intervalTime() {
        var rule1 = new schedule.RecurrenceRule();
        // var times1 = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
        // rule1.second = times1;
        //
        // console.error("intervalTime");

        rule1.hour = 16;
        rule1.minute = 59;
        rule1.second = 40;

        schedule.scheduleJob(rule1, function () {
            console.log("执行任务 date : " + dateUtils.formatDate(new Date(), dateUtils.constant.yyyy_MM_dd_HH_mm_ss));
        });
    }

    intervalTime();

})();
