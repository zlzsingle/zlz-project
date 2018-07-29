// http://bluebirdjs.com/docs/api-reference.html
var Promise = require("bluebird");
var fs = require("fs");

function createDir() {
    return new Promise(function (reject, resolve) {
        fs.mkdirSync("test_zlz");
        var num = Math.ceil(Math.random() * 1000);
        if (num % 2 == 0) {
            reject();
        } else {
            resolve("error");
        }
    });
}

createDir().then(function () {
    console.error("then");
}).catch(function () {
    console.error("catch");
});



var Promise = require("bluebird");
var fs = require("fs");

function a() {
    return new Promise(function (reject, resolve) {
        console.error("a");
        reject({a_1: "1"})
    });
}

function b() {
    return new Promise(function (reject, resolve) {
        console.error("b");
        reject({b_1: "b"});
    });
}

function c() {
    return new Promise(function (reject, resolve) {
        console.error("c");
        reject({c_1: "c"});
    });
}

function d() {
    return new Promise(function (reject, resolve) {
        console.error("d");
        reject({d_1: "d"});
        // resolve("我是的d错误了!");
    });
}

function e() {
    return new Promise(function (reject, resolve) {
        console.error("e");
        reject({e_1: "e"});
    });
}

Promise.props({
    a: a(),
    b: b(),
    c: c(),
    d: d(),
    e: e()
}).then(function (result) {
    // a
    // b
    // c
    // d
    // e
    // then :  { a: { a_1: '1' },
    // b: { b_1: 'b' },
    // c: { c_1: 'c' },
    // d: { d_1: 'd' },
    // e: { e_1: 'e' } }
    console.error("then : ", result);
}).catch(function (err) {
    console.error("err : ", err);
});