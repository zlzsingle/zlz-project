//目录监控
var chokidar = require('chokidar');
var watcher = chokidar.watch(["F:/Student"], {
    persistent: true
    , usePolling: true
    , interval: 3000
    , binaryInterval: 3000
    , disableGlobbing: true
    , depth: 1
});

watcher.on("add", function (path) {
    console.error("path :" + path)
});