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
Sec-WebSocket-Key: lBaC1f0WoA3XVhF6bECLEw==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

客户端发起一个http升级请求,`Connection`为`Upgrade`, 升级方式为`websocket`
