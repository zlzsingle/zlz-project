var fs = require('fs');
var download = require('download');
var path = require("path");

module.exports = function (root) {
    var app = root;

    app.get("/downloadFile", function (req, res) {
        var projectRoot = path.join(process.cwd(), "uploadFile");
        if (!fs.existsSync(projectRoot)) {
            fs.mkdirSync(projectRoot);
        }
        var fileList = fs.readdirSync(projectRoot);
        if (fileList && fileList.length) {
            for (var index in fileList) {
                var fileName = fileList[index];
                var filePath = path.join(projectRoot, fileName);
                if (fs.existsSync(filePath)) {
                    var state = fs.statSync(filePath);
                    if (state.isFile()) {
                        res.download(filePath, fileName, function () {
                            console.error("arguments :", arguments);
                        });
                        return;
                    }
                }
            }
        }
        res.end("没有能下载的文件");
    });

    //下载一个文件流
    app.get("/downloadStream", function (req, res) {
        var url = "http://www.yjpic.cn/attachments/image/111/5/56/11769_5435/11769_5435_960_540_jpg111.jpg";
        var fileName = "11769_5435_960_540_jpg.jpg";
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

        download(url).then(function (data) {
            res.send(data);
        }).catch(function () {
            res.send(new Buffer(1));
        });
    })
};

//https://www.npmjs.com/package/download
function d1(){

    download('https://img-xhpfm.zhongguowangshi.com/News/201707/d20daa1b66914be3bfa601acbb2f2b56.jpeg', __dirname).then((data) => {
        console.error(data);
    }).catch(function (err) {
        console.error(err);
    });

    download('http://www.baidu11.com').then(data => {
        fs.writeFileSync("F:/student.jpg", data);
    });

    Promise.all([
        'unicorn.com/foo.jpg',
        'cats.com/dancing.gif'
    ].map(x => download(x, 'dist'))).then(() => {
        console.log('files downloaded!');
    });

}