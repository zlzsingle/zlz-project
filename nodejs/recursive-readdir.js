var path = require("path");
var recursive = require("recursive-readdir");
var dirPath = "/tycom/apps/subscript/system_manager_end/modules/login";
console.info("dirPath : " + dirPath);
recursive(dirPath, function (err, files) {
    files.forEach(function (file) {
        if (path.extname(file) === ".js") {
            console.info(file)
        }
    });
});