{
    //给图片加水印
    (function () {
        //todo nodejs 版本要8.0以上
        var images = require('images');
        var path = require('path');
        var watermarkImg = images(path.join(process.cwd(), 'test', 'rh.jpg'));
        var sourceImg = images(path.join(process.cwd(), 'bin', 'test.jpg'));
        var savePath = path.join(process.cwd(), 'file', 'saveImg.jpg');
        // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
        var sWidth = sourceImg.width();
        var sHeight = sourceImg.height();
        var wmWidth = watermarkImg.width();
        var wmWidth = watermarkImg.height();
        images(sourceImg)
        // 设置绘制的坐标位置，右下角距离 10px
            .draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10)
            // 保存格式会自动识别
            .save(savePath);
    })();
}