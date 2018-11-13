var path = require("path");

var filePath = "D:\\Project\\WordFiles\\uploadFile\\upload_11b73a66497725f97a4232f48765113f.zip";
console.error(path.dirname(filePath)); //-- > D:/Project/WordFiles/uploadFile
console.error(path.basename(filePath)); //--> upload_11b73a66497725f97a4232f48765113f.zip
console.error(path.extname(filePath)); // .zip
console.error(path.format({dir : "d:\\student",base : "test.txt"})); //--> d:/student/test.txt
console.error(path.isAbsolute("/student/test/name")); //true
console.error(path.isAbsolute("../../student")); //false
console.error(path.normalize("F://application\\zhagnsan\\lisi/student.js")); // F:\application\zhagnsan\lisi\student.js
console.error(path.basename('/foo/bar/baz/asdf/quux.html', '.html')); // quux
console.error(path.resolve([from], to)); //　从to里得到绝对路径
