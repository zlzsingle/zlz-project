const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const server = http.createServer(function (req, res) {
    const url = req.url;
    if (url === '/' || url.indexOf('index.html')) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end();
    }
});

// 升级协议
server.on('upgrade', function (req, socket, head) {

    const websocketKey = req.headers['sec-websocket-key'];
    const websocketAccept = crypto.createHash('sha1').update(websocketKey + guid).digest('base64');
    const resMes = [
        'HTTP/1.1 101 Switching Protocols',
        'Connection: Upgrade',
        'Upgrade: websocket',
        'Sec-Websocket-Accept: ' + websocketAccept,
        '\r\n'
    ].join('\r\n');
    socket.write(resMes);

    socket.on('data', function (wsFrame) {
        const frame = decodeWsFrame(wsFrame);

        console.log('opcode :', frame.opcode);
        console.log('payloadData :', frame.payloadData ? frame.payloadData.toString('utf8') : null);

    });
});

server.listen(3000, function () {
    console.log('http://localhost:3000/index.html')
});


function decodeWsFrame(data) {
    let start = 0;
    let frame = {
        isFinal: (data[start] & 0x80) === 0x80,
        opcode: data[start++] & 0xF,
        masked: (data[start] & 0x80) === 0x80,
        payloadLen: data[start++] & 0x7F,
        maskingKey: '',
        payloadData: null
    };

    if (frame.payloadLen === 126) {
        frame.payloadLen = (data[start++] << 8) + data[start++];
    } else if (frame.payloadLen === 127) {
        frame.payloadLen = 0;
        for (let i = 7; i >= 0; --i) {
            frame.payloadLen += (data[start++] << (i * 8));
        }
    }

    if (frame.payloadLen) {
        if (frame.masked) {
            const maskingKey = [
                data[start++],
                data[start++],
                data[start++],
                data[start++]
            ];

            frame.maskingKey = maskingKey;

            frame.payloadData = data
                .slice(start, start + frame.payloadLen)
                .map((byte, idx) => byte ^ maskingKey[idx % 4]);
        } else {
            frame.payloadData = data.slice(start, start + frame.payloadLen);
        }
    }
    return frame;
}
