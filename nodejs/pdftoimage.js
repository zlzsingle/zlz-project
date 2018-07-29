(function () {
    var pdftoimage = require('pdftoimage');
    var file = 'F:/a2.pdf';
    var outdir = "F:/";

    pdftoimage(file, {
        format: 'png',  // png, jpeg, tiff or svg, defaults to png
        prefix: 'img',  // prefix for each image except svg, defaults to input filename
        outdir: outdir   // path to output directory, defaults to current directory
    })
        .then(function(){
            console.log('Conversion done');
        })
        .catch(function(err){
            console.log(err);
        });
})();