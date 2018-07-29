{
    var fs = require("fs");
    var path = require("path");
    var unzip = require("unzip");
    var input = "F:\\data\\test\\2.zip";
    var output = "F:\\data\\test1";
    var extract  = unzip.Extract({path: output});

    console.error("ok");

    extract.on("close", function () {
        var web = path.join(process.cwd(), "test1", "web.html");

        if (fs.existsSync(web)) {
            console.error("exists " + web)
        } else {
            console.error("no exists " + web)
        }
    });

    extract.on("error", function (error) {
        console.error("error : ", error);
    });

    fs.createReadStream(input).pipe(extract);
}