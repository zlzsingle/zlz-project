// puppeteer 无界面浏览器

// https://pptr.dev/

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


})();
