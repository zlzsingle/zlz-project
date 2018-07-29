(function () {
    console.error("run pdf2json");

    let fs = require("fs");
    let path = require("path");
    let PDFParser = require("pdf2json");
    let pdfParser = new PDFParser();
    let pdfPath = "C:\\Users\\Administrator\\Desktop\\4.102\\A04.pdf";
    let jsonPath = path.join(process.cwd(), "file", "read.json");

    pdfParser.on("pdfParser_dataError", function (errData) {
        console.error("pdfParseError : ", errData);
    });
    pdfParser.on("pdfParser_dataReady", function (pdfData) {
        console.error("pdfParseReady : ", pdfData);
        fs.writeFileSync(jsonPath, JSON.stringify(pdfData));
    });
    pdfParser.loadPDF(pdfPath);
})();