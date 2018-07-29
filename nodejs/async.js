//http://cnodejs.org/topic/54acfbb5ce87bace2444cbfb
// https://caolan.github.io/async/
var async = require("async");
var data = [{a: 1}, {b: 2}, {c: 3}];


async.series({
    one: function(callback){
        callback(null, 1);
    },
    two: function(callback){
        callback(null, 2);
    }
},function(err, results) {
    console.log(results);
});

async.series([
        function (cb) {
            cb(undefined);
        },
        function (cb) {
            cb();
        },
        function (cb) {
            cb();
        }],
    function (err, values) {
        console.error("callback");
    });


async.waterfall([
    function (cb) {
        log('1.1.1: ', 'start');
        cb(null, 3);
    },
    function (n, cb) {
        log('1.1.2: ', n);
        t.inc(n, cb);
    },
    function (n, cb) {
        log('1.1.3: ', n);
        t.fire(n * n, cb);
    }
], function (err, result) {
    log('1.1 err: ', err); // -> null
    log('1.1 result: ', result); // -> 16
});

/*
    result :
        {a : 1}
        err
 */
async.eachSeries(data, function (item, callback) {
    console.error(item);

    callback("err");

}, function (err) {
    console.error("err :" + err);
});

/*
     result :
     {a : 1}
     err
 */
async.forEachSeries(data, function (item, callback) {
    console.error(arguments);

    callback(1);

}, function (err) {
    console.error("err1 :" + err);
    return false;
});

/*
     result :
     {a : 1}
     err
     {b : 2}
     {c : 3}
 */
async.each(data, function (item, callback) {
    console.error(arguments);

    callback("err");

}, function (err) {
    console.error("err1 :" + err);
    return false;
});

// concat---------------------------------------------------------------------------------
var async = require('async');
var fs = require('fs');
var num = 1;
async.concat(['F:\\MyZlzWord\\ZLZSVNProject\\book', 'F:\\MyZlzWord\\ZLZSVNProject\\es6', 'F:\\MyZlzWord\\ZLZSVNProject\\http'], fs.readdir, function (err, files) {
    console.error(num++, err, files)
});
// concat---------------------------------------------------------------------------------

// forEachOf---------------------------------------------------------------------------------
var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

async.forEachOf(obj, function (value, key, callback) {
    fs.readFile(__dirname + value, "utf8", function (err, data) {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, function (err) {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
});
// forEachOf---------------------------------------------------------------------------------

// auto---------------------------------------------------------------------------------
async.auto({
        test3: function (callback) {
            console.error("exec test3");
            callback(null, "test3")
        },
        test1: function (callback) {
            console.error("exec test1");
            callback(null, "test1");
        },
        test4: ["test2", function (callback, data) {
            console.error("test4:" + JSON.stringify(data));
            callback(null);
        }],
        test2: ['test1', 'test3', function (callback, data) {
            console.error("test2 : " + JSON.stringify(data));
            callback(null, "123");
        }]
    },
    function (err, result) {
        if (err) {
            console.error(err)
        } else {
            console.error(result)
        }
    });
// auto---------------------------------------------------------------------------------