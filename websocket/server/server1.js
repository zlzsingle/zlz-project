// 服务1

const http = require('http');

const server = http.createServer(function (req, res) {

}).listen(3001);

server.on('upgrade', function (req, socket, head) {

});

