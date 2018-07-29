// http://es6.ruanyifeng.com/#docs/generator-async


let co = require("co");
let fs = require("fs");
let thunkify = require('thunkify');
let readFile = thunkify(fs.readFile);

function* readJob() {
    let aaa = yield readFile("D:/aaa.json", "utf-8");
    let bbb = yield readFile("D:/bbb.json", "utf-8");
    let ccc = yield readFile("D:/ccc.json", "utf-8");
    return [aaa, bbb, ccc];
}

co(readJob).then(function (data) {
    console.error("data :", data);
}).catch(function (err) {
    console.error(1, err);
});