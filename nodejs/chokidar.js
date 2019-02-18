//目录监控
const chokidar = require('chokidar');
const watcher = chokidar.watch([/xxx/xxx], {
    persistent: true
    , usePolling: true
    , interval: 3000
    , binaryInterval: 3000
    , disableGlobbing: true
    , depth: 1
});

watcher.on('add', function (path) {
    console.error("path :" + path)
});
