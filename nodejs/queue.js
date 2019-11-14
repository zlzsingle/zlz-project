
const queue = require('queue');

const q = queue({
    concurrency: 1,
    autostart: true,
    results: []
    // timeout: 4000
});

q.on('success', result => {
    console.log('The result is success:', result)
    console.log(q.length)
});

q.on('error', result => {
    console.log('The result is error :', result)
    console.log(q.length)
});

// q.on('end', (err, rs) => {
//     console.log('end : ', err, rs);
// });
//
// q.on('start', job => {
//     console.log('The result start:', job.nn)
// });
// q.on('timeout', (next, job) => {
//     console.log('timeout job : ', job.nn);
//     next();
// });

function job(n) {
    const a = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n % 2 === 0) {
                reject(n)
            } else {
                resolve(n);
            }
        }, 5000);
    });

    a.nn = n;

    a.results = n;

    return a;
}

function main() {
    const arr = new Array(10).fill().map((item, index) => index + 1);
    arr.forEach((v, i) => {
        q.push(job(i + 1))
    });
}

main();

