const _ = require('lodash');
const cp = require('child_process');
const dockerImages = cp.execSync(`docker images`).toString('utf-8');
const dockerImagesList = dockerImages.split('\n');
const list = [];
const keys = ['‌repository', 'tag', 'imageId'];
for (let i = 1; i < dockerImagesList.length; i++) {
    let item = dockerImagesList[i];
    if (!item) continue;
    const obj = {};
    _.forEach(keys, key => {
        for (let j = 0; j < item.length; j++) {
            let itemChar = item[j];
            if (itemChar === ' ') {
                const value = item.substring(0, j);
                item = item.substring(j, item.length);
                item = item.trim();
                obj[key] = value;
                break;
            }
        }
    });
    list.push(obj);
}
const noRepository = ['redis', 'mysql'];
_.forEach(list, item => {
    if (!noRepository.includes(item['‌repository'])) {
        const cmd = `docker rmi ${item['imageId']}`;
        try {
            cp.execSync(cmd);
            console.info('exec cmd : ', cmd, 'success');
        } catch (err) {
            console.error('exec cmd :', cmd);
        }
    }
});

console.info(cp.execSync(`docker images`).toString('utf-8'));
