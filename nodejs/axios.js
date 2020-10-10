const axios = require('axios');

axios.get('https://www.google.com/')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

const request = axios.create({
    baseURL: 'http://127.0.0.1:3001/api',
    timeout: 15000
});

// 请求拦截器
request.interceptors.request.use(config => {
    return Promise.resolve(config);
}, error => {
    return Promise.reject(error);
});

// 结果拦截器
request.interceptors.response.use(response => {

    const result = response.data;

    if (result.code === 1) {
        return Promise.resolve(result.data);
    }

    return Promise.reject(result.message)

}, error => {
    return Promise.reject(error);
});

(async () =>{
    request.get('/total/profit').then( result =>{
        console.log(result)
    }).catch(err =>{
        console.error(err)
    })
})();
