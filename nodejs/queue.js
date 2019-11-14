
const queue = require('queue');

const calls = {};

const q = queue({
    concurrency: 5,
    autostart: true,
    results: []
    // timeout: 4000
});

q.on('success', result => {
    console.log('The result is:', result)
});

q.on('error', result => {
    console.log('The result is error :', result)
});

// q.on('timeout', (next, job) => {
//     console.log('timeout job : ', job.nn);
//     next();
// });

function job(n) {
    const a = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(n);
            if (n % 2 === 0) {
                reject(n)
            } else {
                resolve(n);
            }
        }, 5000);
    });

    a.nn = n;

    return a;
}

function main() {
    const arr = new Array(10).fill().map((item, index) => index + 1);
    arr.forEach((v, i) => {
        q.push(job(i + 1))
    });

    console.log(q.results)
}

main();

