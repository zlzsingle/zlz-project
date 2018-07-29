{
    var fs = require("fs");
    var path = require("path");
    var filePath = path.join("F:\\data\\file\\a.txt");
    var filePath2 = path.join("F:\\data\\file\\b.txt");

    function read() {
        var data = "";
        var stream = fs.createReadStream(filePath);

        stream.on("data", function (t) {
            console.error("on data");
            data = data + t;
        });

        stream.on("end", function () {
            console.error("on end :" + data);
        });

        stream.on("error", function () {
            console.error("on error");
        });
    }

    function write() {
        var data = "我来自珠海";
        var stream = fs.createWriteStream(filePath);

        stream.write(data, "utf-8");
        stream.end();

        stream.on("finish", function () {
            console.error("on finish");
        });
        stream.on("error", function (err) {
            console.error("on error :", err);
        });
    }

    function pipe() {
        var readStream = fs.createReadStream(filePath);
        var writeStream = fs.createWriteStream(filePath2);
        readStream.pipe(writeStream);
    }

    pipe();
}