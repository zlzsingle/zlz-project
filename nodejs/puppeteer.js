// puppeteer 无界面浏览器

// https://pptr.dev/

// https://zhaoqize.github.io/puppeteer-api-zh_CN/

(async () => {

    const puppeteer = require('puppeteer');

    // 设备大全
    const devices = require('puppeteer/DeviceDescriptors');

    // 打开浏览器
    const browser = await puppeteer.launch({headless: true});

    // 新开一个页面
    const page = await browser.newPage();

    // 模拟 iphoneX 访问
    await page.emulate(devices['iPhone X']);

    // 新开一个页面
    await page.goto('http://www.baidu.com');

    // 等待3000毫秒
    await page.waitFor(3000);

    // 截屏
    await page.screenshot({
        path: 'screenshot.png', // 文件存放路径
        fullPage: true, // 是否截取整页
        quality: 100, // 图像质量，介于0到100之间。 不适用于png图片
    });

    // 关闭浏览器
    await browser.close();
})();
