{
    //需要安装PhantomJs
    //http://phantomjs.org/download.html (下载地址)

    let fs = require('fs');
    let pdf = require("html-pdf");
    let path = require("path");
    let html = fs.readFileSync(path.join(process.cwd(), "html", "html-pdf.html"), 'utf8');
    let outPdf = path.join(process.cwd(), "html", "out.pdf");
    let options = {
        format: 'Letter'
        // ,phantomPath: "./node_modules/phantomjs/bin/phantomjs"
        , phantomPath: "F:/phantomjs-2.1.1-windows/bin/phantomjs"
    };

    pdf.create(html, options).toFile(outPdf, function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });


    // pdf.create(html, options).toBuffer(function (err, buffer) {
    //     console.log('This is a buffer:', Buffer.isBuffer(buffer));
    // });
}