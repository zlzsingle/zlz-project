{
    //解压文件
    let path = require("path");
    let fs = require("fs");
    let decompress = require("decompress");
    let decompressUnzip = require('decompress-unzip');
    let decompressTar = require('decompress-tar');
    let input = path.join(process.cwd(), "test", "2.rar");
    let output = path.join(process.cwd(), "test1");

    decompress(input, output, {
        plugins: [
            decompressUnzip(),
            decompressTar()
        ],
        strip : 10
    }).then(files => {
        console.log('Files decompressed');
    }).catch(err => {
        console.error("err :" , err)
    })
}