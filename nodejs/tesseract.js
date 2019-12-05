import * as t from 'tesseract.js';

const worker = t.createWorker();

(async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(text);
    await worker.terminate();
})();
