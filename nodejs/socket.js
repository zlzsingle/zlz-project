//node
(function () {
    var socket;
    var express = require("express");
    var app = express();
    var http = require("http");
    var server = http.createServer(app);
    var io = require("socket.io");

    server.listen(process.env.PORT || "3000");
    server.on("error", function (error) {

    });
    server.on("listening", function () {

    });

    socket = io.listen(server);
    socket.of("/socket").on("connection", function (client) {
        var clientId = client.id;
        client.on("setData", function (data) {

        });
        client.emit("getClientId", clientId);
    });
})();

//javascript
(function () {
    // var io = {}; //io 引用socket.io-client
    // var socket = io.connect(location.host + "/socket");
    // socket.on("connection", function () {
    //     socket.on("getClientId", function (clientId) {
    //
    //     });
    //     socket.emit("setData", "data");
    // });

    var io = {}; //io 引用socket.io-client
    var socket = io.connect(location.host + "/socket/connect/zb");
    socket.on("connection", function () {
        socket.on("comment", function (data) {
            //data : {id : "", commentType : "0|1"}
        });

        socket.on("end", function (data) {
            //data : {id : ""}
        });

        socket.emit("register", {id: ""}); //直播id
    });

})();