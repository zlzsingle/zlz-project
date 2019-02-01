// 图片处理
const gm = require('gm');

function getImageInfo(imageUrl) {
    console.error(imageUrl);
    gm(imageUrl);
}

getImageInfo('/home/zlz/Pictures/a.jpg');

