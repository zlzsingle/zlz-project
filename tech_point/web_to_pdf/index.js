(function () {
    'use strict';
    var exec = require('child_process').exec;
    var utils = require('./utils').utils;
    var nodeUtil = require('util');
    var outPut = function (callback) {
        var pdfPath = nodeUtil.format("F:/%s.pdf", utils.guid.newId());
        // var pdfUrl = "http://www.baidu.com";
        var resterizeJsPath = "F:/data/tech_point/web_to_pdf/rasterize.js";
        var pdfUrl = "file:///F:/data/tech_point/web_to_pdf/test_html/html.html";
        var cmd = nodeUtil.format("phantomjs %s %s %s A4", resterizeJsPath, pdfUrl, pdfPath);

        console.error("pdfPath : " + pdfPath);
        console.error("pdfUrl : " + pdfUrl);
        console.error("cmd : " + cmd);

        exec(cmd, function (error, stdout, stderr) {
            if (error || stderr) {
                callback(error || stderr)
            } else {
                callback(pdfPath);
            }
        });
    };

    outPut(function (err, path) {
        if (err) {
            console.error(err);
        } else {
            console.log(path)
        }
    })
})();