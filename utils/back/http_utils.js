module.exports = (function () {
    let success = "success";
    let error = "error";
    let request = require("request");

    function genHeaders(headers) {
        return Object.assign({}, {
            userId: ""
        }, headers);
    }

    function genError(msg) {
        return {code: error, msg: msg};
    }

    function genSuccess(data) {
        return {code: success, data: data};
    }

    function base(options,callback) {
        try {
            request({
                url: options.url,
                method: options.method,
                json: true,
                headers: genHeaders(options.headers),
                body: JSON.stringify(options.data)
            }, function (error, response, body) {
                if (error) {
                    return callback(genError(error));
                }
                if (response.statusCode !== 200) {
                    return callback(genError("response.statusCode !== 200"));
                }
                let data;
                if (typeof body === "string") {
                    try {
                        data = JSON.parse(body);
                    } catch (err) {
                        data = body;
                    }
                } else {
                    data = body;
                }
                if (data) {
                    if (data.code === success) {
                        callback(data);
                    } else {
                        callback(genSuccess(data));
                    }
                } else {
                    callback(genSuccess(body));
                }
            });
        } catch (err) {
            callback(genError(err.message));
        }
    }

    return {
        /**
         * httpGET协议请求
         * @param url 请求路径"http://www.baidu.comm?page=1&rows=1"
         * @param headers 请求头部 {}
         * @param callback Function(result)--> result :{code: "", data : "", msg : ""}
         */
        get: function (url, headers, callback) {
            base({
                url: url,
                method: "GET",
                data: {},
                headers: headers
            }, callback);
        },
        /**
         * httpPOST协议请求
         * @param url 请求路径"http://www.baidu.com"
         * @param headers 请求头部 {}
         * @param data 提交数据:{page : 1, rows : 10}
         * @param callback Function(result)--> result :{code: "", data : "", msg : ""}
         */
        post: function (url, headers, data, callback) {
            base({
                url: url,
                method: "POST",
                data: data,
                headers: headers
            }, callback);
        }
    };
})();