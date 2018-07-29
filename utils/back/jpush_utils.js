/**
 * APP 消息推送
 * @type {*|exports|module.exports}
 */
let JPush = require("jpush-sdk");
//nsbapp
let jpush_client = JPush.buildClient("xxxxxxxxx", "xxxxxxxxxxx");

/**
 * @param sound  是否声音提醒， 通知提示声音，''为默认声音，指定为JPush.DISABLE_SOUND不使用提示声
 * @param contentAvailable  是否静默推送 boolean
 * @param time_to_live  离线消息保留时长 推送当前用户不在线时，为该用户保留多长时间的离线消息，以便其上线时再次推送。默认 86400 （1 天），最长 10 天。设置为 0 表示不保留离线消息，只有推送当前在线的用户可以收到。
 * @param extras  object 自定义 Key/value 信息，以供业务使用

 */
function get_default_jpush_param() {
    return {
        sound: '',
        contentAvailable: true,
        time_to_live: 3600 * 24 * 10,
        extras: undefined
    };
}

function jpush_to_all(content, title, badgeNumber, options, callback) {

    let ios = JPush.ios(content, options.sound, badgeNumber, options.contentAvailable, options.extras);
    let android = JPush.android(content, title, 1, options.extras);

    jpush_client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.ALL)
        .setOptions(null, 3600 * 24 * 10, null, false)
        .setNotification(content, ios, android)
        .send(function (err, res) {
            callback(err, res);
            // if (err) {
            //     callback(err, res);
            // } else {
            //     console.log('Sendno: ' + res.sendno);
            //     console.log('Msg_id: ' + res.msg_id);
            // }
        });
}

/**
 * 极光推送
 * @param tags  按标签推送, 数组或字符串
 * @param content  消息内容，
 * @param title  消息标题
 * @param badgeNumber  标记数量  int
 */
function jpush_to_tag(tags, content, title, badgeNumber, options, callback) {
    if (!tags || !content){
        return;
    }
    let ios = JPush.ios(content, options.sound, badgeNumber, options.contentAvailable, options.extras);
    //console.log("IOS:"+JSON.parse(ios));
    let android = JPush.android(content, title, 1, options.extras);
    //console.log("ANDROID:"+JSON.parse(android));
    let opts =
    jpush_client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.tag(tags))
        //.setAudience(JPush.registration_id(["18171adc030ef95923a"]))
        .setNotification(content, ios, android)
        //.setMessage('msg content')
    /**
     setOptions()
     sendno int 可选 推送序号 纯粹用来作为 API 调用标识，API 返回时被原样返回，以方便 API 调用方匹配请求与返回。
     time_to_live int 可选 离线消息保留时长 推送当前用户不在线时，为该用户保留多长时间的离线消息，以便其上线时再次推送。默认 86400 （1 天），最长 10 天。设置为 0 表示不保留离线消息，只有推送当前在线的用户可以收到。
     override_msg_id long 可选 要覆盖的消息ID 如果当前的推送要覆盖之前的一条推送，这里填写前一条推送的 msg_id 就会产生覆盖效果，即：1）该 msg_id 离线收到的消息是覆盖后的内容；2）即使该 msg_id Android 端用户已经收到，如果通知栏还未清除，则新的消息内容会覆盖之前这条通知；覆盖功能起作用的时限是：1 天。 如果在覆盖指定时限内该 msg_id 不存在，则返回 1003 错误，提示不是一次有效的消息覆盖操作，当前的消息不会被推送。
     apns_production boolean 可选 APNs是否生产环境  True 表示推送生产环境，False 表示要推送开发环境； 如果不指定则为推送生产环境。
     (消息) JPush 官方 API LIbrary (SDK) 默认设置为推送 “开发环境”。
     big_push_duration int 可选 定速推送时长（分钟） 又名缓慢推送，把原本尽可能快的推送速度，降低下来，在给定的 n 分钟内，均匀地向这次推送的目标用户推送。最大值为 1440。未设置则不是定速推送。
     */
        .setOptions(null, 3600 * 24 * 10, null, false)
        .send(function (err, res) {
            //if (err) {
            //    console.log(err.message);
            //} else {
            //    console.log('Sendno: ' + res.sendno);
            //    console.log('Msg_id: ' + res.msg_id);
            //}
            callback(err, res);
        });
}

// Array tags [jpush_source_user_id,jpush_source_user_id]
// String content 内容消息
// extras 扩展属性
// callback 回调函数
function remind_push(tags, content, extras, callback) {
    if (!tags || !content) {
        return;
    }
    let params = get_default_jpush_param();
    params.extras = extras;

    jpush_to_tag(tags, content, undefined, 1, params, callback);
}

function remind_push_all(content, extras, callback) {
    if (!content) {
        return;
    }
    let params = get_default_jpush_param();
    params.extras = extras;

    jpush_to_all(content, undefined, 1, params, callback);
}

function jpush_clear_badge(tags){
    if (!tags){
        return;
    }
    jpush_client.push().setPlatform('ios')
        .setAudience(JPush.tag(tags))
        .setNotification('', JPush.ios('', JPush.DISABLE_SOUND, 0))
        //.setMessage('msg content')
        .setOptions(null, 60)
        .send(function (err, res) {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Sendno: ' + res.sendno);
                console.log('Msg_id: ' + res.msg_id);
            }
        });
}

module.exports.jpush_to_tag = jpush_to_tag;
module.exports.remind_push = remind_push;
module.exports.remind_push_all = remind_push_all;
module.exports.get_default_jpush_param = get_default_jpush_param;

// function remind_push1(tags, content, extras, callback) {
//     callback(undefined, {sendno: "", msg_id: "1111111111111"});
// }
//
// function remind_push_all1(content, extras, callback) {
//     callback({message: "推送所有错误哦"}, {sendno: "", msg_id: ""});
// }