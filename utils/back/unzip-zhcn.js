var fs = require('fs');
var path = require('path');
var AdmZip = require('adm-zip');
var iconv = require('iconv-lite');
var async = require('async');
var method2String = {
    0: 'stored',
    1: 'shrunk',
    6: 'imploded',
    8: 'deflated',
    9: 'deflate64',
    14: 'LZMA'
};

function fixZipFilename(filename, encoding) {
    encoding = encoding || 'cp437';
    var str = iconv.decode(filename, encoding);
    // if (str.replace(/[\u4e00-\u9fa5_a-zA-Z0-9\/\-\.]/g, '').length > 0) { //有乱码
    //     str = iconv.decode(filename, 'utf-8');
    // }
    return str;
}

function listSync(zipFilename, encoding) {
    var zip = new AdmZip(zipFilename);
    var results = zip.getEntries().map(function (x) {
        return {
            path: fixZipFilename(x.rawEntryName, encoding),
            time: x.header.time,
            size: x.header.size,
            method: method2String[x.header.method] || 'unknown'
        };
    });
    return results;
}

function extractSync(zipFilename, targetPath, encoding, filters, callback) {
    var zip = new AdmZip(zipFilename);
    var zipEntries = zip.getEntries();
    var list = [];
    zipEntries.forEach(function (x) {
        list.push(x)
    });

    if (filters && filters.length > 0) {
        async.forEachSeries(list, function (x, cb) {
            var filePath = fixZipFilename(x.rawEntryName, encoding);
            var match = filters
                .map(function (x) {
                    return filePath.startsWith(x);
                })
                .reduce(function (acc, cur) {
                    return (acc || cur);
                }, false);
            if (match) {
                filePath = path.join(targetPath + "", filePath);
                if (x.isDirectory) {
                    fs.mkdirSync(filePath);
                } else {
                    fs.writeFileSync(filePath, zip.readFile(x));
                }
            }
            cb();
        }, function (err) {
            callback && callback(err)
        });
    } else {
        async.forEachSeries(list, function (x, cb) {
            var filePath = fixZipFilename(x.rawEntryName, encoding);
            filePath = path.join(targetPath + "", filePath);
            if (x.isDirectory) {
                fs.mkdirSync(filePath);
            } else {
                fs.writeFileSync(filePath, zip.readFile(x));
            }
            cb();
        }, function (err) {
            callback && callback(err)
        });
    }
}

module.exports = {
    listSync: listSync,
    extractSync: extractSync
};
