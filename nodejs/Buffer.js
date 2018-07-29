(function () {
    // http://nodejs.cn/api/buffer.html
    // Buffer 类的实例类似于整数数组，除了其是大小固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在其创建时就已确定，且不能调整大小。
    // Buffer 类在 Node.js 中是一个全局变量，因此无需 require('buffer').Buffer。

    var path = require("path");
    var fs = require("fs");

    function imageBuffer() {
        var base64 = "";//图片base64数据
        var buffer = new Buffer(base64, "base64");
        var filePath = path.join(process.cwd(), "uploadFile", "test.jpg");
        fs.writeFileSync(filePath, buffer);
    }

    function textBuffer() {
        var base64 = [
            "   hello word; this name is tycom",
            "\n",
            "   我来自中国"
        ];
        var buffer = new Buffer(base64.join(""), "utf-8");
        var filePath = path.join(process.cwd(), "uploadFile", "test.txt");
        fs.writeFileSync(filePath, buffer);
    }

    function fileToBuffer() {
        var filePath = path.join(process.cwd(), "uploadFile", "test.txt");
        var newFilePath = path.join(process.cwd(), "uploadFile", "new_test.txt");
        var fileBuffer = fs.readFileSync(filePath);
        fs.writeFileSync(newFilePath, fileBuffer);
    }

    function bufferCopy() {

    }

    function bufferInit() {
        var buf = Buffer.from([1, 2, 3, 4]);
        var testPath = path.join(process.cwd(), "uploadFile", "buf.txt");
        fs.writeFileSync(testPath, buf);
    }

    function bufferToBase64(buffer) {
        // var buffer = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\images\\aaaaa.png");
        // var base64 = buffer.toString("base64");
        // fs.writeFileSync("C:\\Users\\Administrator\\Desktop\\images\\aaa.txt", base64);
        return buffer.toString("base64");
    }

    function base64ToBuffer(base64) {
        // var base64 = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\images\\aaa.txt","utf-8");
        // var imgBuffer = new Buffer(base64, "base64");
        // fs.writeFileSync("C:\\Users\\Administrator\\Desktop\\images\\bbb.jpg", imgBuffer);
        return new Buffer(base64, "base64");
    }

    base64ToBuffer();
})();