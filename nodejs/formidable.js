module.exports = function (root) {

    var app = root;
    var path = require("path");
    var formidable = require("formidable");
    var fs = require("fs");

    app.get("/uploadHome", function (req, res) {
        res.render("uploadFile", {data: {view: "uploadFile"}});
    });

    app.post("/uploadFile", function (req, res) {
        var form = new formidable.IncomingForm();
        var uploadDir = path.join(process.cwd(), "uploadFile");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        form.uploadDir = uploadDir;
        form.encoding = 'utf-8';
        form.multiples = true;
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 20 * 1024 * 1024;   //字段最大值

        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.json({code: "error", msg: err});
            }

            if (files) {
                for (var key in files) {
                    var num = 1;
                    var fileName = "";
                    var file = files[key];
                    var fileDir = path.dirname(file.path);
                    var oldPath = file.path;
                    var newPath = path.join(fileDir, file.name);
                    var currFileExt = path.extname(file.name);
                    var currFileName = path.basename(file.name, currFileExt);
                    while (true) {
                        if (fs.existsSync(newPath)) {
                            fileName = path.basename(currFileName, currFileExt);
                            fileName = fileName + "(" + num + ")" + currFileExt;
                            newPath = path.join(path.dirname(newPath), fileName);
                            num++;
                        } else {
                            break;
                        }
                    }
                    fs.renameSync(oldPath, newPath);
                }
            }
            res.json({code: "success", data: true});
        });

        form.on('progress', function (bytesReceived, bytesExpected) {

        });
        form.on('field', function (name, value) {
            console.error("field", name, value);
        });
        form.on('error', function (err) {
            console.error("err", err);
        });
        form.on('aborted', function () {
            console.error("aborted");
        });
        form.on('end', function () {
            console.error("end");
        });

    });
};