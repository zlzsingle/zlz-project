(function () {
    console.error("run pdf-textstring");

    let fs = require("fs");
    let path = require("path");
    let PDFParser = require("pdf2json");
    let pdfParser = new PDFParser();
    let pdfPath = "C:\\Users\\Administrator\\Desktop\\4.102\\A04.pdf";
    let jsonPath = path.join(process.cwd(), "file", "read.json");

    let pdfText = require('pdf-textstring');
    pdfText.pdftotext(pdfPath, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    });

})();