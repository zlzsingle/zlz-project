module.exports = (function () {
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
