let path = require("path");
let exec = require('child_process').exec;
let nodeUtil = require('util');
let outPut = function (callback) {
    let pdfPath = path.join(__dirname, Date.now() + ".pdf");
    let resizeJsPath = path.join(__dirname, "rasterize.js");
    let pdfUrl = "file:///" + path.join(__dirname, "test-html", "html.html");
    let cmd = nodeUtil.format("phantomjs %s %s %s A4", resizeJsPath, pdfUrl, pdfPath);

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
});
