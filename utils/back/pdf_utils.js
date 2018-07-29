module.exports = (function () {
    var pdf = require("html-pdf");
    var fs = require("fs");
    var path = require("path");

    return {
        /**
         * 将html转成pdf文件
         * @param data
         * @param cb
         */
        htmlToPdf: function (data, cb) {
            // data : {html : "", output: "",opt:{}}
            var html = data.html;
            var output = data.output;
            var phPath = path.join(process.cwd(), "node_modules", "phantomjs", "bin", "phantomjs");
            var options = Object.assign({}, {
                format: 'Letter'
                , phantomPath: phPath
            }, data.opt);

            if (!fs.existsSync(output)) {
                cb(output + "目录不存在!");
                return;
            }
            pdf.create(html, options).toFile(output, function (err, res) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, res.filename);
                }
            });
        },
        /**
         * 将html文件转成一个pdf
         * @param data
         * @param cb
         */
        htmlFileToPdf: function (data, cb) {
            // data : {htmlFile : "", output: "",opt}
            var _this = this;
            var htmlFile = data.htmlFile;
            if (fs.existsSync(htmlFile)) {
                var stat = fs.statSync(htmlFile);
                if (stat.isFile()) {
                    data.html = fs.readFileSync(htmlFile);
                    data.htmlFile = undefined;
                    _this.htmlToPdf(data, cb);
                    return;
                }
            }
            cb(htmlFile + "不是一个文件!");
        }
    };
})();