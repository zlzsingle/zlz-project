const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
    const url = req.url;
    if (url.indexOf('index.html') > -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
    }
});

server.on('upgrade', function (req, socket, head) {

    console.log('head : ', JSON.stringify(head));

    // 建立ws握手
    handshake(req, socket);

    // 挂载用户事件
    mountCustomerEvent(socket);

    // 挂载send方法
    mountSendMethod(socket);

    // 原始ws帧解析处理
    rawFrameParseHandle(socket);
});

server.listen(port, function () {
    console.log(`http://localhost:${port}/index.html`);
});

// 编码ws帧
function encodeWsFrame(data) {
    const isFinal = data.isFinal !== undefined ? data.isFinal : true;
    const opcode = data.opcode !== undefined ? data.opcode : 1;
    const payloadData = data.payloadData ? new Buffer(data.payloadData) : null;
    const payloadLen = payloadData ? payloadData.length : 0;
    const frame = [];

    if (isFinal) {
        frame.push((1 << 7) + opcode);
    } else {
        frame.push(opcode);
    }

    if (payloadLen < 126) {
        frame.push(payloadLen);
    } else if (payloadLen < 65536) {
        frame.push(126, payloadLen >> 8, payloadLen & 0xFF);
    } else {
        frame.push(127);
        for (let i = 7; i >= 0; --i) {
            frame.push((payloadLen & (0xFF << (i * 8))) >> (i * 8));
        }
    }
    const result = payloadData ? Buffer.concat([new Buffer(frame), payloadData]) : new Buffer(frame);

    console.dir(decodeWsFrame(frame));

    return result;
}

// 解码ws帧
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

// 建立ws握手
function handshake(req, socket) {
    // 固定GUID
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    // websocket key
    const websocketKey = req.headers['sec-websocket-key'];
    // 获取客户端返回的key与GUID进行sha1编码后获取base64格式摘要
    const key = crypto.createHash('sha1').update(websocketKey + GUID).digest('base64');

    // 返回101协议切换响应
    const resMsg = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key,
        '\r\n'
    ].join('\r\n');

    socket.write(resMsg);
}

// 挂在用户事件
function mountCustomerEvent(socket) {

    // 连接事件
    socket.on('connection', client => {
        console.log('connection');
        console.log('client : ', client);
    });

    // 发送信息事件
    socket.on('message', data => {
        decodeWsFrame(data);
        console.log('msg : ', JSON.stringify(data));
    });

    // 关闭事件
    socket.on('close', () => {
        console.log('close');
    });

    // 错误事件
    socket.on('error', err => {
        console.error('error :', err);
    });
}

// 挂载send方法
function mountSendMethod(socket) {
    let startFrameWrite = false;
    socket.send = function (opts) {
        if (typeof opts === 'string') {
            return this.write(encodeWsFrame({isFinal: true, opcode: 1, payloadData: String(opts)}));
        } else if (opts instanceof Buffer) {
            return this.write(encodeWsFrame({isFinal: true, opcode: 2, payloadData: opts}));
        }

        let opcode;
        let type = opts.type;
        let payloadData = opts.data;
        let isFinal = opts.isFinal === undefined ? true : opts.isFinal;

        if (!type && payloadData instanceof Buffer) {
            type = 'binary';
            payloadData = new Buffer(payloadData);
        }

        switch (type) {
            case 'text' :
                opcode = 1;
                break;
            case 'binary' :
                opcode = 2;
                break;
            case 'ping':
                opcode = 9;
                break;
            case 'pong':
                opcode = 10;
                break;
            case 'close' :
                opcode = 8;
                break;
            default:
                opcode = 1;
        }

        if (opcode === 1) {
            payloadData = String(payloadData);
        }

        // 如果起始帧已经写入,后续帧直到终止都是附加帧
        if (startFrameWrite) {
            opcode = 0;
        }

        if (isFinal === false) {
            startFrameWrite = true;
        } else if (startFrameWrite && isFinal) {
            startFrameWrite = false;
        }
        return this.write(encodeWsFrame({isFinal, opcode, payloadData}));
    }
}

function rawFrameParseHandle(socket) {
    let frame,
        frameArr = [],
        totalLen = 0;
    socket.on('data', rawFrame => {
        frame = decodeWsFrame(rawFrame);

        if(frame.isFinal) {
            if(frame.opcode === 0) {
                frameArr.push(frame);
                totalLen += frame.payloadLen;

                let frame = frameArr[0];
                let payloadDataArr = frameArr
                    .filter(frame => frame.payloadData)
                    .map(frame => frame.payloadData);
                frame.payloadData = Buffer.concat(payloadDataArr);
                frame.payloadLen = totalLen;
                opHandle(socket, frame);
                frameArr = [];
                totalLen = 0;
            } else {
                opHandle(socket, frame);
            }
        } else {
            frameArr.push(frame);
            totalLen += frame.payloadLen;
        }
    });
}

function opHandle(socket, frame) {
    switch(frame.opcode) {
        case 1:
            // 文本帧
            socket.emit('message', {type: 'text', data: frame.payloadData.toString('utf8')});
            break;
        case 2:
            // 二进制帧
            socket.emit('message', {type: 'binary', data: frame.payloadData});
            break;
        case 8:
            // 关闭帧
            socket.emit('close');
            break;
        case 9:
            // ping帧
            socket.emit('ping');
            console.dir(frame);
            socket.write(encodeWsFrame({opcode: 10}));
            break;
        case 10:
            // pong帧
            socket.emit('pong');
            console.dir(frame);
            break;
    }
}
