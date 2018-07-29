module.exports = function (root) {

    var app = root;

    app.get("/getJson", function (req, res) {
        global.res = res;
        res.send("/getLocation");
    });

    app.get("/getLocation", function (req, res) {
        res.send({name: "张三"})
    });
};


(() => {

    let http = require("http");

    http.get({
        hostname: "localhost",
        port: "80",
        path : "/",
        agent : false //创建一个新代理，只用于本次请求
    }, (...values) => {
        console.error(values)
    });

})();