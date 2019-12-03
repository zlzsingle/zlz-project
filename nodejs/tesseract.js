const Tesseract = require('tesseract.js');

const { createWorker } = Tesseract;
(async () => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const result = await worker.recognize('/home/zlz/Downloads/captcha.jpg');
    console.log(JSON.stringify(result));
})();
