// https://github.com/jsantell/node-zip-dir
var zip_dir = require("zip-dir");
var path_dir = "e:/test_zip";
zip_dir(path_dir, function (err, buffer) {
    // `buffer` is the buffer of the zipped file
    // console.error(buffer);
    //将buffer转成文件
    // fs.writeFileSync("e:/testZip/test.zip", buffer);
});