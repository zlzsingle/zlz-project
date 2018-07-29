module.exports = (function () {
    // let gm = require("gm");
    // let fs = require("fs");
    // let path = require("path");
    // let async = require("async");
    // let pdf2img = require("pdf2img");

    return {
        /**
         * 是否是视频后缀
         * @param suffix 后缀
         * @returns {boolean}
         */
        isVideo: function (suffix) {
            let ext = suffix.replace('.', '').toUpperCase();
            let arr = "MP4,WEBM,OGG,AVI,RMVB,RM,ASF,DIVX,MPG,MPEG,MPE,WMV,MP4,MKV,VOB,MOV,AVS,FLV,3GP,DAT,DSM,OGM,RMVB,TS,TP,IFO,NSV".split(",");
            return arr.indexOf(ext) !== -1;
        }
    };
})();