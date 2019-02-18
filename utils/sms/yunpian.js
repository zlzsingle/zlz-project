var needle = require('needle');

var options = {
    timeout: 3000
    , json: false
    , headers: {
        'Accept': 'text/plain'
        , 'Content-Type': 'application/x-www-form-urlencoded'
        , 'Charset': 'UTF-8'

    }
};

var url = 'http://yunpian.com/v1/sms/send.json';
var apikey = '1111111111111111111111111111111';
module.exports = {
    name: 'yunpain',
    send: function (opt, callback) {
        var sms_json = {
            apikey: apikey,
            mobile: opt.to,
            text: opt.content
        };
        // console.info("sms_json :"+JSON.stringify(sms_json));

        needle.post(url, sms_json, options, function (err, res, body) {
            try {
                if (err) {
                    console.error(err);
                    callback({code: "NETWARE_ERROR", msg: "后端服务没有正确的响应\n\nStatus Code: " + res.statusCode});

                }
                if (res.statusCode !== 200) {
                    console.error(body);
                    callback({code: "SERVER_ERROR", msg: "后端服务没有正确的响应\n\nStatus Code: " + res.statusCode});
                } else {
                    callback(JSON.parse(body));
                }
            } catch (e) {
                callback({code: "NODEJS_ERROR", msg: "内部错误：yunpian.post error" + e, err: e});
            }

        });

    }
};
