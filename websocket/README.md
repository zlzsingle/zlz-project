### 1.什么是websocket
 
> Websocket是一种在单个TCP连接上进行全双工通信的协议. 诞生与2008年,2011年成为国际标准，目前所有浏览器都已经支持了．


### 2.什么情况下使用

- 天气变化
- 股市行情
- 聊天室

举例： 股票行情页面,变化都是`秒级/毫秒级`的.这种情况下,如果采用`http`轮询请求服务数据．会造成资源浪费,效率低下,数据不及时等问题．这时候就要采用`websocket`,开启`TCP`通道，由服务向客户端推送数据．


### 3.详细介绍

#### 3.1 特点

> (1) 建立在TCP协议之上,服务器端的实现比较容易
>
> (2) 对HTTP有良好的兼容,默认端也是80和443,并且握手阶段采用HTTP协议,因此握手时不容易屏蔽,能通过各种HTTP代理服务器
>
> (3) 数据格式比较轻量,性能开销小,通信高效.
> 
> (4) 可以发送文本,也可以发送二进制数据.
> 
> (5) 没有同源限制,客户端可以与任意服务器通信
> 
> (6) 协议标识是`ws`(如果加密,则为`wss`),服务网址就是URL

#### 3.2 开始握手

1) 由客户端发起握手协议
```
GET /websocket/connect?userId=3 HTTP/1.1
Host: server.example.com
Connection: Upgrade
Upgrade: websocket
Origin: http://server.example.com
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: xUmMgSW9Hpt1PGw/X1UCHg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

- `GET /websocket/connect?userId=3 HTTP/1.1` http协议+url+query 版本号
- `Connection: Upgrade` 通知服务器连接协议升级
- `Upgrade: websocket` 升级为websocket协议
- `Sec-WebSocket-Version` 当前使用协议的版本号
- `Sec-WebSocket-Key` 终端随机生成一组16位的随机base64编码

2) 服务端响应响应的协议
```
HTTP/1.1 101 Switching Protocols
upgrade: websocket
connection: Upgrade
sec-websocket-accept: iLkXOjF0f9x4bGvi9GnUKeEdnIM=
```

- `HTTP/1.1 101 Switching Protocols` 服务器端切换协议
- `connection: Upgrade` 升级为websocket协议
- `upgrade: websocket` 升级为websocket协议
- `sec-websocket-accept` 与GUID **258EAFA5-E914-47DA-95CA-C5AB0DC85B11** 字符串进行拼接,然后进行sha-1运算.最后编码成base64

#### 3.3 通信例子

1) 客户端主动连接发送数据 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
```javascript
    const websocket = new WebSocket('ws://localhost:8080');
    
    websocket.readyState;
    websocket.CONNECTING;
    websocket.OPEN;
    websocket.CLOSING; 
    websocket.CLOSED;
    
    websocket.onopen = function() {
        console.log('open');
        websocket.send('hello world');
    };
    
    websocket.onmessage = function(event) {
        console.log('message :', event.data);
    };
    
    websocket.onerror = function(err) {
        console.error('err :' ,err);
    };
    
    websocket.onclose = function() {
        console.log('close');
    };
```

- `websocket.readyState` 请求处理的状态 0(连接中) 1(连接打开) 2(关闭中) 3(已关闭)
- `websocket.CONNECTING (0)` 连接中
- `websocket.OPEN (1)` 连接已打开
- `websocket.CLOSING (2)` 连接关闭中
- `websocket.CLOSED (3)` 连接已关闭
- `websocket.onopen` 连接建立时触发
- `websocket.onmessage` 客户端接收服务端数据时触发
- `websocket.onerror` 通信发生错误时触发
- `websocket.onclose` 连接关闭时触发
- `websocket.send('hello world')` 发送数据事件
 
2) 服务端接收握手升级协议
```javascript
    const http = require('http');
    const crypto = require('crypto');
    const path = require('path');
    const fs = require('fs');
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    
    const server = http.createServer(function(req,res) {
        const url = req.url;
        if (url.indexOf('index.html') > -1) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end();
        }
    });
    
    server.on('upgrade', function(req,socket,head) {
        
        console.log('head :',JSON.stringify(head));
        
        // 建立握手连接
        const websocketKey = req.headers['sec-websocket-key'];
        const websocketAccept = crypto.createHash('sha1').update(GUID + websocketKey).digest('base64');
        const resMsg = [
            'HTTP/1.1 101 Switching Protocols', // 切换协议
            'Connection: Upgrade', // 连接升级
            'Upgrade: websocket', //　升级为websocket
            'Sec-Websocket-Accept: '+ websocketAccept,
            '\r\n'
        ].join('\r\n');
        
        // 回应客户端协议
        socket.write(resMsg);
        
        // 监听客户端发送过来的数据
        socket.on('data', rawFrame =>{
            // rawFrame 解码websocket帧
            socket.write(new Buffer(rawFrame));
        });
    });
```
