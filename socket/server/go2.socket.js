const express = require('express');
const WebSocketServer = require('ws').Server;
const app = express();
const port = 3002;
const server = app.listen(port);
const wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {

    console.log('go2 connect success');

    ws.send('go2 connect success');

    ws.on('message', function (data) {
        console.log('go2 message : ', JSON.stringify(data));
    });
});
