const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const port = 4000;
const config = {
    "go1": {
        "host": "http://localhost:3001",
        "prefix": "/followquant/v2.1"
    },
    "go2": {
        "host": "http://localhost:3002",
        "prefix": "/followquant2"
    }
};
const wsProxy = proxy({
    ws: true,
    changeOrigin: true,
    target: config.go2.host,
    router: function (req) {
        const url = req.url;
        console.log('node socket url :', url);
        if (url.includes(config.go1.prefix)) {
            return config.go1.host;
        }
        return config.go2.host;
    },
});
app.use(wsProxy);
const server = app.listen(port);
server.on('upgrade', wsProxy.upgrade);
