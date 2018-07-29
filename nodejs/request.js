(function () {
    var req = require("request");

    //获取请求的ip地址
    req.ip;
    req.ips;
    req.subdomains;
    req.path;
    req.hostname;
    req.host;
    req.stale;
    req.xhr;

    //获取请求头部的参数
    req.get("name");
    req.header("name");

    //获取请求的参数值查询顺序依次是 params --> body --> query;
    req.param("name");

    req.accepts("html");

    req.acceptsEncodings();

    req.acceptsLanguages();

    req.acceptsCharset();

    req.acceptsLanguage();

    req.range(5000);

})();


//用http请求图片
(() => {
    let fs = require('fs');
    let path = require('path');
    let request = require("request");

    // let imgUrl = "http://localhost:3041/themes/black/img/login_bg.jpg";
    let imgUrl = "http://cms-bucket.nosdn.127.net/50c9968e05fe49779869a37edb55c06d20170703202842.jpeg?imageView&thumbnail=453y225&quality=85";
    // let imgUrl = "http://www.163.com";
    let dir = path.join(__dirname, "..", "img");

    function download(url, dir, filename) {
        request.head(url, function (err, res, body) {
            if (err) {
                return console.error("请求失败！")
            }
            if (res.statusCode != 200) {
                return console.error("请求失败！")
            }
            if (body) {

            }
            request(url).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    }

    download(imgUrl, dir, "163.jpg")
})();

{
    var fs = require("fs");
    var path = require("path");
    var request = require('request');
    request('http://yjdaily.yjrb.com.cn/resfile/2010-11-07/A02/Page.jpg', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    request('http://yjdaily.yjrb.com.cn/resfile/2013-11-07/A02/Page.jpg', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
}