(function () {
    var os = require("os");
    console.error(os.platform()); //win32
    console.error(os.type()); //Windows_NT

    var networkInterfaces = os.networkInterfaces();
    console.info(networkInterfaces);
})();