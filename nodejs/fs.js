// http://nodejs.cn/api/
var fs = require("fs");
var mode = "";
var option = "";
var dir_path = "";
var file_path = "";
var buffer = new Buffer(); //文件流

/**
 * 同步判断目录是否存在
 * @param path {String}文件或目录路径
 * @return {Boolean}true存在|false不存在
 */
fs.existsSync(dir_path);//同步判断文件或目录是否存在

/**
 * 同步创建目录
 * @param path {String}文件或目录路径
 * @param mode {String|Number}目录权限（读写权限），默认0777
 * @return {Boolean}true|false
 */
fs.mkdirSync(dir_path,mode);//同步创建目录

/**
 * 同步将文件流转换成文件对象
 * @param path
 * @param data
 * @param option
 */
fs.writeFileSync(file_path, buffer,option); //将流转成文件

/**
 * 异步判断文件目录是否存在
 * @param path
 * @param callback
 */
fs.exists(dir_path, function (err, exists) { //异步判断目录是否存在 (遭到废弃)
    //err 错误信息
    //exists 是否存在 true|false
});

/**
 * 同步删除文件(目录无法删除)
 */
fs.unlinkSync("f:/student.txt");

//删除目录
fs.rmdirSync("f:/student");

var state = fs.statSync(dir_path);
state.isFile();
state.isDirectory();
state.size;

fs.readdir(dir_path, function (err, files) {
    // files ["student.txt","student",...]
});

var files = fs.readdirSync(dir_path); // files ["student.txt","student",...]

var result = fs.readFileSync(__filename, "utf-8");
console.error(result);
