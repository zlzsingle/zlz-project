module.exports = (function () {
    let fs = require("fs");
    let path = require("path");
    let unzip = require("unzip");
    let AdmZip = require('adm-zip');
    let archiver = require('archiver');
    let recursive = require("recursive-readdir");

    return {
        /**
         * 删除文件,如果给的路径不是一个文件。则不删除
         * @param filePath {String} "/files/data/text.txt"
         */
        delFile: function (filePath) {
            if (fs.existsSync(filePath)) {
                let stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        },

        /**
         * 复制文件,如果目标目录不存在则创建
         * @param sourcePath "/files/data/a.jpg"
         * @param targetPath "/files/data/b.jpg"
         * @param callback
         */
        copyFile: function (sourcePath, targetPath, callback) {
            if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
                return callback(sourcePath + "不是一个文件");
            }
            this.syncCreateDir(targetPath);

            let reader = fs.createReadStream(sourcePath);
            let writer = fs.createWriteStream(targetPath);
            reader.pipe(writer);
            reader.on('end', function () {
                writer.end();
                callback();
            }).on("error", function (err) {
                callback(err);
            });
        },

        /**
         * 同步复制文件信息,如果目标目录不存在则创建
         * @param sourcePath "/files/data/a.jpg"
         * @param targetPath "/files/news/a.jpg"
         */
        copyFileSync: function (sourcePath, targetPath) {
            let _this = this;
            if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
                _this.syncCreateDir(path.join(targetPath, ".."));
                fs.writeFileSync(targetPath, fs.readFileSync(sourcePath));
            } else {
                throw new Error(sourcePath + "不是一个文件");
            }
        },

        /**
         * 同步移动文件,如果目标目录不存在则创建
         * @param sourceFile "/files/data/a.jpg"
         * @param targetFile "/files/news/a.jpg"
         */
        moveFileSync: function (sourceFile, targetFile) {
            let _this = this;
            if (!fs.existsSync(sourceFile)) {
                throw sourceFile + " is not exists";
            }
            _this.syncCreateDir(path.join(targetFile, ".."));
            fs.renameSync(sourceFile, targetFile);
        },

        /**
         * 移动目录,将原目录下的所有文件移动到目标目录下
         * @param sourceDir "/files/data/" 要移动的文件夹
         * @param targetDir "/files/news/" 移动到那个文件夹
         * @param callback function 回调
         */
        moveDirSync: function (sourceDir, targetDir, callback) {
            let _this = this;
            if (fs.existsSync(sourceDir) && fs.statSync(sourceDir).isDirectory()) {
                _this.syncCreateDir(targetDir);
                recursive(sourceDir, function (err, files) {
                    if (!err) {
                        files.forEach(function (filePath) {
                            //相对路径
                            let relativePath = path.relative(sourceDir, filePath);
                            let newFilePath = path.join(targetDir, relativePath);
                            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                                _this.moveFileSync(filePath, newFilePath);
                            } else {
                                _this.syncCreateDir(newFilePath);
                            }
                        });
                        _this.delDir(sourceDir, false);
                    }
                    callback && callback(err);
                });
            } else {
                callback && callback(sourceDir + "不是一个目录!");
            }
        },

        /**
         * 删除指定的目录,如果目录下有文件也一并删除
         * @param dirPath {String} "/files/data"
         * @param delRoot {Boolean} true|false (默认删除)
         */
        delDir: function (dirPath, delRoot) {
            let files = [];
            let _del = delRoot === undefined ? true : delRoot; //默认删除
            let _this = this;
            if (fs.existsSync(dirPath)) {
                files = fs.readdirSync(dirPath);
                files.forEach(function (file) {
                    let curPath = dirPath + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) { // recurse
                        _this.delDir(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                if (_del) {
                    fs.rmdirSync(dirPath);
                }
            }
        },

        /**
         * 获取目录下指定后缀的文件
         * @param dirPath {String} "/files/data"
         * @param suffix ".txt"
         * @returns ["/files/data/test.txt","/files/data/student.txt"]
         */
        getFiles: function (dirPath, suffix) {
            let result = [];

            function finder(filePath) {
                let files = fs.readdirSync(filePath);
                files.forEach(function (val) {
                    let fPath = path.join(filePath, val);
                    let stats = fs.statSync(fPath);
                    if (stats.isDirectory()) {
                        finder(fPath);
                    }
                    if (stats.isFile()) {
                        let extName = path.extname(fPath);
                        if (extName === suffix) {
                            result.push(fPath);
                        }
                    }
                });
            }
            finder(dirPath);
            return result;
        },

        /**
         * 同步创建目录
         * @param dirName {String} "/files/data/student"
         * @param isFirst {Boolean} false
         * @param mode 0
         * @returns {Boolean} true创建成功,false创建失败
         */
        syncCreateDir: function (dirName, isFirst, mode) {
            let _this = this;
            let dirPath = dirName;
            if (isFirst === undefined || isFirst) {
                let ext = path.extname(dirName);
                if (ext) {
                    dirPath = path.dirname(dirName);
                }
            }
            if (fs.existsSync(dirPath)) {
                return true;
            } else {
                if (_this.syncCreateDir(path.dirname(dirPath), false, mode)) {
                    fs.mkdirSync(dirPath, mode);
                    return true;
                }
            }
            return false;
        },

        /**
         * 解压文件
         * @param input "/files/data/file.zip"
         * @param output "/files/data/"
         * @param callback function(error)
         */
        unzip: function (input, output, callback) {
            if (!fs.existsSync(input)) {
                return callback(input + "无效!");
            }
            if (!fs.existsSync(output)) {
                fs.mkdirSync(output);
            }
            let extract = unzip.Extract({path: output});
            extract.on("close", function () {
                callback();
            });
            extract.on("error", function (error) {
                callback(error);
            });
            fs.createReadStream(input).pipe(extract);
        },

        /**
         * 压缩文件夹
         * @param from  "/files/data/"
         * @param to    "/files/news.zip"
         * @param callback  回调function(err)
         */
        zipDir: function (from, to, callback) {
            this.syncCreateDir(to);

            if (!fs.existsSync(from)) {
                return callback("源路径不存在");
            }
            if (fs.statSync(from).isFile()) {
                return callback("源路径不能为文件");
            }
            if (path.extname(to) !== ".zip") {
                return callback("目标文件后缀错误,压缩只支持zip格式");
            }
            let output = fs.createWriteStream(to);
            let archive = archiver('zip');

            output.on('close', function () {
                callback && callback();
            });

            archive.on('error', function (err) {
                callback && callback(err);
            });

            archive.on('warning', function (err) {
                callback && callback(err);
            });

            archive.pipe(output);

            archive.directory(from, false);

            archive.finalize();
        },

        /**
         * 试用Adm包解压压缩包
         * @param input "/files/data/file.zip"
         * @param output "/files/data/"
         * @param callback function(err)
         */
        admUnzip: function (input, output, callback) {
            if (fs.existsSync(input) && fs.statSync(input).isFile()) {
                let zip = new AdmZip(input);
                zip.extractAllToAsync(output, true, callback);
            } else {
                callback(input + "文件路劲不存在!")
            }
        }
    };

})();
