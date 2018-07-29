module.exports = (function () {
    var fs = require("fs");
    var formidable = require("formidable");
    var request = require("request");
    var util = require("util");

    function genOption(opt) {
        return Object.assign({}, {
            dir: "",
            encoding: "utf-8",
            multiples: true,
            keepExtensions: true, //是否保留后缀
            maxFieldsSize: 20 * 1024 * 1024, //最大文件限制
            onProgress: null, //上传进度
            onField: null,
            onError: null,
            onAborted: null,
            onEnd: null,
            onFile: null
        }, opt);
    }

    return {
        /**
         * 后端接受上传文件的方法
         * @param req {‌IncomingMessage} app请求对象
         * @param opt {Object} 见genOption方法
         * @param callback {Function} 回调函数
         */
        upload: function (req, opt, callback) {
            var cb = callback || function(){};
            var options = genOption(opt);
            var form = new formidable.IncomingForm();
            var uploadDir = options.dir;
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            form.uploadDir = uploadDir;
            form.encoding = options.encoding;
            form.multiples = options.multiples;
            form.keepExtensions = options.keepExtensions;	 //保留后缀
            form.maxFieldsSize = options.maxFieldsSize;   //字段最大值

            form.parse(req, function (err, fields, files) {
                if (err) {
                    cb(err);
                } else {
                    // fields : {}, files : [ {path : "", name : ""}, {}]
                    cb(null, {fields: fields, files: files});
                }
            });
            form.on('progress', function (bytesReceived, bytesExpected) {
                if (typeof options.onProgress === "function") {
                    options.onProgress.call(form, bytesReceived, bytesExpected);
                }
            });
            form.on('field', function (name, value) {
                if (typeof options.onField === "function") {
                    options.onField.call(form, name, value);
                }
            });
            form.on('file', function (name, file) {
                if (typeof options.onFile === "function") {
                    options.onFile.call(form, name, file);
                }
            });
            form.on('error', function (err) {
                if (typeof options.onError === "function") {
                    options.onError.call(form, err);
                }
            });
            form.on('aborted', function () {
                if (typeof options.onAborted === "function") {
                    options.onAborted.call(form);
                }
            });
            form.on('end', function () {
                if (typeof options.onEnd === "function") {
                    options.onEnd.call(form);
                }
            });
        },

        /**
         * nodeJs后端上传文件
         * @param postUrl {String} 上传文件的url地址
         * @param fileData {Array} 要上传的文件 ["/files/data/test.jpg","",""]
         * @param bodyData {Object} 表单数据 {student : "zhangSan"}
         * @param cb {Function} 回调函数
         * @returns {*}
         */
        postFile: function (postUrl, fileData, bodyData, cb) {
            // var formData = {
            //     my_field: 'my_value',
            //     my_file: fs.createReadStream(__pdfPath),
            //     attachments: [
            //         fs.createReadStream(__pdfPath),
            //         fs.createReadStream(__imgPath)
            //     ]
            // };

            var callback = null;
            var formData = {};

            if (util.isFunction(bodyData)) {
                callback = bodyData;
                bodyData = {};
            } else if (util.isFunction(cb)) {
                callback = cb;
            } else {
                callback = function () {};
            }

            try {

                if (!fileData || fileData.length === 0) {
                    return callback("fileData is null");
                }

                formData = Object.assign(formData, bodyData);
                formData.attachments = [];

                for (var i = 0; i < fileData.length; i++) {
                    var fileUrl = fileData[i];
                    if (!fs.existsSync(fileData[i])) {
                        return callback("url " + fileUrl + "is not exists");
                    }
                    formData.attachments.push(fs.createReadStream(fileUrl));
                }

                request.post({url:postUrl, formData: formData}, function optionalCallback(err, httpResponse, body) {
                    // if (err) {
                    //     return console.error('upload failed:', err);
                    // }
                    // console.log('Upload successful!  Server responded with:', body);
                    // console.log('Upload successful!  Server responded with:', body);
                    if (err) {
                        callback(err);
                    } else if (httpResponse.statusCode !== 200) {
                        callback("response error : " + httpResponse.statusCode);
                    } else {
                        try {
                            if (util.isString(body)) {
                                body = JSON.parse(body);
                            }
                        } catch (err) {

                        }
                        callback(null, body);
                    }
                });

                /*request({
                        method: 'POST',
                        preambleCRLF: true,
                        postambleCRLF: true,
                        uri: postDataUrl,
                        multipart: [
                            {
                                'content-type': 'application/json',
                                body: JSON.stringify(__postData)
                            },
                            {body: fs.createReadStream(__pdfPath)},
                            {body: fs.createReadStream(__imgPath)}
                        ]
                    },
                    function (error, response, body) {
                        if (error) {
                            return console.error('upload failed:', error);
                        }
                        console.log('Upload successful!  Server responded with:', body);
                    })*/

            } catch (err) {
                callback(err);
            }
        }
    };

})();
