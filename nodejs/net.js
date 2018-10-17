// http://www.runoob.com/nodejs/nodejs-net-module.html
// http://www.cnblogs.com/hustskyking/p/nodejs-net-module.html

// server.js
(() => {
    let port = 5000;
    let net = require("net");

    net.createServer(function (socket) {

        socket.on("data",function (data) {

        });

        socket.on("end",function () {

        });

        socket.on("error",function () {

        });

        socket.on("close", function () {

        });

    }).listen(port);

})();

// client.js
(()=>{
    let net = require("net");
    let client = net.connect({host: "localhost", port: 5000}, function () {
        // TCP连接成功之后触发
    });
    client.on('data', function (data) {
        // 服务器端发送数据时触发
        console.error("event data", data);
    });

    client.on('end', function () {
        // TCP连接结束事件
        console.error("event end");
    });

    client.on("error",function (err) {
       // 连接发生错误时触发
        console.error("event error");
    });

    client.on("close", function () {
        // 连接完全关闭时触发
        console.error("event close");
    });

    client.write('world!\r\n'); //往服务器端发送数据,以字符串的形式.
    client.end(); //往服务器发送结束请求
})();


/*------------------------------------测试代码----------------------------------*/
(() => {
    // client.js
    let net = require("net");
    let client = net.connect({
        // host: "116.19.98.191",
        port: 5000
    }, function () {
        console.error("connection ok");
        client.write(JSON.stringify({action: "register", data: {id: "456"}}));
    });
    client.on('data', function (data) {
        console.error("on data :", data.toString());
    });
    client.on('end', function () {
        console.error("on end");
    });
    client.on('error', function () {
        console.error("on error");
    });
    client.on('close', function () {
        console.error("on close");
    });

})();
/*------------------------------------测试代码----------------------------------*/
