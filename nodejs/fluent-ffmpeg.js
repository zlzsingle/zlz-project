const ffmpeg = require("fluent-ffmpeg");
const path = require('path');
const fs = require('fs');
const mp4 = path.join(__dirname, 'mp4', 'a.mp4');

/**
 * 截取视频一帧当图片
 * @param {string} src 源视频
 * @param {string} dest 图片输出路劲
 * @param {number} ss 秒数
 */
const screenshots = (src, dest, ss) => new Promise((resolve, reject) => {
    const command = ffmpeg();
    command.input(src)
        .outputOption(['-ss ' + ss, '-filter_complex', 'scale=640:-1', '-vframes 1'])
        .output(dest)
        .on('error', err => reject(err))
        .on('end', () => resolve({video: src, thumbnail: dest}))
        .run();
});

(async () => {
    let c = 60;
    let s = 1;
    const filesPath = path.join(__dirname, 'files');
    if (fs.existsSync(filesPath)) {
        const state = fs.statSync(filesPath);
        if (!state.isDirectory()) {
            fs.mkdirSync(filesPath);
        }
    } else {
        fs.mkdirSync(filesPath);
    }
    if (!fs.existsSync(mp4)) {
        console.error('mp4 : ', mp4);
        return;
    }
    const all = [];
    while (s <= c) {
        all.push(screenshots(mp4, path.join(__dirname, 'files', `${s}.jpg`), s));
        s = s + 1;
    }
    try {
        const startTime = Date.now();
        const rs = await Promise.all(all);
        rs.forEach(r => console.info('rs : ', JSON.stringify(r)));
        console.info('count : ', (Date.now() - startTime) / 1000, 's');
    } catch (err) {
        console.error('err : ', JSON.stringify(err));
    }
})();
