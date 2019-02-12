const path = require('path');
const ffmpeg = require("fluent-ffmpeg");

// 4.视频变速,播放速度变成1.5倍
// 5.将视频转成图片,1秒一张

/**
 * 提取视频中的音频文件
 * @param {string} videoSrc 源视频文件路径
 * @param {string} outputSrc 音频输出文件路径
 * @returns {Promise<any>}
 */
const getAudioByVideo = (videoSrc, outputSrc) => new Promise((resolve, reject) => {
    ffmpeg()
        .input(videoSrc)
        .audioCodec('copy')
        .outputOptions('-vn')
        .output(outputSrc)
        .on('error', err => reject(err))
        .on('end', () => resolve())
        .run();
});

/**
 * 剪切视频
 * @param {string} videoSrc 源视频文件路径
 * @param {string|number} ss 从那一秒开始裁剪
 * @param {string|number} t 裁剪多少秒
 * @param {string} outputSrc 裁剪之后的视频输出路劲
 * @returns {Promise<any>}
 */
const cuttingVideo = (videoSrc, ss, t, outputSrc) => new Promise((resolve, reject) => {
    ffmpeg()
        .input(videoSrc)
        .inputOption('-ss ', ss)
        .inputOption('-t ', t)
        .audioCodec('copy')
        .videoCodec('copy')
        .output(outputSrc)
        .on('error', err => reject(err))
        .on('end', () => resolve())
        .run();
});

/**
 * 将视频转成gif
 * @param {string} videoSrc 源视频文件路径
 * @param {string|number} ss 从那一秒开始裁剪
 * @param {string|number} t 裁剪多少秒
 * @param {string} outputSrc 裁剪之后的gif输出路劲
 * @returns {Promise<any>}
 */
const videoConvertGif = (videoSrc, ss, t, outputSrc) => new Promise((resolve, reject) => {
    ffmpeg()
        .input(videoSrc)
        .inputOption('-ss', ss)
        .inputOption('-t', t)
        .outputOption('-s', '300*500')
        .outputOption('-pix_fmt', 'rgb24')
        .outputFormat('gif')
        .save(outputSrc)
        .on('error', err => reject(err))
        .on('end', () => resolve())
        .run();
});

(() => {
    // const vs = path.join(__dirname, '..', 'demo', 'mp4', 'a.mp4');
    // const os = path.join(__dirname, '..', 'demo', 'files', 'o.mp3');
    // getAudioByVideo(vs, os).then(() => {
    //     console.log('ok');
    // }).catch(err => {
    //     console.error('error : ', err);
    // });

    // const vs = path.join(__dirname, '..', 'demo', 'mp4', 'a.mp4');
    // const os = path.join(__dirname, '..', 'demo', 'mp4', 'output.mp4');
    // cuttingVideo(vs, 10, 20, os).then(() => {
    //     console.log('ok');
    // }).catch(err => {
    //     console.error('error : ', err);
    // });

    // const vs = path.join(__dirname, '..', 'demo', 'mp4', 'a.mp4');
    // const os = path.join(__dirname, '..', 'demo', 'mp4', 'bbb.gif');
    // videoConvertGif(vs, 10, 20, os).then(() => {
    //     console.log('ok');
    // }).catch(err => {
    //     console.error('error : ', err);
    // });

})();
