function getUpload() {
    var _upload_base_dir = "";
    return {
        //tmpDir:     __dirname+ '../../../../files/uploaded/tmp',
        //publicDir:  __dirname+ '../../../../files/uploaded/',
        //uploadDir:  __dirname+ '../../../../files/uploaded/files',
        tmpDir: _upload_base_dir + 'tmp',
        publicDir: _upload_base_dir + '',
        uploadDir: _upload_base_dir + 'files',

        uploadUrl: 'upload/uploaded/files/',
        maxPostSize: 11000000000, // 11 GB
        minFileSize: 1,
        maxFileSize: 10000000000, // 10 GB
        acceptFileTypes: /.+/i,
        // Files not matched by this regular expression force a download dialog,
        // to prevent executing any scripts in the context of the service domain:
        inlineFileTypes: /\.(gif|jpe?g|png)$/i,
        imageTypes: /\.(gif|jpe?g|png|ti?f)$/i,
        imageVersions: {
            mini: {
                width: 26,
                height: 26,
                //dir: __dirname+ '../../../../files/uploaded/mini',
                dir: _upload_base_dir + 'mini',
                url: 'upload/uploaded/mini/',
                type: 'jpeg'
            },
            thumbnail: {
                width: 150,
                height: 150,
                //dir: __dirname+ '../../../../files/uploaded/thumbnail',
                dir: _upload_base_dir + 'thumbnail',
                url: 'upload/uploaded/thumbnail/',
                type: 'jpeg'
            },
            preview: {
                width: 1024,
                height: 1024,
                //dir:__dirname+ '../../../../files/uploaded/preview',
                dir: _upload_base_dir + 'preview',
                url: 'upload/uploaded/preview/',
                type: 'jpeg'

            }
        },
        nodeStatic: {
            cache: 3600 // seconds to cache served files
        },
        copyImgAsThumb: true
    }
}

module.express = function (root) {
    var app = root;
    var uploader = require('blueimp-file-upload-expressjs')(getUpload());
    var staticDir = process.cwd();

    app.use('/uploaded', express.static(staticDir, {
        setHeaders: function (res) {
            if (res.req.query.o_name !== undefined) {
                var fileName = res.req.query.o_name;
                if (res.req.header("user-agent")) {
                    if (res.req.header("user-agent").indexOf("MSIE") > 0 || res.req.header("user-agent").indexOf("rv:11.0) like Gecko") > 0) {
                        fileName = encodeURI(fileName);
                    } else {
                        fileName = "=?UTF8?B?" + new Buffer(res.req.query.o_name).toString("base64") + "?=";
                    }
                }
                res.setHeader("Content-Type", "application/octet-stream");
                res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);//+ encodeURI(res.req.query.o_name)
            }
        }
    }));
};