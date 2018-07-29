module.exports = (function () {
    // var gm = require("gm");
    // var fs = require("fs");
    // var path = require("path");
    // var async = require("async");
    // var pdf2img = require("pdf2img");

    return {
        /**
         * 是否是音频后缀
         * @param suffix 后缀
         * @returns {boolean}
         */
        isAudio: function (suffix) {
            let ext = suffix.replace('.', '').toUpperCase();
            let arr = "MP4,WEBM,OGG,AVI,RMVB,RM,ASF,DIVX,MPG,MPEG,MPE,WMV,MP4,MKV,VOB,MOV,AVS,FLV,3GP,DAT,DSM,OGM,RMVB,TS,TP,IFO,NSV".split(",");
            return arr.indexOf(ext) !== -1;
        }
    };
})();