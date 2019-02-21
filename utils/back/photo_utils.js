module.exports = (function () {
    let gm = require("gm");
    let fs = require("fs");
    let path = require("path");
    let async = require("async");
    let pdf2img = require("pdf2img");

    function getFileSize(size) {
        if (!size) {
            return size;
        }
        let fileSize = 0;
        if (size.indexOf("G") != -1) {
            fileSize = parseFloat(size) * 1024 * 1024 * 1024;
        } else if (size.indexOf("M") != -1) {
            fileSize = parseFloat(size) * 1024 * 1024;
        } else if (size.indexOf("K") != -1) {
            fileSize = parseFloat(size) * 1024;
        } else {
            fileSize = parseFloat(size);
        }
        // console.error("fileSize : " + fileSize);
        return fileSize;
    }

    return {
        /**
         * 重置图片大小到指定的路径
         * @param {array} data [{file : "/files/data/student.jpg",width : "400",height : "400",targetPath : "/files/school/student.jpg"}]
         * @param {function} callback
         */
        resizePhoto: function (data, callback) {
            if (Array.isArray(data) && data.length > 0) {
                async.forEachSeries(data, function (item, cb) {
                    let gmFile = gm(item.file);
                    let targetPath = item.targetPath;
                    let width = item.width;
                    let height = item.height;
                    if (fs.existsSync(path.dirname(targetPath))) {
                        gmFile.resize(width, height).noProfile().write(targetPath, function (err) {
                            if (err) {
                                cb(err);
                            } else {
                                cb();
                            }
                        });
                    }else{
                        callback(targetPath + "路径无效!");
                    }
                }, function (err) {
                    callback && callback(err);
                });
            } else {
                callback && callback();
            }
        },

        /**
         * 判断后缀是否是图片
         * @param {string} suffix ".jpg"|"jpg"
         * @returns {boolean} is photo suffix
         */
        isImage: function (suffix) {
            let ext = suffix.replace('.', '').toUpperCase();
            let arr = "3FR,8BIM,8BIMTEXT,8BIMWTEXT,APP1,APP1JPEG,ART,ARW,AVS,BIE,BMP,BMP2,BMP3,CALS,CAPTION,CIN,CMYK,CMYKA,CR2,CRW,CUR,CUT,DCM,DCR,DCX,DNG,DPS,DPX,EPDF,EPI,EPS,EPSF,EPSI,EPT,EPT2,EPT3,EXIF,FAX,FITS,FRACTAL,FPX,GIF,GIF87,GRADIENT,GRAY,HRZ,ICB,ICC,ICM,ICO,ICON,IDENTITY,IMAGE,IPTC,IPTCTEXT,IPTCWTEXT,JBG,JBIG,JNG,JP2,JPC,JPEG,JPG,K25,KDC,LABEL,M2V,MAP,MAT,MIFF,MNG,MONO,MPC,MPEG,MPG,MRW,MSL,MTV,MVG,NEF,NULL,OTB,P7,PAL,PALM,PBM,PCD,PCDS,PCT,PCX,PDB,PEF,PFA,PFB,PGM,PGX,PICON,PICT,PIX,PLASMA,PNG,PNG24,PNG32,PNG8,PNM,PPM,PSD,PTIF,PWP,RAF,RAS,RGB,RGBA,RLA,RLE,SCT,SFW,SGI,STEGANO,SUN,SVG,TEXT,TGA,TIFF,TILE,TIM,TOPOL,TTF,UYVY,VDA,VICAR,VID,VIFF,VST,WBMP,WMF,WPG,X,X3F,XBM,XC,XCF,XMP,XPM,XV,XWD,YUV".split(",");
            return arr.indexOf(ext) !== -1;
        },

        /**
         * 将pdf文件转换成图片,注意这个方法只有在linux上才才能运行
         * @param {object} data {type : "",size : "",density : "",outputdir : "", outputname : "", page: "",pdf :""}
         * @param {function} cb
         * @returns {*}
         */
        pdfToImg: function (data, cb) {
            // https://www.npmjs.com/package/pdf2img
            if (process.platform.indexOf("linux") === -1) {
                return cb("Not the Linux platform doesn't work");
            }

            let df = Object.assign({}, {
                type: "jpg", //图片的类型   png or jpg, default jpg
                size: 1024, //图片的大小  default 1024
                density: 600, //图片的密度  default 600
                outputdir: "", //输出的文件目录
                outputname: "", //输出的文件名称
                page: null,
                pdf: "" //pdf文件
            }, data);
            // pdf2img.setOptions({
            //     type: 'png',                                // png or jpg, default jpg
            //     size: 1024,                                 // default 1024
            //     density: 600,                               // default 600
            //     outputdir: __dirname + path.sep + 'output', // output folder, default null (if null given, then it will create folder name same as file name)
            //     outputname: 'test',                         // output file name, dafault null (if null given, then it will create image name same as input name)
            //     page: null                                  // convert selected page, default null (if null given, then it will convert all pages)
            // });

            if (!fs.existsSync(df.pdf)) {
                return cb(df.pdf + "文件不存在!");
            }

            if (df.type[0] === ".") {
                df.type[0] = df.type[0].substr(1);
            }

            pdf2img.setOptions(df);

            pdf2img.convert(df.pdf, function (err, info) {
                /*
                    info : { result: 'success',
                      message: [
                        {
                            page: 1,
                            name: 'test_1.jpg',
                            size: 17.275,
                            path: '/output/test_1.jpg'
                        },
                        {
                            page: 2,
                            name: 'test_2.jpg',
                            size: 24.518,
                            path: '/output/test_2.jpg'
                        }]
                    }
                */
                cb(err, info);
            });
        },

        /**
         * 给图片添加水印
         * @param {object} data {source : "", watermark : "", output : "", position :"", opacity :""}
         * @param {function} callback
         */
        addWatermark: function (data, callback) {
            let watermarkFile = data.watermark;
            let imgFile = data.source;
            let outputPath = data.output;
            let position = data.position;
            let opacity = data.opacity;
            let buffer = fs.readFileSync(imgFile);
            let img = gm(buffer);

            img
                .composite(watermarkFile, '50')
                .gravity(position)
                .dissolve(opacity)
                .toBuffer("jpg", function (err, bu) {
                    if (err) {
                        console.error("tuBuffer : ", err);
                    } else {
                        fs.writeFileSync(outputPath, bu);
                    }
                    callback();
                });
        },

        /**
         * 压缩图片
         * @param {string} data {output : "", source : "", width : "", height : "", quality : "",ext:""}
         * @param {function} callback
         */
        compression: function (data, callback) {

            data = Object.assign({}, {
                output: "",//压缩之后,图片输出的路径
                quality: "",//压缩之后的图片是原图质量的百分比 1-100
                width: "",//压缩之后,图片的宽度
                height: "",//压缩之后,图片的高度
                ext: "jpg",//
                source: ""//图片源路径
            }, data);

            let output = data.output; //压缩之后,图片输出的路径
            let quality = data.quality;
            let width = data.width;
            let height = data.height;
            let suffix = data.ext;
            let img = gm(data.source);

            img.resize(width, height).quality(quality).autoOrient().toBuffer(suffix, function (err, buffer) {
                if (err) {
                    callback(err);
                } else {
                    fs.writeFileSync(output, buffer);
                    callback();
                }
            });
        },

        /**
         * 图片信息
         * @param {string} image "/files/data/a.jpg"
         * @param {function} callback function(data){}
         */
        imageInfo : function (image, callback) {
            let _file = gm(image);
            let data = {}; //{size : "", width : "", height: ""};
            _file.size(function (err2, size) {
                if (err2) {
                    data.width = "";
                    data.height = "";
                } else {
                    data.width = size.width;
                    data.height = size.height;
                }
                _file.filesize(function (err, filesize) {
                    if (err) {
                        data.size = "";
                    } else {
                        data.size = getFileSize(filesize);
                    }
                    callback(data);
                });
            });
        }
    };
})();
