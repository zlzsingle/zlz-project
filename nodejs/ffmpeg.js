//多媒体编解码框架
// http://blog.csdn.net/yanglang1987500/article/details/42423843 (截取视频开头当封面图)
// https://github.com/damianociarla/node-ffmpeg

var  ffmpeg = require("ffmpeg");

/**
 * 截取视频一帧当图片
 * @param src
 * @param dest
 * @param ss
 * @param cb
 */
function screenshots(src, dest, ss, cb) {
    var commend = ffmpeg();
    commend.input(src)
        .outputOption(['-ss ' + ss, '-filter_complex', 'scale=640:-1', '-vframes 1'])
        .output(dest)
        .on('error', function (err) {
            console.error("process_video_snapshot error:", err);
            cb(err);
        })
        .on('end', function () {
            cb(null, {video: src, thumbnail: dest});
        })
        .run();
}


(() => {

    // let fs = require("fs");
    // let download = require("download");
    // let url = "http://vod-xhpfm.oss-cn-hangzhou.aliyuncs.com/NewsVideo/201707/adfee75d6ca64e24ba7683458e2ce9c6.mp4";
    //
    // download(url).then(data => {
    //     fs.writeFileSync("F:\\MyZlzWord\\ZLZSVNProject\\file\\test.mp4", data);
    // });

    let mp4 = "./test.mp4";

    try {
        new ffmpeg(mp4, function (err, video) {
            if (!err) {
                console.log(video);
                console.log('The video is ready to be processed');
            } else {
                console.log('Error: ' + err);
            }
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }


})();
