{
    // https://www.npmjs.com/package/wkhtmltopdf

    //wkhtmltopdf.exe 下载地址
    //https://ro.softpedia-secure-download.com/dl/150657e92f2455fd385cf3c47032a430/59f5754d/100140362/software/PDF/wkhtmltox-0.12.1_msvc2013-win64.exe

    //csdn下载安装指导步骤
    //http://blog.csdn.net/zhangkezhi_471885889/article/details/52184700

    // let fs = require("fs");
    let path = require("path");
    let wkhtmltopdf = require("wkhtmltopdf");
    let pdfpath = path.join(process.cwd(), 'demo', 'a.pdf');
    //将网页转成pdf
    wkhtmltopdf('http://163.com', {output: pdfpath});


    //将html转成pdf
    // let stream = fs.createReadStream(path.join(process.cwd(), "html", "html-pdf.html"));
    // wkhtmltopdf(stream, {output: 'f:/html-pdf.pdf'});

}
