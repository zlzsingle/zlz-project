let fs = require('fs');
let path = require('path');
let AdmZip = require('adm-zip');
let iconv = require('iconv-lite');
let async = require('async');
let method2String = {
    0: 'stored',
    1: 'shrunk',
    6: 'imploded',
    8: 'deflated',
    9: 'deflate64',
    14: 'LZMA'
};

function fixZipFilename(filename, encoding) {
    encoding = encoding || 'cp437';
    let str = iconv.decode(filename, encoding);
    // if (str.replace(/[\u4e00-\u9fa5_a-zA-Z0-9\/\-\.]/g, '').length > 0) { //有乱码
    //     str = iconv.decode(filename, 'utf-8');
    // }
    return str;
}

function listSync(zipFilename, encoding) {
    let zip = new AdmZip(zipFilename);
    let results = zip.getEntries().map(function (x) {
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
    let zip = new AdmZip(zipFilename);
    let zipEntries = zip.getEntries();
    let list = [];
    zipEntries.forEach(function (x) {
        list.push(x)
    });

    if (filters && filters.length > 0) {
        async.forEachSeries(list, function (x, cb) {
            let filePath = fixZipFilename(x.rawEntryName, encoding);
            let match = filters
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
            let filePath = fixZipFilename(x.rawEntryName, encoding);
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
