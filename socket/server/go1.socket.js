const express = require('express');
const WebSocketServer = require('ws').Server;
const app = express();
const port = 3001;
const server = app.listen(port);
const wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {

    console.log('go1 connect success');

    ws.send('go1 connect success');

    ws.on('message', function (data) {
        console.log('go1 message : ', JSON.stringify(data));
    });
});
