var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require("fs");
var w = "C:\\Users\\Administrator\\Desktop\\19910408L\\OCR\\02.ocr";

fs.readFile(w, function (err, data) {
    parser.parseString(data, function (err, result) {
        console.error(err, result)
    });
});
