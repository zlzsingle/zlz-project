(function () {
    var res = require("response");

    //设置请求超时时长
    res.setTimeout(1 * 60 * 60 * 1000, function () {
        console.log("/upload  上传超时");
    });

    //重定向
    res.redirect("/login");

    //发送文件
    res.sendFile("/tycom/file_path.jpg", function () {
        console.error(arguments);
    });

    //下载
    res.download("/tycom/file_path.jpg", function () {
        console.error(arguments);
    });



})();